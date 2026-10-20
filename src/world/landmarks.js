// Themed landmarks for each island, built procedurally from primitives.
// Every builder returns { group, update(t, dt) }.
import * as THREE from 'three';

const matCache = new Map();
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.0, flatShading: true, ...opts }));
  }
  return matCache.get(key);
}
export function glow(color, intensity = 2.5, opts = {}) {
  return mat(color, { emissive: color, emissiveIntensity: intensity, roughness: 0.4, ...opts });
}

function add(parent, geo, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}
const box = (p, w, h, d, m, x, y, z) => add(p, new THREE.BoxGeometry(w, h, d), m, x, y, z);
const cyl = (p, rt, rb, h, seg, m, x, y, z) => add(p, new THREE.CylinderGeometry(rt, rb, h, seg), m, x, y, z);
const sph = (p, r, m, x, y, z, detail = 1) => add(p, new THREE.IcosahedronGeometry(r, detail), m, x, y, z);

function beam(parent, a, b, r, m) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mesh = add(parent, new THREE.CylinderGeometry(r, r, len, 6), m);
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

function gableRoof(parent, w, h, d, m, x, y, z) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0); shape.lineTo(w / 2, 0); shape.lineTo(0, h); shape.lineTo(-w / 2, 0);
  const g = new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: false });
  g.translate(0, 0, -d / 2);
  return add(parent, g, m, x, y, z);
}

function house(parent, x, z, rot = 0, wall = '#f4efe6', roof = '#c0533a', w = 4, d = 3.5, h = 2.6) {
  const g = new THREE.Group();
  box(g, w, h, d, mat(wall), 0, h / 2, 0);
  gableRoof(g, w + 0.5, 1.6, d + 0.5, mat(roof), 0, h, 0).rotation.y = 0;
  box(g, 0.9, 1.6, 0.1, mat('#6d4c41'), 0, 0.8, d / 2 + 0.02);
  box(g, 0.8, 0.7, 0.1, mat('#9ad1ff', { emissive: '#ffd59a', emissiveIntensity: 0.25, roughness: 0.2 }), -w / 3, 1.6, d / 2 + 0.02);
  box(g, 0.8, 0.7, 0.1, mat('#9ad1ff', { emissive: '#ffd59a', emissiveIntensity: 0.25, roughness: 0.2 }), w / 3, 1.6, d / 2 + 0.02);
  g.position.set(x, 0, z);
  g.rotation.y = rot;
  parent.add(g);
  return g;
}

function canvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return { texture: t, ctx, canvas: c };
}

function bubbleSprite(emoji, bg) {
  const { texture } = canvasTexture(128, 128, (ctx) => {
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(64, 58, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(40, 98); ctx.lineTo(30, 124); ctx.lineTo(64, 104);
    ctx.fill();
    ctx.font = '62px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 64, 62);
  });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  return s;
}

// ─────────────────────────────────────────────────────────────────────────────

const builders = {
  lighthouse() {
    const g = new THREE.Group();
    const red = mat('#d64541'), white = mat('#f7f4ee');
    // rocky base
    cyl(g, 3.4, 4.2, 1.2, 9, mat('#8b8680'), 0, 0.6, 0);
    let y = 1.2;
    const levels = 6, segH = 2.2;
    for (let i = 0; i < levels; i++) {
      const r0 = 2.6 - i * 0.22, r1 = 2.6 - (i + 1) * 0.22;
      cyl(g, r1, r0, segH, 12, i % 2 ? red : white, 0, y + segH / 2, 0);
      y += segH;
    }
    cyl(g, 2.3, 2.3, 0.35, 14, mat('#3a3a3a'), 0, y + 0.17, 0);
    const rail = add(g, new THREE.TorusGeometry(2.15, 0.06, 4, 20), mat('#2b2b2b'), 0, y + 1.0, 0);
    rail.rotation.x = Math.PI / 2;
    const lamp = cyl(g, 1.15, 1.15, 1.8, 10, glow('#fff2b0', 4, { transparent: true, opacity: 0.95 }), 0, y + 1.25, 0);
    void lamp;
    add(g, new THREE.ConeGeometry(1.6, 1.6, 10), red, 0, y + 2.95, 0);
    sph(g, 0.25, mat('#2b2b2b'), 0, y + 3.85, 0);
    const lampY = y + 1.25;
    // rotating light beams
    const beamGroup = new THREE.Group();
    beamGroup.position.y = lampY;
    const beamMat = new THREE.MeshBasicMaterial({
      color: '#fff3c4', transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending,
      depthWrite: false, side: THREE.DoubleSide, fog: false,
    });
    for (const s of [1, -1]) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(4.5, 40, 20, 1, true), beamMat);
      cone.rotation.z = (s * Math.PI) / 2;
      cone.position.x = -s * 20;
      beamGroup.add(cone);
    }
    g.add(beamGroup);
    const light = new THREE.PointLight('#ffd98a', 60, 60, 1.6);
    light.position.y = lampY;
    g.add(light);
    house(g, 6.5, 2.5, -0.4, '#f4efe6', '#3d6a8f', 5, 4, 2.8);
    // anchor monument
    const anchor = new THREE.Group();
    box(anchor, 0.35, 3, 0.35, mat('#37474f', { metalness: 0.6, roughness: 0.4 }), 0, 1.5, 0);
    box(anchor, 2.2, 0.3, 0.35, mat('#37474f', { metalness: 0.6, roughness: 0.4 }), 0, 2.6, 0);
    const arc = add(anchor, new THREE.TorusGeometry(1.2, 0.17, 6, 16, Math.PI), mat('#37474f', { metalness: 0.6, roughness: 0.4 }), 0, 1.2, 0);
    arc.rotation.z = Math.PI;
    add(anchor, new THREE.TorusGeometry(0.4, 0.1, 6, 12), mat('#37474f', { metalness: 0.6, roughness: 0.4 }), 0, 3.3, 0);
    anchor.position.set(-5.5, 0, 4);
    anchor.rotation.y = 0.5;
    g.add(anchor);
    return {
      group: g,
      height: y + 5,
      update(t) { beamGroup.rotation.y = t * 0.9; },
    };
  },

  port() {
    const g = new THREE.Group();
    box(g, 30, 5, 22, mat('#9aa0a6', { roughness: 0.95 }), 0, -1.9, 0);
    // painted lines
    for (let i = -2; i <= 2; i++) box(g, 0.25, 0.02, 20, mat('#f5d547'), i * 5.5, 0.61, 0);
    const palette = ['#c0392b', '#2471a3', '#1e8449', '#f39c12', '#7d3c98', '#117a65', '#d35400', '#eaecee', '#1b4f72'];
    const cgeo = new THREE.BoxGeometry(4.6, 1.9, 1.95);
    const count = 64;
    const inst = new THREE.InstancedMesh(cgeo, mat('#ffffff', { roughness: 0.6 }), count);
    const m4 = new THREE.Matrix4();
    const col = new THREE.Color();
    let n = 0;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let row = 0; row < 4 && n < count; row++) {
      for (let c = 0; c < 4 && n < count; c++) {
        const h = 1 + Math.floor(rnd() * 4);
        for (let k = 0; k < h && n < count; k++) {
          m4.makeTranslation(-11 + c * 5.2, 0.6 + 0.95 + k * 1.92, -8 + row * 2.1);
          inst.setMatrixAt(n, m4);
          inst.setColorAt(n, col.set(palette[Math.floor(rnd() * palette.length)]));
          n++;
        }
      }
    }
    inst.count = n;
    g.add(inst);
    // STS gantry cranes
    const craneMat = mat('#1f5fa8', { roughness: 0.55 }), craneW = mat('#f2f2f2');
    const cranes = [];
    for (const cx of [6, 12.5]) {
      const cr = new THREE.Group();
      for (const lx of [-1.8, 1.8]) for (const lz of [-3, 3]) box(cr, 0.5, 12, 0.5, craneMat, lx, 6, lz);
      box(cr, 4.2, 0.6, 0.6, craneMat, 0, 12, -3);
      box(cr, 4.2, 0.6, 0.6, craneMat, 0, 12, 3);
      box(cr, 0.6, 0.6, 6.5, craneMat, -1.8, 4.5, 0);
      box(cr, 0.6, 0.6, 6.5, craneMat, 1.8, 4.5, 0);
      // boom over the water
      box(cr, 0.8, 0.8, 26, craneW, -1.2, 13.2, 8);
      box(cr, 0.8, 0.8, 26, craneW, 1.2, 13.2, 8);
      box(cr, 3, 2, 3, mat('#e8e8e8'), 0, 14.5, -4);
      beam(cr, new THREE.Vector3(0, 17, -2), new THREE.Vector3(0, 13.4, 20), 0.08, mat('#333'));
      beam(cr, new THREE.Vector3(0, 17, -2), new THREE.Vector3(0, 13.4, -9), 0.08, mat('#333'));
      box(cr, 0.6, 4, 0.6, craneMat, 0, 15, -2);
      const trolley = new THREE.Group();
      box(trolley, 2.8, 0.6, 1.6, mat('#ffcc00'), 0, 12.6, 0);
      const cable = box(trolley, 0.06, 1, 0.06, mat('#222'), 0, 0, 0);
      const spreader = new THREE.Group();
      box(spreader, 4.7, 0.3, 2.1, mat('#ffcc00'), 0, 0, 0);
      const box2 = box(spreader, 4.6, 1.9, 1.95, mat(palette[cranes.length * 3 + 1]), 0, -1.1, 0);
      void box2;
      trolley.add(spreader);
      cr.add(trolley);
      cr.position.set(cx, 0.6, 5);
      g.add(cr);
      cranes.push({ trolley, spreader, cable, phase: cranes.length * 2.4 });
    }
    // computer-vision camera scanning the containers
    const cam = new THREE.Group();
    cyl(cam, 0.12, 0.15, 7, 6, mat('#555'), 0, 3.5, 0);
    box(cam, 0.8, 0.5, 1.2, mat('#222'), 0, 7.1, 0.2);
    cyl(cam, 0.22, 0.22, 0.3, 10, glow('#3cff8a', 3), 0, 7.1, 0.9).rotation.x = Math.PI / 2;
    const fov = new THREE.Mesh(
      new THREE.ConeGeometry(4, 9, 4, 1, true),
      new THREE.MeshBasicMaterial({ color: '#3cff8a', transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })
    );
    fov.position.set(0, 7.1, 5.4);
    fov.rotation.x = -Math.PI / 2 - 0.5;
    const pivot = new THREE.Group();
    pivot.position.y = 0;
    pivot.add(fov);
    cam.add(pivot);
    cam.position.set(-13, 0.6, 9);
    g.add(cam);
    return {
      group: g,
      height: 19,
      update(t) {
        for (const c of cranes) {
          const p = t * 0.35 + c.phase;
          c.trolley.position.z = 8 + Math.sin(p) * 9;
          const drop = 3 + (Math.sin(p * 2.0) * 0.5 + 0.5) * 6;
          c.spreader.position.y = 12.3 - drop;
          c.cable.scale.y = drop;
          c.cable.position.y = 12.3 - drop / 2;
        }
        pivot.rotation.y = Math.sin(t * 0.6) * 0.6 - 0.9;
      },
    };
  },

  powerplant() {
    const g = new THREE.Group();
    box(g, 22, 5, 18, mat('#a7a9a3', { roughness: 0.95 }), 0, -2.1, 0);
    // main building
    box(g, 9, 5, 6, mat('#e6e2d8'), -3, 2.9, -2);
    box(g, 9.2, 0.6, 6.2, mat('#2e7d32'), -3, 5.6, -2);
    for (let i = 0; i < 5; i++) box(g, 1, 1.2, 0.1, mat('#5aa9e6', { roughness: 0.2, emissive: '#ffd9a0', emissiveIntensity: 0.15 }), -6.5 + i * 1.8, 3.3, 1.02);
    // chimneys
    for (const [x, z] of [[-5.5, -4], [-2.5, -4]]) {
      for (let i = 0; i < 4; i++) cyl(g, 0.55, 0.62, 3, 10, mat(i % 2 ? '#d64541' : '#f5f5f5'), x, 6 + i * 3 - 1.5 + 1.5, z);
    }
    // cooling tower (hyperboloid)
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const y = (i / 12) * 11;
      const r = 3.0 + Math.pow((y - 7.5) / 7.5, 2) * 2.2;
      pts.push(new THREE.Vector2(r, y));
    }
    const tower = add(g, new THREE.LatheGeometry(pts, 20), mat('#cfcac0', { side: THREE.DoubleSide }), 6, 0.4, -2);
    void tower;
    // steam
    const steam = [];
    const steamMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1, transparent: true, opacity: 0.6, flatShading: true, depthWrite: false });
    for (let i = 0; i < 10; i++) {
      const s = sph(g, 1, steamMat.clone(), 6, 12, -2, 1);
      steam.push({ mesh: s, phase: i / 10 });
    }
    // pylons with cables
    const pylonMat = mat('#6b6f73', { metalness: 0.5, roughness: 0.5 });
    const tops = [];
    for (const [x, z] of [[-8, 6], [3, 7]]) {
      const p = new THREE.Group();
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) beam(p, new THREE.Vector3(sx * 1.3, 0, sz * 1.3), new THREE.Vector3(sx * 0.3, 10, sz * 0.3), 0.08, pylonMat);
      box(p, 5, 0.25, 0.25, pylonMat, 0, 8, 0);
      box(p, 3.6, 0.25, 0.25, pylonMat, 0, 9.6, 0);
      add(p, new THREE.ConeGeometry(0.5, 1.4, 4), pylonMat, 0, 10.6, 0);
      p.position.set(x, 0.4, z);
      g.add(p);
      tops.push(new THREE.Vector3(x, 8.4, z));
    }
    for (const off of [-2.3, 2.3]) {
      const a = tops[0].clone().add(new THREE.Vector3(off, 0, 0));
      const b = tops[1].clone().add(new THREE.Vector3(off, 0, 0));
      const mid = a.clone().lerp(b, 0.5); mid.y -= 1.3;
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      add(g, new THREE.TubeGeometry(curve, 16, 0.04, 4), mat('#222'));
    }
    // floating "cloud" for the provisioning portal
    const cloud = new THREE.Group();
    const cm = mat('#ffffff', { emissive: '#bfe3ff', emissiveIntensity: 0.4 });
    sph(cloud, 1.4, cm, 0, 0, 0); sph(cloud, 1.1, cm, 1.4, -0.2, 0); sph(cloud, 1.0, cm, -1.4, -0.3, 0); sph(cloud, 0.9, cm, 0.6, 0.7, 0.3);
    for (let i = 0; i < 3; i++) box(cloud, 0.9, 0.18, 0.6, glow('#4cc9f0', 2.5), -0.9 + i * 0.9, -1.6, 0);
    cloud.position.set(-3, 9.5, -2);
    g.add(cloud);
    return {
      group: g,
      height: 17,
      update(t) {
        for (const s of steam) {
          const k = (t * 0.12 + s.phase) % 1;
          s.mesh.position.set(6 + Math.sin(k * 6 + s.phase * 9) * 0.8 + k * 4, 11.6 + k * 10, -2 + k * 2);
          const sc = 1.6 + k * 3.2;
          s.mesh.scale.setScalar(sc);
          s.mesh.material.opacity = 0.55 * (1 - k) * Math.min(1, k * 8);
        }
        cloud.position.y = 9.5 + Math.sin(t * 1.2) * 0.4;
        cloud.rotation.y = Math.sin(t * 0.3) * 0.3;
      },
    };
  },

  windfarm() {
    const g = new THREE.Group();
    const turbines = [];
    const white = mat('#f4f6f7', { roughness: 0.4 });
    for (const [x, z, s] of [[-6, -6, 1], [6, -8, 0.9], [9, 4, 1.05]]) {
      const tg = new THREE.Group();
      cyl(tg, 0.28, 0.6, 18, 10, white, 0, 9, 0);
      box(tg, 1, 1, 2.6, white, 0, 18.2, -0.3);
      const rotor = new THREE.Group();
      sph(rotor, 0.55, white, 0, 0, 0);
      for (let i = 0; i < 3; i++) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.7, 8.5, 0.18), white);
        blade.geometry.translate(0, 4.4, 0);
        const pos = blade.geometry.attributes.position;
        for (let v = 0; v < pos.count; v++) if (pos.getY(v) > 4) pos.setX(v, pos.getX(v) * 0.45);
        blade.rotation.z = (i * Math.PI * 2) / 3;
        rotor.add(blade);
      }
      rotor.position.set(0, 18.2, 1.1);
      tg.add(rotor);
      sph(tg, 0.15, glow('#ff3b3b', 3), 0, 18.8, -1.2, 0);
      tg.position.set(x, 0, z);
      tg.scale.setScalar(s);
      tg.rotation.y = 0.5;
      g.add(tg);
      turbines.push({ rotor, speed: 1.2 + Math.random() * 0.5 });
    }
    // control centre with live dashboard
    box(g, 7, 3.4, 4.5, mat('#ecf0f1'), -4, 1.7, 5);
    box(g, 7.4, 0.4, 4.9, mat('#34495e'), -4, 3.6, 5);
    const dash = canvasTexture(512, 256, () => {});
    const screen = add(g, new THREE.PlaneGeometry(6, 3), new THREE.MeshBasicMaterial({ map: dash.texture, toneMapped: false }), -4, 6, 7.3);
    screen.rotation.y = 0;
    box(g, 6.4, 3.4, 0.2, mat('#2c3e50'), -4, 6, 7.18);
    cyl(g, 0.12, 0.12, 2.4, 6, mat('#2c3e50'), -4, 4.2, 7.1);
    // data stream particles along a cable (Kafka!)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 1, -6), new THREE.Vector3(-1, 2.5, -3), new THREE.Vector3(6, 1.5, -8),
      new THREE.Vector3(9, 1, 4), new THREE.Vector3(2, 2.5, 6), new THREE.Vector3(-4, 3.6, 5),
    ]);
    add(g, new THREE.TubeGeometry(curve, 60, 0.06, 4), mat('#1b2631'));
    const packets = [];
    const pm = glow('#4cc9f0', 4);
    for (let i = 0; i < 18; i++) packets.push({ m: sph(g, 0.18, pm, 0, 0, 0, 0), o: i / 18 });
    const ctx = dash.ctx;
    let lastDraw = -1;
    const drawDash = (t) => {
      ctx.fillStyle = '#071521'; ctx.fillRect(0, 0, 512, 256);
      ctx.strokeStyle = 'rgba(76,201,240,0.15)'; ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.moveTo(0, i * 32); ctx.lineTo(512, i * 32); ctx.stroke(); }
      ctx.fillStyle = '#4cc9f0'; ctx.font = 'bold 22px Inter, sans-serif'; ctx.fillText('GRID LOAD · FORECAST', 16, 30);
      ctx.fillStyle = '#8be9a0'; ctx.font = '16px Inter, sans-serif'; ctx.fillText('10k+ events/min  ·  MLflow ✓', 16, 54);
      const f = (x) => 140 + Math.sin(x * 0.035 + t) * 40 + Math.sin(x * 0.11 + t * 1.7) * 14;
      ctx.lineWidth = 3; ctx.strokeStyle = '#ffffff'; ctx.beginPath();
      for (let x = 0; x <= 330; x += 6) ctx.lineTo(x + 10, f(x) + 50);
      ctx.stroke();
      ctx.setLineDash([8, 6]); ctx.strokeStyle = '#ffd166'; ctx.beginPath();
      for (let x = 330; x <= 500; x += 6) ctx.lineTo(x + 10, f(x) + 50);
      ctx.stroke(); ctx.setLineDash([]);
      // anomaly marker
      const ax = 220, ay = f(ax) + 50;
      ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.arc(ax + 10, ay, 7, 0, Math.PI * 2); ctx.fill();
      dash.texture.needsUpdate = true;
    };
    return {
      group: g,
      height: 24,
      update(t) {
        for (const tb of turbines) tb.rotor.rotation.z = -t * tb.speed;
        for (const p of packets) p.m.position.copy(curve.getPointAt((t * 0.08 + p.o) % 1));
        const step = Math.floor(t * 10);
        if (step !== lastDraw) { lastDraw = step; drawDash(t * 0.8); }
      },
    };
  },

  recycling() {
    const g = new THREE.Group();
    box(g, 18, 5, 14, mat('#b0b5ad'), 0, -2.15, 0);
    const bins = [['#2e7d32', -5], ['#1565c0', 0], ['#f9a825', 5]];
    for (const [c, x] of bins) {
      const b = new THREE.Group();
      const body = add(b, new THREE.CylinderGeometry(1.6, 1.3, 3.6, 4), mat(c), 0, 1.8, 0);
      body.rotation.y = Math.PI / 4;
      const lid = add(b, new THREE.CylinderGeometry(1.75, 1.75, 0.35, 4), mat(c, { roughness: 0.5 }), 0, 3.75, 0);
      lid.rotation.y = Math.PI / 4;
      box(b, 1.2, 0.2, 0.4, mat('#222'), 0, 3.9, 0);
      b.position.set(x, 0.35, -4);
      g.add(b);
    }
    // conveyor belt
    box(g, 13, 0.4, 2, mat('#2b2b2b'), 0, 1.6, 2.5);
    for (let i = -6; i <= 6; i += 2) {
      box(g, 0.3, 1.4, 0.3, mat('#666'), i, 0.9, 1.7);
      box(g, 0.3, 1.4, 0.3, mat('#666'), i, 0.9, 3.3);
    }
    // AI scanner arch
    box(g, 0.4, 4, 0.4, mat('#37474f'), 0, 2.2, 1.1);
    box(g, 0.4, 4, 0.4, mat('#37474f'), 0, 2.2, 3.9);
    box(g, 0.6, 0.6, 3.4, mat('#37474f'), 0, 4.2, 2.5);
    const laser = add(g, new THREE.PlaneGeometry(2.6, 2.4), new THREE.MeshBasicMaterial({ color: '#00ffa3', transparent: true, opacity: 0.25, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }), 0, 2.9, 2.5);
    laser.rotation.y = Math.PI / 2;
    box(g, 0.3, 0.3, 0.3, glow('#00ffa3', 4), 0, 3.85, 2.5);
    const itemColors = ['#2e7d32', '#1565c0', '#f9a825'];
    const items = [];
    for (let i = 0; i < 7; i++) {
      const type = i % 3;
      const geo = type === 0 ? new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8) : type === 1 ? new THREE.BoxGeometry(0.7, 0.5, 0.6) : new THREE.IcosahedronGeometry(0.38, 0);
      items.push({ m: add(g, geo, mat(itemColors[type])), o: i / 7, type });
    }
    // recycle sign
    const sign = canvasTexture(256, 256, (ctx) => {
      ctx.fillStyle = '#2e7d32'; ctx.beginPath(); ctx.arc(128, 128, 120, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = '170px "Segoe UI Symbol", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('♻', 128, 138);
    });
    const s = add(g, new THREE.CircleGeometry(1.6, 24), new THREE.MeshStandardMaterial({ map: sign.texture, transparent: true, side: THREE.DoubleSide }), -7.5, 5.5, -1);
    cyl(g, 0.1, 0.1, 4, 6, mat('#555'), -7.5, 2.2, -1.05);
    void s;
    return {
      group: g,
      height: 10,
      update(t) {
        laser.material.opacity = 0.18 + Math.sin(t * 8) * 0.08;
        for (const it of items) {
          const k = (t * 0.09 + it.o) % 1;
          const x = -6.2 + k * 12.4;
          it.m.position.set(x, 2.15, 2.5);
          it.m.rotation.y = t + it.o * 5;
          const passed = x > 0;
          it.m.material = passed ? mat(itemColors[it.type], { emissive: itemColors[it.type], emissiveIntensity: 0.6 }) : mat('#9e9e9e');
        }
      },
    };
  },

  crystal() {
    const g = new THREE.Group();
    // circle of monoliths
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const m = box(g, 1, 3.5 + (i % 3) * 0.6, 0.7, mat('#5d6d7e'), Math.cos(a) * 7, 1.8, Math.sin(a) * 7);
      m.rotation.y = -a;
      box(g, 0.12, 2, 0.75, glow('#b388ff', 2.2), Math.cos(a) * 6.95, 2, Math.sin(a) * 6.95).rotation.y = -a;
    }
    cyl(g, 3, 3.4, 0.6, 8, mat('#4a5568'), 0, 0.3, 0);
    const core = new THREE.Group();
    core.position.y = 7;
    const crystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(2, 0),
      new THREE.MeshPhysicalMaterial({ color: '#c8a8ff', emissive: '#7b2ff7', emissiveIntensity: 1.4, roughness: 0.1, metalness: 0.1, flatShading: true, transmission: 0, clearcoat: 1 })
    );
    crystal.scale.y = 1.5;
    core.add(crystal);
    const inner = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), glow('#4cc9f0', 5));
    core.add(inner);
    const rings = [];
    const electrons = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Group();
      const torus = new THREE.Mesh(new THREE.TorusGeometry(4 + i * 0.6, 0.05, 6, 64), glow(i === 1 ? '#4cc9f0' : '#b388ff', 3));
      ring.add(torus);
      const e = sph(ring, 0.28, glow('#ffffff', 4), 4 + i * 0.6, 0, 0, 1);
      electrons.push(e);
      ring.rotation.set(Math.PI / 2 + i * 0.7, i * 1.1, 0);
      core.add(ring);
      rings.push(ring);
    }
    g.add(core);
    const light = new THREE.PointLight('#a06bff', 40, 30, 1.5);
    light.position.y = 7;
    g.add(light);
    return {
      group: g,
      height: 14,
      update(t) {
        crystal.rotation.y = t * 0.5;
        inner.rotation.y = -t * 1.2;
        inner.rotation.x = t * 0.7;
        core.position.y = 7 + Math.sin(t * 1.3) * 0.5;
        rings.forEach((r, i) => { r.children[0].rotation.z = 0; r.rotation.z = t * (0.6 + i * 0.35); });
        light.intensity = 35 + Math.sin(t * 3) * 10;
      },
    };
  },

  observatory() {
    const g = new THREE.Group();
    cyl(g, 4, 4.4, 4, 16, mat('#eceff1'), 0, 2, 0);
    const dome = add(g, new THREE.SphereGeometry(4.1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#cfd8dc', { metalness: 0.5, roughness: 0.35 }), 0, 4, 0);
    box(g, 1.2, 3.5, 8.4, mat('#263238'), 0, 6, 0).rotation.z = 0.0;
    void dome;
    // two stereo camera rigs
    const target = new THREE.Group();
    const drone = new THREE.Group();
    box(drone, 1.2, 0.3, 1.2, mat('#ff6b6b'), 0, 0, 0);
    for (const [x, z] of [[-0.9, -0.9], [0.9, -0.9], [-0.9, 0.9], [0.9, 0.9]]) {
      cyl(drone, 0.5, 0.5, 0.05, 12, mat('#ddd', { transparent: true, opacity: 0.6 }), x, 0.2, z);
    }
    target.add(drone);
    g.add(target);
    const cams = [];
    for (const sx of [-1, 1]) {
      const c = new THREE.Group();
      cyl(c, 0.15, 0.2, 5, 6, mat('#455a64'), 0, 2.5, 0);
      const head = new THREE.Group();
      box(head, 0.9, 0.7, 1.3, mat('#212121'), 0, 0, 0);
      cyl(head, 0.3, 0.3, 0.4, 12, glow('#4cc9f0', 3), 0, 0, -0.8).rotation.x = Math.PI / 2;
      head.position.y = 5.3;
      c.add(head);
      c.position.set(sx * 8, 0, 4);
      g.add(c);
      const laserMat = new THREE.MeshBasicMaterial({ color: '#ff3b6b', transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
      const laser = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1, 4), laserMat);
      g.add(laser);
      cams.push({ c, head, laser });
    }
    // coordinate readout
    const label = canvasTexture(256, 64, () => {});
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: label.texture, depthWrite: false, transparent: true }));
    sprite.scale.set(5, 1.25, 1);
    g.add(sprite);
    const tmp = new THREE.Vector3(), tp = new THREE.Vector3(), hp = new THREE.Vector3();
    let lastDraw = -1;
    return {
      group: g,
      height: 14,
      update(t) {
        target.position.set(Math.sin(t * 0.5) * 6, 9 + Math.sin(t * 1.1) * 1.5, 6 + Math.cos(t * 0.4) * 3);
        target.rotation.y = t;
        tp.copy(target.position);
        for (const cm of cams) {
          hp.set(cm.c.position.x, 5.3, cm.c.position.z);
          cm.head.lookAt(tmp.copy(tp).applyMatrix4(g.matrixWorld));
          cm.head.rotateY(Math.PI);
          const dir = tmp.subVectors(tp, hp);
          const len = dir.length();
          cm.laser.position.copy(hp).addScaledVector(dir, 0.5);
          cm.laser.scale.y = len;
          cm.laser.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
        }
        sprite.position.copy(tp).add(new THREE.Vector3(0, 2, 0));
        const step = Math.floor(t * 6);
        if (step !== lastDraw) {
          lastDraw = step;
          const ctx = label.ctx;
          ctx.clearRect(0, 0, 256, 64);
          ctx.fillStyle = 'rgba(5,15,25,0.75)';
          ctx.fillRect(0, 0, 256, 64);
          ctx.fillStyle = '#4cc9f0'; ctx.font = 'bold 22px monospace'; ctx.textAlign = 'center';
          ctx.fillText(`${tp.x.toFixed(1)}, ${tp.y.toFixed(1)}, ${tp.z.toFixed(1)}`, 128, 40);
          label.texture.needsUpdate = true;
        }
      },
    };
  },

  birdnest() {
    const g = new THREE.Group();
    // stump & nest
    cyl(g, 2.2, 2.8, 3, 9, mat('#6d4c41'), 0, 1.5, 0);
    const nest = add(g, new THREE.TorusGeometry(2.2, 0.7, 6, 12), mat('#a1887f'), 0, 3.2, 0);
    nest.rotation.x = Math.PI / 2;
    const bird = new THREE.Group();
    const blue = mat('#1da1f2', { roughness: 0.5 });
    const body = sph(bird, 2, blue, 0, 0, 0, 1);
    body.scale.set(1.25, 1, 1);
    sph(bird, 1.35, blue, 1.9, 1.2, 0, 1);
    const beak = add(bird, new THREE.ConeGeometry(0.4, 1.1, 5), mat('#ffb300'), 3.4, 1.1, 0);
    beak.rotation.z = -Math.PI / 2;
    sph(bird, 0.28, mat('#ffffff'), 2.75, 1.6, 0.75, 0);
    sph(bird, 0.16, mat('#111'), 2.92, 1.62, 0.82, 0);
    sph(bird, 0.28, mat('#ffffff'), 2.75, 1.6, -0.75, 0);
    sph(bird, 0.16, mat('#111'), 2.92, 1.62, -0.82, 0);
    const wings = [];
    for (const s of [1, -1]) {
      const w = new THREE.Group();
      const wm = sph(w, 1.4, mat('#1a8cd8'), 0, 0, s * 1.2, 0);
      wm.scale.set(1.3, 0.35, 1);
      w.position.set(-0.2, 0.4, s * 1.2);
      bird.add(w);
      wings.push({ w, s });
    }
    const tail = add(bird, new THREE.ConeGeometry(0.9, 2, 4), blue, -2.6, 0.5, 0);
    tail.rotation.z = Math.PI / 2 + 0.4;
    bird.position.y = 5.2;
    g.add(bird);
    // sentiment bubbles
    const bubbles = [
      ['😊', '#2ecc71'], ['😡', '#e74c3c'], ['😐', '#95a5a6'], ['😍', '#2ecc71'], ['😢', '#e74c3c'],
    ].map(([e, c], i) => {
      const s = bubbleSprite(e, c);
      s.scale.setScalar(2.4);
      g.add(s);
      return { s, o: (i / 5) * Math.PI * 2 };
    });
    return {
      group: g,
      height: 13,
      update(t) {
        bird.rotation.y = Math.sin(t * 0.4) * 0.5;
        bird.position.y = 5.2 + Math.abs(Math.sin(t * 2)) * 0.15;
        for (const { w, s } of wings) w.rotation.x = s * (Math.sin(t * 6) * 0.25 - 0.1);
        for (const b of bubbles) {
          const a = b.o + t * 0.35;
          b.s.position.set(Math.cos(a) * 6.5, 8 + Math.sin(t * 1.5 + b.o) * 0.8, Math.sin(a) * 6.5);
        }
      },
    };
  },

  desert() {
    const g = new THREE.Group();
    // oasis pond
    const pond = add(g, new THREE.CircleGeometry(4, 20), new THREE.MeshStandardMaterial({ color: '#1fa3a3', roughness: 0.1, metalness: 0.2, emissive: '#0b4f5c', emissiveIntensity: 0.3 }), 2, 0.12, 2);
    pond.rotation.x = -Math.PI / 2;
    add(g, new THREE.RingGeometry(4, 4.8, 20), mat('#c9a66b'), 2, 0.1, 2).rotation.x = -Math.PI / 2;
    // weather station
    const st = new THREE.Group();
    cyl(st, 0.1, 0.12, 7, 6, mat('#b0bec5', { metalness: 0.6, roughness: 0.4 }), 0, 3.5, 0);
    const cups = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2;
      beam(cups, new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9), 0.03, mat('#90a4ae'));
      const cup = add(cups, new THREE.SphereGeometry(0.22, 8, 6, 0, Math.PI), mat('#eceff1'), Math.cos(a) * 0.9, 0, Math.sin(a) * 0.9);
      cup.rotation.y = -a;
    }
    cups.position.y = 7.1;
    st.add(cups);
    const vane = new THREE.Group();
    box(vane, 1.6, 0.06, 0.06, mat('#90a4ae'), 0, 0, 0);
    box(vane, 0.05, 0.5, 0.5, mat('#e53935'), -0.8, 0, 0);
    vane.position.y = 6.3;
    st.add(vane);
    const panel = box(st, 2, 0.08, 1.3, mat('#1a237e', { metalness: 0.6, roughness: 0.25 }), 0, 3.2, 0.9);
    panel.rotation.x = 0.6;
    box(st, 0.8, 1, 0.6, mat('#eceff1'), 0, 1.6, -0.2);
    st.position.set(-5, 0, -3);
    g.add(st);
    // bedouin tent
    const tent = add(g, new THREE.ConeGeometry(3.4, 3, 6, 1, true), mat('#b5651d', { side: THREE.DoubleSide }), -6, 1.5, 5);
    tent.rotation.y = 0.3;
    // rock arch
    const arch = add(g, new THREE.TorusGeometry(2.5, 0.8, 5, 10, Math.PI), mat('#c0773f'), 7, 0, -5);
    arch.rotation.y = 0.8;
    // floating heat-map tiles (climate variables)
    const tiles = [];
    const heat = ['#2b83ba', '#abdda4', '#ffffbf', '#fdae61', '#d7191c'];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const m = box(g, 1.1, 0.15, 1.1, glow(heat[(i + j) % 5], 0.8), -1.8 + i * 1.2, 8, -1.8 + j * 1.2);
      tiles.push({ m, i, j });
    }
    return {
      group: g,
      height: 12,
      update(t) {
        cups.rotation.y = t * 4;
        vane.rotation.y = Math.sin(t * 0.5) * 0.6;
        for (const tl of tiles) tl.m.position.y = 8 + Math.sin(t * 1.5 + tl.i * 0.7 + tl.j * 0.5) * 0.45;
      },
    };
  },

  medical() {
    const g = new THREE.Group();
    box(g, 12, 5, 9, mat('#cfd8dc'), 0, -2.2, 0);
    box(g, 8, 4.5, 5, mat('#fafafa'), -1, 2.5, -2);
    for (let i = 0; i < 4; i++) box(g, 1, 1, 0.1, mat('#81d4fa', { roughness: 0.2 }), -3.6 + i * 1.8, 3, 0.52);
    // red cross sign
    const cross = new THREE.Group();
    box(cross, 2.4, 0.8, 0.3, glow('#e53935', 1.8), 0, 0, 0);
    box(cross, 0.8, 2.4, 0.3, glow('#e53935', 1.8), 0, 0, 0);
    cross.position.set(-1, 6.3, -2);
    g.add(cross);
    // CT scanner ring with floating lungs
    const ring = add(g, new THREE.TorusGeometry(3, 0.7, 10, 32), mat('#eceff1', { roughness: 0.35 }), 4, 4, 3);
    ring.rotation.y = Math.PI / 2;
    box(g, 1.2, 2.6, 2.2, mat('#eceff1'), 4, 1.3, 3);
    const scan = add(g, new THREE.CircleGeometry(2.3, 32), new THREE.MeshBasicMaterial({ color: '#4cc9f0', transparent: true, opacity: 0.2, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }), 4, 4, 3);
    scan.rotation.y = Math.PI / 2;
    const lungs = new THREE.Group();
    const pink = mat('#f48fb1', { roughness: 0.6 });
    for (const s of [-1, 1]) {
      const l = sph(lungs, 0.9, pink, 0, 0, s * 0.75, 1);
      l.scale.set(0.8, 1.35, 0.7);
    }
    cyl(lungs, 0.15, 0.15, 1.3, 6, mat('#f8bbd0'), 0, 1.4, 0);
    const nodule = sph(lungs, 0.18, glow('#ffeb3b', 4), 0.35, 0.3, 0.9, 0);
    lungs.position.set(4, 4, 3);
    g.add(lungs);
    return {
      group: g,
      height: 10,
      update(t) {
        const k = Math.sin(t * 1.4);
        scan.position.x = 4 + k * 1.6;
        lungs.scale.setScalar(1 + Math.sin(t * 2.2) * 0.06);
        lungs.rotation.y = t * 0.3;
        nodule.material.emissiveIntensity = 2 + Math.max(0, 1 - Math.abs(scan.position.x - 4.3) * 2) * 6;
      },
    };
  },

  university() {
    const g = new THREE.Group();
    const stone = mat('#efe9dd'), stone2 = mat('#e2d9c6');
    box(g, 16, 5, 10, stone2, 0, -2.0, 0);
    box(g, 14, 0.5, 8.5, stone2, 0, 0.75, 0);
    box(g, 12, 6, 5, stone, 0, 4, -1.5);
    for (let i = 0; i < 6; i++) cyl(g, 0.38, 0.45, 5.5, 10, stone, -5 + i * 2, 3.75, 2.2);
    box(g, 12.4, 0.8, 1.6, stone2, 0, 6.9, 2.1);
    gableRoof(g, 12.6, 2.2, 1.8, stone, 0, 7.3, 2.1);
    box(g, 12, 0.5, 5, stone2, 0, 7.25, -1.5);
    add(g, new THREE.SphereGeometry(2.6, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat('#5d8aa8', { metalness: 0.4, roughness: 0.4 }), 0, 7.5, -1.5);
    box(g, 1.6, 2.8, 0.2, mat('#5d4037'), 0, 2.4, 1.0);
    // floating graduation cap
    const cap = new THREE.Group();
    box(cap, 3, 0.18, 3, mat('#1c1c1c'), 0, 0, 0);
    cyl(cap, 1.0, 1.1, 0.9, 12, mat('#1c1c1c'), 0, -0.5, 0);
    const tassel = beam(cap, new THREE.Vector3(0, 0.1, 0), new THREE.Vector3(1.4, -0.9, 1.4), 0.05, glow('#ffd166', 1.5));
    void tassel;
    sph(cap, 0.16, glow('#ffd166', 2), 1.4, -1, 1.4, 0);
    cap.position.y = 13.5;
    cap.rotation.y = 0.4;
    g.add(cap);
    return {
      group: g,
      height: 17,
      update(t) {
        cap.position.y = 13.5 + Math.sin(t * 1.2) * 0.5;
        cap.rotation.y = t * 0.4;
        cap.rotation.z = Math.sin(t * 0.9) * 0.08;
      },
    };
  },

  tower() {
    const g = new THREE.Group();
    const iron = mat('#7a5c44', { metalness: 0.45, roughness: 0.55 });
    box(g, 14, 5, 14, mat('#c8bba3'), 0, -2.2, 0);
    // legs (4 curved legs approximated in 3 stages)
    const stages = [
      [6, 0, 3.4, 6],
      [3.4, 6, 1.6, 12.5],
      [1.6, 12.5, 0.45, 22],
    ];
    for (const [r0, y0, r1, y1] of stages) {
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        const a = new THREE.Vector3(sx * r0, y0, sz * r0);
        const b = new THREE.Vector3(sx * r1, y1, sz * r1);
        beam(g, a, b, y0 === 0 ? 0.55 : y0 < 10 ? 0.38 : 0.25, iron);
        // lattice cross-braces
        const a2 = new THREE.Vector3(-sx * r0, y0, sz * r0);
        const b2 = new THREE.Vector3(-sx * r1, y1, sz * r1);
        beam(g, a, b2, 0.06, iron);
        void a2;
      }
    }
    // arches at the base
    for (let i = 0; i < 4; i++) {
      const arch = add(g, new THREE.TorusGeometry(3.6, 0.22, 4, 14, Math.PI), iron, 0, 2.3, 0);
      arch.rotation.y = (i * Math.PI) / 2;
      arch.position.set(Math.sin((i * Math.PI) / 2) * 4.7, 2.3, Math.cos((i * Math.PI) / 2) * 4.7);
      arch.scale.y = 0.75;
    }
    box(g, 8.2, 0.7, 8.2, iron, 0, 6, 0);
    box(g, 4, 0.5, 4, iron, 0, 12.5, 0);
    box(g, 1.4, 1, 1.4, iron, 0, 22.2, 0);
    cyl(g, 0.08, 0.15, 3, 6, iron, 0, 24.2, 0);
    // sparkle lights
    const n = 140;
    const pos = new Float32Array(n * 3);
    const lerp = (a, b, k) => a + (b - a) * k;
    for (let i = 0; i < n; i++) {
      const y = Math.random() * 22;
      const r = y < 6 ? lerp(6, 3.4, y / 6) : y < 12.5 ? lerp(3.4, 1.6, (y - 6) / 6.5) : lerp(1.6, 0.45, (y - 12.5) / 9.5);
      const side = Math.floor(Math.random() * 4);
      const tt = Math.random() * 2 - 1;
      const px = side < 2 ? (side ? r : -r) : tt * r;
      const pz = side < 2 ? tt * r : (side === 2 ? r : -r);
      pos[i * 3] = px; pos[i * 3 + 1] = y; pos[i * 3 + 2] = pz;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const sparkle = new THREE.Points(pg, new THREE.PointsMaterial({ color: '#fff4c8', size: 0.35, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false }));
    g.add(sparkle);
    const beacon = sph(g, 0.3, glow('#ffd166', 5), 0, 25.8, 0, 0);
    void beacon;
    return {
      group: g,
      height: 28,
      update(t) {
        const k = (t % 10);
        sparkle.material.opacity = k < 3 ? (0.5 + 0.5 * Math.sin(t * 40)) * 0.9 : 0;
        sparkle.rotation.y = Math.floor(t * 12) * 0.5 * 0; // keep sparkle static
      },
    };
  },

  temple() {
    const g = new THREE.Group();
    const white = mat('#f5f3ee');
    box(g, 20, 5, 14, mat('#d9d2c3'), 0, -2.15, 0);
    // big dome (Niemeyer-style)
    add(g, new THREE.SphereGeometry(5, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2.4), white, -4, 0.3, -1).scale.y = 0.8;
    // arcade building with arches
    box(g, 12, 0.8, 4, white, 4, 4.4, 3);
    for (let i = 0; i < 5; i++) {
      const arch = add(g, new THREE.TorusGeometry(1.1, 0.25, 4, 12, Math.PI), white, -0.8 + i * 2.4, 2.8, 4.8);
      arch.scale.y = 1.4;
      box(g, 0.5, 2.8, 0.5, white, -1.9 + i * 2.4, 1.6, 4.8);
    }
    box(g, 0.5, 2.8, 0.5, white, 10.1, 1.6, 4.8);
    box(g, 12, 3.6, 3, mat('#ebe6dc'), 4, 2.3, 2.2);
    // slender tower
    box(g, 1.6, 12, 1.6, white, 8, 6, -4);
    box(g, 2.2, 0.4, 2.2, mat('#2e7d32'), 8, 12.2, -4);
    const flag = new THREE.Group();
    cyl(flag, 0.05, 0.05, 3, 6, mat('#888'), 0, 1.5, 0);
    box(flag, 1.0, 1.0, 0.04, mat('#1b8a3a'), 0.5, 2.5, 0);
    box(flag, 1.0, 1.0, 0.04, mat('#ffffff'), 1.5, 2.5, 0);
    flag.position.set(8, 12.4, -4);
    g.add(flag);
    // floating book
    const book = new THREE.Group();
    const p1 = box(book, 1.6, 0.12, 2.2, mat('#fafafa'), -0.8, 0, 0); p1.rotation.z = 0.15;
    const p2 = box(book, 1.6, 0.12, 2.2, mat('#fafafa'), 0.8, 0, 0); p2.rotation.z = -0.15;
    box(book, 3.4, 0.08, 2.4, mat('#b388ff'), 0, -0.12, 0);
    book.position.set(-4, 8, -1);
    g.add(book);
    return {
      group: g,
      height: 16,
      update(t) {
        book.position.y = 8 + Math.sin(t * 1.1) * 0.4;
        book.rotation.y = t * 0.35;
      },
    };
  },
};

export function buildLandmark(type) {
  const b = builders[type] ?? builders.lighthouse;
  const res = b();
  res.group.traverse((o) => {
    if (o.isMesh && !(o.material && o.material.blending === THREE.AdditiveBlending)) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  return res;
}
