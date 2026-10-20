// Main entry point: 3D scene, camera controller, input & optimized render loop.
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

import { islands } from './data/portfolio.js';
import { waveState, setWaveIntensity } from './world/waves.js';
import { prepareIsland, setIslands, buildDepthTexture } from './world/terrain.js';
import { Environment } from './world/Environment.js';
import { Ocean } from './world/Ocean.js';
import { Islands } from './world/Islands.js';
import { Boat } from './world/Boat.js';
import { Wildlife } from './world/Wildlife.js';
import { SoundFX } from './audio/SoundFX.js';
import { UI } from './ui/UI.js';
import './style.css';

// ── 1. Prepare Island Geometry & Shared Depth Map ────────────────────────────
islands.forEach((isl, idx) => prepareIsland(isl, idx));
setIslands(islands);
const depthData = buildDepthTexture(islands);

// ── 2. Renderer, Scene & Cameras ─────────────────────────────────────────────
const canvas = document.getElementById('webgl');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.className = 'label-layer';
document.getElementById('canvas-wrap').appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.5, 4500);
camera.position.set(12, 11, 64);

// ── 3. World Entities ────────────────────────────────────────────────────────
const environment = new Environment(renderer, scene);
const ocean = new Ocean(renderer, scene, camera, depthData);
const islandWorld = new Islands(scene, islands);
const boat = new Boat(scene);
const wildlife = new Wildlife(scene, islands);
const sound = new SoundFX();

// ── 4. Camera State & Orbit Controls ─────────────────────────────────────────
const camState = {
  yawOffset: 0,
  pitchAngle: 0.34,
  distance: 21,
  currentPos: new THREE.Vector3(12, 11, 64),
  currentLook: new THREE.Vector3(0, 2, 20),
  dragging: false,
  dragMoved: false,
  lastX: 0,
  lastY: 0,
  dockedIsland: null,
  dockOrbitAngle: 0,
};

// ── 5. UI & Navigation Callbacks ─────────────────────────────────────────────
let nearestIsland = islands[0];
let nearestDist = Infinity;

function dockAtIsland(isl, teleport = false) {
  if (!isl) return;
  boat.setAutopilot(null);
  ui.setAutopilotBanner(null);

  if (teleport) {
    const faceAngle = isl.dockAngle + Math.PI;
    boat.teleportTo(isl.moor, faceAngle);
  } else {
    // Gently slow the boat near dock
    boat.velocity.multiplyScalar(0.15);
  }

  camState.dockedIsland = isl;
  camState.dockOrbitAngle = isl.dockAngle + 0.55;
  sound.playDockChime();
  ui.showIslandDetails(isl);
}

function undock() {
  camState.dockedIsland = null;
  ui.hideIslandDetails();
}

const ui = new UI({
  onSelectIsland(isl, mode) {
    if (mode === 'cancel' || !isl) {
      boat.setAutopilot(null);
      ui.setAutopilotBanner(null);
      return;
    }
    if (mode === 'dock') {
      dockAtIsland(isl, true);
    } else if (mode === 'sail') {
      undock();
      boat.setAutopilot(isl.moor, isl);
      ui.setAutopilotBanner(isl);
    }
  },
  onUndock() {
    undock();
  },
  onChangeTime(presetId) {
    environment.setTimePreset(presetId);
    renderer.toneMappingExposure = presetId === 'night' ? 0.68 : presetId === 'sunset' ? 0.9 : 0.95;
  },
  onChangeWaves(intensity) {
    setWaveIntensity(intensity);
    ocean.refreshWaves();
  },
  onToggleAudio() {
    return sound.toggle();
  },
});

boat.onAutopilotArrive = (isl) => {
  ui.setAutopilotBanner(null);
  dockAtIsland(isl, false);
};

// Make floating 3D island labels clickable
islandWorld.items.forEach((it) => {
  it.labelEl.style.pointerEvents = 'auto';
  it.labelEl.addEventListener('click', (e) => {
    e.stopPropagation();
    const d = Math.hypot(boat.position.x - it.data.cx, boat.position.z - it.data.cz);
    if (d < it.data.radius + 36) {
      dockAtIsland(it.data, false);
    } else {
      undock();
      boat.setAutopilot(it.data.moor, it.data);
      ui.setAutopilotBanner(it.data);
    }
  });
});

// ── 6. Keyboard, Mouse & Touch Input ─────────────────────────────────────────
const keys = new Set();

window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  keys.add(k);

  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) {
    e.preventDefault();
  }

  // Undock if user starts driving with WASD / Arrows
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
    if (camState.dockedIsland) undock();
  }

  if (k === 'e' || k === 'enter') {
    if (camState.dockedIsland) {
      undock();
    } else if (nearestIsland && nearestDist < nearestIsland.radius + 32) {
      dockAtIsland(nearestIsland, false);
    }
  } else if (k === 'escape') {
    if (!document.getElementById('cv-modal').classList.contains('hidden')) {
      document.getElementById('cv-modal').classList.add('hidden');
    } else if (ui.atlasOpen) {
      ui.toggleAtlas(false);
    } else if (camState.dockedIsland) {
      undock();
    } else if (boat.autopilot) {
      boat.setAutopilot(null);
      ui.setAutopilotBanner(null);
    }
  } else if (k === 'm') {
    ui.toggleAtlas();
  }
});

window.addEventListener('keyup', (e) => {
  keys.delete(e.key.toLowerCase());
});

// Mouse camera orbit + 3D click raycasting on islands
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

canvas.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  camState.dragging = true;
  camState.dragMoved = false;
  camState.lastX = e.clientX;
  camState.lastY = e.clientY;
});

window.addEventListener('pointermove', (e) => {
  if (!camState.dragging) return;
  const dx = e.clientX - camState.lastX;
  const dy = e.clientY - camState.lastY;
  if (Math.hypot(dx, dy) > 4) camState.dragMoved = true;
  camState.lastX = e.clientX;
  camState.lastY = e.clientY;

  camState.yawOffset -= dx * 0.0055;
  camState.dockOrbitAngle -= dx * 0.0055;
  camState.pitchAngle = THREE.MathUtils.clamp(camState.pitchAngle + dy * 0.004, 0.14, 1.05);
});

window.addEventListener('pointerup', (e) => {
  if (!camState.dragging) return;
  camState.dragging = false;

  // If it was a clean click (not a drag), check if user clicked an island in 3D
  if (!camState.dragMoved) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(islandWorld.pickables, true);
    if (hits.length > 0) {
      let obj = hits[0].object;
      while (obj && !obj.userData.islandId) obj = obj.parent;
      if (obj && obj.userData.islandId) {
        const isl = islands.find((i) => i.id === obj.userData.islandId);
        if (isl) {
          const d = Math.hypot(boat.position.x - isl.cx, boat.position.z - isl.cz);
          if (d < isl.radius + 36) {
            dockAtIsland(isl, false);
          } else {
            undock();
            boat.setAutopilot(isl.moor, isl);
            ui.setAutopilotBanner(isl);
          }
        }
      }
    }
  }
});

canvas.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    camState.distance = THREE.MathUtils.clamp(camState.distance + e.deltaY * 0.018, 11, 52);
  },
  { passive: false }
);

// Touch Virtual Joystick
const touchInput = { x: 0, y: 0, active: false, boost: false };
const joyZone = document.getElementById('joystick-zone');
const joyStick = document.getElementById('joystick-stick');

if (joyZone && joyStick) {
  const handleJoy = (clientX, clientY) => {
    const rect = joyZone.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = rect.width * 0.38;
    let dx = clientX - cx;
    let dy = clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > maxR) {
      dx = (dx / dist) * maxR;
      dy = (dy / dist) * maxR;
    }
    joyStick.style.transform = `translate(${dx}px, ${dy}px)`;
    touchInput.x = dx / maxR;
    touchInput.y = -dy / maxR;
  };

  joyZone.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    touchInput.active = true;
    joyZone.setPointerCapture(e.pointerId);
    if (camState.dockedIsland) undock();
    handleJoy(e.clientX, e.clientY);
  });
  joyZone.addEventListener('pointermove', (e) => {
    if (!touchInput.active) return;
    handleJoy(e.clientX, e.clientY);
  });
  const resetJoy = () => {
    touchInput.active = false;
    touchInput.x = 0;
    touchInput.y = 0;
    joyStick.style.transform = 'translate(0px, 0px)';
  };
  joyZone.addEventListener('pointerup', resetJoy);
  joyZone.addEventListener('pointercancel', resetJoy);

  const btnBoost = document.getElementById('touch-boost');
  btnBoost.addEventListener('pointerdown', () => (touchInput.boost = true));
  btnBoost.addEventListener('pointerup', () => (touchInput.boost = false));
  btnBoost.addEventListener('pointerleave', () => (touchInput.boost = false));

  document.getElementById('touch-dock').addEventListener('click', () => {
    if (camState.dockedIsland) undock();
    else if (nearestIsland) dockAtIsland(nearestIsland, nearestDist > nearestIsland.radius + 32);
  });
}

// ── 7. Resize Handling ───────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
  ocean.setSize(w, h);
});

// Hide loading screen once everything is initialized
const loaderEl = document.getElementById('loader');
if (loaderEl) {
  setTimeout(() => loaderEl.classList.add('fade-out'), 250);
  setTimeout(() => loaderEl.remove(), 950);
}

// ── 8. Main Animation Loop ───────────────────────────────────────────────────
const clock = new THREE.Clock();
const desiredCamPos = new THREE.Vector3();
const desiredCamLook = new THREE.Vector3();
const rightVec = new THREE.Vector3();
const reflectionExcludes = [boat.sprayPoints, boat.targetMarker, wildlife.group];

function animate() {
  requestAnimationFrame(animate);

  const dt = Math.min(clock.getDelta(), 0.05);
  const elapsed = clock.elapsedTime;
  waveState.time = elapsed;

  // Read steering & throttle input
  let throttle = 0;
  let steer = 0;
  if (keys.has('w') || keys.has('arrowup') || keys.has('z')) throttle += 1;
  if (keys.has('s') || keys.has('arrowdown')) throttle -= 1;
  if (keys.has('a') || keys.has('arrowleft') || keys.has('q')) steer -= 1;
  if (keys.has('d') || keys.has('arrowright')) steer += 1;

  if (touchInput.active) {
    throttle = touchInput.y;
    steer = touchInput.x;
  }

  boat.throttle = THREE.MathUtils.clamp(throttle, -1, 1);
  boat.steer = THREE.MathUtils.clamp(steer, -1, 1);
  boat.boost = keys.has('shift') || touchInput.boost;

  // Gently recenter camera yaw behind boat while driving if not dragging mouse
  if (!camState.dragging && Math.abs(boat.throttle) > 0.1) {
    camState.yawOffset = THREE.MathUtils.lerp(camState.yawOffset, 0, dt * 1.4);
  }

  // Update boat physics & wake
  boat.update(dt, elapsed);
  ocean.setWake(boat.wake);

  // Find nearest island
  nearestDist = Infinity;
  for (const it of islandWorld.items) {
    const d = Math.hypot(boat.position.x - it.data.cx, boat.position.z - it.data.cz);
    if (d < nearestDist) {
      nearestDist = d;
      nearestIsland = it.data;
    }
    // Fade labels based on distance so the horizon stays clean (avoid redundant DOM writes)
    const camDist = Math.hypot(camera.position.x - it.data.cx, camera.position.z - it.data.cz);
    const visible = camDist < 360 && (!camState.dockedIsland || camState.dockedIsland.id !== it.data.id);
    const nextOpacity = visible
      ? Math.round(THREE.MathUtils.clamp(1 - (camDist - 180) / 180, 0.25, 1) * 20) / 20
      : 0;
    if (it._lastOpacity !== nextOpacity) {
      it._lastOpacity = nextOpacity;
      it.labelEl.style.opacity = String(nextOpacity);
    }
    const isNear = d < it.data.radius + 32;
    if (it._lastNear !== isNear) {
      it._lastNear = isNear;
      it.labelEl.classList.toggle('is-near', isNear);
    }
  }

  // Update Camera
  if (camState.dockedIsland) {
    // Cinematic orbit around the docked island's landmark (shifted slightly so island sits on left of drawer)
    const isl = camState.dockedIsland;
    if (!camState.dragging) camState.dockOrbitAngle += dt * 0.18;
    const orbitR = isl.radius * 1.35 + 14;
    const h = isl.plateauH + 11;
    desiredCamPos.set(
      isl.cx + Math.cos(camState.dockOrbitAngle) * orbitR,
      h,
      isl.cz + Math.sin(camState.dockOrbitAngle) * orbitR
    );
    // Offset look target slightly to the right so the island frames nicely beside the right-side drawer
    rightVec.set(-Math.sin(camState.dockOrbitAngle), 0, Math.cos(camState.dockOrbitAngle));
    desiredCamLook.set(isl.cx, isl.plateauH + 4.5, isl.cz).addScaledVector(rightVec, 7.5);
  } else {
    // Smooth spring-arm follow camera behind the boat
    const camAngle = boat.heading + Math.PI + camState.yawOffset;
    const horizDist = Math.cos(camState.pitchAngle) * camState.distance;
    const vertDist = Math.sin(camState.pitchAngle) * camState.distance;

    desiredCamPos.set(
      boat.position.x + Math.sin(camAngle) * horizDist,
      Math.max(2.2, boat.position.y + vertDist),
      boat.position.z + Math.cos(camAngle) * horizDist
    );
    desiredCamLook.set(
      boat.position.x + Math.sin(boat.heading) * 4.5,
      boat.position.y + 1.8,
      boat.position.z + Math.cos(boat.heading) * 4.5
    );
  }

  const smooth = 1 - Math.exp(-6.5 * dt);
  camState.currentPos.lerp(desiredCamPos, smooth);
  camState.currentLook.lerp(desiredCamLook, smooth);
  camera.position.copy(camState.currentPos);
  camera.lookAt(camState.currentLook);

  // Update environment, islands, wildlife, ocean & UI
  environment.update(dt, boat.position);
  islandWorld.update(elapsed, dt, camera);
  wildlife.update(elapsed, camera);
  ocean.update(elapsed, environment.sunDir, environment.sunColor, environment.fog);
  sound.update(elapsed, boat.speedKnots);
  ui.update(boat, nearestIsland, nearestDist);

  // Render planar water reflection then main scene directly with hardware MSAA
  ocean.renderReflection(reflectionExcludes);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();
