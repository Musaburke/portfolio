// Builds the orb's sphere off the main thread: merging the detail-40 icosahedron's
// ~96k unshared vertices takes about 160 ms, long enough to freeze a scroll.
import { IcosahedronGeometry } from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

// Radius and detail must match RADIUS and the fallback in orb.ts.
const geo = mergeVertices(new IcosahedronGeometry(1.45, 40));
const position = geo.attributes.position.array as Float32Array;
const normal = geo.attributes.normal.array as Float32Array;
const index = geo.index!.array as Uint32Array | Uint16Array;
postMessage({ position, normal, index }, { transfer: [position.buffer, normal.buffer, index.buffer] });
