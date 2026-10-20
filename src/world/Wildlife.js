// Ambient archipelago life: flapping seagulls circling islands & floating
// navigation buoys that bob on the Gerstner waves.
import * as THREE from 'three';
import { sampleWater } from './waves.js';
import { mat, glow } from './landmarks.js';
import { categories } from '../data/portfolio.js';

export class Wildlife {
  constructor(scene, islands) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);

    this.gulls = [];
    this.buoys = [];

    this.buildSeagulls(islands);
    this.buildChannelBuoys(islands);
  }

  buildSeagulls(islands) {
    const white = mat('#fafafa', { roughness: 0.6 });
    const wingGeoL = new THREE.BoxGeometry(0.65, 0.04, 0.22);
    wingGeoL.translate(-0.32, 0, 0);
    const wingGeoR = new THREE.BoxGeometry(0.65, 0.04, 0.22);
    wingGeoR.translate(0.32, 0, 0);
    const bodyGeo = new THREE.ConeGeometry(0.11, 0.48, 5);
    bodyGeo.rotateX(Math.PI / 2);

    // Put 2-3 gulls around several islands
    islands.forEach((isl, idx) => {
      const count = idx === 0 ? 4 : 2;
      for (let i = 0; i < count; i++) {
        const bird = new THREE.Group();
        bird.add(new THREE.Mesh(bodyGeo, white));
        const wl = new THREE.Mesh(wingGeoL, white);
        const wr = new THREE.Mesh(wingGeoR, white);
        bird.add(wl, wr);
        this.group.add(bird);
        this.gulls.push({
          bird,
          wl,
          wr,
          cx: isl.cx,
          cz: isl.cz,
          radius: isl.radius * (0.75 + (i % 3) * 0.28),
          height: 16 + (idx % 4) * 3 + i * 2.2,
          speed: 0.35 + (idx % 3) * 0.08 + i * 0.05,
          phase: idx * 1.7 + i * 2.1,
          dir: i % 2 === 0 ? 1 : -1,
        });
      }
    });
  }

  buildChannelBuoys(islands) {
    const home = islands[0];
    // Place channel buoys partway toward main islands
    const targets = islands.filter((i) => i.id !== 'home');
    const steel = mat('#37474f', { metalness: 0.5, roughness: 0.45 });

    targets.forEach((isl, i) => {
      if (i % 2 !== 0) return; // keep ocean uncluttered
      const cat = categories[isl.category];
      const frac = 0.42;
      const bx = home.cx + (isl.cx - home.cx) * frac;
      const bz = home.cz + (isl.cz - home.cz) * frac;

      const buoy = new THREE.Group();
      const floatBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.48, 0.7, 10),
        mat(cat.color, { roughness: 0.45 })
      );
      floatBase.position.y = 0.1;
      buoy.add(floatBase);

      const cage = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.38, 1.3, 6), steel);
      cage.position.y = 1.05;
      buoy.add(cage);

      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), glow(cat.color, 3.5));
      beacon.position.y = 1.8;
      buoy.add(beacon);

      buoy.position.set(bx, 0, bz);
      this.group.add(buoy);
      this.buoys.push({ buoy, beacon, x: bx, z: bz, phase: i * 1.3 });
    });
  }

  update(t, camera) {
    for (const g of this.gulls) {
      if (Math.hypot(camera.position.x - g.cx, camera.position.z - g.cz) > 380) continue;
      const ang = t * g.speed * g.dir + g.phase;
      const x = g.cx + Math.cos(ang) * g.radius;
      const z = g.cz + Math.sin(ang) * g.radius;
      const y = g.height + Math.sin(t * 1.4 + g.phase) * 1.4;
      g.bird.position.set(x, y, z);
      g.bird.rotation.y = -ang + (g.dir > 0 ? 0 : Math.PI);
      g.bird.rotation.z = g.dir * 0.18;
      const flap = Math.sin(t * 7.5 + g.phase) * 0.42;
      g.wl.rotation.z = flap;
      g.wr.rotation.z = -flap;
    }

    for (const b of this.buoys) {
      if (Math.hypot(camera.position.x - b.x, camera.position.z - b.z) > 340) continue;
      const w = sampleWater(b.x, b.z, t);
      b.buoy.position.y = w.y;
      b.buoy.rotation.x = Math.sin(t * 1.8 + b.phase) * 0.16;
      b.buoy.rotation.z = Math.cos(t * 1.5 + b.phase) * 0.16;
      b.beacon.scale.setScalar(0.85 + 0.3 * Math.sin(t * 4 + b.phase));
    }
  }
}
