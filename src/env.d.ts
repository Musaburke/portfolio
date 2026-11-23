// Numbers the scripts pass to the starfield through `window`.
export {};

declare global {
  interface Window {
    __beat?: number; // heartbeat level, 0 at rest to ~1 at the peak (Starfield publishes it)
    __warp?: number; // 0..1 star rush (Journey sets it)
    __kick?: number; // performance.now() when the last star ignites (Journey sets it)
  }
}
