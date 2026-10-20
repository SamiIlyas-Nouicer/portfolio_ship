// 3D Pirate Brigantine ("The Black Data Corsair") with multi-point Gerstner
// buoyancy physics, broadside cannons, twin square-rigged masts, crow's nest,
// stern gallery lanterns, Jolly Roger flag, wake trail & bow spray.
import * as THREE from 'three';
import { sampleWater, GRAVITY } from './waves.js';
import { terrainHeight, terrainNormal } from './terrain.js';
import { mat, glow } from './landmarks.js';

// Hull pontoon sample points in boat-local coordinates (+Z is forward, +Y is up)
const PONTOONS = [
  { pos: new THREE.Vector3(0.0, -0.35, 3.4), area: 0.9 },    // bow tip
  { pos: new THREE.Vector3(-1.05, -0.42, 1.8), area: 1.15 }, // bow port
  { pos: new THREE.Vector3(1.05, -0.42, 1.8), area: 1.15 },  // bow starboard
  { pos: new THREE.Vector3(-1.35, -0.45, 0.0), area: 1.35 }, // mid port
  { pos: new THREE.Vector3(1.35, -0.45, 0.0), area: 1.35 },  // mid starboard
  { pos: new THREE.Vector3(-1.15, -0.42, -2.0), area: 1.25 },// stern port
  { pos: new THREE.Vector3(1.15, -0.42, -2.0), area: 1.25 }, // stern starboard
  { pos: new THREE.Vector3(0.0, -0.48, -2.7), area: 1.0 },   // stern center
];

const SPRAY_COUNT = 90;

function makeJollyRogerTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 160;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#141210';
  ctx.fillRect(0, 0, 256, 160);

  // Crossed bones
  ctx.strokeStyle = '#efe6d5';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(65, 125);
  ctx.lineTo(190, 35);
  ctx.moveTo(65, 35);
  ctx.lineTo(190, 125);
  ctx.stroke();

  // Skull cranium
  ctx.fillStyle = '#efe6d5';
  ctx.beginPath();
  ctx.arc(128, 70, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(112, 88, 32, 22);

  // Eye sockets & nose
  ctx.fillStyle = '#141210';
  ctx.beginPath();
  ctx.arc(116, 68, 7, 0, Math.PI * 2);
  ctx.arc(140, 68, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(128, 76);
  ctx.lineTo(123, 86);
  ctx.lineTo(133, 86);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class Boat {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.position = new THREE.Vector3(8, 0.3, 46);
    this.velocity = new THREE.Vector3();
    this.heading = -Math.PI * 0.85;
    this.yawRate = 0;
    this.pitch = 0;
    this.pitchRate = 0;
    this.roll = 0;
    this.rollRate = 0;

    this.throttle = 0;
    this.steer = 0;
    this.boost = false;
    this.speedKnots = 0;
    this.autopilot = null;

    this.wake = [];
    this.wakeTimer = 0;
    this.sails = [];

    this.buildMesh();
    this.buildSpray();
    this.group.position.copy(this.position);
    scene.add(this.group);
  }

  buildMesh() {
    this.hullGroup = new THREE.Group();
    this.group.add(this.hullGroup);

    const darkOak = mat('#352012', { roughness: 0.82 });
    const charredTimber = mat('#1c110a', { roughness: 0.85 });
    const weatheredPlank = mat('#6e4b2e', { roughness: 0.85 });
    const copperBottom = mat('#4e2718', { roughness: 0.7 });
    const tarnishedGold = mat('#c89b3c', { metalness: 0.65, roughness: 0.35 });
    const cannonIron = mat('#22252a', { metalness: 0.75, roughness: 0.4 });
    const ropeMat = mat('#8c6d46', { roughness: 0.9 });
    const lanternGlow = glow('#ffae42', 4.0);
    const cabinGlass = mat('#ffb74d', {
      roughness: 0.2,
      emissive: '#ff9800',
      emissiveIntensity: 1.2,
    });

    // ── Sculpted Galleon/Brigantine Hull (with raised stern castle) ──
    const stations = [
      // [z, halfWidthTop, halfWidthChine, deckY, chineY, keelY]
      [-3.15, 1.12, 0.85, 1.38, 0.12, -0.38], // high poop-deck transom
      [-2.15, 1.32, 1.08, 1.28, 0.02, -0.48], // quarterdeck
      [-1.05, 1.44, 1.20, 0.74, -0.05, -0.54],// main waist
      [0.45,  1.40, 1.14, 0.74, -0.04, -0.52],// midship
      [1.75,  1.06, 0.76, 0.86, 0.04, -0.44], // forecastle
      [2.85,  0.48, 0.25, 1.05, 0.22, -0.25], // bow flare
      [3.65,  0.05, 0.02, 1.22, 0.52, 0.16],  // stempost
    ];

    const buildHullBand = (upper, material) => {
      const pos = [];
      const pushTri = (a, b, c) => pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
      const pushQuad = (a, b, c, d) => { pushTri(a, b, c); pushTri(a, c, d); };

      for (let i = 0; i < stations.length - 1; i++) {
        const s0 = stations[i], s1 = stations[i + 1];
        for (const side of [-1, 1]) {
          const p0Top = [side * s0[1], s0[3], s0[0]];
          const p0Chine = [side * s0[2], s0[4], s0[0]];
          const p0Keel = [0, s0[5], s0[0]];
          const p1Top = [side * s1[1], s1[3], s1[0]];
          const p1Chine = [side * s1[2], s1[4], s1[0]];
          const p1Keel = [0, s1[5], s1[0]];

          if (upper) {
            if (side === 1) pushQuad(p0Chine, p1Chine, p1Top, p0Top);
            else pushQuad(p0Top, p1Top, p1Chine, p0Chine);
          } else {
            if (side === 1) pushQuad(p0Keel, p1Keel, p1Chine, p0Chine);
            else pushQuad(p0Chine, p1Chine, p1Keel, p0Keel);
          }
        }
      }
      const st = stations[0];
      if (upper) {
        pushQuad([-st[1], st[3], st[0]], [-st[2], st[4], st[0]], [st[2], st[4], st[0]], [st[1], st[3], st[0]]);
      } else {
        pushTri([-st[2], st[4], st[0]], [0, st[5], st[0]], [st[2], st[4], st[0]]);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.computeVertexNormals();
      const m = new THREE.Mesh(g, material);
      m.castShadow = m.receiveShadow = true;
      return m;
    };

    this.hullGroup.add(buildHullBand(true, darkOak));
    this.hullGroup.add(buildHullBand(false, copperBottom));

    // Heavy black wales & golden ochre trim stripe along the hull
    for (const side of [-1, 1]) {
      const gunwalePts = stations.map((s) => new THREE.Vector3(side * (s[1] + 0.03), s[3] + 0.03, s[0]));
      const gunwale = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(gunwalePts), 24, 0.065, 6, false),
        charredTimber
      );
      this.hullGroup.add(gunwale);

      const goldPts = stations.map((s) => new THREE.Vector3(side * (s[1] * 0.96 + 0.02), s[3] - 0.14, s[0]));
      const goldTrim = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(goldPts), 24, 0.032, 5, false),
        tarnishedGold
      );
      this.hullGroup.add(goldTrim);
    }

    // Weathered plank deck
    const deckPos = [];
    for (let i = 0; i < stations.length - 1; i++) {
      const s0 = stations[i], s1 = stations[i + 1];
      const y0 = s0[3] - 0.08, y1 = s1[3] - 0.08;
      deckPos.push(
        -s0[1] * 0.94, y0, s0[0],
        s0[1] * 0.94, y0, s0[0],
        s1[1] * 0.94, y1, s1[0],
        -s0[1] * 0.94, y0, s0[0],
        s1[1] * 0.94, y1, s1[0],
        -s1[1] * 0.94, y1, s1[0]
      );
    }
    const deckGeo = new THREE.BufferGeometry();
    deckGeo.setAttribute('position', new THREE.Float32BufferAttribute(deckPos, 3));
    deckGeo.computeVertexNormals();
    const deckMesh = new THREE.Mesh(deckGeo, weatheredPlank);
    deckMesh.receiveShadow = true;
    this.hullGroup.add(deckMesh);

    // ── Quarterdeck Captain's Cabin & Stern Gallery ──
    const cabin = new THREE.Group();
    cabin.position.set(0, 0.72, -2.05);
    const qDeck = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.62, 1.95), darkOak);
    qDeck.position.set(0, 0.25, 0);
    qDeck.castShadow = true;
    cabin.add(qDeck);

    const qRoof = new THREE.Mesh(new THREE.BoxGeometry(2.24, 0.1, 2.05), weatheredPlank);
    qRoof.position.set(0, 0.58, 0);
    cabin.add(qRoof);

    // Ornate carved golden stern gallery windows
    for (const x of [-0.6, 0, 0.6]) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.34, 0.08), cabinGlass);
      win.position.set(x, 0.28, -0.98);
      cabin.add(win);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.4, 0.06), tarnishedGold);
      frame.position.set(x, 0.28, -0.97);
      cabin.add(frame);
    }

    // Twin wrought-iron stern pirate lanterns
    for (const sx of [-0.85, 0.85]) {
      const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.55, 6), cannonIron);
      strut.rotation.x = -0.5;
      strut.position.set(sx, 0.75, -1.08);
      cabin.add(strut);
      const lantern = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), lanternGlow);
      lantern.position.set(sx, 0.92, -1.22);
      cabin.add(lantern);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.16, 6), tarnishedGold);
      cap.position.set(sx, 1.08, -1.22);
      cabin.add(cap);
    }

    // Spoked Wooden Ship's Helm Wheel on the Quarterdeck
    this.helmWheel = new THREE.Group();
    this.helmWheel.position.set(0, 0.92, -0.35);
    const wheelRim = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.035, 6, 16), darkOak);
    this.helmWheel.add(wheelRim);
    for (let i = 0; i < 8; i++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.72, 5), tarnishedGold);
      spoke.rotation.z = (i * Math.PI) / 4;
      this.helmWheel.add(spoke);
    }
    cabin.add(this.helmWheel);
    const binnacle = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 0.45, 8), darkOak);
    binnacle.position.set(0, 0.72, -0.42);
    cabin.add(binnacle);

    this.cabinLight = new THREE.PointLight('#ffaa33', 6, 12, 1.5);
    this.cabinLight.position.set(0, 1.1, -1.35);
    cabin.add(this.cabinLight);

    this.hullGroup.add(cabin);

    // ── 6 Broadside Iron Cannons (3 port, 3 starboard) ──
    for (const side of [-1, 1]) {
      for (const zPos of [-0.65, 0.25, 1.15]) {
        const cannon = new THREE.Group();
        const carriage = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.18, 0.24), darkOak);
        cannon.add(carriage);
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.095, 0.62, 8), cannonIron);
        barrel.rotation.z = -side * (Math.PI / 2 - 0.08);
        barrel.position.set(side * 0.22, 0.08, 0);
        cannon.add(barrel);
        cannon.position.set(side * 1.18, 0.76, zPos);
        this.hullGroup.add(cannon);
      }
    }

    // ── Bowsprit & Golden Carved Figurehead ──
    const sprit = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.09, 2.3, 7), charredTimber);
    sprit.rotation.x = Math.PI / 2 - 0.28;
    sprit.position.set(0, 1.38, 4.35);
    this.hullGroup.add(sprit);

    const figurehead = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.75, 5), tarnishedGold);
    figurehead.rotation.x = Math.PI / 2 - 0.15;
    figurehead.position.set(0, 1.05, 3.85);
    this.hullGroup.add(figurehead);

    // ── Twin Square-Rigged Pirate Masts (Mainmast & Foremast) ──
    const sailCanvasMat = mat('#e8d7b4', {
      side: THREE.DoubleSide,
      roughness: 0.85,
      flatShading: false,
      emissive: '#3d2712',
      emissiveIntensity: 0.1,
    });
    const crimsonStripeMat = mat('#8c1d1d', {
      side: THREE.DoubleSide,
      roughness: 0.85,
      flatShading: false,
    });

    const buildSquareSail = (width, height, isCrimson = false) => {
      const segU = 12, segV = 8;
      const geo = new THREE.PlaneGeometry(width, height, segU, segV);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = (pos.getX(i) / width) + 0.5;
        const v = (pos.getY(i) / height) + 0.5;
        const belly = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * (0.38 * width * 0.35);
        pos.setZ(i, belly);
      }
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, isCrimson ? crimsonStripeMat : sailCanvasMat);
      mesh.castShadow = true;
      this.sails.push({
        geo,
        rest: Float32Array.from(pos.array),
        width,
        height,
      });
      return mesh;
    };

    const buildMast = (zPos, mastHeight, scale) => {
      const mg = new THREE.Group();
      mg.position.set(0, 0.7, zPos);
      // Slight pirate rake backward
      mg.rotation.x = -0.05;

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * scale, 0.12 * scale, mastHeight, 8), charredTimber);
      pole.position.y = mastHeight / 2;
      pole.castShadow = true;
      mg.add(pole);

      // Crow's nest bucket
      const nest = new THREE.Mesh(new THREE.CylinderGeometry(0.32 * scale, 0.24 * scale, 0.38, 10), darkOak);
      nest.position.y = mastHeight * 0.72;
      mg.add(nest);

      // Rope shrouds to port & starboard gunwales
      for (const side of [-1, 1]) {
        const shroudPts = [
          new THREE.Vector3(side * 1.25, 0.05, -0.2),
          new THREE.Vector3(side * 0.22 * scale, mastHeight * 0.7, 0),
        ];
        const shroud = new THREE.Mesh(
          new THREE.TubeGeometry(new THREE.LineCurve3(shroudPts[0], shroudPts[1]), 4, 0.02, 4, false),
          ropeMat
        );
        mg.add(shroud);
      }

      // Lower course square sail & yardarm
      const lowerYard = new THREE.Group();
      lowerYard.position.set(0, mastHeight * 0.36, 0.08);
      const yard1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2 * scale, 7), charredTimber);
      yard1.rotation.z = Math.PI / 2;
      yard1.position.y = 1.05 * scale;
      lowerYard.add(yard1);
      lowerYard.add(buildSquareSail(3.0 * scale, 2.0 * scale, false));
      mg.add(lowerYard);

      // Upper topsail & yardarm (crimson corsair canvas on mainmast)
      const upperYard = new THREE.Group();
      upperYard.position.set(0, mastHeight * 0.76, 0.08);
      const yard2 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.3 * scale, 7), charredTimber);
      yard2.rotation.z = Math.PI / 2;
      yard2.position.y = 0.75 * scale;
      upperYard.add(yard2);
      upperYard.add(buildSquareSail(2.15 * scale, 1.45 * scale, scale >= 1));
      mg.add(upperYard);

      this.hullGroup.add(mg);
      return { mg, lowerYard, upperYard };
    };

    this.mainMast = buildMast(-0.35, 7.2, 1.0);
    this.foreMast = buildMast(1.65, 5.9, 0.82);

    // ── Jolly Roger Flag atop the Mainmast ──
    const flagGeo = new THREE.PlaneGeometry(1.45, 0.9, 10, 4);
    flagGeo.translate(-0.725, 0, 0);
    this.jollyRoger = new THREE.Mesh(
      flagGeo,
      new THREE.MeshBasicMaterial({
        map: makeJollyRogerTexture(),
        side: THREE.DoubleSide,
      })
    );
    this.jollyRoger.position.set(0, 7.35, 0);
    this.jollyRoger.rotation.y = Math.PI / 2;
    this.mainMast.mg.add(this.jollyRoger);
    this.flagRest = Float32Array.from(flagGeo.attributes.position.array);

    // Rudder at Stern
    this.rudder = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.85, 0.55), charredTimber);
    this.rudder.position.set(0, -0.22, -3.25);
    this.hullGroup.add(this.rudder);

    // Compass/Chart target marker in the water (Golden X-marks-the-spot ring)
    const ringGeo = new THREE.RingGeometry(1.7, 2.3, 32);
    ringGeo.rotateX(-Math.PI / 2);
    this.targetMarker = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({
        color: '#d4a038',
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    this.targetMarker.visible = false;
    this.scene.add(this.targetMarker);
  }

  buildSpray() {
    this.sprayPositions = new Float32Array(SPRAY_COUNT * 3);
    this.sprayVelocities = Array.from({ length: SPRAY_COUNT }, () => new THREE.Vector3());
    this.sprayLife = new Float32Array(SPRAY_COUNT);
    this.sprayCursor = 0;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.sprayPositions, 3));
    const matSpray = new THREE.PointsMaterial({
      color: '#f5efe2',
      size: 0.42,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    this.sprayPoints = new THREE.Points(geo, matSpray);
    this.sprayPoints.frustumCulled = false;
    this.scene.add(this.sprayPoints);
  }

  spawnSpray(worldPos, vel, count = 2) {
    for (let i = 0; i < count; i++) {
      const idx = this.sprayCursor;
      this.sprayCursor = (this.sprayCursor + 1) % SPRAY_COUNT;
      this.sprayPositions[idx * 3] = worldPos.x + (Math.random() - 0.5) * 0.5;
      this.sprayPositions[idx * 3 + 1] = worldPos.y + 0.15;
      this.sprayPositions[idx * 3 + 2] = worldPos.z + (Math.random() - 0.5) * 0.5;
      this.sprayVelocities[idx].set(
        vel.x + (Math.random() - 0.5) * 3.5,
        2.2 + Math.random() * 2.6,
        vel.z + (Math.random() - 0.5) * 3.5
      );
      this.sprayLife[idx] = 0.55 + Math.random() * 0.35;
    }
  }

  setAutopilot(targetVec2, island = null) {
    if (!targetVec2) {
      this.autopilot = null;
      this.targetMarker.visible = false;
      return;
    }
    this.autopilot = {
      target: targetVec2.clone(),
      island,
    };
    this.targetMarker.visible = true;
  }

  teleportTo(targetVec2, headingAngle = 0) {
    this.setAutopilot(null);
    this.position.set(targetVec2.x, 0.35, targetVec2.y);
    this.velocity.set(0, 0, 0);
    this.heading = headingAngle;
    this.yawRate = 0;
    this.pitch = 0;
    this.roll = 0;
    this.wake.length = 0;
  }

  update(dt, time) {
    const clampedDt = Math.min(dt, 0.05);

    let throttleInput = this.throttle;
    let steerInput = this.steer;
    let boostActive = this.boost;

    if (Math.abs(throttleInput) > 0.05 || Math.abs(steerInput) > 0.05) {
      if (this.autopilot) this.setAutopilot(null);
    } else if (this.autopilot) {
      const dx = this.autopilot.target.x - this.position.x;
      const dz = this.autopilot.target.y - this.position.z;
      const dist = Math.hypot(dx, dz);

      this.targetMarker.position.set(
        this.autopilot.target.x,
        sampleWater(this.autopilot.target.x, this.autopilot.target.y, time).y + 0.25,
        this.autopilot.target.y
      );
      this.targetMarker.scale.setScalar(1 + Math.sin(time * 4) * 0.15);

      if (dist < 4.5) {
        this.velocity.multiplyScalar(0.88);
        if (dist < 2.5 || this.velocity.length() < 0.8) {
          const arrivedIsland = this.autopilot.island;
          this.setAutopilot(null);
          if (arrivedIsland && this.onAutopilotArrive) {
            this.onAutopilotArrive(arrivedIsland);
          }
        }
      } else {
        const desiredHeading = Math.atan2(dx, dz);
        let diff = desiredHeading - this.heading;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        steerInput = THREE.MathUtils.clamp(diff * 1.4, -1, 1);
        throttleInput = dist > 22 ? 1.0 : THREE.MathUtils.clamp(dist / 22, 0.28, 0.85);
        boostActive = dist > 55 && Math.abs(diff) < 0.5;
      }
    }

    const forward = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));
    const right = new THREE.Vector3(Math.cos(this.heading), 0, -Math.sin(this.heading));

    const qRot = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(this.pitch, this.heading, this.roll, 'YXZ')
    );

    let netForceY = -GRAVITY * 1.0;
    let netTorquePitch = 0;
    let netTorqueRoll = 0;
    let submergedCount = 0;
    let avgWaterVx = 0;
    let avgWaterVz = 0;

    const pWorld = new THREE.Vector3();
    for (let i = 0; i < PONTOONS.length; i++) {
      const pt = PONTOONS[i];
      pWorld.copy(pt.pos).applyQuaternion(qRot).add(this.position);
      const w = sampleWater(pWorld.x, pWorld.z, time);
      const depth = w.y - pWorld.y;

      avgWaterVx += w.vx;
      avgWaterVz += w.vz;

      if (depth > 0) {
        submergedCount++;
        const sub = Math.min(depth / 0.85, 1.6);
        const localVy =
          this.velocity.y -
          this.pitchRate * pt.pos.z +
          this.rollRate * pt.pos.x;
        const relVy = w.vy - localVy;
        const fBuoy = (sub * 3.15 + relVy * 0.52) * pt.area;
        netForceY += fBuoy;
        netTorquePitch -= pt.pos.z * fBuoy * 0.42;
        netTorqueRoll -= pt.pos.x * fBuoy * 0.65;
      }
    }
    avgWaterVx /= PONTOONS.length;
    avgWaterVz /= PONTOONS.length;

    this.velocity.y += netForceY * clampedDt;
    this.velocity.y *= Math.exp(-3.2 * clampedDt);
    this.position.y += this.velocity.y * clampedDt;

    const centerWaterY = sampleWater(this.position.x, this.position.z, time).y;
    if (this.position.y < centerWaterY - 0.35) {
      this.position.y = centerWaterY - 0.35;
      if (this.velocity.y < 0) this.velocity.y *= 0.2;
    }

    const forwardSpeed = this.velocity.dot(forward);
    const maxThrust = boostActive ? 29.0 : 19.5;
    const thrust = throttleInput * (throttleInput >= 0 ? maxThrust : 11.0);

    this.velocity.addScaledVector(forward, thrust * clampedDt);
    this.velocity.x += (avgWaterVx * 0.12 - this.velocity.x * 0.05) * clampedDt;
    this.velocity.z += (avgWaterVz * 0.12 - this.velocity.z * 0.05) * clampedDt;

    const newForwardSpeed =
      this.velocity.dot(forward) * Math.exp(-0.78 * clampedDt) -
      this.velocity.dot(forward) * Math.abs(this.velocity.dot(forward)) * 0.012 * clampedDt;
    const newLateralSpeed = this.velocity.dot(right) * Math.exp(-5.5 * clampedDt);

    this.velocity.x = forward.x * newForwardSpeed + right.x * newLateralSpeed;
    this.velocity.z = forward.z * newForwardSpeed + right.z * newLateralSpeed;

    const speedFactor = THREE.MathUtils.clamp(Math.abs(forwardSpeed) / 6.5, 0.35, 1.25);
    const reverseSign = forwardSpeed < -0.5 ? -1 : 1;
    const targetYawRate = -steerInput * 1.65 * speedFactor * reverseSign;
    this.yawRate = THREE.MathUtils.lerp(this.yawRate, targetYawRate, 1 - Math.exp(-6.5 * clampedDt));
    this.heading += this.yawRate * clampedDt;

    const thrustPitch = -THREE.MathUtils.clamp(thrust * 0.0045 + forwardSpeed * 0.004, -0.05, 0.14);
    const turnRoll = -this.yawRate * THREE.MathUtils.clamp(forwardSpeed * 0.018, -0.18, 0.22);

    this.pitchRate += (netTorquePitch - (this.pitch - thrustPitch) * 14.0 - this.pitchRate * 4.2) * clampedDt;
    this.rollRate += (netTorqueRoll - (this.roll - turnRoll) * 16.0 - this.rollRate * 4.5) * clampedDt;
    this.pitch = THREE.MathUtils.clamp(this.pitch + this.pitchRate * clampedDt, -0.38, 0.38);
    this.roll = THREE.MathUtils.clamp(this.roll + this.rollRate * clampedDt, -0.45, 0.45);

    this.position.x += this.velocity.x * clampedDt;
    this.position.z += this.velocity.z * clampedDt;

    // Shoreline & Terrain Collision
    const th = terrainHeight(this.position.x, this.position.z);
    const minWaterDepth = -0.22;
    if (th > minWaterDepth) {
      const n = terrainNormal(this.position.x, this.position.z, new THREE.Vector3());
      const pushDir = new THREE.Vector2(n.x, n.z);
      if (pushDir.lengthSq() > 1e-4) {
        pushDir.normalize();
        const penetration = Math.min(th - minWaterDepth, 2.5);
        this.position.x += pushDir.x * penetration * 1.4;
        this.position.z += pushDir.y * penetration * 1.4;
        const vn = this.velocity.x * pushDir.x + this.velocity.z * pushDir.y;
        if (vn < 0) {
          this.velocity.x -= (1.35 * vn) * pushDir.x;
          this.velocity.z -= (1.35 * vn) * pushDir.y;
          this.velocity.multiplyScalar(0.75);
        }
      }
    }

    const maxDist = 520;
    const dCenter = Math.hypot(this.position.x, this.position.z);
    if (dCenter > maxDist) {
      const pull = (dCenter - maxDist) * 0.5;
      this.position.x -= (this.position.x / dCenter) * pull;
      this.position.z -= (this.position.z / dCenter) * pull;
    }

    this.group.position.copy(this.position);
    this.group.rotation.order = 'YXZ';
    this.group.rotation.set(this.pitch, this.heading, this.roll);

    const horizontalSpeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.speedKnots = horizontalSpeed * 1.45;
    this.rudder.rotation.y = steerInput * 0.55;
    this.helmWheel.rotation.z = -steerInput * 1.8;

    // Yardarms brace slightly into the turn
    const yardAngle = steerInput * 0.22 + Math.sin(time * 0.9) * 0.04;
    this.mainMast.lowerYard.rotation.y = yardAngle;
    this.mainMast.upperYard.rotation.y = yardAngle * 1.1;
    this.foreMast.lowerYard.rotation.y = yardAngle;
    this.foreMast.upperYard.rotation.y = yardAngle * 1.1;

    // Billowing square sails
    const billow = 0.65 + Math.min(horizontalSpeed / 10, 0.95);
    for (const s of this.sails) {
      const pos = s.geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const rx = s.rest[i * 3];
        const ry = s.rest[i * 3 + 1];
        const rz = s.rest[i * 3 + 2];
        const ripple = Math.sin(time * 5.2 + rx * 2.5 - ry * 1.8) * 0.045 * (rz / 0.4);
        pos.setZ(i, rz * billow + ripple);
      }
      pos.needsUpdate = true;
    }

    // Jolly Roger flag wave
    const pPos = this.jollyRoger.geometry.attributes.position;
    for (let i = 0; i < pPos.count; i++) {
      const x = this.flagRest[i * 3];
      const y = this.flagRest[i * 3 + 1];
      pPos.setZ(i, Math.sin(time * 8.5 + x * 4.2 + y) * 0.16 * Math.abs(x));
    }
    pPos.needsUpdate = true;

    // Wake Trail & Bow Spray
    for (let i = this.wake.length - 1; i >= 0; i--) {
      this.wake[i].age += clampedDt;
      if (this.wake[i].age > 9.5) this.wake.splice(i, 1);
    }
    this.wakeTimer += clampedDt;
    const sternX = this.position.x - forward.x * 2.7;
    const sternZ = this.position.z - forward.z * 2.7;
    const lastWake = this.wake[0];
    const movedDist = lastWake ? Math.hypot(sternX - lastWake.x, sternZ - lastWake.z) : 99;
    if ((movedDist > 1.35 || this.wakeTimer > 0.22) && horizontalSpeed > 0.6) {
      this.wakeTimer = 0;
      this.wake.unshift({
        x: sternX,
        z: sternZ,
        age: 0,
        strength: THREE.MathUtils.clamp(horizontalSpeed / 9.5, 0.25, 1.35),
      });
      if (this.wake.length > 46) this.wake.pop();
    }

    if (horizontalSpeed > 4.2 && submergedCount > 0) {
      const bowWorld = new THREE.Vector3(0, 0.1, 3.2).applyMatrix4(this.group.matrixWorld);
      const sideSign = Math.random() < 0.5 ? -1 : 1;
      const sprayVel = new THREE.Vector3()
        .copy(right)
        .multiplyScalar(sideSign * (2.0 + horizontalSpeed * 0.22))
        .addScaledVector(forward, horizontalSpeed * 0.35);
      this.spawnSpray(bowWorld, sprayVel, horizontalSpeed > 11 ? 2 : 1);
    }

    for (let i = 0; i < SPRAY_COUNT; i++) {
      if (this.sprayLife[i] > 0) {
        this.sprayLife[i] -= clampedDt;
        const v = this.sprayVelocities[i];
        v.y -= GRAVITY * 1.15 * clampedDt;
        this.sprayPositions[i * 3] += v.x * clampedDt;
        this.sprayPositions[i * 3 + 1] += v.y * clampedDt;
        this.sprayPositions[i * 3 + 2] += v.z * clampedDt;
        if (this.sprayLife[i] <= 0 || this.sprayPositions[i * 3 + 1] < -1) {
          this.sprayPositions[i * 3 + 1] = -999;
        }
      } else {
        this.sprayPositions[i * 3 + 1] = -999;
      }
    }
    this.sprayPoints.geometry.attributes.position.needsUpdate = true;
  }
}
