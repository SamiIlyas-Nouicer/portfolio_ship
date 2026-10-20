// Sky, radiant sun disc & corona halo, dramatic golden-hour lighting,
// high-sharpness shadow frustum, PMREM IBL, fog & low-draw-call clouds.
import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { seededRandom } from './terrain.js';

function createSunGlowTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 128);
  g.addColorStop(0.0, 'rgba(255, 252, 235, 1.0)');
  g.addColorStop(0.14, 'rgba(255, 230, 165, 0.85)');
  g.addColorStop(0.38, 'rgba(255, 180, 95, 0.28)');
  g.addColorStop(0.7, 'rgba(255, 140, 60, 0.06)');
  g.addColorStop(1.0, 'rgba(255, 120, 40, 0.0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export class Environment {
  constructor(renderer, scene) {
    this.renderer = renderer;
    this.scene = scene;

    this.sunElevation = 16.5; // degrees
    this.sunAzimuth = 212;
    this.sunDir = new THREE.Vector3();
    this.sunColor = new THREE.Color(1.0, 0.91, 0.76);

    // ── Atmospheric Sky ──
    this.sky = new Sky();
    this.sky.scale.setScalar(9000);
    const u = this.sky.material.uniforms;
    u.turbidity.value = 3.8;
    u.rayleigh.value = 1.55;
    u.mieCoefficient.value = 0.0045;
    u.mieDirectionalG.value = 0.88;
    scene.add(this.sky);

    // ── Radiant Sun Disc & Corona Halo Sprite ──
    this.sunSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createSunGlowTexture(),
        color: 0xffe8b8,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      })
    );
    this.sunSprite.scale.setScalar(620);
    scene.add(this.sunSprite);

    // ── Directional Sun & Hemisphere Sky/Sea Bounce Lights ──
    this.sun = new THREE.DirectionalLight(this.sunColor, 4.1);
    this.sun.castShadow = true;
    // 1536x1536 with a tight 92m frustum gives sharper close shadows at 44% less GPU cost than 2048
    this.sun.shadow.mapSize.set(1536, 1536);
    const sc = this.sun.shadow.camera;
    sc.left = -46;
    sc.right = 46;
    sc.top = 46;
    sc.bottom = -46;
    sc.near = 10;
    sc.far = 320;
    this.sun.shadow.bias = -0.00035;
    this.sun.shadow.normalBias = 0.03;
    scene.add(this.sun);
    scene.add(this.sun.target);

    // Azure sky dome + turquoise ocean bounce light for rich shadow contrast
    this.hemi = new THREE.HemisphereLight(0x9ad4ff, 0x1e5652, 0.82);
    scene.add(this.hemi);

    this.fog = new THREE.FogExp2(0xc9d8e2, 0.00125);
    scene.fog = this.fog;

    this.updateSun();
    this.bakeEnvironment();
    this.buildClouds();
  }

  updateSun() {
    const phi = THREE.MathUtils.degToRad(90 - this.sunElevation);
    const theta = THREE.MathUtils.degToRad(this.sunAzimuth);
    this.sunDir.setFromSphericalCoords(1, phi, theta);
    this.sky.material.uniforms.sunPosition.value.copy(this.sunDir);
  }

  setTimePreset(preset) {
    const u = this.sky.material.uniforms;
    if (preset === 'noon') {
      this.sunElevation = 44;
      this.sunAzimuth = 195;
      this.sunColor.setRGB(1.0, 0.98, 0.92);
      this.sun.intensity = 4.4;
      this.hemi.color.setHex(0xb8e2ff);
      this.hemi.groundColor.setHex(0x216b68);
      this.hemi.intensity = 0.92;
      this.sunSprite.material.color.setHex(0xffffff);
      this.sunSprite.visible = true;
      u.turbidity.value = 2.8;
      u.rayleigh.value = 1.15;
    } else if (preset === 'sunset') {
      this.sunElevation = 5.0;
      this.sunAzimuth = 245;
      this.sunColor.setRGB(1.0, 0.58, 0.30);
      this.sun.intensity = 3.4;
      this.hemi.color.setHex(0xffb085);
      this.hemi.groundColor.setHex(0x2b2438);
      this.hemi.intensity = 0.62;
      this.sunSprite.material.color.setHex(0xff944d);
      this.sunSprite.visible = true;
      u.turbidity.value = 8.2;
      u.rayleigh.value = 2.6;
    } else if (preset === 'night') {
      this.sunElevation = -3.5;
      this.sunAzimuth = 240;
      this.sunColor.setRGB(0.38, 0.54, 0.86);
      this.sun.intensity = 1.15;
      this.hemi.color.setHex(0x2d4673);
      this.hemi.groundColor.setHex(0x0b1929);
      this.hemi.intensity = 0.42;
      this.sunSprite.visible = false;
      u.turbidity.value = 1.8;
      u.rayleigh.value = 0.45;
    } else {
      // 'golden' default
      this.sunElevation = 16.5;
      this.sunAzimuth = 212;
      this.sunColor.setRGB(1.0, 0.91, 0.76);
      this.sun.intensity = 4.1;
      this.hemi.color.setHex(0x9ad4ff);
      this.hemi.groundColor.setHex(0x1e5652);
      this.hemi.intensity = 0.82;
      this.sunSprite.material.color.setHex(0xffe8b8);
      this.sunSprite.visible = true;
      u.turbidity.value = 3.8;
      u.rayleigh.value = 1.55;
    }
    this.sun.color.copy(this.sunColor);
    this.updateSun();
    this.bakeEnvironment();
  }

  bakeEnvironment() {
    const r = this.renderer;
    try {
      const pmrem = new THREE.PMREMGenerator(r);
      const skyScene = new THREE.Scene();
      const skyClone = new Sky();
      skyClone.scale.setScalar(9000);
      skyClone.material.uniforms = THREE.UniformsUtils.clone(this.sky.material.uniforms);
      skyScene.add(skyClone);
      const rt = pmrem.fromScene(skyScene, 0, 1, 20000);
      this.scene.environment = rt.texture;
      this.scene.environmentIntensity = 0.82;
      pmrem.dispose();
    } catch (e) {
      console.warn('PMREM bake skipped:', e);
    }

    if (this.sunElevation < 0) {
      this.fog.color.set('#0b172a');
    } else if (this.sunElevation < 8) {
      this.fog.color.set('#d98a6c');
    } else if (this.sunElevation < 25) {
      this.fog.color.set('#cedce6');
    } else {
      this.fog.color.set('#b8d6ec');
    }
    this.horizonColor = this.fog.color.clone();
  }

  buildClouds() {
    const rand = seededRandom(424242);
    const base = new THREE.IcosahedronGeometry(1, 1);
    const allClouds = [];
    for (let i = 0; i < 24; i++) {
      const ang = rand() * Math.PI * 2;
      const dist = 320 + rand() * 820;
      const cx = Math.cos(ang) * dist;
      const cy = 95 + rand() * 80;
      const cz = Math.sin(ang) * dist;
      const sc = 1 + rand() * 1.4;
      const n = 5 + Math.floor(rand() * 4);
      for (let k = 0; k < n; k++) {
        const g = base.clone();
        const s = (4 + rand() * 6) * sc;
        g.scale(s, s * (0.55 + rand() * 0.2), s);
        g.translate(
          cx + (rand() - 0.5) * 24 * sc,
          cy + rand() * 3.5 * sc,
          cz + (rand() - 0.5) * 12 * sc
        );
        allClouds.push(g);
      }
    }
    // Merge all clouds into ONE single geometry = 1 draw call instead of 34!
    const merged = mergeGeometries(allClouds);
    merged.computeVertexNormals();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.95,
      flatShading: true,
      emissive: 0xa8bed4,
      emissiveIntensity: 0.32,
    });
    this.clouds = new THREE.Mesh(merged, mat);
    this.clouds.frustumCulled = false;
    this.scene.add(this.clouds);
  }

  update(dt, focus) {
    const d = this.sunDir;
    const texel = 92 / 1536;
    const tx = Math.round(focus.x / texel) * texel;
    const tz = Math.round(focus.z / texel) * texel;
    this.sun.target.position.set(tx, 0, tz);
    this.sun.position.set(tx + d.x * 160, d.y * 160, tz + d.z * 160);

    // Keep sky dome, sun halo & cloud ring centered on viewer
    this.sky.position.set(focus.x, 0, focus.z);
    this.sunSprite.position.set(
      focus.x + d.x * 2600,
      d.y * 2600,
      focus.z + d.z * 2600
    );
    this.clouds.rotation.y += dt * 0.0025;
    this.clouds.position.set(focus.x, 0, focus.z);
  }
}
