// Builds every island: low-poly terrain, vegetation, dock, beacon, landmark, label.
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { islandHeightLocal, noise2, seededRandom } from './terrain.js';
import { buildLandmark, mat, glow } from './landmarks.js';
import { categories } from '../data/portfolio.js';

const C = (hex) => new THREE.Color(hex);
const PAL = {
  deep: C('#9c8458'), wet: C('#c4aa78'), sand: C('#ecdcab'), sand2: C('#e4cf98'),
  grass: C('#74ad45'), grass2: C('#8cc057'), grassDark: C('#558f35'), grassHigh: C('#4c8231'),
  rock: C('#8e8982'), rock2: C('#74706a'),
  dsand: C('#ebc68c'), dsand2: C('#dcae6e'), drock: C('#b46a38'),
};

function colorize(geo, color) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  const n = g.attributes.position.count;
  const arr = new Float32Array(n * 3);
  const c = color instanceof THREE.Color ? color : new THREE.Color(color);
  for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
  g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  if (g.attributes.uv) g.deleteAttribute('uv');
  return g;
}

// ── vegetation geometry ─────────────────────────────────────────────────────
function palmGeometry(variant) {
  const parts = [];
  const trunkC = C('#8a6a48'), trunkC2 = C('#9f7b52');
  const segs = 6, height = 6.2 + variant * 1.2;
  const lean = 0.9 + variant * 0.6;
  let top = new THREE.Vector3();
  for (let i = 0; i < segs; i++) {
    const t0 = i / segs, t1 = (i + 1) / segs;
    const p0 = new THREE.Vector3(lean * t0 * t0, height * t0, 0);
    const p1 = new THREE.Vector3(lean * t1 * t1, height * t1, 0);
    const g = new THREE.CylinderGeometry(0.2 - t1 * 0.06, 0.24 - t0 * 0.06, p0.distanceTo(p1) * 1.04, 6);
    const dir = p1.clone().sub(p0);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
    g.applyQuaternion(q);
    const mid = p0.clone().add(p1).multiplyScalar(0.5);
    g.translate(mid.x, mid.y, mid.z);
    parts.push(colorize(g, i % 2 ? trunkC : trunkC2));
    top = p1;
  }
  const leafC = [C('#3f8f3a'), C('#4fa043'), C('#5bb04a')];
  const fronds = 8;
  for (let i = 0; i < fronds; i++) {
    const len = 3.6 + (i % 3) * 0.4;
    const g = new THREE.PlaneGeometry(1.1, len, 1, 6);
    // shape: taper and droop
    const pos = g.attributes.position;
    for (let v = 0; v < pos.count; v++) {
      const y = pos.getY(v) + len / 2; // 0..len
      const t = y / len;
      pos.setX(v, pos.getX(v) * Math.sin(Math.PI * Math.min(1, t * 1.1 + 0.08)) * 1.0);
      pos.setZ(v, -t * t * 2.0 + Math.abs(pos.getX(v)) * 0.35);
      pos.setY(v, y);
    }
    g.rotateX(-Math.PI / 2 + 0.25);
    g.rotateY((i / fronds) * Math.PI * 2 + variant);
    g.translate(top.x, top.y, top.z);
    parts.push(colorize(g, leafC[i % 3]));
  }
  for (let i = 0; i < 3; i++) {
    const g = new THREE.IcosahedronGeometry(0.22, 0);
    const a = (i / 3) * Math.PI * 2;
    g.translate(top.x + Math.cos(a) * 0.3, top.y - 0.35, top.z + Math.sin(a) * 0.3);
    parts.push(colorize(g, C('#5d4632')));
  }
  return mergeGeometries(parts);
}

function treeGeometry() {
  const parts = [];
  const trunk = new THREE.CylinderGeometry(0.22, 0.32, 2.4, 6);
  trunk.translate(0, 1.2, 0);
  parts.push(colorize(trunk, C('#7a5a3c')));
  const greens = [C('#4f9a3a'), C('#5fae45'), C('#448a33')];
  const crowns = [[0, 3.4, 0, 1.7], [0.9, 2.9, 0.3, 1.2], [-0.8, 3.0, -0.4, 1.25], [0.1, 4.4, 0.1, 1.15]];
  crowns.forEach(([x, y, z, r], i) => {
    const g = new THREE.IcosahedronGeometry(r, 0);
    g.translate(x, y, z);
    parts.push(colorize(g, greens[i % 3]));
  });
  return mergeGeometries(parts);
}

function pineGeometry() {
  const parts = [];
  const trunk = new THREE.CylinderGeometry(0.16, 0.24, 1.6, 5);
  trunk.translate(0, 0.8, 0);
  parts.push(colorize(trunk, C('#6b4c33')));
  const greens = [C('#2f6f3a'), C('#367c40'), C('#3f8a47')];
  for (let i = 0; i < 3; i++) {
    const g = new THREE.ConeGeometry(1.7 - i * 0.42, 2.4, 7);
    g.translate(0, 2.2 + i * 1.25, 0);
    parts.push(colorize(g, greens[i]));
  }
  return mergeGeometries(parts);
}

function bushGeometry() {
  const parts = [];
  const g1 = new THREE.IcosahedronGeometry(0.9, 0); g1.scale(1.2, 0.8, 1); g1.translate(0, 0.5, 0);
  const g2 = new THREE.IcosahedronGeometry(0.6, 0); g2.translate(0.7, 0.4, 0.2);
  parts.push(colorize(g1, C('#5a9e3d')), colorize(g2, C('#6cb24a')));
  // flowers
  for (let i = 0; i < 4; i++) {
    const f = new THREE.IcosahedronGeometry(0.13, 0);
    const a = i * 1.7;
    f.translate(Math.cos(a) * 0.7, 0.95, Math.sin(a) * 0.6);
    parts.push(colorize(f, C(['#ff6b8a', '#ffd166', '#ffffff', '#c084fc'][i])));
  }
  return mergeGeometries(parts);
}

function rockGeometry(seed) {
  const g = new THREE.DodecahedronGeometry(1, 0);
  const pos = g.attributes.position;
  const rnd = seededRandom(seed);
  const map = new Map();
  for (let i = 0; i < pos.count; i++) {
    const key = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`;
    if (!map.has(key)) map.set(key, 0.75 + rnd() * 0.45);
    const s = map.get(key);
    pos.setXYZ(i, pos.getX(i) * s * 1.2, pos.getY(i) * s * 0.75, pos.getZ(i) * s);
  }
  g.computeVertexNormals();
  return colorize(g, C('#8a867f'));
}

function cactusGeometry() {
  const parts = [];
  const c = C('#5f8f3e');
  const main = new THREE.CylinderGeometry(0.35, 0.4, 3.2, 7); main.translate(0, 1.6, 0);
  const arm1 = new THREE.CylinderGeometry(0.22, 0.22, 1.2, 6); arm1.translate(0.75, 2.2, 0);
  const j1 = new THREE.CylinderGeometry(0.22, 0.22, 0.6, 6); j1.rotateZ(Math.PI / 2); j1.translate(0.45, 1.65, 0);
  const arm2 = new THREE.CylinderGeometry(0.2, 0.2, 0.9, 6); arm2.translate(-0.7, 1.9, 0);
  const j2 = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 6); j2.rotateZ(Math.PI / 2); j2.translate(-0.42, 1.45, 0);
  [main, arm1, j1, arm2, j2].forEach((g) => parts.push(colorize(g, c)));
  return mergeGeometries(parts);
}

// ── material with wind sway ─────────────────────────────────────────────────
const windUniform = { value: 0 };
function vegetationMaterial() {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.85, side: THREE.DoubleSide });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uWind = windUniform;
    shader.vertexShader = 'uniform float uWind;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        float hgt = max(position.y - 1.0, 0.0);
        float sway = hgt * hgt * 0.006;
        transformed.x += sin(uWind * 1.6 + ip.x * 0.31 + ip.z * 0.17) * sway + sin(uWind * 4.3 + position.x * 2.0 + ip.z) * sway * 0.25;
        transformed.z += cos(uWind * 1.3 + ip.z * 0.27) * sway * 0.7;
      #endif`
    );
  };
  return m;
}

// ─────────────────────────────────────────────────────────────────────────────

export class Islands {
  constructor(scene, islandData) {
    this.scene = scene;
    this.data = islandData;
    this.items = [];
    this.pickables = [];
    this.group = new THREE.Group();
    scene.add(this.group);

    this.terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.92 });
    this.vegMat = vegetationMaterial();

    // vegetation instancing buckets
    this.vegTypes = {
      palm0: { geo: palmGeometry(0), list: [] },
      palm1: { geo: palmGeometry(1), list: [] },
      tree: { geo: treeGeometry(), list: [] },
      pine: { geo: pineGeometry(), list: [] },
      bush: { geo: bushGeometry(), list: [] },
      rock0: { geo: rockGeometry(11), list: [] },
      rock1: { geo: rockGeometry(29), list: [] },
      cactus: { geo: cactusGeometry(), list: [] },
    };

    islandData.forEach((isl, i) => this.buildIsland(isl, i));
    this.buildVegetationInstances();
  }

  buildIsland(isl, index) {
    const root = new THREE.Group();
    root.position.set(isl.cx, 0, isl.cz);
    this.group.add(root);

    const terrain = this.buildTerrain(isl);
    terrain.userData.islandId = isl.id;
    root.add(terrain);
    this.pickables.push(terrain);

    // landmark
    const lm = buildLandmark(isl.landmark);
    lm.group.position.y = isl.plateauH - 0.05;
    lm.group.rotation.y = -isl.dockAngle + Math.PI / 2;
    lm.group.traverse((o) => { if (o.isMesh) o.userData.islandId = isl.id; });
    root.add(lm.group);
    this.pickables.push(lm.group);

    this.scatterVegetation(isl, index);

    const dock = this.buildDock(isl);
    this.group.add(dock.group);

    // floating parchment scroll banner
    const cat = categories[isl.category];
    const el = document.createElement('div');
    el.className = `island-label cat-${isl.category}`;
    el.style.setProperty('--cat', cat.color);
    el.style.setProperty('--ink', cat.ink || '#4a2c11');
    el.innerHTML = `
      <div class="il-seal"></div>
      <div class="il-kicker">${cat.label}</div>
      <div class="il-title">${isl.title}</div>
      <div class="il-sub">${isl.date ?? ''}</div>`;
    el.dataset.island = isl.id;
    const label = new CSS2DObject(el);
    label.position.set(0, isl.plateauH + lm.height + 3, 0);
    root.add(label);

    this.items.push({
      data: isl,
      root,
      landmark: lm,
      dock,
      label,
      labelEl: el,
      labelHeight: isl.plateauH + lm.height + 3,
    });
  }

  buildTerrain(isl) {
    const R = isl.radius;
    const half = R * 1.42;
    const seg = Math.round((half * 2) / 1.65);
    const geo = new THREE.PlaneGeometry(half * 2, half * 2, seg, seg);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const cell = (half * 2) / seg;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i), z = pos.getZ(i);
      // organic jitter (deterministic by position → shared vertices stay shared)
      const edge = Math.abs(x) >= half - 1e-3 || Math.abs(z) >= half - 1e-3;
      if (!edge) {
        x += (noise2(x * 0.7 + 13.1, z * 0.7) - 0.5) * cell * 0.7;
        z += (noise2(x * 0.7 - 7.3, z * 0.7 + 3.1) - 0.5) * cell * 0.7;
      }
      pos.setXYZ(i, x, islandHeightLocal(isl, x, z), z);
    }
    const flat = geo.toNonIndexed();
    const p = flat.attributes.position;
    // keep only triangles that are not deep underwater
    const keep = [];
    for (let t = 0; t < p.count; t += 3) {
      const y0 = p.getY(t), y1 = p.getY(t + 1), y2 = p.getY(t + 2);
      if (Math.max(y0, y1, y2) > -4.5) keep.push(t);
    }
    const outPos = new Float32Array(keep.length * 9);
    const outCol = new Float32Array(keep.length * 9);
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    const n = new THREE.Vector3(), e1 = new THREE.Vector3(), e2 = new THREE.Vector3();
    const col = new THREE.Color();
    const desert = isl.landmark === 'desert';
    keep.forEach((t, k) => {
      a.fromBufferAttribute(p, t); b.fromBufferAttribute(p, t + 1); c.fromBufferAttribute(p, t + 2);
      outPos.set([a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z], k * 9);
      e1.subVectors(b, a); e2.subVectors(c, a);
      n.crossVectors(e1, e2).normalize();
      if (n.y < 0) n.negate();
      const h = (a.y + b.y + c.y) / 3;
      const cx = (a.x + b.x + c.x) / 3, cz = (a.z + b.z + c.z) / 3;
      const nz = noise2(cx * 0.15 + isl.seed, cz * 0.15);
      const rr = Math.hypot(cx, cz) / R;
      const onPlateau = rr < isl.plateauR + 0.05;
      if (h < -0.6) col.copy(PAL.deep);
      else if (h < 0.25) col.copy(PAL.wet);
      else if (desert) {
        if (n.y < 0.7) col.copy(PAL.drock);
        else col.copy(PAL.dsand).lerp(PAL.dsand2, nz);
      } else if (h < 1.05 + nz * 0.45 && !onPlateau) col.copy(PAL.sand).lerp(PAL.sand2, nz);
      else if (n.y < 0.74) col.copy(PAL.rock).lerp(PAL.rock2, nz);
      else {
        col.copy(PAL.grass).lerp(PAL.grass2, nz);
        if (h > 4) col.lerp(PAL.grassHigh, Math.min(1, (h - 4) / 4));
        else if (nz > 0.62) col.lerp(PAL.grassDark, 0.5);
      }
      // subtle per-face variation for the low-poly look
      const j = (noise2(cx * 3.1, cz * 3.1) - 0.5) * 0.06;
      col.offsetHSL(0, 0, j);
      for (let v = 0; v < 3; v++) outCol.set([col.r, col.g, col.b], k * 9 + v * 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(outPos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(outCol, 3));
    g.computeVertexNormals();
    const mesh = new THREE.Mesh(g, this.terrainMat);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
  }

  scatterVegetation(isl, index) {
    const rnd = seededRandom(index * 7919 + 13);
    const R = isl.radius;
    const dx = Math.cos(isl.dockAngle), dz = Math.sin(isl.dockAngle);
    const desert = isl.landmark === 'desert';
    const lush = ['lighthouse', 'crystal', 'birdnest', 'observatory', 'windfarm', 'temple'].includes(isl.landmark);
    const tries = Math.round(R * R * 0.5);
    const placed = [];
    for (let k = 0; k < tries; k++) {
      const ang = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * R * 1.05;
      const x = Math.cos(ang) * r, z = Math.sin(ang) * r;
      const rc = r / R;
      if (rc < isl.plateauR + 0.16) continue;
      // keep dock corridor clear
      const along = x * dx + z * dz;
      const across = Math.abs(-x * dz + z * dx);
      if (along > 0 && across < 5) continue;
      const h = islandHeightLocal(isl, x, z);
      if (h < 0.5) continue;
      // spacing
      let ok = true;
      for (const p of placed) if ((p[0] - x) ** 2 + (p[1] - z) ** 2 < 6) { ok = false; break; }
      if (!ok) continue;
      // slope
      const e = 0.6;
      const slope = Math.hypot(
        islandHeightLocal(isl, x + e, z) - islandHeightLocal(isl, x - e, z),
        islandHeightLocal(isl, x, z + e) - islandHeightLocal(isl, x, z - e)
      ) / (2 * e);
      const roll = rnd();
      let type = null;
      if (desert) {
        if (h < 1.6 && roll < 0.2) type = rnd() < 0.5 ? 'palm0' : 'palm1';
        else if (roll < 0.32) type = 'cactus';
        else if (roll < 0.45) type = rnd() < 0.5 ? 'rock0' : 'rock1';
      } else if (h < 1.4) {
        if (roll < 0.28) type = rnd() < 0.5 ? 'palm0' : 'palm1';
        else if (roll < 0.36) type = rnd() < 0.5 ? 'rock0' : 'rock1';
      } else if (slope > 0.9) {
        if (roll < 0.35) type = rnd() < 0.5 ? 'rock0' : 'rock1';
      } else {
        const density = lush ? 0.55 : 0.32;
        if (roll < density * 0.35) type = 'tree';
        else if (roll < density * 0.6) type = h > 3.5 ? 'pine' : 'palm0';
        else if (roll < density) type = 'bush';
        else if (roll < density + 0.05) type = 'rock0';
      }
      if (!type) continue;
      placed.push([x, z]);
      const s = type.startsWith('rock') ? 0.5 + rnd() * 1.1 : 0.8 + rnd() * 0.45;
      this.vegTypes[type].list.push({
        x: isl.cx + x, y: h - (type.startsWith('rock') ? 0.25 * s : 0.1), z: isl.cz + z,
        rot: rnd() * Math.PI * 2, s,
      });
    }
  }

  buildVegetationInstances() {
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    for (const key of Object.keys(this.vegTypes)) {
      const { geo, list } = this.vegTypes[key];
      if (!list.length) continue;
      const mesh = new THREE.InstancedMesh(geo, this.vegMat, list.length);
      list.forEach((it, i) => {
        q.setFromAxisAngle(up, it.rot);
        m4.compose(new THREE.Vector3(it.x, it.y, it.z), q, new THREE.Vector3(it.s, it.s, it.s));
        mesh.setMatrixAt(i, m4);
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.computeBoundingSphere();
      this.group.add(mesh);
    }
  }

  buildDock(isl) {
    const g = new THREE.Group();
    const start = isl.dockStart, end = isl.dockEnd;
    const len = start.distanceTo(end);
    g.position.set(start.x, 0, start.y);
    g.rotation.y = -isl.dockAngle;
    const wood = mat('#7d5c3b', { roughness: 0.9 });
    const iron = mat('#2a221c', { metalness: 0.6, roughness: 0.45 });
    const deckY = 1.7;

    // Merge all wooden planks, posts, beams & flagpole into ONE single mesh per dock!
    const woodGeos = [];
    for (let x = 0; x < len; x += 0.6) {
      const p = new THREE.BoxGeometry(0.52, 0.16, 3.2);
      p.translate(x + 0.25, deckY, (noise2(x * 3, isl.seed) - 0.5) * 0.15);
      woodGeos.push(p);
    }
    for (let x = 0.3; x < len; x += 3.4) {
      for (const s of [-1.5, 1.5]) {
        const c = new THREE.CylinderGeometry(0.17, 0.2, 7, 6);
        c.translate(x, deckY - 3.2, s);
        woodGeos.push(c);
      }
    }
    for (const s of [-1.55, 1.55]) {
      const b = new THREE.BoxGeometry(len, 0.22, 0.18);
      b.translate(len / 2, deckY - 0.2, s);
      woodGeos.push(b);
    }
    const pole = new THREE.CylinderGeometry(0.09, 0.12, 7, 7);
    pole.translate(len - 0.6, deckY + 3.5, -1.2);
    woodGeos.push(pole);

    const woodMesh = new THREE.Mesh(mergeGeometries(woodGeos), wood);
    woodMesh.castShadow = woodMesh.receiveShadow = true;
    g.add(woodMesh);

    // Merge iron bollards & lamp posts into ONE single mesh
    const ironGeos = [];
    for (const x of [len - 2, len - 7]) {
      const b = new THREE.CylinderGeometry(0.18, 0.22, 0.6, 7);
      b.translate(x, deckY + 0.35, 1.25);
      ironGeos.push(b);
    }
    for (const x of [3, len * 0.55]) {
      const lp = new THREE.CylinderGeometry(0.06, 0.07, 2.4, 6);
      lp.translate(x, deckY + 1.2, 1.45);
      ironGeos.push(lp);
    }
    g.add(new THREE.Mesh(mergeGeometries(ironGeos), iron));

    // Merge dock lanterns into ONE single mesh
    const bulbGeos = [];
    for (const x of [3, len * 0.55]) {
      const bulb = new THREE.IcosahedronGeometry(0.17, 0);
      bulb.translate(x, deckY + 2.45, 1.45);
      bulbGeos.push(bulb);
    }
    g.add(new THREE.Mesh(mergeGeometries(bulbGeos), glow('#ffcf78', 3.2)));

    const cat = categories[isl.category];
    const lantern = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 1), glow(cat.color, 4));
    lantern.position.set(len - 0.6, deckY + 7.15, -1.2);
    g.add(lantern);

    const flagGeo = new THREE.PlaneGeometry(2.2, 1.3, 8, 3);
    flagGeo.translate(1.1, 0, 0);
    const flag = new THREE.Mesh(flagGeo, mat(cat.color, { side: THREE.DoubleSide, flatShading: false, roughness: 0.8 }));
    flag.position.set(len - 0.6, deckY + 6.2, -1.2);
    flag.castShadow = true;
    g.add(flag);
    const rest = Float32Array.from(flagGeo.attributes.position.array);

    return { group: g, flag, flagRest: rest, lantern };
  }

  update(t, dt, camera) {
    windUniform.value = t;
    for (const it of this.items) {
      const dx = camera.position.x - it.data.cx;
      const dz = camera.position.z - it.data.cz;
      const dist = Math.hypot(dx, dz);
      if (dist < 320) it.landmark.update(t, dt);
      if (dist < 170) {
        const pos = it.dock.flag.geometry.attributes.position;
        const rest = it.dock.flagRest;
        for (let i = 0; i < pos.count; i++) {
          const x = rest[i * 3];
          const y = rest[i * 3 + 1];
          pos.setZ(i, Math.sin(x * 2.6 - t * 6 + y * 0.8) * 0.18 * x);
        }
        pos.needsUpdate = true;
      }
    }
  }
}
