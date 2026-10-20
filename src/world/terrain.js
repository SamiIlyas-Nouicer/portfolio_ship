// Procedural island terrain: one analytic height function shared by
// mesh generation, boat collision, and the water shader's depth map.
import * as THREE from 'three';

// ── deterministic value noise ───────────────────────────────────────────────
function hash(x, y) {
  let h = x * 374761393 + y * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  return (h >>> 0) / 4294967295;
}
function smooth(t) { return t * t * (3 - 2 * t); }
export function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  const u = smooth(xf), v = smooth(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export function fbm(x, y, oct = 4) {
  let s = 0, amp = 0.5, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) {
    s += noise2(x * f, y * f) * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2.03;
  }
  return s / norm;
}
export function seededRandom(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967295;
  };
}
const smoothstep = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// ── island profiles per landmark ────────────────────────────────────────────
const HILL = {
  lighthouse: 6.5, port: 0.6, powerplant: 1.4, windfarm: 4.5, recycling: 1.6,
  crystal: 5.5, observatory: 5, birdnest: 3.5, desert: 2.6, medical: 2.2,
  university: 2.4, tower: 2.0, temple: 3.2,
};
const PLATEAU = { port: 0.55, powerplant: 0.45, university: 0.4, tower: 0.38 };

export function prepareIsland(island, index) {
  island.seed = index * 17.31 + 3.7;
  island.hill = HILL[island.landmark] ?? 3;
  island.plateauR = PLATEAU[island.landmark] ?? 0.3;
  island.cx = island.position[0];
  island.cz = island.position[1];
  // dock faces the home port (or south for home)
  const ang = island.id === 'home'
    ? Math.PI / 2 // +z
    : Math.atan2(-island.cz, -island.cx);
  island.dockAngle = ang;
  island.plateauH = 1.4 + island.hill * 0.62;
  // find coastline along dock direction
  const dx = Math.cos(ang), dz = Math.sin(ang);
  let coast = island.radius;
  for (let d = 0; d < island.radius * 1.6; d += 0.25) {
    if (islandHeightLocal(island, dx * d, dz * d) < -0.15) { coast = d; break; }
  }
  island.coastDist = coast;
  const len = 15;
  island.dockStart = new THREE.Vector2(island.cx + dx * (coast - 7), island.cz + dz * (coast - 7));
  island.dockEnd = new THREE.Vector2(island.cx + dx * (coast + len), island.cz + dz * (coast + len));
  // mooring spot: beside the end of the dock
  const px = -dz, pz = dx; // perpendicular
  island.moor = new THREE.Vector2(
    island.cx + dx * (coast + len - 4) + px * 4.2,
    island.cz + dz * (coast + len - 4) + pz * 4.2
  );
  island.approach = new THREE.Vector2(
    island.cx + dx * (coast + len + 22),
    island.cz + dz * (coast + len + 22)
  );
}

export function islandHeightLocal(island, lx, lz) {
  const R = island.radius;
  const s = island.seed;
  const d = Math.hypot(lx, lz);
  if (d > R * 2.2) return -14;
  const n = fbm(lx * 0.045 + s, lz * 0.045 - s, 3);
  const rr = d / (R * (0.78 + 0.42 * n));
  let h;
  if (rr < 1) {
    const beach = Math.min((1 - rr) * 7.5, 1.4);
    const n2 = fbm(lx * 0.09 - s * 2, lz * 0.09 + s, 3);
    const hill = island.hill * smoothstep(0.88, 0.32, rr) * (0.45 + 0.75 * n2);
    h = beach + hill;
  } else {
    h = -(rr - 1) * R * 0.42;
    h -= (rr - 1) * (rr - 1) * 10;
  }
  // flat plateau in the middle for the landmark
  const rc = d / R;
  const pr = island.plateauR;
  const flat = smoothstep(pr + 0.14, pr - 0.04, rc);
  h = h + (island.plateauH - h) * flat;
  // small surface detail
  h += (noise2(lx * 0.35 + s, lz * 0.35) - 0.5) * 0.25 * smoothstep(1.0, 0.85, rr);
  return Math.max(h, -14);
}

let ISLANDS = [];
export function setIslands(list) { ISLANDS = list; }

export function terrainHeight(x, z) {
  let h = -14;
  for (let i = 0; i < ISLANDS.length; i++) {
    const isl = ISLANDS[i];
    const dx = x - isl.cx, dz = z - isl.cz;
    const r = isl.radius * 2.2;
    if (dx * dx + dz * dz > r * r) continue;
    const v = islandHeightLocal(isl, dx, dz);
    if (v > h) h = v;
  }
  return h;
}

export function terrainNormal(x, z, target) {
  const e = 0.5;
  target.set(
    terrainHeight(x - e, z) - terrainHeight(x + e, z),
    2 * e,
    terrainHeight(x, z - e) - terrainHeight(x, z + e)
  ).normalize();
  return target;
}

/**
 * Top-down depth map of the whole archipelago, sampled by the water shader
 * for shallow-water colour and shoreline foam.
 */
export function buildDepthTexture(islands) {
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const i of islands) {
    minX = Math.min(minX, i.cx - i.radius * 2.3);
    maxX = Math.max(maxX, i.cx + i.radius * 2.3);
    minZ = Math.min(minZ, i.cz - i.radius * 2.3);
    maxZ = Math.max(maxZ, i.cz + i.radius * 2.3);
  }
  const size = Math.max(maxX - minX, maxZ - minZ);
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
  const res = 1024;
  const data = new Uint8Array(res * res * 4);
  const texel = size / res;
  const enc = (h) => Math.round(THREE.MathUtils.clamp((h + 12) / 16, 0, 1) * 255);
  const deep = enc(-14);
  for (let i = 0; i < res * res; i++) { data[i * 4] = deep; data[i * 4 + 3] = 255; }
  const x0 = cx - size / 2, z0 = cz - size / 2;
  for (const isl of islands) {
    const r = isl.radius * 2.2;
    const ix0 = Math.max(0, Math.floor((isl.cx - r - x0) / texel));
    const ix1 = Math.min(res - 1, Math.ceil((isl.cx + r - x0) / texel));
    const iz0 = Math.max(0, Math.floor((isl.cz - r - z0) / texel));
    const iz1 = Math.min(res - 1, Math.ceil((isl.cz + r - z0) / texel));
    for (let iz = iz0; iz <= iz1; iz++) {
      for (let ix = ix0; ix <= ix1; ix++) {
        const wx = x0 + (ix + 0.5) * texel;
        const wz = z0 + (iz + 0.5) * texel;
        const h = islandHeightLocal(isl, wx - isl.cx, wz - isl.cz);
        const idx = (iz * res + ix) * 4;
        const e = enc(h);
        if (e > data[idx]) data[idx] = e;
      }
    }
  }
  const tex = new THREE.DataTexture(data, res, res, THREE.RGBAFormat);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return { texture: tex, bounds: new THREE.Vector4(x0, z0, size, size) };
}
