// Shared Gerstner wave model.
// The exact same parameters drive the GPU water surface (Ocean.js) and the
// CPU buoyancy physics (Boat.js), so the boat floats on what you actually see.

export const GRAVITY = 9.81;

// [dirX, dirZ, steepness, wavelength]
const BASE_WAVES = [
  [1.0, 0.35, 0.085, 62],
  [0.55, 1.0, 0.1, 35],
  [-0.45, 0.9, 0.095, 22],
  [0.9, -0.45, 0.085, 13.5],
  [-0.8, -0.35, 0.075, 8.5],
  [0.25, -1.0, 0.06, 5.2],
];

export const waveState = {
  intensity: 1.0, // global multiplier on steepness (sea state)
  time: 0,
};

export const WAVE_COUNT = BASE_WAVES.length;

// Pre-normalised data, updated when intensity changes.
const waves = BASE_WAVES.map(([dx, dz, s, L]) => {
  const len = Math.hypot(dx, dz);
  const k = (2 * Math.PI) / L;
  return {
    dx: dx / len,
    dz: dz / len,
    baseSteepness: s,
    steepness: s,
    L,
    k,
    c: Math.sqrt(GRAVITY / k),
  };
});

export function setWaveIntensity(v) {
  waveState.intensity = v;
  for (const w of waves) w.steepness = w.baseSteepness * v;
}

// For shader uniforms: array of THREE.Vector4-compatible plain arrays
export function getWaveUniformData() {
  return waves.map((w) => [w.dx, w.dz, w.steepness, w.L]);
}

const _out = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 };

// Displacement of the surface particle whose rest position is (x, z).
function displacement(x, z, t, out) {
  let dx = 0, dy = 0, dz = 0, vx = 0, vy = 0, vz = 0;
  for (let i = 0; i < waves.length; i++) {
    const w = waves[i];
    const f = w.k * (w.dx * x + w.dz * z - w.c * t);
    const a = w.steepness / w.k;
    const cf = Math.cos(f);
    const sf = Math.sin(f);
    dx += w.dx * a * cf;
    dy += a * sf;
    dz += w.dz * a * cf;
    // time derivative (orbital velocity)
    const akc = a * w.k * w.c;
    vx += w.dx * akc * sf;
    vy += -akc * cf;
    vz += w.dz * akc * sf;
  }
  out.x = dx; out.y = dy; out.z = dz;
  out.vx = vx; out.vy = vy; out.vz = vz;
  return out;
}

const _d = { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 };

/**
 * Water surface height (and particle velocity) at world position (x, z).
 * Gerstner waves move points horizontally, so we iteratively solve for the
 * rest position whose displaced position lands on (x, z).
 */
export function sampleWater(x, z, t = waveState.time, out = _out) {
  let px = x, pz = z;
  for (let i = 0; i < 4; i++) {
    displacement(px, pz, t, _d);
    px = x - _d.x;
    pz = z - _d.z;
  }
  displacement(px, pz, t, _d);
  out.y = _d.y;
  out.vx = _d.vx; out.vy = _d.vy; out.vz = _d.vz;
  return out;
}

export function waterHeight(x, z, t = waveState.time) {
  return sampleWater(x, z, t).y;
}

// Approximate surface normal via central differences.
export function waterNormal(x, z, t, target) {
  const e = 0.6;
  const hL = waterHeight(x - e, z, t);
  const hR = waterHeight(x + e, z, t);
  const hD = waterHeight(x, z - e, t);
  const hU = waterHeight(x, z + e, t);
  target.set(hL - hR, 2 * e, hD - hU).normalize();
  return target;
}

// GLSL implementation (kept in sync with displacement() above)
export const gerstnerGLSL = /* glsl */ `
  uniform vec4 uWaves[${WAVE_COUNT}];
  uniform float uTime;

  // returns displacement, accumulates tangent/binormal & jacobian terms
  vec3 gerstner(vec2 p, float dist, inout vec3 tangent, inout vec3 binormal, inout float jxx, inout float jzz, inout float jxz) {
    vec3 disp = vec3(0.0);
    for (int i = 0; i < ${WAVE_COUNT}; i++) {
      vec4 w = uWaves[i];
      vec2 d = w.xy;
      // fade short waves in the distance (where the mesh is coarse) to avoid aliasing
      float steep = w.z * (1.0 - smoothstep(w.w * 45.0, w.w * 110.0, dist));
      float k = 6.28318530718 / w.w;
      float c = sqrt(${GRAVITY.toFixed(2)} / k);
      float f = k * (dot(d, p) - c * uTime);
      float a = steep / k;
      float cf = cos(f);
      float sf = sin(f);
      disp += vec3(d.x * a * cf, a * sf, d.y * a * cf);
      tangent += vec3(-d.x * d.x * steep * sf, d.x * steep * cf, -d.x * d.y * steep * sf);
      binormal += vec3(-d.x * d.y * steep * sf, d.y * steep * cf, -d.y * d.y * steep * sf);
      jxx += d.x * d.x * steep * sf;
      jzz += d.y * d.y * steep * sf;
      jxz += d.x * d.y * steep * sf;
    }
    return disp;
  }
`;
