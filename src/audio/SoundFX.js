// Procedural Web Audio soundscape: ocean surf, boat wake rush, and harbor bell.
export class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = false;
    this.surfGain = null;
    this.wakeFilter = null;
    this.wakeGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();

    // Create pink-ish noise buffer (3 seconds loop)
    const sampleRate = this.ctx.sampleRate;
    const len = sampleRate * 3;
    const buf = this.ctx.createBuffer(1, len, sampleRate);
    const data = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    // Ambient ocean surf
    const surfSrc = this.ctx.createBufferSource();
    surfSrc.buffer = buf;
    surfSrc.loop = true;
    const surfFilter = this.ctx.createBiquadFilter();
    surfFilter.type = 'lowpass';
    surfFilter.frequency.value = 260;
    this.surfGain = this.ctx.createGain();
    this.surfGain.gain.value = 0.0;
    surfSrc.connect(surfFilter).connect(this.surfGain).connect(this.ctx.destination);
    surfSrc.start();

    // Boat hull water rush
    const wakeSrc = this.ctx.createBufferSource();
    wakeSrc.buffer = buf;
    wakeSrc.loop = true;
    this.wakeFilter = this.ctx.createBiquadFilter();
    this.wakeFilter.type = 'bandpass';
    this.wakeFilter.frequency.value = 420;
    this.wakeFilter.Q.value = 0.9;
    this.wakeGain = this.ctx.createGain();
    this.wakeGain.gain.value = 0.0;
    wakeSrc.connect(this.wakeFilter).connect(this.wakeGain).connect(this.ctx.destination);
    wakeSrc.start();
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    this.enabled = !this.enabled;
    if (!this.enabled && this.surfGain) {
      this.surfGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
      this.wakeGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15);
    }
    return this.enabled;
  }

  update(time, speedKnots) {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const swell = 0.08 + 0.035 * Math.sin(time * 0.55);
    this.surfGain.gain.setTargetAtTime(swell, now, 0.2);

    const speedNorm = Math.min(speedKnots / 18, 1);
    this.wakeGain.gain.setTargetAtTime(speedNorm * 0.16, now, 0.12);
    this.wakeFilter.frequency.setTargetAtTime(320 + speedNorm * 680, now, 0.12);
  }

  playDockChime() {
    if (!this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5];
    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.07, now + i * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.1);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.15);
    });
  }
}
