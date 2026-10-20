// Pirate Captain's HUD: Engraved Sea Chart, Rotating Ship's Helm Wheel,
// Parchment Captain's Logbook, Archipelago Gazetteer & Admiralty Dossier.
import { profile, categories, islands } from '../data/portfolio.js';

const SVG_DEFS = `
  <svg width="0" height="0" style="position:absolute;pointer-events:none" aria-hidden="true">
    <defs>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff0b8" />
        <stop offset="38%" stop-color="#dfb252" />
        <stop offset="72%" stop-color="#9e6f1a" />
        <stop offset="100%" stop-color="#f2cd74" />
      </linearGradient>
      <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="50%" stop-color="#c9d3dc" />
        <stop offset="100%" stop-color="#7c8a96" />
      </linearGradient>
      <linearGradient id="crimson-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d93838" />
        <stop offset="100%" stop-color="#6b1010" />
      </linearGradient>
    </defs>
  </svg>
`;

const ICONS = {
  // Ornate Crowned Fouled-Anchor & Compass Medallion for the Captain's Brand
  crest: `<svg viewBox="0 0 36 36" width="28" height="28">
    <circle cx="18" cy="18" r="16" fill="#231208" stroke="url(#gold-grad)" stroke-width="1.8" stroke-dasharray="3 1.5"/>
    <circle cx="18" cy="18" r="13" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.2"/>
    <path d="M18 5 L20 11 L18 9.5 L16 11 Z" fill="url(#gold-grad)"/>
    <circle cx="18" cy="9.5" r="2.3" fill="none" stroke="url(#gold-grad)" stroke-width="1.6"/>
    <line x1="18" y1="12" x2="18" y2="27" stroke="url(#gold-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="12" y1="15.5" x2="24" y2="15.5" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M10.5 20.5 C10.5 26 14 28.5 18 28.5 C22 28.5 25.5 26 25.5 20.5" fill="none" stroke="url(#gold-grad)" stroke-width="2.1" stroke-linecap="round"/>
    <polygon points="8.5,21.5 10.5,18 13,21.5" fill="url(#gold-grad)"/>
    <polygon points="27.5,21.5 25.5,18 23,21.5" fill="url(#gold-grad)"/>
    <path d="M14 13 C16 17 20 19 20 23 C20 25 16 26 15 24" fill="none" stroke="#f5e6c4" stroke-width="1.1" stroke-dasharray="2 1"/>
  </svg>`,

  //Fouled Anchor with Rope
  anchor: `<svg viewBox="0 0 28 28" width="20" height="20">
    <circle cx="14" cy="5.5" r="2.4" fill="none" stroke="url(#gold-grad)" stroke-width="2"/>
    <line x1="14" y1="8" x2="14" y2="23" stroke="url(#gold-grad)" stroke-width="2.3" stroke-linecap="round"/>
    <line x1="8.5" y1="11.5" x2="19.5" y2="11.5" stroke="url(#gold-grad)" stroke-width="2.1" stroke-linecap="round"/>
    <path d="M6.5 17 C6.5 22 10 24.5 14 24.5 C18 24.5 21.5 22 21.5 17" fill="none" stroke="url(#gold-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <polygon points="4.5,18 6.8,14.5 9.2,18" fill="url(#gold-grad)"/>
    <polygon points="23.5,18 21.2,14.5 18.8,18" fill="url(#gold-grad)"/>
    <path d="M11 9.5 C16 13 17.5 17 12 20" fill="none" stroke="#f5e6c4" stroke-width="1.2"/>
  </svg>`,

  // 8-Point Gilded Compass Rose
  compass: `<svg viewBox="0 0 28 28" width="21" height="21">
    <circle cx="14" cy="14" r="11.5" fill="none" stroke="url(#gold-grad)" stroke-width="1.3" stroke-dasharray="2 1.5"/>
    <circle cx="14" cy="14" r="8.5" fill="rgba(20,10,4,0.55)" stroke="url(#gold-grad)" stroke-width="1"/>
    <polygon points="14,1.5 16.5,11.5 14,9.5 11.5,11.5" fill="#d93838"/>
    <polygon points="14,26.5 16.5,16.5 14,18.5 11.5,16.5" fill="url(#gold-grad)"/>
    <polygon points="1.5,14 11.5,11.5 9.5,14 11.5,16.5" fill="url(#gold-grad)"/>
    <polygon points="26.5,14 16.5,11.5 18.5,14 16.5,16.5" fill="url(#gold-grad)"/>
    <polygon points="5.5,5.5 12.5,11 11,12.5" fill="#b88932"/>
    <polygon points="22.5,5.5 17,12.5 15.5,11" fill="#b88932"/>
    <polygon points="5.5,22.5 11,15.5 12.5,17" fill="#b88932"/>
    <polygon points="22.5,22.5 15.5,17 17,15.5" fill="#b88932"/>
    <circle cx="14" cy="14" r="2.1" fill="#fff0b8" stroke="#2a1508" stroke-width="1"/>
  </svg>`,

  // Crossed Pirate Cutlasses & Heraldic Shield
  swords: `<svg viewBox="0 0 28 28" width="21" height="21">
    <path d="M5 4 C10 5 16 11 21 19 L19 20.5 C13 13 8 8 4 6 Z" fill="url(#silver-grad)"/>
    <path d="M23 4 C18 5 12 11 7 19 L9 20.5 C15 13 20 8 24 6 Z" fill="url(#silver-grad)"/>
    <path d="M18.5 18 C21 17 23.5 19.5 22 22.5 C20.5 24 18 22.5 17.5 21" fill="none" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="17" y1="20" x2="22.5" y2="17" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M9.5 18 C7 17 4.5 19.5 6 22.5 C7.5 24 10 22.5 10.5 21" fill="none" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="11" y1="20" x2="5.5" y2="17" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <polygon points="14,9 18,12 16.5,18 14,20 11.5,18 10,12" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.3"/>
    <circle cx="14" cy="14" r="1.5" fill="url(#gold-grad)"/>
  </svg>`,

  // Brass Navigator's Sextant & Clockwork Gear
  sextant: `<svg viewBox="0 0 28 28" width="21" height="21">
    <circle cx="14" cy="6" r="2.5" fill="#231208" stroke="url(#gold-grad)" stroke-width="1.8"/>
    <path d="M4.5 19.5 A11.5 11.5 0 0 0 23.5 19.5" fill="none" stroke="url(#gold-grad)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M6.5 17.5 A9.5 9.5 0 0 0 21.5 17.5" fill="none" stroke="#f5e6c4" stroke-width="1" stroke-dasharray="1.5 1.5"/>
    <line x1="14" y1="7.5" x2="6" y2="21" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="7.5" x2="22" y2="21" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="14" y1="7.5" x2="16.5" y2="24" stroke="url(#silver-grad)" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="7" y="12.5" width="14" height="2.2" rx="1" fill="url(#gold-grad)"/>
    <circle cx="16.5" cy="23.5" r="1.8" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1"/>
  </svg>`,

  // Vellum Scroll, Wax Seal & Feather Quill
  scroll: `<svg viewBox="0 0 28 28" width="21" height="21">
    <path d="M7 5 H19 A2.5 2.5 0 0 1 21.5 7.5 V20.5 A2.5 2.5 0 0 1 19 23 H8 A2.5 2.5 0 0 1 5.5 20.5 V7.5 A2.5 2.5 0 0 1 8 5 Z" fill="#ebd5a7" stroke="url(#gold-grad)" stroke-width="1.5"/>
    <line x1="9" y1="9.5" x2="17.5" y2="9.5" stroke="#5c3818" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="13" x2="16.5" y2="13" stroke="#5c3818" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="9" y1="16.5" x2="14" y2="16.5" stroke="#5c3818" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="18" cy="19.5" r="3.4" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.2"/>
    <path d="M23.5 3.5 C19.5 6 17.5 11 16 15.5 L19.5 13 C22 10.5 24 7 23.5 3.5 Z" fill="#fffdf7" stroke="url(#gold-grad)" stroke-width="1"/>
  </svg>`,

  // Celestial Sun & Crescent Moon Dial
  sun: `<svg viewBox="0 0 28 28" width="19" height="19">
    <g stroke="url(#gold-grad)" stroke-width="1.8" stroke-linecap="round">
      <line x1="14" y1="2" x2="14" y2="5"/>
      <line x1="14" y1="23" x2="14" y2="26"/>
      <line x1="2" y1="14" x2="5" y2="14"/>
      <line x1="23" y1="14" x2="26" y2="14"/>
      <line x1="5.5" y1="5.5" x2="7.8" y2="7.8"/>
      <line x1="20.2" y1="20.2" x2="22.5" y2="22.5"/>
      <line x1="22.5" y1="5.5" x2="20.2" y2="7.8"/>
      <line x1="7.8" y1="20.2" x2="5.5" y2="22.5"/>
    </g>
    <circle cx="14" cy="14" r="6" fill="url(#gold-grad)" stroke="#2a1508" stroke-width="1"/>
    <path d="M15.5 9.5 A4.5 4.5 0 0 0 15.5 18.5 A5 5 0 0 1 15.5 9.5 Z" fill="#2a1508" opacity="0.45"/>
  </svg>`,

  // Engraved Cresting Swell in Brass Ring
  waves: `<svg viewBox="0 0 28 28" width="19" height="19">
    <circle cx="14" cy="14" r="11.5" fill="rgba(16,32,44,0.6)" stroke="url(#gold-grad)" stroke-width="1.5"/>
    <path d="M4 13.5 C6.5 10 9.5 10 12 13 C14.5 16 17.5 16 20 12.5 C21.5 10.5 23 11 24 12.5" fill="none" stroke="url(#gold-grad)" stroke-width="2" stroke-linecap="round"/>
    <path d="M4.5 18.5 C7 15.5 10 15.5 12.5 18 C15 20.5 18 20.5 20.5 17.5 C22 16 23 16.5 23.5 17.5" fill="none" stroke="#f5e6c4" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  // Cast-Bronze Ship's Bell
  bell: `<svg viewBox="0 0 28 28" width="19" height="19">
    <path d="M10 4 H18" stroke="url(#gold-grad)" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M14 4 V6.5" stroke="url(#gold-grad)" stroke-width="2"/>
    <path d="M14 6.5 C9.5 6.5 7.5 10 7 15.5 L5 19.5 H23 L21 15.5 C20.5 10 18.5 6.5 14 6.5 Z" fill="url(#gold-grad)" stroke="#2a1508" stroke-width="1.2"/>
    <line x1="7" y1="16.5" x2="21" y2="16.5" stroke="#5c3818" stroke-width="1.3"/>
    <circle cx="14" cy="22" r="2.3" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.2"/>
  </svg>`,

  // Wax-Sealed Royal Commission Dossier
  dossier: `<svg viewBox="0 0 28 28" width="21" height="21">
    <rect x="3.5" y="5.5" width="21" height="17" rx="2" fill="#ebd5a7" stroke="url(#gold-grad)" stroke-width="1.6"/>
    <path d="M4 6.5 L14 15 L24 6.5" fill="none" stroke="#5c3818" stroke-width="1.5"/>
    <circle cx="14" cy="14.5" r="4.2" fill="url(#crimson-grad)" stroke="url(#gold-grad)" stroke-width="1.3"/>
    <polygon points="14,11.8 14.9,13.6 16.8,13.9 15.4,15.2 15.8,17 14,16 12.2,17 12.6,15.2 11.2,13.9 13.1,13.6" fill="url(#gold-grad)"/>
  </svg>`,

  wheel: `<svg viewBox="0 0 100 100" width="56" height="56"><circle cx="50" cy="50" r="32" fill="none" stroke="#c89b3c" stroke-width="6"/><circle cx="50" cy="50" r="24" fill="none" stroke="#5c3818" stroke-width="3"/><g stroke="#c89b3c" stroke-width="4" stroke-linecap="round"><line x1="50" y1="4" x2="50" y2="96"/><line x1="4" y1="50" x2="96" y2="50"/><line x1="17" y1="17" x2="83" y2="83"/><line x1="83" y1="17" x2="17" y2="83"/></g><circle cx="50" cy="50" r="9" fill="#c89b3c" stroke="#2a1608" stroke-width="3"/></svg>`,
};

const COMPASS_DIRS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
function headingToCompass(rad) {
  // In world coords: North is -Z (heading = PI), East is +X (heading = PI/2), South is +Z (heading = 0)
  let deg = ((180 - THREE_MathUtils_radToDeg(rad)) % 360 + 360) % 360;
  const idx = Math.round(deg / 22.5) % 16;
  return { deg: Math.round(deg), dir: COMPASS_DIRS[idx] };
}
function THREE_MathUtils_radToDeg(r) {
  return (r * 180) / Math.PI;
}

export class UI {
  constructor({ onSelectIsland, onUndock, onChangeTime, onChangeWaves, onToggleAudio }) {
    this.onSelectIsland = onSelectIsland;
    this.onUndock = onUndock;
    this.onChangeTime = onChangeTime;
    this.onChangeWaves = onChangeWaves;
    this.onToggleAudio = onToggleAudio;

    this.visited = new Set(['home']);
    this.activeIsland = null;
    this.nearIsland = null;
    this.atlasOpen = false;
    this.atlasFilter = 'all';

    this.timePresets = [
      { id: 'golden', label: 'Golden Dusk' },
      { id: 'noon', label: 'High Noon' },
      { id: 'sunset', label: 'Crimson Horizon' },
      { id: 'night', label: 'Dead of Night' },
    ];
    this.timeIdx = 0;

    this.wavePresets = [
      { val: 1.0, label: 'Trade Swell' },
      { val: 1.65, label: 'Gale Seas' },
      { val: 0.45, label: 'Dead Calm' },
    ];
    this.waveIdx = 0;

    this.buildDOM();
    this.setupMinimapInteraction();
  }

  buildDOM() {
    const root = document.getElementById('ui-root');
    root.innerHTML = `
      ${SVG_DEFS}
      <!-- Top Carved Galleon Transom & Brass Navigator's Console -->
      <header class="topbar">
        <span class="brass-rivet tl"></span>
        <span class="brass-rivet tr"></span>
        <span class="brass-rivet bl"></span>
        <span class="brass-rivet br"></span>

        <div class="brand" id="btn-home-brand" title="Return to Captain's Haven">
          <div class="brand-emblem">
            <div class="brand-emblem-ring"></div>
            ${ICONS.crest}
          </div>
          <div class="brand-text">
            <div class="brand-kicker">ADMIRAL OF THE FLEET</div>
            <div class="brand-name">Cap’n ${profile.name}</div>
            <div class="brand-sub">${profile.headline}</div>
          </div>
          <div class="visited-pill" id="visited-pill" title="Charted Isles">
            <span class="visited-crown">✦</span>
            <span id="visited-text">I / XIII</span>
            <small>CHARTED</small>
          </div>
        </div>

        <nav class="top-nav" aria-label="Archipelago Ledgers">
          <button class="nav-btn" data-cat="all" id="btn-atlas-toggle">
            <span class="nav-icon-frame">${ICONS.compass}</span>
            <span class="nav-lbl">
              <small>ROYAL</small>
              <strong>Sea Chart</strong>
            </span>
            <span class="nav-seal">XIII</span>
          </button>
          <button class="nav-btn" data-cat="experience">
            <span class="nav-icon-frame">${ICONS.swords}</span>
            <span class="nav-lbl">
              <small>NAVAL</small>
              <strong>Campaigns</strong>
            </span>
            <span class="nav-seal">II</span>
          </button>
          <button class="nav-btn" data-cat="project">
            <span class="nav-icon-frame">${ICONS.sextant}</span>
            <span class="nav-lbl">
              <small>ARTIFICER</small>
              <strong>Contraptions</strong>
            </span>
            <span class="nav-seal">VII</span>
          </button>
          <button class="nav-btn" data-cat="education">
            <span class="nav-icon-frame">${ICONS.scroll}</span>
            <span class="nav-lbl">
              <small>ROYAL</small>
              <strong>Academies</strong>
            </span>
            <span class="nav-seal">III</span>
          </button>
        </nav>

        <div class="top-actions">
          <button class="icon-btn" id="btn-time" title="Change Sky Watch">
            <span class="dial-icon">${ICONS.sun}</span>
            <span class="dial-text">
              <small>WATCH</small>
              <strong id="lbl-time">${this.timePresets[0].label}</strong>
            </span>
          </button>
          <button class="icon-btn" id="btn-waves" title="Change Sea Swell">
            <span class="dial-icon">${ICONS.waves}</span>
            <span class="dial-text">
              <small>WATERS</small>
              <strong id="lbl-waves">${this.wavePresets[0].label}</strong>
            </span>
          </button>
          <button class="icon-btn" id="btn-audio" title="Toggle Sea Shanty & Surf">
            <span class="dial-icon">${ICONS.bell}</span>
            <span class="dial-text">
              <small>BELL</small>
              <strong id="lbl-audio">Muted</strong>
            </span>
          </button>
          <button class="cta-btn" id="btn-cv-modal">
            <span class="cta-icon">${ICONS.dossier}</span>
            <span class="cta-text">
              <small>LETTERS OF MARQUE</small>
              <strong>Captain’s Dossier</strong>
            </span>
          </button>
        </div>
      </header>

      <!-- Sea Chart Gazetteer (Quick-Travel Parchment Map) -->
      <section class="atlas-panel hidden" id="atlas-panel">
        <div class="corner-ornament tl"></div>
        <div class="corner-ornament tr"></div>
        <div class="corner-ornament bl"></div>
        <div class="corner-ornament br"></div>
        <div class="atlas-header">
          <div>
            <div class="parchment-kicker">ROYAL ADMIRALTY GAZETTEER OF THE ARCHIPELAGO</div>
            <h3>Known Isles, Campaigns &amp; Contraptions</h3>
            <p>Plot a course for the helmsman with <b>Set Course</b>, or make immediate landfall with <b>Drop Anchor</b>.</p>
          </div>
          <button class="wax-close-btn" id="btn-atlas-close" aria-label="Close Gazetteer">✕</button>
        </div>
        <div class="atlas-filters" id="atlas-filters">
          <button class="filter-chip active" data-filter="all">All XIII Isles (13)</button>
          <button class="filter-chip" data-filter="about">Captain’s Haven</button>
          <button class="filter-chip" data-filter="experience">Naval Campaigns (2)</button>
          <button class="filter-chip" data-filter="project">Artificer Works (7)</button>
          <button class="filter-chip" data-filter="education">Royal Academies (3)</button>
        </div>
        <div class="atlas-grid" id="atlas-grid"></div>
      </section>

      <!-- Proximity Drop-Anchor Scroll Prompt -->
      <div class="dock-prompt hidden" id="dock-prompt">
        <div class="dock-prompt-inner" id="dock-prompt-btn">
          <div class="dock-wax-seal"><span>E</span></div>
          <div class="dock-prompt-text">
            <span class="dock-prompt-label" id="dock-prompt-cat">Naval Campaign</span>
            <strong id="dock-prompt-title">DP World</strong>
          </div>
          <span class="dock-prompt-cta">Drop Anchor &amp; Read Log &raquo;</span>
        </div>
      </div>

      <!-- Helmsman Autopilot Banner -->
      <div class="autopilot-banner hidden" id="autopilot-banner">
        <span>Helmsman steering for <strong id="autopilot-name"></strong></span>
        <button id="btn-autopilot-warp">Make Immediate Landfall</button>
        <button id="btn-autopilot-cancel" title="Take the Helm">✕</button>
      </div>

      <!-- Bottom-Left Ship's Binnacle & Rotating Helm Wheel -->
      <div class="helm-hud">
        <div class="helm-wheel-box" id="helm-wheel-graphic" title="Ship's Helm">
          ${ICONS.wheel}
        </div>
        <div class="speed-box">
          <div class="speed-val" id="hud-speed">0.0</div>
          <div class="speed-unit">KNOTS</div>
          <div class="compass-bearing" id="hud-bearing">N · 000°</div>
        </div>
        <div class="helm-meta">
          <div class="helm-nearest" id="hud-nearest">Landfall: Sami Nouicer (45m)</div>
          <div class="helm-keys">
            <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Helm &amp; Sails</span>
            <span><kbd>Shift</kbd> Full Canvas</span>
            <span><kbd>E</kbd> Anchor</span>
            <span><kbd>M</kbd> Chart</span>
          </div>
        </div>
      </div>

      <!-- Touch Controls for Mobile / Tablet -->
      <div class="touch-controls" id="touch-controls">
        <div class="joystick-zone" id="joystick-zone">
          <div class="joystick-base">
            <div class="joystick-stick" id="joystick-stick"></div>
          </div>
        </div>
        <div class="touch-buttons">
          <button class="touch-btn" id="touch-boost">FULL SAIL</button>
          <button class="touch-btn" id="touch-dock">ANCHOR</button>
        </div>
      </div>

      <!-- Bottom-Right 17th-Century Parchment Sea Chart & Compass Rose -->
      <div class="minimap-wrap">
        <div class="minimap-bezel">
          <canvas id="minimap" width="224" height="224"></canvas>
        </div>
        <div class="minimap-tooltip hidden" id="minimap-tooltip"></div>
        <div class="minimap-caption">Click any isle on the chart to plot course</div>
      </div>

      <!-- Captain's Logbook (Island Inspection Tome) -->
      <aside class="island-drawer hidden" id="island-drawer">
        <div class="corner-ornament tl"></div>
        <div class="corner-ornament tr"></div>
        <div class="corner-ornament bl"></div>
        <div class="corner-ornament br"></div>
        <div class="drawer-top">
          <span class="drawer-badge" id="drawer-badge">Naval Campaign</span>
          <button class="wax-close-btn" id="btn-drawer-close" title="Weigh Anchor (Esc)">✕</button>
        </div>
        <div class="drawer-body" id="drawer-body"></div>
        <div class="drawer-footer">
          <button class="drawer-nav-btn" id="btn-prev-island">&laquo; Prev Isle</button>
          <button class="drawer-undock-btn" id="btn-undock-main">Weigh Anchor &amp; Set Sail</button>
          <button class="drawer-nav-btn" id="btn-next-island">Next Isle &raquo;</button>
        </div>
      </aside>

      <!-- Admiralty Dossier (Full CV & Letters of Marque Modal) -->
      <div class="cv-modal-backdrop hidden" id="cv-modal">
        <div class="cv-modal-card">
          <div class="corner-ornament tl"></div>
          <div class="corner-ornament tr"></div>
          <div class="corner-ornament bl"></div>
          <div class="corner-ornament br"></div>
          <div class="cv-modal-header">
            <div>
              <div class="parchment-kicker">LETTERS OF MARQUE &amp; FULL SERVICE RECORD</div>
              <h2>Cap’n ${profile.name}</h2>
              <p>${profile.headline} · ${profile.location}</p>
            </div>
            <button class="wax-close-btn" id="btn-cv-close">✕</button>
          </div>
          <div class="cv-modal-content" id="cv-modal-content"></div>
        </div>
      </div>
    `;

    // Wire events
    document.getElementById('btn-home-brand').addEventListener('click', () => {
      const home = islands.find((i) => i.id === 'home');
      this.onSelectIsland(home, 'dock');
    });

    document.querySelectorAll('.top-nav .nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        if (this.atlasOpen && this.atlasFilter === cat) {
          this.toggleAtlas(false);
        } else {
          this.atlasFilter = cat;
          this.toggleAtlas(true);
          this.renderAtlas();
        }
      });
    });

    document.getElementById('btn-atlas-close').addEventListener('click', () => this.toggleAtlas(false));

    document.querySelectorAll('#atlas-filters .filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        this.atlasFilter = chip.dataset.filter;
        this.renderAtlas();
      });
    });

    document.getElementById('btn-time').addEventListener('click', () => {
      this.timeIdx = (this.timeIdx + 1) % this.timePresets.length;
      const p = this.timePresets[this.timeIdx];
      document.getElementById('lbl-time').textContent = p.label;
      this.onChangeTime(p.id);
    });

    document.getElementById('btn-waves').addEventListener('click', () => {
      this.waveIdx = (this.waveIdx + 1) % this.wavePresets.length;
      const p = this.wavePresets[this.waveIdx];
      document.getElementById('lbl-waves').textContent = p.label;
      this.onChangeWaves(p.val);
    });

    document.getElementById('btn-audio').addEventListener('click', (e) => {
      const active = this.onToggleAudio();
      document.getElementById('lbl-audio').textContent = active ? 'Sea Sound' : 'Muted';
      e.currentTarget.classList.toggle('active', active);
    });

    document.getElementById('dock-prompt-btn').addEventListener('click', () => {
      if (this.nearIsland) this.onSelectIsland(this.nearIsland, 'dock');
    });

    document.getElementById('btn-drawer-close').addEventListener('click', () => this.onUndock());
    document.getElementById('btn-undock-main').addEventListener('click', () => this.onUndock());

    document.getElementById('btn-prev-island').addEventListener('click', () => this.stepIsland(-1));
    document.getElementById('btn-next-island').addEventListener('click', () => this.stepIsland(1));

    document.getElementById('btn-autopilot-warp').addEventListener('click', () => {
      if (this.autopilotIsland) this.onSelectIsland(this.autopilotIsland, 'dock');
    });
    document.getElementById('btn-autopilot-cancel').addEventListener('click', () => {
      this.onSelectIsland(null, 'cancel');
    });

    const cvModal = document.getElementById('cv-modal');
    document.getElementById('btn-cv-modal').addEventListener('click', () => {
      this.renderFullCVModal();
      cvModal.classList.remove('hidden');
    });
    document.getElementById('btn-cv-close').addEventListener('click', () => {
      cvModal.classList.add('hidden');
    });
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) cvModal.classList.add('hidden');
    });

    this.renderAtlas();
  }

  toRoman(n) {
    const map = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII'];
    return map[n] || String(n);
  }

  toggleAtlas(force) {
    this.atlasOpen = force ?? !this.atlasOpen;
    document.getElementById('atlas-panel').classList.toggle('hidden', !this.atlasOpen);
    document.querySelectorAll('.top-nav .nav-btn').forEach((btn) => {
      btn.classList.toggle('active', this.atlasOpen && btn.dataset.cat === this.atlasFilter);
    });
  }

  renderAtlas() {
    document.querySelectorAll('#atlas-filters .filter-chip').forEach((c) => {
      c.classList.toggle('active', c.dataset.filter === this.atlasFilter);
    });
    document.querySelectorAll('.top-nav .nav-btn').forEach((btn) => {
      btn.classList.toggle('active', this.atlasOpen && btn.dataset.cat === this.atlasFilter);
    });

    const grid = document.getElementById('atlas-grid');
    const list = islands.filter((i) => this.atlasFilter === 'all' || i.category === this.atlasFilter);
    grid.innerHTML = list
      .map((isl) => {
        const cat = categories[isl.category];
        const isVisited = this.visited.has(isl.id);
        return `
          <div class="atlas-card" style="--cat: ${cat.color}">
            <div class="atlas-card-top">
              <span class="atlas-cat">${ICONS[cat.icon] || ''} ${cat.label}</span>
              <span class="atlas-date">${isl.date ?? ''}</span>
            </div>
            <h4>${isl.title} ${isVisited ? '<span class="visited-check" title="Charted">✦</span>' : ''}</h4>
            <p class="atlas-sub">${isl.subtitle}</p>
            <div class="atlas-actions">
              <button class="atlas-sail-btn" data-id="${isl.id}" data-mode="sail">Set Course</button>
              <button class="atlas-dock-btn" data-id="${isl.id}" data-mode="dock">Drop Anchor</button>
            </div>
          </div>
        `;
      })
      .join('');

    grid.querySelectorAll('button[data-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isl = islands.find((i) => i.id === btn.dataset.id);
        const mode = btn.dataset.mode;
        this.toggleAtlas(false);
        this.onSelectIsland(isl, mode);
      });
    });
  }

  showIslandDetails(isl) {
    this.activeIsland = isl;
    this.visited.add(isl.id);
    const vText = document.getElementById('visited-text');
    if (vText) vText.textContent = `${this.toRoman(this.visited.size)} / XIII`;

    const cat = categories[isl.category];
    const badge = document.getElementById('drawer-badge');
    badge.innerHTML = `${ICONS[cat.icon] || ''} <span>${cat.label}</span>`;
    badge.style.color = cat.color;
    badge.style.borderColor = cat.color;

    const metricsHTML =
      isl.metrics && isl.metrics.length
        ? `<div class="metrics-row">
            ${isl.metrics
              .map(
                (m) => `
              <div class="metric-card" style="--cat:${cat.color}">
                <div class="metric-val">${m.value}</div>
                <div class="metric-lbl">${m.label}</div>
              </div>`
              )
              .join('')}
          </div>`
        : '';

    const bulletsHTML =
      isl.bullets && isl.bullets.length
        ? `<ul class="drawer-bullets">
            ${isl.bullets.map((b) => `<li>${b}</li>`).join('')}
          </ul>`
        : '';

    const tagsHTML =
      isl.tags && isl.tags.length
        ? `<div class="drawer-tags-wrap">
            <div class="tags-heading">Articles of Craft &amp; Armament</div>
            <div class="drawer-tags">
              ${isl.tags.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>`
        : '';

    let skillsHTML = '';
    if (isl.skills) {
      skillsHTML = `
        <div class="skills-section">
          <h4>Ship’s Arsenal &amp; Technical Mastery</h4>
          ${Object.entries(isl.skills)
            .map(
              ([group, items]) => `
            <div class="skill-group">
              <div class="skill-group-name">${group}</div>
              <div class="drawer-tags">
                ${items.map((s) => `<span class="tech-tag">${s}</span>`).join('')}
              </div>
            </div>`
            )
            .join('')}
        </div>
        <div class="contact-links">
          <a href="mailto:${profile.email}" class="contact-pill">Dispatch Letter (${profile.email})</a>
          <a href="${profile.linkedin}" target="_blank" rel="noopener" class="contact-pill">LinkedIn Ledger</a>
          <a href="${profile.github}" target="_blank" rel="noopener" class="contact-pill">GitHub Foundry</a>
        </div>
      `;
    }

    const body = document.getElementById('drawer-body');
    body.innerHTML = `
      <div class="drawer-header-block">
        <div class="log-entry-stamp">LOGBOOK ENTRY · LAT ${Math.abs(isl.cz)}°${isl.cz <= 0 ? 'N' : 'S'} LON ${Math.abs(isl.cx)}°${isl.cx >= 0 ? 'E' : 'W'}</div>
        <h2>${isl.title}</h2>
        <div class="drawer-subtitle">${isl.subtitle}</div>
        <div class="drawer-meta">
          ${isl.org ? `<span>Port: <b>${isl.org}</b></span>` : ''}
          ${isl.date ? `<span>Anno: <b>${isl.date}</b></span>` : ''}
        </div>
      </div>
      <div class="ink-divider"></div>
      ${metricsHTML}
      <p class="drawer-summary">${isl.summary}</p>
      ${bulletsHTML}
      ${tagsHTML}
      ${skillsHTML}
    `;

    document.getElementById('island-drawer').classList.remove('hidden');
    document.getElementById('dock-prompt').classList.add('hidden');
  }

  hideIslandDetails() {
    this.activeIsland = null;
    document.getElementById('island-drawer').classList.add('hidden');
  }

  stepIsland(delta) {
    const idx = this.activeIsland ? islands.findIndex((i) => i.id === this.activeIsland.id) : 0;
    const nextIdx = (idx + delta + islands.length) % islands.length;
    this.onSelectIsland(islands[nextIdx], 'dock');
  }

  setAutopilotBanner(isl) {
    this.autopilotIsland = isl;
    const banner = document.getElementById('autopilot-banner');
    if (!isl) {
      banner.classList.add('hidden');
    } else {
      document.getElementById('autopilot-name').textContent = isl.title;
      banner.classList.remove('hidden');
    }
  }

  update(boat, nearestIsland, nearestDist) {
    document.getElementById('hud-speed').textContent = boat.speedKnots.toFixed(1);

    const comp = headingToCompass(boat.heading);
    document.getElementById('hud-bearing').textContent = `${comp.dir} · ${String(comp.deg).padStart(3, '0')}°`;

    // Rotate the ship's wheel SVG in the HUD
    const wheelEl = document.getElementById('helm-wheel-graphic');
    if (wheelEl) {
      this.wheelAngle = (this.wheelAngle || 0) + (boat.steer * 55 - (this.wheelAngle || 0)) * 0.15;
      wheelEl.style.transform = `rotate(${this.wheelAngle.toFixed(1)}deg)`;
    }

    if (nearestIsland) {
      const d = Math.max(0, Math.round(nearestDist - nearestIsland.radius));
      document.getElementById('hud-nearest').textContent = `Landfall: ${nearestIsland.title} (${d} fathoms)`;
    }

    const dockThreshold = nearestIsland ? nearestIsland.radius + 32 : 0;
    if (nearestIsland && nearestDist < dockThreshold && !this.activeIsland) {
      this.nearIsland = nearestIsland;
      const cat = categories[nearestIsland.category];
      const prompt = document.getElementById('dock-prompt');
      document.getElementById('dock-prompt-cat').textContent = cat.label;
      document.getElementById('dock-prompt-title').textContent = nearestIsland.title;
      prompt.classList.remove('hidden');
    } else {
      this.nearIsland = null;
      document.getElementById('dock-prompt').classList.add('hidden');
    }

    this.drawMinimap(boat);
  }

  setupMinimapInteraction() {
    const canvas = document.getElementById('minimap');
    const tooltip = document.getElementById('minimap-tooltip');

    const getIslandAtMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const my = ((e.clientY - rect.top) / rect.height) * canvas.height;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const scale = 0.25;

      let best = null;
      let bestD = 15;
      for (const isl of islands) {
        const ix = cx + isl.cx * scale;
        const iy = cy + isl.cz * scale;
        const d = Math.hypot(mx - ix, my - iy);
        if (d < bestD) {
          bestD = d;
          best = isl;
        }
      }
      return best;
    };

    canvas.addEventListener('mousemove', (e) => {
      const isl = getIslandAtMouse(e);
      if (isl) {
        canvas.style.cursor = 'pointer';
        tooltip.textContent = `${isl.title} (${categories[isl.category].label})`;
        tooltip.classList.remove('hidden');
      } else {
        canvas.style.cursor = 'default';
        tooltip.classList.add('hidden');
      }
    });

    canvas.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });

    canvas.addEventListener('click', (e) => {
      const isl = getIslandAtMouse(e);
      if (isl) this.onSelectIsland(isl, 'sail');
    });
  }

  drawMinimap(boat) {
    const canvas = document.getElementById('minimap');
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const rOuter = w / 2 - 3;
    const scale = 0.25;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
    ctx.clip();

    // 1. Aged Vellum / Parchment background
    const grad = ctx.createRadialGradient(cx - 18, cy - 18, 12, cx, cy, rOuter);
    grad.addColorStop(0, '#f3e3c2');
    grad.addColorStop(0.7, '#e2ca9c');
    grad.addColorStop(1, '#bfa06d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2. 16-point Cartographic Rhumb Lines (wind rose lines)
    ctx.strokeStyle = 'rgba(105, 68, 32, 0.22)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * rOuter, cy + Math.sin(a) * rOuter);
      ctx.stroke();
    }

    // Concentric nautical league circles
    for (const r of [38, 74, 102]) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 3. Plotted Course (dotted crimson ink line + X marks the spot)
    if (boat.autopilot) {
      const tx = cx + boat.autopilot.target.x * scale;
      const ty = cy + boat.autopilot.target.y * scale;
      ctx.save();
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = '#8b1e1e';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx + boat.position.x * scale, cy + boat.position.z * scale);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.restore();

      // Crimson "X" at destination
      ctx.strokeStyle = '#8b1e1e';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(tx - 5, ty - 5);
      ctx.lineTo(tx + 5, ty + 5);
      ctx.moveTo(tx + 5, ty - 5);
      ctx.lineTo(tx - 5, ty + 5);
      ctx.stroke();
    }

    // 4. Hand-drawn Island Contours & Sepia Ink Labels
    for (const isl of islands) {
      const ix = cx + isl.cx * scale;
      const iy = cy + isl.cz * scale;
      const ir = Math.max(4.5, isl.radius * scale * 0.85);
      const cat = categories[isl.category];

      // Shallow water ink ripple ring
      ctx.strokeStyle = 'rgba(92, 58, 28, 0.35)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(ix, iy, ir + 2.5, 0, Math.PI * 2);
      ctx.stroke();

      // Island land mass in tinted sepia/parchment
      ctx.fillStyle = this.visited.has(isl.id) ? cat.color : '#b8945f';
      ctx.strokeStyle = '#3b2313';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(ix, iy, ir, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // 5. Brigantine Ship Icon & Brass Heading Needle
    const bx = cx + boat.position.x * scale;
    const by = cy + boat.position.z * scale;
    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(Math.PI / 2 - boat.heading);

    // Heading line
    ctx.strokeStyle = 'rgba(139, 30, 30, 0.65)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(18, 0);
    ctx.stroke();

    // Ship hull silhouette
    ctx.fillStyle = '#8b1e1e';
    ctx.strokeStyle = '#f8ecd4';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(7.5, 0);
    ctx.lineTo(-5, -4.5);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-5, 4.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 6. Degree ticks around chart perimeter
    ctx.strokeStyle = '#3b2313';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 36; i++) {
      const a = (i * Math.PI) / 18;
      const inner = i % 3 === 0 ? rOuter - 7 : rOuter - 4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.lineTo(cx + Math.cos(a) * rOuter, cy + Math.sin(a) * rOuter);
      ctx.stroke();
    }

    // Cardinal letters
    ctx.fillStyle = '#7a1c1d';
    ctx.font = 'bold 12px "Pirata One", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('N', cx, 18);
    ctx.fillStyle = '#3b2313';
    ctx.font = '10px "Cinzel", Georgia, serif';
    ctx.fillText('S', cx, h - 10);
    ctx.fillText('E', w - 13, cy + 4);
    ctx.fillText('W', 14, cy + 4);

    ctx.restore();
  }

  renderFullCVModal() {
    const container = document.getElementById('cv-modal-content');
    const exp = islands.filter((i) => i.category === 'experience');
    const proj = islands.filter((i) => i.category === 'project');
    const edu = islands.filter((i) => i.category === 'education');
    const home = islands.find((i) => i.id === 'home');

    const renderCards = (list) =>
      list
        .map(
          (item) => `
        <div class="cv-item">
          <div class="cv-item-head">
            <div>
              <strong>${item.title}</strong> — <span>${item.subtitle}</span>
              ${item.org ? `<small> · ${item.org}</small>` : ''}
            </div>
            <div class="cv-item-right">
              <span class="cv-date">${item.date ?? ''}</span>
              <button class="cv-jump-btn" data-jump="${item.id}">Sail to Isle &raquo;</button>
            </div>
          </div>
          <ul>${item.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
          <div class="drawer-tags">${item.tags.map((t) => `<span class="tech-tag">${t}</span>`).join('')}</div>
        </div>`
        )
        .join('');

    container.innerHTML = `
      <div class="cv-banner">
        <p>${home.summary}</p>
        <p class="cv-avail"><strong>Commission Sought:</strong> ${profile.availability}</p>
        <div class="contact-links">
          <a href="mailto:${profile.email}" class="contact-pill">${profile.email}</a>
          <a href="${profile.linkedin}" target="_blank" rel="noopener" class="contact-pill">LinkedIn</a>
          <a href="${profile.github}" target="_blank" rel="noopener" class="contact-pill">GitHub</a>
        </div>
      </div>

      <h3>Naval Campaigns (Professional Experience)</h3>
      ${renderCards(exp)}

      <h3>Artificer Contraptions (Technical Projects)</h3>
      ${renderCards(proj)}

      <h3>Royal Academies (Education)</h3>
      ${renderCards(edu)}
    `;

    container.querySelectorAll('button[data-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isl = islands.find((i) => i.id === btn.dataset.jump);
        document.getElementById('cv-modal').classList.add('hidden');
        this.onSelectIsland(isl, 'dock');
      });
    });
  }
}
