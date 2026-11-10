// About: a liquid-morph orb. An icosahedron whose vertices ripple with layered
// sine noise, shaded like iridescent glass (clearcoat + iridescence lit by a room
// environment), with a wireframe twin that fades in while the cursor is over it.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import GeoWorker from './orb-geo.worker?worker';
import { createStage, heartbeat, trackPointer } from './stage';

// Icosahedron vertices are unshared; merging them gives smooth normals instead of facets.
// Merging is slow, so it runs in a worker; the main thread does it only if workers fail.
const RADIUS = 1.45;

function sphere(): Promise<THREE.BufferGeometry> {
  const local = () => mergeVertices(new THREE.IcosahedronGeometry(RADIUS, 40));
  return new Promise((resolve) => {
    let worker: Worker;
    try { worker = new GeoWorker(); } catch { resolve(local()); return; }
    worker.onmessage = ({ data }) => {
      worker.terminate();
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(data.position, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(data.normal, 3));
      geo.setIndex(new THREE.BufferAttribute(data.index, 1));
      resolve(geo);
    };
    worker.onerror = () => { worker.terminate(); resolve(local()); };
  });
}

export async function mountOrb(canvas: HTMLCanvasElement) {
  const geoReady = sphere();
  const stage = createStage(canvas, 35);
  if (!stage) return;
  const { renderer, scene, camera, run } = stage;
  camera.position.set(0, 0, 5.4);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  // Let a frame through between the context and the environment map, so neither stall is doubled.
  await new Promise((r) => setTimeout(r, 0));
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const geo = await geoReady;
  const base = Float32Array.from(geo.attributes.position.array as Float32Array);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x3d5a47,
    metalness: 0.35,
    roughness: 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    iridescence: 1,
    iridescenceIOR: 1.35,
    iridescenceThicknessRange: [120, 820],
    envMapIntensity: 1.2,
  });
  const orb = new THREE.Mesh(geo, mat);
  scene.add(orb);

  const wireMat = new THREE.MeshBasicMaterial({ color: 0xd9e4d8, wireframe: true, transparent: true, opacity: 0 });
  const wire = new THREE.Mesh(geo, wireMat);
  wire.scale.setScalar(1.012);
  scene.add(wire);

  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fd09c, 2.2);
  rim.position.set(-4, -2, -3);
  scene.add(rim);

  let hover = 0, hoverTarget = 0;
  canvas.addEventListener('pointerenter', () => (hoverTarget = 1));
  canvas.addEventListener('pointerleave', () => (hoverTarget = 0));
  const pointer = trackPointer();
  let rx = 0, ry = 0;

  // The base is a sphere, so each vertex's outward direction never changes: work it out once
  // rather than allocating ~16k vectors a frame (that garbage caused GC pauses while scrolling).
  const dir = new Float32Array(base.length);
  for (let i = 0; i < base.length; i += 3) {
    const l = Math.hypot(base[i], base[i + 1], base[i + 2]) || 1;
    dir[i] = base[i] / l; dir[i + 1] = base[i + 1] / l; dir[i + 2] = base[i + 2] / l;
  }
  const out = pos.array as Float32Array;
  const nrm = geo.attributes.normal as THREE.BufferAttribute;
  const nOut = nrm.array as Float32Array;
  const displace = (t: number) => {
    const time = t * 0.00045;
    const amp = 0.09 + heartbeat() * 0.04 + hover * 0.05;
    for (let i = 0; i < base.length; i += 3) {
      const nx = dir[i], ny = dir[i + 1], nz = dir[i + 2];
      const A = nx * 2.6 + time * 1.7, B = ny * 3.1 - time * 1.3, C = nz * 3.7 + time * 2.1 + nx * 1.5;
      const wave = Math.sin(A) * 0.5 + Math.sin(B) * 0.35 + Math.sin(C) * 0.25;
      const d = wave * amp;
      out[i] = base[i] + nx * d; out[i + 1] = base[i + 1] + ny * d; out[i + 2] = base[i + 2] + nz * d;
      // Normals straight from the ripple's gradient (made tangent to the sphere) instead of
      // computeVertexNormals over ~32k triangles: within 0.03 deg on average, ~3 ms a frame cheaper.
      const cC = Math.cos(C) * 0.25;
      const gx = Math.cos(A) * 1.3 + cC * 1.5, gy = Math.cos(B) * 1.085, gz = cC * 3.7;
      const gn = gx * nx + gy * ny + gz * nz, k = amp / (RADIUS + d);
      const mx = nx - k * (gx - gn * nx), my = ny - k * (gy - gn * ny), mz = nz - k * (gz - gn * nz);
      const ml = Math.hypot(mx, my, mz);
      nOut[i] = mx / ml; nOut[i + 1] = my / ml; nOut[i + 2] = mz / ml;
    }
    pos.needsUpdate = true;
    nrm.needsUpdate = true;
  };

  // Compile the shaders in parallel where the GPU driver allows, so the first frame doesn't stall the page.
  renderer.compileAsync(scene, camera).catch(() => {}).then(() => run((t) => {
    hover += (hoverTarget - hover) * 0.06;
    rx += (pointer.y * 0.4 - rx) * 0.05;
    ry += (pointer.x * 0.6 - ry) * 0.05;
    displace(t);
    orb.rotation.set(rx + t * 0.00006, ry + t * 0.00011, 0);
    wire.rotation.copy(orb.rotation);
    wireMat.opacity = hover * 0.22;
  }));
}
