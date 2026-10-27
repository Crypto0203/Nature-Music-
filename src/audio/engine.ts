import { Environment, SoundLayer, BirdSpecies, LayerKind } from '../types';
import { getBird, getTone } from '../data';

// =====================================================================
// NOISE BUFFER GENERATORS
// =====================================================================
function whiteNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  return buf;
}

function pinkNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  }
  return buf;
}

function brownNoise(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
  }
  return buf;
}

function rainBuffer(ctx: AudioContext, intensity: number, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const base = (Math.random() * 2 - 1) * 0.35;
      const drip = Math.random() < (0.002 + intensity * 0.012)
        ? (Math.random() - 0.5) * 1.0 * intensity : 0;
      d[i] = base + drip;
    }
  }
  return buf;
}

function rainOnTentBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      const base = (Math.random() * 2 - 1) * 0.25;
      // More percussive drops on canvas
      const tap = Math.random() < 0.015 ? (Math.random() - 0.5) * 1.4 : 0;
      const heavyDrop = Math.random() < 0.003 ? (Math.random() - 0.5) * 2.2 : 0;
      d[i] = base + tap + heavyDrop;
    }
  }
  return buf;
}

function fireBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.04 * w) / 1.04;
      const crackle = Math.random() < 0.0015 ? (Math.random() - 0.5) * 1.8 : 0;
      const pop = Math.random() < 0.0003 ? (Math.random() - 0.5) * 2.5 : 0;
      d[i] = last * 2.2 + crackle + pop;
    }
  }
  return buf;
}

function streamBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let phase = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      phase += 0.0015 + Math.random() * 0.0025;
      const bubble = Math.sin(phase * 2 * Math.PI) * 0.18;
      const ripple = Math.sin(phase * 7.3) * 0.06 * Math.sin(i / sr * 0.7);
      d[i] = w * 0.18 + bubble + ripple;
    }
  }
  return buf;
}

function waterfallBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  // Heavy rushing water — louder white noise + low rumble
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.05 * w) / 1.05;
      const splash = Math.random() < 0.005 ? (Math.random() - 0.5) * 1.5 : 0;
      d[i] = w * 0.4 + last * 1.5 + splash;
    }
  }
  return buf;
}

function rapidsBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let phase = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      phase += 0.003;
      const tumble = Math.sin(phase * 2 * Math.PI) * 0.2 * Math.sin(i / sr * 1.3);
      const splash = Math.random() < 0.008 ? (Math.random() - 0.5) * 1.3 : 0;
      d[i] = w * 0.3 + tumble + splash;
    }
  }
  return buf;
}

function cricketsBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let chirpPhase = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = Math.max(0, Math.sin(t * 2 * Math.PI * 5) - 0.6) * 2.5;
      chirpPhase += 4500 / sr;
      d[i] = Math.sin(chirpPhase * 2 * Math.PI) * env * 0.25 + (Math.random() * 2 - 1) * 0.02;
    }
  }
  return buf;
}

function frogsBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.01;
    // Sprinkle frog croaks
    let pos = Math.floor(Math.random() * sr);
    while (pos < len - sr) {
      const baseFreq = 180 + Math.random() * 220;
      const croakLen = Math.floor(sr * (0.15 + Math.random() * 0.2));
      let phase = 0;
      for (let i = 0; i < croakLen; i++) {
        const t = i / croakLen;
        const env = Math.sin(t * Math.PI) * (0.5 + Math.random() * 0.5);
        // Croak vibrato
        const vib = Math.sin(t * Math.PI * 30) * 30;
        phase += (baseFreq + vib) / sr;
        const samp = (Math.sin(phase * 2 * Math.PI) * 0.6 + Math.sin(phase * 4 * Math.PI) * 0.3) * env * 0.4;
        if (pos + i < len) d[pos + i] += samp;
      }
      pos += Math.floor(sr * (0.2 + Math.random() * 1.5));
    }
  }
  return buf;
}

function cicadaBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let phase = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      // Continuous high-freq buzz with slow amplitude waves
      const ampMod = 0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 0.5);
      phase += (4000 + Math.sin(t * 2) * 200) / sr;
      const buzz = Math.sin(phase * 2 * Math.PI) * ampMod * 0.15;
      const noise = (Math.random() * 2 - 1) * 0.03;
      d[i] = buzz + noise;
    }
  }
  return buf;
}

function jungleBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  // Layered: pink noise + occasional insect/leaf rustles
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + w * 0.05;
      b1 = 0.95 * b1 + w * 0.1;
      b2 = 0.85 * b2 + w * 0.2;
      const rustle = Math.random() < 0.004 ? (Math.random() - 0.5) * 0.6 : 0;
      d[i] = (b0 + b1 + b2) * 0.7 + rustle;
    }
  }
  return buf;
}

function snowBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  // Very soft, low-frequency noise — almost silent presence
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + w * 0.03;
      d[i] = b0 * 1.5;
    }
  }
  return buf;
}

function iceCrackBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.005;
    // Sparse cracks
    for (let c = 0; c < 5 + Math.floor(Math.random() * 4); c++) {
      const pos = Math.floor(Math.random() * (len - sr));
      const crackLen = Math.floor(sr * (0.3 + Math.random() * 0.7));
      let phase = 0;
      const baseFreq = 80 + Math.random() * 120;
      for (let i = 0; i < crackLen; i++) {
        const t = i / crackLen;
        const env = Math.exp(-t * 3);
        phase += baseFreq / sr;
        const samp = (Math.sin(phase * 2 * Math.PI) + (Math.random() - 0.5) * 0.8) * env * 0.4;
        if (pos + i < len) d[pos + i] += samp;
      }
    }
  }
  return buf;
}

function trainBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  // Rhythmic clickity-clack with low rumble
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const w = Math.random() * 2 - 1;
      last = (last + 0.03 * w) / 1.03;
      // Rhythmic clack at ~3Hz
      const clack = Math.max(0, Math.sin(t * 2 * Math.PI * 3.2) - 0.85) * 8 * (Math.random() * 0.5 + 0.5);
      d[i] = last * 2 + clack * 0.3;
    }
  }
  return buf;
}

function cafeBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  // Layered murmur (filtered noise) + occasional cup clink
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.95 * b0 + w * 0.1;
      b1 = 0.90 * b1 + w * 0.15;
      b2 = 0.80 * b2 + w * 0.2;
      // Vague speech-like wobble
      const wobble = Math.sin(i / sr * 2 * Math.PI * (1 + Math.sin(i / sr) * 0.3)) * 0.03;
      d[i] = (b0 + b1 + b2) * 0.5 + wobble;
    }
    // Occasional cup clinks
    for (let c = 0; c < 6; c++) {
      const pos = Math.floor(Math.random() * (len - sr * 0.3));
      const clinkLen = Math.floor(sr * 0.25);
      let phase = 0;
      const freq = 1800 + Math.random() * 1500;
      for (let i = 0; i < clinkLen; i++) {
        const t = i / clinkLen;
        const env = Math.exp(-t * 12);
        phase += freq / sr;
        if (pos + i < len) d[pos + i] += Math.sin(phase * 2 * Math.PI) * env * 0.15;
      }
    }
  }
  return buf;
}

function libraryBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.005 * w) / 1.005;
      d[i] = last * 1.2;
    }
    // Page turns
    for (let p = 0; p < 4; p++) {
      const pos = Math.floor(Math.random() * (len - sr));
      const pageLen = Math.floor(sr * 0.3);
      for (let i = 0; i < pageLen; i++) {
        const t = i / pageLen;
        const env = Math.sin(t * Math.PI);
        const noise = (Math.random() - 0.5) * env * 0.15;
        if (pos + i < len) d[pos + i] += noise;
      }
    }
  }
  return buf;
}

function underwaterBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99 * b0 + w * 0.03;
      b1 = 0.95 * b1 + w * 0.08;
      // Slow current waves
      const current = Math.sin(i / sr * 2 * Math.PI * 0.15) * 0.15;
      const bubble = Math.random() < 0.001 ? (Math.random() - 0.5) * 0.4 : 0;
      d[i] = (b0 + b1) * 0.8 + current + bubble;
    }
  }
  return buf;
}

function wombBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = sr * seconds;
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.025 * w) / 1.025;
      // Slow whoosh modulation
      const whoosh = Math.sin(i / sr * 2 * Math.PI * 0.3) * 0.2;
      d[i] = last * 2.8 + whoosh;
    }
  }
  return buf;
}

// =====================================================================
// 🐦 BIRD CALL SYNTHESIZER
// =====================================================================
function birdCallBuffer(ctx: AudioContext, bird: BirdSpecies, seconds: number = 8): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.005;
    let pos = Math.floor(sr * 0.5 + Math.random() * sr * (bird.intervalMin / 1000));
    while (pos < len - sr * 0.5) {
      renderBirdCall(d, pos, bird, sr, ch);
      const intervalMs = bird.intervalMin + Math.random() * (bird.intervalMax - bird.intervalMin);
      pos += Math.floor(sr * (intervalMs / 1000));
    }
  }
  return buf;
}

function renderBirdCall(d: Float32Array, startSample: number, bird: BirdSpecies, sr: number, channel: number) {
  const callLen = Math.floor(sr * (bird.callDuration / 1000));
  const f0 = bird.fundamental;
  const sweep = bird.freqSweep;
  const pan = (Math.random() - 0.5) * 0.6;
  const chGain = channel === 0 ? Math.max(0.4, 1.0 - pan) : Math.max(0.4, 1.0 + pan);

  switch (bird.pattern) {
    case 'trill': {
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        for (let i = 0; i < sylLen; i++) {
          const t = i / sylLen;
          const env = Math.sin(t * Math.PI);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * sweep * 0.3;
          const freq = f0 + Math.sin(t * Math.PI * 2) * sweep * 0.4 + vib;
          phase += freq / sr;
          const samp = Math.sin(phase * 2 * Math.PI) * env * 0.45 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'whistle': {
      const sylLen = Math.floor(callLen / bird.syllables);
      const gap = Math.floor(sylLen * 0.15);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const actualLen = sylLen - gap;
        const startFreq = f0 + (Math.random() - 0.5) * sweep * 0.6;
        const endFreq = f0 + (Math.random() - 0.5) * sweep * 0.6;
        for (let i = 0; i < actualLen; i++) {
          const t = i / actualLen;
          const env = Math.sin(t * Math.PI);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * 8;
          const freq = startFreq + (endFreq - startFreq) * t + vib;
          phase += freq / sr;
          const samp = Math.sin(phase * 2 * Math.PI) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'twoNote': {
      const sylLen = Math.floor(callLen / 2);
      const freqs = [f0 * 1.0, f0 * 0.78];
      let phase = 0;
      for (let s = 0; s < 2; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.7);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.pow(Math.sin(t * Math.PI), 0.6);
          phase += freqs[s] / sr;
          const samp = (Math.sin(phase * 2 * Math.PI) * 0.6 + Math.sin(phase * 4 * Math.PI) * 0.2) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'rising': {
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.85);
        const startFreq = f0 + s * (sweep / bird.syllables);
        const endFreq = startFreq + sweep * 0.5;
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.pow(Math.sin(t * Math.PI), 0.5);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * 5;
          const freq = startFreq + (endFreq - startFreq) * t + vib;
          phase += freq / sr;
          const samp = (Math.sin(phase * 2 * Math.PI) * 0.7 + Math.sin(phase * 4 * Math.PI) * 0.15) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'wail': {
      let phase = 0;
      for (let i = 0; i < callLen; i++) {
        const t = i / callLen;
        let env;
        if (t < 0.15) env = t / 0.15;
        else if (t < 0.7) env = 1 - (t - 0.15) * 0.2;
        else env = (1 - 0.11) * (1 - (t - 0.7) / 0.3);
        const vib = Math.sin(t * Math.PI * 2 * bird.vibrato) * sweep * 0.5;
        const slowSweep = Math.sin(t * Math.PI) * sweep * 0.6;
        const freq = f0 + slowSweep + vib;
        phase += freq / sr;
        const samp = (Math.sin(phase * 2 * Math.PI) * 0.6 + Math.sin(phase * 4 * Math.PI) * 0.18) * env * 0.55 * chGain;
        const idx = startSample + i;
        if (idx < d.length) d[idx] += samp;
      }
      break;
    }
    case 'laugh': {
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const tNorm = s / bird.syllables;
        const sylLen = Math.floor((callLen / bird.syllables) * (1.6 - tNorm * 0.7));
        const sylStart = Math.floor(s * (callLen / bird.syllables) * (1 - tNorm * 0.2));
        const useLen = Math.floor(sylLen * 0.5);
        const freqMod = f0 * (1 + (Math.random() - 0.5) * 0.3);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.sin(t * Math.PI);
          const vib = Math.sin(t * Math.PI * 8) * sweep * 0.3;
          phase += (freqMod + vib) / sr;
          const samp = (Math.sin(phase * 2 * Math.PI) * 0.55 + Math.sin(phase * 4 * Math.PI) * 0.25) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'cry': {
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.75);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.pow(Math.sin(t * Math.PI), 0.4);
          const vib = Math.sin(t * Math.PI * 2 * bird.vibrato) * sweep * 0.3;
          const freq = f0 + sweep * (1 - t) * 0.5 + vib;
          phase += freq / sr;
          const samp = (Math.sin(phase * 2 * Math.PI) * 0.55 + Math.sin(phase * 4 * Math.PI) * 0.3 + Math.sin(phase * 6 * Math.PI) * 0.15) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'warble': {
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * (0.6 + Math.random() * 0.3));
        const startFreq = f0 + (Math.random() - 0.5) * sweep;
        const endFreq = f0 + (Math.random() - 0.5) * sweep;
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.sin(t * Math.PI);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * 12;
          const freq = startFreq + (endFreq - startFreq) * t + vib;
          phase += freq / sr;
          const samp = Math.sin(phase * 2 * Math.PI) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'coo': {
      const sylLen = Math.floor(callLen / bird.syllables);
      const sylFreqs = [f0, f0 * 1.15, f0 * 0.95, f0 * 0.85, f0 * 0.78];
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.85);
        const freq = sylFreqs[s % sylFreqs.length];
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.pow(Math.sin(t * Math.PI), 1.5);
          phase += freq / sr;
          const samp = (Math.sin(phase * 2 * Math.PI) * 0.7 + Math.sin(phase * 4 * Math.PI) * 0.25) * env * 0.6 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'screech': {
      // Sharp piercing high cry (eagle, swift, macaw)
      let phase = 0;
      for (let i = 0; i < callLen; i++) {
        const t = i / callLen;
        // Very sharp attack, slow decay
        let env;
        if (t < 0.05) env = t / 0.05;
        else env = Math.exp(-(t - 0.05) * 2);
        // Aggressive vibrato + downward curl at end
        const vib = Math.sin(t * Math.PI * 2 * bird.vibrato) * sweep * 0.4;
        const curl = (t > 0.6 ? -(t - 0.6) * sweep * 0.5 : 0);
        const freq = f0 + vib + curl;
        phase += freq / sr;
        // Add square-ish harmonics for piercing quality
        const samp = (
          Math.sin(phase * 2 * Math.PI) * 0.5 +
          Math.sin(phase * 4 * Math.PI) * 0.35 +
          Math.sin(phase * 6 * Math.PI) * 0.2 +
          Math.sin(phase * 8 * Math.PI) * 0.1 +
          (Math.random() - 0.5) * 0.05 * env  // breath noise
        ) * env * 0.5 * chGain;
        const idx = startSample + i;
        if (idx < d.length) d[idx] += samp;
      }
      break;
    }
    case 'caw': {
      // Rough corvid rasping (raven, crow, jay)
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.5);
        const freqMod = f0 * (1 + (Math.random() - 0.5) * 0.15);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          // Sharp attack + gritty decay
          const env = Math.pow(Math.sin(t * Math.PI), 0.7);
          const grit = Math.sin(t * Math.PI * 30) * 0.3 + 1;
          phase += (freqMod * grit) / sr;
          // Saw-like harmonic stack for harsh quality
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 6 * Math.PI) * 0.2 +
            Math.sin(phase * 8 * Math.PI) * 0.15 +
            (Math.random() - 0.5) * 0.15 * env  // noise grit
          ) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'chatter': {
      // Rapid bursts of varied notes (chickadee, kingfisher rattle, drongo)
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.6);
        // Alternate between 3 pitches
        const pitchPick = s % 3;
        const noteFreq = f0 * (pitchPick === 0 ? 1 : pitchPick === 1 ? 1.15 : 0.92);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          // Sharp click-like envelope
          const env = Math.pow(Math.sin(t * Math.PI), 0.5);
          const vib = Math.sin(t * Math.PI * 2 * bird.vibrato) * sweep * 0.2;
          phase += (noteFreq + vib) / sr;
          // Add tiny attack click
          const click = i < 20 ? (Math.random() - 0.5) * 0.3 * (1 - i / 20) : 0;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.55 +
            Math.sin(phase * 4 * Math.PI) * 0.2 +
            click
          ) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'descending': {
      // Veery / Hermit Thrush / Chaffinch: spiraling down through pitches
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.85);
        // Each successive syllable is lower than the last
        const pitchOffset = -s * (sweep / bird.syllables) * 0.5;
        const startFreq = f0 + pitchOffset + sweep * 0.3;
        const endFreq = f0 + pitchOffset;
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.sin(t * Math.PI);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * 8;
          const freq = startFreq + (endFreq - startFreq) * t + vib;
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.6 +
            Math.sin(phase * 4 * Math.PI) * 0.18
          ) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'flute': {
      // Pure flute-like (Wood Thrush, Hermit Thrush, Oriole) — very pure tones
      const sylLen = Math.floor(callLen / bird.syllables);
      // Pentatonic-like sequence
      const intervals = [0, 7, 4, 9, 12, 7, 4, 0];
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.8);
        const semitones = intervals[s % intervals.length];
        const noteFreq = f0 * Math.pow(2, semitones / 12);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          // Smooth flute envelope
          const env = Math.pow(Math.sin(t * Math.PI), 1.3);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * 4;
          phase += (noteFreq + vib) / sr;
          // Almost pure sine + soft 2nd harmonic for warmth
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.75 +
            Math.sin(phase * 4 * Math.PI) * 0.1
          ) * env * 0.55 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'bell': {
      // Bell-like clear ringing notes (Crimson Rosella)
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.9);
        const freqVar = f0 * (1 + (Math.random() - 0.5) * 0.15);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          // Bell-like exponential decay
          const env = Math.exp(-t * 3) * (1 - Math.exp(-t * 30));
          phase += freqVar / sr;
          // Inharmonic bell partials
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.55 +
            Math.sin(phase * 2 * Math.PI * 2.4) * 0.25 +
            Math.sin(phase * 2 * Math.PI * 4.7) * 0.12
          ) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'rooster': {
      // "Cock-a-doodle-doo!" — 4 syllables: rising-flat-up-long-down
      const noteFreqs = [f0 * 0.85, f0, f0 * 1.4, f0 * 1.1];
      const noteLens = [0.15, 0.12, 0.20, 0.40];
      const totalProportion = noteLens.reduce((a, b) => a + b, 0);
      let pos = 0;
      let phase = 0;
      for (let n = 0; n < 4; n++) {
        const noteLen = Math.floor(callLen * (noteLens[n] / totalProportion));
        const useLen = Math.floor(noteLen * 0.85);
        const freq = noteFreqs[n];
        const isLast = n === 3;
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.pow(Math.sin(t * Math.PI), 0.6);
          const vib = Math.sin((startSample + pos + i) / sr * 2 * Math.PI * bird.vibrato) * 8;
          const sweepOffset = isLast ? -t * 100 : 0;
          phase += (freq + vib + sweepOffset) / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.5 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 6 * Math.PI) * 0.15 +
            (Math.random() - 0.5) * 0.05 * env
          ) * env * 0.55 * chGain;
          const idx = startSample + pos + i;
          if (idx < d.length) d[idx] += samp;
        }
        pos += noteLen;
      }
      break;
    }
    case 'drum': {
      // 🪵 Woodpecker drumming — rapid percussive transients on hollow wood
      const sylLen = Math.floor(callLen / bird.syllables);
      // Slight acceleration through burst (real woodpeckers do this)
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = Math.floor(s * sylLen * (1 - s * 0.005));
        const tapLen = Math.floor(sr * 0.025);
        // Each tap = sharp click + resonant decay
        let phase = 0;
        const tapFreq = f0 + (Math.random() - 0.5) * 30;
        for (let i = 0; i < tapLen; i++) {
          const t = i / tapLen;
          const env = Math.exp(-t * 18);
          phase += tapFreq / sr;
          // Hollow wood: low frequency thump + click attack
          const click = i < 4 ? (Math.random() - 0.5) * 1.5 * (1 - i / 4) : 0;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.2 +
            click
          ) * env * 0.55 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'honk': {
      // 🦢 Goose/Swan honking — sharp nasal call with formant
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.6);
        const freqMod = f0 * (1 + (Math.random() - 0.5) * 0.12);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          // Sharp attack, plateau, quick release
          const env = t < 0.1 ? t / 0.1 : t > 0.7 ? (1 - t) / 0.3 : 1;
          const vib = Math.sin(t * Math.PI * 2 * bird.vibrato) * 12;
          phase += (freqMod + vib) / sr;
          // Nasal harmonic stack (boost odd harmonics)
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 6 * Math.PI) * 0.25 +
            Math.sin(phase * 10 * Math.PI) * 0.15 +
            (Math.random() - 0.5) * 0.08 * env
          ) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'quack': {
      // 🦆 Duck quacking — short bursts with pitch bend down
      const sylLen = Math.floor(callLen / bird.syllables);
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.45);
        const startFreq = f0 * 1.2;
        const endFreq = f0 * 0.85;
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.pow(Math.sin(t * Math.PI), 0.5);
          const freq = startFreq + (endFreq - startFreq) * t;
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 6 * Math.PI) * 0.15 +
            (Math.random() - 0.5) * 0.12 * env
          ) * env * 0.55 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
      break;
    }
    case 'melody':
    default: {
      const sylLen = Math.floor(callLen / bird.syllables);
      const noteOffsets = [0, 4, 7, 5, 2, 9, 7, 0];
      let phase = 0;
      for (let s = 0; s < bird.syllables; s++) {
        const sylStart = s * sylLen;
        const useLen = Math.floor(sylLen * 0.75);
        const semitones = noteOffsets[s % noteOffsets.length] + (Math.random() - 0.5) * 2;
        const freq = f0 * Math.pow(2, semitones / 12);
        for (let i = 0; i < useLen; i++) {
          const t = i / useLen;
          const env = Math.sin(t * Math.PI);
          const vib = Math.sin((startSample + sylStart + i) / sr * 2 * Math.PI * bird.vibrato) * 6;
          phase += (freq + vib) / sr;
          const samp = Math.sin(phase * 2 * Math.PI) * env * 0.5 * chGain;
          const idx = startSample + sylStart + i;
          if (idx < d.length) d[idx] += samp;
        }
      }
    }
  }
}

// =====================================================================
// 🐺 WOLF HOWL Buffer
// =====================================================================
function wolfHowlBuffer(ctx: AudioContext, fundamental: number, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.003;
    // 1-2 howls per buffer
    const numHowls = 1 + Math.floor(Math.random() * 2);
    for (let h = 0; h < numHowls; h++) {
      const start = Math.floor(Math.random() * (len - sr * 5));
      const howlLen = Math.floor(sr * (3 + Math.random() * 2));
      let phase = 0;
      for (let i = 0; i < howlLen; i++) {
        const t = i / howlLen;
        // Slow rise and fall
        let env;
        if (t < 0.2) env = t / 0.2;
        else if (t < 0.7) env = 1;
        else env = 1 - (t - 0.7) / 0.3;
        const slowSweep = Math.sin(t * Math.PI) * fundamental * 0.4;
        const vib = Math.sin(t * Math.PI * 2 * 4) * 5;
        const freq = fundamental + slowSweep + vib;
        phase += freq / sr;
        const samp = (Math.sin(phase * 2 * Math.PI) * 0.5 + Math.sin(phase * 4 * Math.PI) * 0.2 + Math.sin(phase * 6 * Math.PI) * 0.08) * env * 0.5;
        if (start + i < len) d[start + i] += samp;
      }
    }
  }
  return buf;
}

// =====================================================================
// 🐬 DOLPHIN CLICKS
// =====================================================================
function dolphinBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = ctx.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.002;
    // Clicks and whistles
    let pos = Math.floor(Math.random() * sr * 0.5);
    while (pos < len - sr) {
      // Whistle (rising)
      const whistleLen = Math.floor(sr * (0.2 + Math.random() * 0.4));
      const startFreq = 5000 + Math.random() * 3000;
      const endFreq = startFreq + 2000 + Math.random() * 3000;
      let phase = 0;
      for (let i = 0; i < whistleLen; i++) {
        const t = i / whistleLen;
        const env = Math.sin(t * Math.PI);
        const freq = startFreq + (endFreq - startFreq) * t;
        phase += freq / sr;
        const samp = Math.sin(phase * 2 * Math.PI) * env * 0.3;
        if (pos + i < len) d[pos + i] += samp;
      }
      pos += whistleLen + Math.floor(sr * (0.3 + Math.random() * 1.5));
      // Cluster of clicks
      for (let c = 0; c < 4 + Math.floor(Math.random() * 4); c++) {
        const clickLen = Math.floor(sr * 0.005);
        const cf = 8000 + Math.random() * 4000;
        let cp = 0;
        for (let i = 0; i < clickLen; i++) {
          const env = Math.exp(-i / clickLen * 5);
          cp += cf / sr;
          if (pos + i < len) d[pos + i] += Math.sin(cp * 2 * Math.PI) * env * 0.2;
        }
        pos += clickLen + Math.floor(sr * 0.04);
      }
      pos += Math.floor(sr * (0.5 + Math.random() * 1.5));
    }
  }
  return buf;
}

// =====================================================================
// LAYER NODES
// =====================================================================
interface PlayingLayer {
  source?: AudioBufferSourceNode;
  oscillators?: OscillatorNode[];
  gain: GainNode;
  filter?: BiquadFilterNode;
  baseVolume: number;
  layerId: string;
  kind: LayerKind;
}

// =====================================================================
// AUDIO ENGINE
// =====================================================================
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private layers: Map<string, PlayingLayer> = new Map();
  private currentEnvId: string | null = null;
  private bufferCache: Map<string, AudioBuffer> = new Map();
  private isStarted = false;
  private masterVolume = 0.7;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.masterVolume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  setMasterVolume(v: number): void {
    this.masterVolume = Math.max(0, Math.min(1, v));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.masterVolume, this.ctx.currentTime + 0.2);
    }
  }

  get currentEnvironmentId(): string | null { return this.currentEnvId; }
  get playing(): boolean { return this.isStarted; }

  private getBuffer(ctx: AudioContext, layer: SoundLayer): AudioBuffer | null {
    let cacheKey: string = `${layer.kind}_${layer.id}`;
    if (layer.kind === 'bird') cacheKey = `bird_${layer.birdSpeciesId}`;
    if (layer.kind === 'wolf') cacheKey = `wolf_${layer.pitch || 240}`;
    if (this.bufferCache.has(cacheKey)) return this.bufferCache.get(cacheKey)!;

    let buf: AudioBuffer | null = null;
    switch (layer.kind) {
      case 'bird': {
        const bird = layer.birdSpeciesId ? getBird(layer.birdSpeciesId) : null;
        if (!bird) return null;
        buf = birdCallBuffer(ctx, bird, 12);
        break;
      }
      case 'rain': buf = rainBuffer(ctx, 0.7, 5); break;
      case 'rain_heavy': buf = rainBuffer(ctx, 1.2, 5); break;
      case 'rain_tent': buf = rainOnTentBuffer(ctx, 5); break;
      case 'thunder':
      case 'storm': buf = whiteNoise(ctx, 5); break;
      case 'ocean':
      case 'waves_gentle': buf = rainBuffer(ctx, 0.4, 5); break;
      case 'underwater': buf = underwaterBuffer(ctx, 5); break;
      case 'fire':
      case 'campfire': buf = fireBuffer(ctx, 5); break;
      case 'wind':
      case 'wind_arctic':
      case 'wind_desert':
      case 'forest': buf = pinkNoise(ctx, 5); break;
      case 'jungle': buf = jungleBuffer(ctx, 5); break;
      case 'stream': buf = streamBuffer(ctx, 5); break;
      case 'waterfall': buf = waterfallBuffer(ctx, 5); break;
      case 'river_rapids': buf = rapidsBuffer(ctx, 5); break;
      case 'crickets': buf = cricketsBuffer(ctx, 5); break;
      case 'frogs': buf = frogsBuffer(ctx, 8); break;
      case 'cicada': buf = cicadaBuffer(ctx, 5); break;
      case 'brown': buf = brownNoise(ctx, 5); break;
      case 'pink': buf = pinkNoise(ctx, 5); break;
      case 'white': buf = whiteNoise(ctx, 5); break;
      case 'snow': buf = snowBuffer(ctx, 5); break;
      case 'ice_crack': buf = iceCrackBuffer(ctx, 8); break;
      case 'train_distant': buf = trainBuffer(ctx, 5); break;
      case 'cafe': buf = cafeBuffer(ctx, 6); break;
      case 'library': buf = libraryBuffer(ctx, 8); break;
      case 'womb': buf = wombBuffer(ctx, 5); break;
      case 'wolf': buf = wolfHowlBuffer(ctx, layer.pitch || 240, 12); break;
      case 'dolphin': buf = dolphinBuffer(ctx, 8); break;
      default: return null;
    }
    if (buf) this.bufferCache.set(cacheKey, buf);
    return buf;
  }

  private createLayer(ctx: AudioContext, layer: SoundLayer): void {
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;

    // Synthesizer-based layers
    if (layer.kind === 'tone' && layer.toneId) { this.createToneLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'bowl') { this.createBowlLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'crystal_bowl') { this.createCrystalBowlLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'gong') { this.createGongLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'pad') { this.createPadLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'cosmic_pad') { this.createCosmicPadLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'om') { this.createOmLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra') { this.createMantraLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'throat_sing') { this.createThroatSingLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'didgeridoo') { this.createDidgeridoolLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'tanpura') { this.createTanpuraLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'sitar_drone') { this.createSitarLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'flute') { this.createFluteLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'bamboo_flute') { this.createBambooFluteLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'whale') { this.createWhaleLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'heartbeat') { this.createHeartbeatLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'chimes') { this.createChimesLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'wind_chimes') { this.createWindChimesLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'hang_drum') { this.createHangDrumLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'temple_bell') { this.createTempleBellLayer(ctx, layer, gainNode); return; }
    // 🙏 SACRED MANTRAS
    if (layer.kind === 'mantra_om')                 { this.createOmMantraLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_om_namah_shivaya')   { this.createShivaMantraLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_hare_krishna')       { this.createHareKrishnaLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_gayatri')            { this.createGayatriMantraLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_mahamrityunjaya')    { this.createMahamrityunjayaLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_om_mani_padme_hum')  { this.createBuddhistMantraLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_waheguru')           { this.createWaheguruLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_gregorian')          { this.createGregorianLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_sufi_allah')         { this.createSufiLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'mantra_native_american')    { this.createNativeChantLayer(ctx, layer, gainNode); return; }
    // 🪈 KRISHNA'S FLUTE
    if (layer.kind === 'krishna_bansuri')           { this.createKrishnaBansuriLayer(ctx, layer, gainNode); return; }
    // 🏔️ MOUNTAIN
    if (layer.kind === 'tibetan_horn')              { this.createTibetanHornLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'yak_bells')                 { this.createYakBellsLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'cave_drips')                { this.createCaveDripsLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'avalanche')                 { this.createAvalancheLayer(ctx, layer, gainNode); return; }
    // 🦁 WILDLIFE
    if (layer.kind === 'lion_roar')                 { this.createBigCatRoarLayer(ctx, layer, gainNode, 'lion'); return; }
    if (layer.kind === 'tiger_roar')                { this.createBigCatRoarLayer(ctx, layer, gainNode, 'tiger'); return; }
    if (layer.kind === 'elephant_trumpet')          { this.createElephantLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'monkey_howler')             { this.createHowlerMonkeyLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'coyote_howl')               { this.createCoyoteHowlLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'bear_growl')                { this.createBearGrowlLayer(ctx, layer, gainNode); return; }
    if (layer.kind === 'deer_call')                 { this.createDeerCallLayer(ctx, layer, gainNode); return; }

    // Buffer-based layers
    const buf = this.getBuffer(ctx, layer);
    if (!buf) return;
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    this.configureFilter(filter, layer);
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain!);
    source.start(0);
    this.layers.set(layer.id, {
      source, gain: gainNode, filter,
      baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind,
    });
  }

  private configureFilter(filter: BiquadFilterNode, layer: SoundLayer) {
    const bird = layer.birdSpeciesId ? getBird(layer.birdSpeciesId) : null;
    switch (layer.kind) {
      case 'bird':
        filter.type = 'bandpass';
        filter.frequency.value = bird?.fundamental || 3000;
        filter.Q.value = bird?.filterQ || 3; break;
      case 'rain':
      case 'rain_heavy':
        filter.type = 'highpass'; filter.frequency.value = 800; filter.Q.value = 0.5; break;
      case 'rain_tent':
        filter.type = 'bandpass'; filter.frequency.value = 1500; filter.Q.value = 0.7; break;
      case 'thunder':
      case 'storm':
        filter.type = 'lowpass'; filter.frequency.value = 180; filter.Q.value = 1; break;
      case 'ocean':
      case 'waves_gentle':
        filter.type = 'lowpass'; filter.frequency.value = 600; filter.Q.value = 0.7; break;
      case 'underwater':
        filter.type = 'lowpass'; filter.frequency.value = 350; filter.Q.value = 0.8; break;
      case 'fire':
      case 'campfire':
        filter.type = 'bandpass'; filter.frequency.value = 1200; filter.Q.value = 0.7; break;
      case 'wind':
        filter.type = 'bandpass'; filter.frequency.value = 450; filter.Q.value = 0.4; break;
      case 'wind_arctic':
        filter.type = 'highpass'; filter.frequency.value = 600; filter.Q.value = 0.5; break;
      case 'wind_desert':
        filter.type = 'bandpass'; filter.frequency.value = 350; filter.Q.value = 0.3; break;
      case 'forest':
        filter.type = 'bandpass'; filter.frequency.value = 600; filter.Q.value = 0.6; break;
      case 'jungle':
        filter.type = 'bandpass'; filter.frequency.value = 800; filter.Q.value = 0.5; break;
      case 'stream':
        filter.type = 'bandpass'; filter.frequency.value = 2000; filter.Q.value = 1.4; break;
      case 'waterfall':
        filter.type = 'highpass'; filter.frequency.value = 400; filter.Q.value = 0.4; break;
      case 'river_rapids':
        filter.type = 'highpass'; filter.frequency.value = 600; filter.Q.value = 0.5; break;
      case 'crickets':
        filter.type = 'bandpass'; filter.frequency.value = 4500; filter.Q.value = 8; break;
      case 'frogs':
        filter.type = 'bandpass'; filter.frequency.value = 250; filter.Q.value = 1; break;
      case 'cicada':
        filter.type = 'bandpass'; filter.frequency.value = 4000; filter.Q.value = 4; break;
      case 'brown':
        filter.type = 'lowpass'; filter.frequency.value = 150; filter.Q.value = 0.5; break;
      case 'pink':
        filter.type = 'lowpass'; filter.frequency.value = 800; filter.Q.value = 0.5; break;
      case 'white':
        filter.type = 'allpass'; break;
      case 'snow':
        filter.type = 'lowpass'; filter.frequency.value = 250; filter.Q.value = 0.5; break;
      case 'ice_crack':
        filter.type = 'bandpass'; filter.frequency.value = 200; filter.Q.value = 2; break;
      case 'train_distant':
        filter.type = 'lowpass'; filter.frequency.value = 250; filter.Q.value = 0.7; break;
      case 'cafe':
        filter.type = 'bandpass'; filter.frequency.value = 800; filter.Q.value = 0.5; break;
      case 'library':
        filter.type = 'lowpass'; filter.frequency.value = 1500; filter.Q.value = 0.5; break;
      case 'womb':
        filter.type = 'lowpass'; filter.frequency.value = 200; filter.Q.value = 0.6; break;
      case 'wolf':
        filter.type = 'bandpass'; filter.frequency.value = layer.pitch || 240; filter.Q.value = 2.5; break;
      case 'dolphin':
        filter.type = 'highpass'; filter.frequency.value = 3000; filter.Q.value = 0.5; break;
      default:
        filter.type = 'allpass';
    }
  }

  // 🎵 HEALING TONE
  private createToneLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const tone = layer.toneId ? getTone(layer.toneId) : null;
    if (!tone) return;
    const oscillators: OscillatorNode[] = [];

    if (tone.binaural) {
      const merger = ctx.createChannelMerger(2);
      const oscL = ctx.createOscillator(); oscL.type = 'sine'; oscL.frequency.value = tone.frequency;
      const gL = ctx.createGain(); gL.gain.value = 0.5;
      oscL.connect(gL); gL.connect(merger, 0, 0); oscL.start(); oscillators.push(oscL);
      const oscR = ctx.createOscillator(); oscR.type = 'sine'; oscR.frequency.value = tone.frequency + tone.binaural;
      const gR = ctx.createGain(); gR.gain.value = 0.5;
      oscR.connect(gR); gR.connect(merger, 0, 1); oscR.start(); oscillators.push(oscR);
      merger.connect(gainNode);
    } else {
      const fund = ctx.createOscillator(); fund.type = 'sine'; fund.frequency.value = tone.frequency;
      const fg = ctx.createGain(); fg.gain.value = 0.6;
      fund.connect(fg); fg.connect(gainNode); fund.start(); oscillators.push(fund);
      const h2 = ctx.createOscillator(); h2.type = 'sine'; h2.frequency.value = tone.frequency * 2;
      const h2g = ctx.createGain(); h2g.gain.value = 0.12;
      h2.connect(h2g); h2g.connect(gainNode); h2.start(); oscillators.push(h2);
      const h3 = ctx.createOscillator(); h3.type = 'sine'; h3.frequency.value = tone.frequency * 3;
      const h3g = ctx.createGain(); h3g.gain.value = 0.05;
      h3.connect(h3g); h3g.connect(gainNode); h3.start(); oscillators.push(h3);
      const lfo = ctx.createOscillator(); lfo.type = 'sine'; lfo.frequency.value = 0.2;
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.5;
      lfo.connect(lfoG); lfoG.connect(fund.detune); lfo.start(); oscillators.push(lfo);
    }
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🔔 TIBETAN SINGING BOWL
  private createBowlLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 220;
    const oscillators: OscillatorNode[] = [];
    const ratios = [1, 2.0, 2.65, 4.1];
    const gains = [0.5, 0.3, 0.15, 0.08];
    ratios.forEach((r, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f * r;
      const g = ctx.createGain(); g.gain.value = gains[i];
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.15 + i * 0.07;
      const lfoG = ctx.createGain(); lfoG.gain.value = gains[i] * 0.4;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
      o.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 💎 CRYSTAL SINGING BOWL (purer, brighter, longer)
  private createCrystalBowlLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 528;
    const oscillators: OscillatorNode[] = [];
    // Crystal bowls are nearly pure with very long sustain
    const ratios = [1, 2, 3, 4];
    const gains = [0.55, 0.18, 0.08, 0.04];
    ratios.forEach((r, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f * r;
      const g = ctx.createGain(); g.gain.value = gains[i];
      // Slow shimmer
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08 + i * 0.04;
      const lfoG = ctx.createGain(); lfoG.gain.value = gains[i] * 0.3;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
      // Detune shimmer
      const detuneLfo = ctx.createOscillator(); detuneLfo.frequency.value = 0.3;
      const detuneG = ctx.createGain(); detuneG.gain.value = 1.5;
      detuneLfo.connect(detuneG); detuneG.connect(o.detune); detuneLfo.start();
      o.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo, detuneLfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🥁 DEEP GONG (very low, inharmonic, slow swell)
  private createGongLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 80;
    const oscillators: OscillatorNode[] = [];
    const ratios = [1, 1.7, 2.4, 3.1, 4.5, 6.2];
    const gains = [0.5, 0.3, 0.18, 0.12, 0.08, 0.04];
    ratios.forEach((r, i) => {
      const o = ctx.createOscillator(); o.type = i === 0 ? 'triangle' : 'sine'; o.frequency.value = f * r;
      const g = ctx.createGain(); g.gain.value = gains[i];
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05 + i * 0.03;
      const lfoG = ctx.createGain(); lfoG.gain.value = gains[i] * 0.6;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
      o.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🎹 AMBIENT PAD
  private createPadLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 220;
    const oscillators: OscillatorNode[] = [];
    const intervals = [1, 1.5, 2, 3];
    intervals.forEach((interval, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? 'triangle' : 'sine';
      o.frequency.value = f * interval;
      o.detune.value = (Math.random() - 0.5) * 8;
      const g = ctx.createGain(); g.gain.value = 0.3 / (i + 1);
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.1 + i * 0.05;
      const lfoG = ctx.createGain(); lfoG.gain.value = 4;
      lfo.connect(lfoG); lfoG.connect(o.detune); lfo.start();
      o.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🌌 COSMIC PAD (deeper, more shimmer & ethereal)
  private createCosmicPadLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 110;
    const oscillators: OscillatorNode[] = [];
    const intervals = [0.5, 1, 1.498, 2, 2.997, 4]; // perfect fifth ratios for spacious feel
    intervals.forEach((interval, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? 'sawtooth' : 'sine';
      o.frequency.value = f * interval;
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800 + i * 200;
      filter.Q.value = 1;
      const g = ctx.createGain(); g.gain.value = 0.25 / (i + 1);
      // Slow cosmic LFO
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.05 + i * 0.03;
      const lfoG = ctx.createGain(); lfoG.gain.value = 200;
      lfo.connect(lfoG); lfoG.connect(filter.frequency); lfo.start();
      // Detune shimmer
      const detuneLfo = ctx.createOscillator(); detuneLfo.frequency.value = 0.2 + i * 0.1;
      const detuneG = ctx.createGain(); detuneG.gain.value = 12;
      detuneLfo.connect(detuneG); detuneG.connect(o.detune); detuneLfo.start();
      o.connect(filter); filter.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo, detuneLfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🕉️ OM DRONE
  private createOmLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 110;
    const oscillators: OscillatorNode[] = [];
    const ratios = [1, 2, 3, 4, 5];
    const gains = [0.4, 0.2, 0.1, 0.06, 0.03];
    ratios.forEach((r, i) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f * r;
      const g = ctx.createGain(); g.gain.value = gains[i];
      const lfo = ctx.createOscillator(); lfo.frequency.value = 4 + i * 0.3;
      const lfoG = ctx.createGain(); lfoG.gain.value = gains[i] * 0.3;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
      o.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🙏 MANTRA (vowel-like formant chant)
  private createMantraLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 110;
    const oscillators: OscillatorNode[] = [];
    // Sawtooth with vowel formant filters (Aaa-Uuu-Mmm cycle)
    const carrier = ctx.createOscillator(); carrier.type = 'sawtooth'; carrier.frequency.value = f;
    const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 730; f1.Q.value = 8;
    const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1090; f2.Q.value = 10;
    const f3 = ctx.createBiquadFilter(); f3.type = 'bandpass'; f3.frequency.value = 2440; f3.Q.value = 12;
    const mix = ctx.createGain(); mix.gain.value = 0.4;
    carrier.connect(f1); carrier.connect(f2); carrier.connect(f3);
    f1.connect(mix); f2.connect(mix); f3.connect(mix);
    mix.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    // Slow vowel cycle (Aaa→Uuu→Mmm)
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08;
    const lfoG = ctx.createGain(); lfoG.gain.value = 400;
    lfo.connect(lfoG); lfoG.connect(f1.frequency); lfo.start(); oscillators.push(lfo);
    // Slight pitch wobble
    const vibLfo = ctx.createOscillator(); vibLfo.frequency.value = 4.5;
    const vibG = ctx.createGain(); vibG.gain.value = 4;
    vibLfo.connect(vibG); vibG.connect(carrier.detune); vibLfo.start(); oscillators.push(vibLfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🎤 TIBETAN THROAT SINGING (overtone)
  private createThroatSingLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 90;
    const oscillators: OscillatorNode[] = [];
    // Strong fundamental + isolated high overtone (whistling formant)
    const fund = ctx.createOscillator(); fund.type = 'sawtooth'; fund.frequency.value = f;
    const fg = ctx.createGain(); fg.gain.value = 0.35;
    const fundFilter = ctx.createBiquadFilter(); fundFilter.type = 'lowpass'; fundFilter.frequency.value = 400; fundFilter.Q.value = 2;
    fund.connect(fundFilter); fundFilter.connect(fg); fg.connect(gainNode);
    fund.start(); oscillators.push(fund);
    // Whistling overtone (8th harmonic), filtered narrowly
    const overtone = ctx.createOscillator(); overtone.type = 'sine'; overtone.frequency.value = f * 8;
    const og = ctx.createGain(); og.gain.value = 0.15;
    overtone.connect(og); og.connect(gainNode);
    overtone.start(); oscillators.push(overtone);
    // Wobble throat
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.1;
    const lfoG = ctx.createGain(); lfoG.gain.value = 200;
    lfo.connect(lfoG); lfoG.connect(overtone.frequency); lfo.start(); oscillators.push(lfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🪈 DIDGERIDOO (very low drone with formant pulses)
  private createDidgeridoolLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 73;
    const oscillators: OscillatorNode[] = [];
    const carrier = ctx.createOscillator(); carrier.type = 'sawtooth'; carrier.frequency.value = f;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 350; filter.Q.value = 4;
    const cg = ctx.createGain(); cg.gain.value = 0.45;
    carrier.connect(filter); filter.connect(cg); cg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    // Breathing rhythm
    const breathLfo = ctx.createOscillator(); breathLfo.frequency.value = 0.7;
    const breathG = ctx.createGain(); breathG.gain.value = 0.3;
    breathLfo.connect(breathG); breathG.connect(cg.gain); breathLfo.start(); oscillators.push(breathLfo);
    // Formant wobble (vocal "wah-wah")
    const formLfo = ctx.createOscillator(); formLfo.frequency.value = 0.6;
    const formG = ctx.createGain(); formG.gain.value = 200;
    formLfo.connect(formG); formG.connect(filter.frequency); formLfo.start(); oscillators.push(formLfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🪕 TANPURA (Indian classical drone with sympathetic strings)
  private createTanpuraLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 146;
    const oscillators: OscillatorNode[] = [];
    // Tanpura tuning: Pa-Sa-Sa-Sa (fifth, octaves)
    const tuning = [f * 1.5, f, f, f * 0.5];
    tuning.forEach((freq, i) => {
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = freq;
      o.detune.value = (Math.random() - 0.5) * 6;
      const g = ctx.createGain(); g.gain.value = 0.2;
      // Pluck rhythm — slow swell
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.4 + i * 0.05;
      const lfoG = ctx.createGain(); lfoG.gain.value = 0.18;
      lfo.connect(lfoG); lfoG.connect(g.gain); lfo.start();
      // Add 2nd & 3rd harmonics for buzzing string character
      const h2 = ctx.createOscillator(); h2.type = 'sine'; h2.frequency.value = freq * 2;
      const h2g = ctx.createGain(); h2g.gain.value = 0.05;
      h2.connect(h2g); h2g.connect(gainNode); h2.start(); oscillators.push(h2);
      o.connect(g); g.connect(gainNode); o.start();
      oscillators.push(o, lfo);
    });
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🎻 SITAR DRONE (with characteristic shimmer)
  private createSitarLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 146;
    const oscillators: OscillatorNode[] = [];
    const carrier = ctx.createOscillator(); carrier.type = 'sawtooth'; carrier.frequency.value = f;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1200; filter.Q.value = 5;
    const cg = ctx.createGain(); cg.gain.value = 0.3;
    carrier.connect(filter); filter.connect(cg); cg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    // Sitar buzz (jawari)
    const buzz = ctx.createOscillator(); buzz.type = 'square'; buzz.frequency.value = f * 4;
    const bg = ctx.createGain(); bg.gain.value = 0.04;
    buzz.connect(bg); bg.connect(gainNode); buzz.start(); oscillators.push(buzz);
    // Filter sweep
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.15;
    const lfoG = ctx.createGain(); lfoG.gain.value = 400;
    lfo.connect(lfoG); lfoG.connect(filter.frequency); lfo.start(); oscillators.push(lfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🪈 NATIVE AMERICAN FLUTE (breathy)
  private createFluteLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 293;
    const oscillators: OscillatorNode[] = [];
    // Pentatonic phrase (A minor pent: A C D E G)
    const notes = [f, f * 1.189, f * 1.335, f * 1.498, f * 1.682];
    const carrier = ctx.createOscillator(); carrier.type = 'sine'; carrier.frequency.value = f;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 2000; filter.Q.value = 1;
    const fg = ctx.createGain(); fg.gain.value = 0.4;
    // Breath noise
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = pinkNoise(ctx, 4); noiseSrc.loop = true;
    const noiseFilter = ctx.createBiquadFilter(); noiseFilter.type = 'highpass'; noiseFilter.frequency.value = 800;
    const ng = ctx.createGain(); ng.gain.value = 0.06;
    noiseSrc.connect(noiseFilter); noiseFilter.connect(ng); ng.connect(gainNode);
    noiseSrc.start();
    carrier.connect(filter); filter.connect(fg); fg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    // Slow note changes
    let noteIdx = 0;
    const changeNote = () => {
      if (!this.ctx) return;
      noteIdx = Math.floor(Math.random() * notes.length);
      carrier.frequency.linearRampToValueAtTime(notes[noteIdx], this.ctx.currentTime + 0.5);
    };
    const noteInterval = setInterval(changeNote, 3500);
    (carrier as any)._noteInterval = noteInterval;
    // Vibrato
    const vibLfo = ctx.createOscillator(); vibLfo.frequency.value = 5;
    const vibG = ctx.createGain(); vibG.gain.value = 6;
    vibLfo.connect(vibG); vibG.connect(carrier.detune); vibLfo.start(); oscillators.push(vibLfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, {
      oscillators: [...oscillators], source: noiseSrc as any, gain: gainNode,
      baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind
    });
  }

  // 🎋 BAMBOO SHAKUHACHI (more breathy, oriental scale)
  private createBambooFluteLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 440;
    const oscillators: OscillatorNode[] = [];
    // Japanese pentatonic: D E G A B
    const notes = [f, f * 1.122, f * 1.335, f * 1.498, f * 1.682];
    const carrier = ctx.createOscillator(); carrier.type = 'triangle'; carrier.frequency.value = f;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 1800; filter.Q.value = 2;
    const fg = ctx.createGain(); fg.gain.value = 0.35;
    // More breath
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = pinkNoise(ctx, 4); noiseSrc.loop = true;
    const noiseFilter = ctx.createBiquadFilter(); noiseFilter.type = 'highpass'; noiseFilter.frequency.value = 1200;
    const ng = ctx.createGain(); ng.gain.value = 0.1;
    noiseSrc.connect(noiseFilter); noiseFilter.connect(ng); ng.connect(gainNode);
    noiseSrc.start();
    carrier.connect(filter); filter.connect(fg); fg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    let noteIdx = 0;
    const changeNote = () => {
      if (!this.ctx) return;
      noteIdx = Math.floor(Math.random() * notes.length);
      carrier.frequency.linearRampToValueAtTime(notes[noteIdx], this.ctx.currentTime + 0.6);
    };
    const noteInterval = setInterval(changeNote, 4000);
    (carrier as any)._noteInterval = noteInterval;
    const vibLfo = ctx.createOscillator(); vibLfo.frequency.value = 4;
    const vibG = ctx.createGain(); vibG.gain.value = 8;
    vibLfo.connect(vibG); vibG.connect(carrier.detune); vibLfo.start(); oscillators.push(vibLfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, {
      oscillators, source: noiseSrc as any, gain: gainNode,
      baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind
    });
  }

  // 🐋 WHALE SONG (long, slow pitch sweeps in low frequencies)
  private createWhaleLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 180;
    const oscillators: OscillatorNode[] = [];
    const carrier = ctx.createOscillator(); carrier.type = 'sine'; carrier.frequency.value = f;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 800; filter.Q.value = 2;
    const cg = ctx.createGain(); cg.gain.value = 0.5;
    carrier.connect(filter); filter.connect(cg); cg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    // Add 2nd harmonic
    const h2 = ctx.createOscillator(); h2.type = 'sine'; h2.frequency.value = f * 2;
    const h2g = ctx.createGain(); h2g.gain.value = 0.15;
    h2.connect(h2g); h2g.connect(gainNode); h2.start(); oscillators.push(h2);
    // Slow long-form pitch sweep (whale "song")
    const sweepLfo = ctx.createOscillator(); sweepLfo.type = 'sine'; sweepLfo.frequency.value = 0.08;
    const sweepG = ctx.createGain(); sweepG.gain.value = 80;
    sweepLfo.connect(sweepG); sweepG.connect(carrier.frequency); sweepLfo.start(); oscillators.push(sweepLfo);
    // Amplitude swells
    const ampLfo = ctx.createOscillator(); ampLfo.frequency.value = 0.05;
    const ampG = ctx.createGain(); ampG.gain.value = 0.35;
    ampLfo.connect(ampG); ampG.connect(cg.gain); ampLfo.start(); oscillators.push(ampLfo);
    // Subtle vibrato
    const vibLfo = ctx.createOscillator(); vibLfo.frequency.value = 3;
    const vibG = ctx.createGain(); vibG.gain.value = 4;
    vibLfo.connect(vibG); vibG.connect(carrier.detune); vibLfo.start(); oscillators.push(vibLfo);
    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // ❤️ HEARTBEAT (slow human heartbeat ~60 BPM)
  private createHeartbeatLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const beatLen = sr * 1.0; // 1 second per beat = 60 BPM
    const buf = ctx.createBuffer(2, beatLen, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      // "Lub" thump
      const lubStart = 0;
      const lubLen = sr * 0.18;
      let phase = 0;
      for (let i = 0; i < lubLen; i++) {
        const t = i / lubLen;
        const env = Math.exp(-t * 8);
        phase += 60 / sr;
        d[lubStart + i] = (Math.sin(phase * 2 * Math.PI) + Math.sin(phase * 4 * Math.PI) * 0.4) * env * 0.7;
      }
      // "Dub" thump (slightly later, lower)
      const dubStart = Math.floor(sr * 0.22);
      const dubLen = sr * 0.14;
      phase = 0;
      for (let i = 0; i < dubLen; i++) {
        const t = i / dubLen;
        const env = Math.exp(-t * 12);
        phase += 50 / sr;
        d[dubStart + i] = (Math.sin(phase * 2 * Math.PI) + Math.sin(phase * 4 * Math.PI) * 0.3) * env * 0.55;
      }
    }
    const source = ctx.createBufferSource();
    source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 200; filter.Q.value = 1;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!);
    source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🎐 RANDOM CHIMES
  private createChimesLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 8;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      const numChimes = 4 + Math.floor(Math.random() * 3);
      for (let c = 0; c < numChimes; c++) {
        const start = Math.floor(Math.random() * (len - sr * 2));
        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)] * 2;
        const decay = sr * (1.5 + Math.random() * 1.5);
        let phase = 0;
        for (let i = 0; i < decay; i++) {
          if (start + i >= len) break;
          const t = i / decay;
          const env = Math.exp(-t * 4);
          phase += freq / sr;
          d[start + i] += (Math.sin(phase * 2 * Math.PI) * 0.7 + Math.sin(phase * 2 * Math.PI * 2.76) * 0.3) * env * 0.4;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    source.connect(gainNode); gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🎐 METALLIC WIND CHIMES (sparkling clusters)
  private createWindChimesLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 10;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    // Pentatonic high
    const notes = [523, 587, 659, 784, 880, 1047, 1175, 1319];
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      // 3-5 wind chime clusters
      const numClusters = 3 + Math.floor(Math.random() * 3);
      for (let c = 0; c < numClusters; c++) {
        const clusterStart = Math.floor(Math.random() * (len - sr * 3));
        const numStrikes = 2 + Math.floor(Math.random() * 4);
        for (let s = 0; s < numStrikes; s++) {
          const start = clusterStart + Math.floor(Math.random() * sr * 0.5);
          const freq = notes[Math.floor(Math.random() * notes.length)];
          const decay = sr * (2 + Math.random() * 2);
          let phase = 0;
          for (let i = 0; i < decay; i++) {
            if (start + i >= len) break;
            const t = i / decay;
            const env = Math.exp(-t * 3);
            phase += freq / sr;
            // Inharmonic metallic ratios
            const samp = (Math.sin(phase * 2 * Math.PI) * 0.5 + Math.sin(phase * 2 * Math.PI * 2.4) * 0.3 + Math.sin(phase * 2 * Math.PI * 4.7) * 0.15) * env * 0.3;
            d[start + i] += samp;
          }
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    source.connect(gainNode); gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🪘 HANG DRUM (heavenly metallic pitched percussion)
  private createHangDrumLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    const f = layer.pitch || 293; // D
    // Hang drum scale: D F G A C D F (D minor)
    const scale = [f, f * 1.189, f * 1.335, f * 1.498, f * 1.782, f * 2, f * 2.378];
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      // 6-10 strikes per buffer
      const numStrikes = 7 + Math.floor(Math.random() * 4);
      let pos = Math.floor(sr * 0.5);
      for (let s = 0; s < numStrikes; s++) {
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const decay = sr * (2.5 + Math.random() * 1.5);
        let phase = 0;
        for (let i = 0; i < decay; i++) {
          if (pos + i >= len) break;
          const t = i / decay;
          const env = Math.exp(-t * 2.5);
          phase += freq / sr;
          // Hang drum ratios: fundamental + 2x + 3x + slight 4.7x metallic
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.55 +
            Math.sin(phase * 4 * Math.PI) * 0.25 +
            Math.sin(phase * 6 * Math.PI) * 0.12 +
            Math.sin(phase * 2 * Math.PI * 4.7) * 0.06
          ) * env * 0.4;
          d[pos + i] += samp;
        }
        pos += Math.floor(sr * (0.7 + Math.random() * 1.5));
        if (pos >= len) break;
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    source.connect(gainNode); gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🛕 BUDDHIST TEMPLE BELL
  private createTempleBellLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      // 1-2 bells per buffer
      const numBells = 1 + Math.floor(Math.random() * 2);
      for (let b = 0; b < numBells; b++) {
        const start = Math.floor(Math.random() * (len - sr * 6));
        const freq = 220 + Math.random() * 100;
        const decay = sr * (5 + Math.random() * 3);
        let phase = 0;
        for (let i = 0; i < decay; i++) {
          if (start + i >= len) break;
          const t = i / decay;
          const env = Math.exp(-t * 1.2);
          phase += freq / sr;
          // Strong fundamental + inharmonic bell partials
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.5 +
            Math.sin(phase * 2 * Math.PI * 2.76) * 0.3 +
            Math.sin(phase * 2 * Math.PI * 5.4) * 0.15 +
            Math.sin(phase * 2 * Math.PI * 8.9) * 0.08
          ) * env * 0.45;
          d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    source.connect(gainNode); gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // =====================================================================
  // 🙏 GENERIC MANTRA CHANT BUFFER BUILDER
  // Creates a looping vocal chant buffer using vowel-formant synthesis.
  // Each syllable: pitch offset (semitones) + duration + vowel type
  // =====================================================================
  private buildChantBuffer(
    ctx: AudioContext,
    syllables: Array<{ pitch: number; durMs: number; vowel: 'a'|'i'|'u'|'o'|'e'|'m' }>,
    basePitch: number,
    breathMs: number,
    voiceType: 'male' | 'female' | 'monk' | 'choir' = 'male',
  ): AudioBuffer {
    const sr = ctx.sampleRate;
    const totalMs = syllables.reduce((s, x) => s + x.durMs, 0) + breathMs;
    const totalLen = Math.floor(sr * (totalMs / 1000));
    const buf = ctx.createBuffer(2, totalLen, sr);

    // Vowel formants (F1, F2, F3) — based on standard phonetics
    const vowels: Record<string, [number, number, number]> = {
      'a': [730, 1090, 2440],   // "ah" (pa, na, ya)
      'i': [270, 2290, 3010],   // "ee" (mi, hi)
      'u': [300, 870, 2240],    // "oo" (gu, ru)
      'o': [570, 840, 2410],    // "oh" (om, ko)
      'e': [530, 1840, 2480],   // "eh" (re, hare)
      'm': [250, 1100, 2200],   // "mmm" (humming)
    };

    const voiceMul = voiceType === 'female' ? 1.5 : voiceType === 'monk' ? 0.7 : voiceType === 'choir' ? 1.0 : 1.0;
    const carrierFreqBase = basePitch * voiceMul;

    let cursor = 0;
    for (const syl of syllables) {
      const sylLen = Math.floor(sr * (syl.durMs / 1000));
      const pitchHz = carrierFreqBase * Math.pow(2, syl.pitch / 12);
      const formants = vowels[syl.vowel];
      const isM = syl.vowel === 'm';

      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        let phase = 0;
        const detune = ch === 0 ? 1.0 : 1.003; // subtle stereo width via micro-detune

        for (let i = 0; i < sylLen; i++) {
          const t = i / sylLen;
          // Smooth attack/release envelope
          let env;
          if (t < 0.08) env = t / 0.08;
          else if (t > 0.85) env = (1 - t) / 0.15;
          else env = 1;
          // Singer pitch drift + vibrato
          const drift = Math.sin(t * Math.PI * 0.7) * 0.3;
          const vibrato = Math.sin(t * 2 * Math.PI * 5.5) * (isM ? 1 : 3);
          const freq = pitchHz * detune + drift + vibrato;
          phase += freq / sr;

          // Sawtooth-like carrier (vocal cord buzz)
          const carrier =
            Math.sin(phase * 2 * Math.PI) * 0.5 +
            Math.sin(phase * 4 * Math.PI) * 0.25 +
            Math.sin(phase * 6 * Math.PI) * 0.15 +
            Math.sin(phase * 8 * Math.PI) * 0.08 +
            Math.sin(phase * 10 * Math.PI) * 0.04;

          // Apply vowel formants (3-band resonant emphasis via simple band-add)
          const f1Period = sr / formants[0];
          const f2Period = sr / formants[1];
          const f3Period = sr / formants[2];
          const formant1 = Math.sin((i / f1Period) * 2 * Math.PI) * 0.15;
          const formant2 = Math.sin((i / f2Period) * 2 * Math.PI) * 0.10;
          const formant3 = Math.sin((i / f3Period) * 2 * Math.PI) * 0.05;
          // Modulate formants by carrier amplitude (vocal-tract filtering simulation)
          const voicedFormants = (formant1 + formant2 + formant3) * Math.abs(carrier);

          // Breath noise mixed in
          const breath = (Math.random() - 0.5) * 0.025 * env;
          // Final voice
          const voice = (carrier * 0.5 + voicedFormants * 0.5 + breath) * env * 0.45;
          d[cursor + i] += voice;
        }
      }
      cursor += sylLen;
    }
    // Breath gap left as silence
    return buf;
  }

  private playChantBuffer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode, buf: AudioBuffer, lowpass: number = 4000) {
    const source = ctx.createBufferSource();
    source.buffer = buf;
    source.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = lowpass; filter.Q.value = 0.5;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!);
    source.start(0);
    this.layers.set(layer.id, {
      source, gain: gainNode, filter,
      baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind,
    });
  }

  // 🕉️ Pure Om Chant (continuous vibration)
  private createOmMantraLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 800, vowel: 'a' },   // A (ahhh)
      { pitch: 0, durMs: 800, vowel: 'u' },   // U (oooh)
      { pitch: -2, durMs: 1600, vowel: 'm' }, // M (mmmm)
    ], layer.pitch || 130, 1200, 'male');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3500);
  }

  // 🕉️ Om Namah Shivaya (5 sacred syllables)
  // "Om-Na-mah-Shi-va-ya"
  private createShivaMantraLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 700, vowel: 'o' },    // Om
      { pitch: 2, durMs: 280, vowel: 'a' },    // Na
      { pitch: 0, durMs: 280, vowel: 'a' },    // Mah
      { pitch: -3, durMs: 380, vowel: 'i' },   // Shi
      { pitch: 0, durMs: 380, vowel: 'a' },    // Va
      { pitch: -2, durMs: 900, vowel: 'a' },   // Ya
    ], layer.pitch || 130, 1500, 'monk');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3500);
  }

  // 🦚 Hare Krishna Maha-Mantra (16 syllables — Krishna kirtan)
  // "Hare Krishna Hare Krishna Krishna Krishna Hare Hare
  //  Hare Rama Hare Rama Rama Rama Hare Hare"
  private createHareKrishnaLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    // Classic kirtan melody — descending then rising
    const dur = 280;
    const buf = this.buildChantBuffer(ctx, [
      // Hare Krishna Hare Krishna
      { pitch: 5, durMs: dur, vowel: 'a' }, { pitch: 5, durMs: dur, vowel: 'e' },     // Ha-re
      { pitch: 4, durMs: dur, vowel: 'i' }, { pitch: 3, durMs: dur, vowel: 'a' },     // Krish-na
      { pitch: 5, durMs: dur, vowel: 'a' }, { pitch: 5, durMs: dur, vowel: 'e' },     // Ha-re
      { pitch: 4, durMs: dur, vowel: 'i' }, { pitch: 3, durMs: dur, vowel: 'a' },     // Krish-na
      // Krishna Krishna Hare Hare
      { pitch: 4, durMs: dur, vowel: 'i' }, { pitch: 3, durMs: dur, vowel: 'a' },     // Krish-na
      { pitch: 4, durMs: dur, vowel: 'i' }, { pitch: 3, durMs: dur, vowel: 'a' },     // Krish-na
      { pitch: 5, durMs: dur, vowel: 'a' }, { pitch: 5, durMs: dur, vowel: 'e' },     // Ha-re
      { pitch: 5, durMs: dur, vowel: 'a' }, { pitch: 5, durMs: dur, vowel: 'e' },     // Ha-re
    ], layer.pitch || 165, 800, 'choir');
    this.playChantBuffer(ctx, layer, gainNode, buf, 4000);
  }

  // ☀️ Gayatri Mantra (Vedic sun mantra)
  // "Om Bhur Bhuvah Svaha Tat Savitur Varenyam..."
  private createGayatriMantraLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 700, vowel: 'o' },    // Om
      { pitch: -2, durMs: 350, vowel: 'u' },   // Bhur
      { pitch: 0, durMs: 350, vowel: 'u' },    // Bhu
      { pitch: -2, durMs: 350, vowel: 'a' },   // vah
      { pitch: 2, durMs: 600, vowel: 'a' },    // Sva-ha
      { pitch: 0, durMs: 350, vowel: 'a' },    // Tat
      { pitch: -3, durMs: 350, vowel: 'a' },   // Sa-
      { pitch: 0, durMs: 350, vowel: 'i' },    // -vi
      { pitch: 2, durMs: 350, vowel: 'u' },    // -tur
      { pitch: 0, durMs: 600, vowel: 'a' },    // (sustain)
    ], layer.pitch || 146, 1400, 'monk');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3000);
  }

  // 🕉️ Mahamrityunjaya (Healing mantra to Lord Shiva)
  private createMahamrityunjayaLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 700, vowel: 'o' },    // Om
      { pitch: 3, durMs: 380, vowel: 'a' },    // Tryam-
      { pitch: 0, durMs: 380, vowel: 'a' },    // -ba-
      { pitch: 2, durMs: 380, vowel: 'a' },    // -kam
      { pitch: 0, durMs: 380, vowel: 'a' },    // ya-
      { pitch: -3, durMs: 380, vowel: 'a' },   // -ja-
      { pitch: 0, durMs: 380, vowel: 'a' },    // -ma-
      { pitch: -2, durMs: 600, vowel: 'e' },   // -he
    ], layer.pitch || 130, 1300, 'monk');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3200);
  }

  // ☸️ Om Mani Padme Hum (Buddhist compassion mantra)
  private createBuddhistMantraLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 800, vowel: 'o' },    // Om
      { pitch: -2, durMs: 400, vowel: 'a' },   // Ma
      { pitch: -2, durMs: 400, vowel: 'i' },   // Ni
      { pitch: 0, durMs: 400, vowel: 'a' },    // Pad
      { pitch: 0, durMs: 400, vowel: 'e' },    // Me
      { pitch: -3, durMs: 1000, vowel: 'u' },  // Huuum
    ], layer.pitch || 110, 1500, 'monk');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3000);
  }

  // ☬ Waheguru (Sikh sacred name of God)
  private createWaheguruLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 350, vowel: 'a' },    // Wah
      { pitch: 3, durMs: 600, vowel: 'e' },    // -e
      { pitch: 2, durMs: 350, vowel: 'u' },    // gu-
      { pitch: -2, durMs: 700, vowel: 'u' },   // -ru
    ], layer.pitch || 146, 1200, 'choir');
    this.playChantBuffer(ctx, layer, gainNode, buf, 2500);
  }

  // ✝️ Gregorian chant style (Christian Latin)
  // "Ky-ri-e e-le-i-son" feel
  private createGregorianLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 700, vowel: 'i' },    // Ky-
      { pitch: 2, durMs: 500, vowel: 'i' },    // -ri-
      { pitch: 0, durMs: 600, vowel: 'e' },    // -e
      { pitch: -3, durMs: 700, vowel: 'e' },   // e-
      { pitch: 0, durMs: 500, vowel: 'e' },    // -le-
      { pitch: 2, durMs: 500, vowel: 'i' },    // -i-
      { pitch: -2, durMs: 900, vowel: 'o' },   // -son
    ], layer.pitch || 130, 1800, 'choir');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3000);
  }

  // ☪️ Sufi Allah (Islamic Sufi remembrance — Dhikr)
  private createSufiLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 0, durMs: 700, vowel: 'a' },    // Al-
      { pitch: 3, durMs: 1200, vowel: 'a' },   // -laaah
      { pitch: 0, durMs: 700, vowel: 'a' },    // Al-
      { pitch: -3, durMs: 1200, vowel: 'a' },  // -laaah
    ], layer.pitch || 165, 1500, 'male');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3500);
  }

  // 🪶 Native American Sacred Chant
  private createNativeChantLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const buf = this.buildChantBuffer(ctx, [
      { pitch: 7, durMs: 600, vowel: 'a' },    // Hey
      { pitch: 5, durMs: 600, vowel: 'a' },    // Ya
      { pitch: 3, durMs: 600, vowel: 'o' },    // Ho
      { pitch: 0, durMs: 800, vowel: 'a' },    // Wa
      { pitch: 5, durMs: 600, vowel: 'a' },    // Hey
      { pitch: 3, durMs: 800, vowel: 'a' },    // Ya
    ], layer.pitch || 220, 1000, 'male');
    this.playChantBuffer(ctx, layer, gainNode, buf, 3500);
  }

  // 🪈 KRISHNA'S BANSURI (Lord Krishna's sacred bamboo flute)
  // Plays in Indian raga Yaman — soft, lyrical, with characteristic
  // pitch slides (meend) that distinguish bansuri from other flutes.
  private createKrishnaBansuriLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 261; // C4
    const oscillators: OscillatorNode[] = [];
    // Raga Yaman scale (peaceful evening raga associated with devotion):
    // Sa Re Ga(#) Ma(#) Pa Dha Ni Sa
    const ragaIntervals = [1.0, 1.125, 1.265, 1.42, 1.5, 1.6875, 1.898, 2.0];

    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = f;

    // Bamboo character — soft lowpass + warm midrange
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2400;
    filter.Q.value = 0.8;

    const fg = ctx.createGain();
    fg.gain.value = 0.45;

    // 2nd harmonic for warmth
    const h2 = ctx.createOscillator();
    h2.type = 'sine'; h2.frequency.value = f * 2;
    const h2g = ctx.createGain(); h2g.gain.value = 0.08;
    h2.connect(h2g); h2g.connect(gainNode); h2.start(); oscillators.push(h2);

    // Soft breath noise (key bansuri characteristic)
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = pinkNoise(ctx, 4); noiseSrc.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 2000;
    noiseFilter.Q.value = 0.5;
    const ng = ctx.createGain(); ng.gain.value = 0.04;
    noiseSrc.connect(noiseFilter); noiseFilter.connect(ng); ng.connect(gainNode);
    noiseSrc.start();

    carrier.connect(filter); filter.connect(fg); fg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);

    // Slow note changes with smooth slides (meend)
    let noteIdx = 0;
    const playNote = () => {
      if (!this.ctx) return;
      // Pick next note — favor neighboring notes for melodic flow
      const next = Math.max(0, Math.min(ragaIntervals.length - 1,
        noteIdx + Math.floor((Math.random() - 0.5) * 3)));
      noteIdx = next;
      const targetFreq = f * ragaIntervals[noteIdx];
      // Smooth slide (meend) over 500ms — bansuri's signature ornament
      carrier.frequency.cancelScheduledValues(this.ctx.currentTime);
      carrier.frequency.linearRampToValueAtTime(targetFreq, this.ctx.currentTime + 0.5);
      h2.frequency.linearRampToValueAtTime(targetFreq * 2, this.ctx.currentTime + 0.5);
      // Slight volume modulation for breath phrasing
      fg.gain.cancelScheduledValues(this.ctx.currentTime);
      fg.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.1);
      fg.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.6);
    };
    const noteInterval = setInterval(playNote, 2400);
    (carrier as any)._noteInterval = noteInterval;

    // Vibrato (gamak) — soft & slow
    const vibLfo = ctx.createOscillator();
    vibLfo.frequency.value = 4.5;
    const vibG = ctx.createGain(); vibG.gain.value = 5;
    vibLfo.connect(vibG); vibG.connect(carrier.detune); vibLfo.start(); oscillators.push(vibLfo);

    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, {
      oscillators, source: noiseSrc as any, gain: gainNode,
      baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind,
    });
  }

  // 🏔️ TIBETAN HORN (Dungchen — long deep mountain horn)
  private createTibetanHornLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const f = layer.pitch || 55; // very low
    const oscillators: OscillatorNode[] = [];
    const carrier = ctx.createOscillator();
    carrier.type = 'sawtooth';
    carrier.frequency.value = f;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 280;
    filter.Q.value = 3;
    const cg = ctx.createGain(); cg.gain.value = 0.5;
    carrier.connect(filter); filter.connect(cg); cg.connect(gainNode);
    carrier.start(); oscillators.push(carrier);
    // Breathing rhythm (very slow — monks holding long breaths)
    const breathLfo = ctx.createOscillator();
    breathLfo.frequency.value = 0.18;
    const breathG = ctx.createGain(); breathG.gain.value = 0.35;
    breathLfo.connect(breathG); breathG.connect(cg.gain); breathLfo.start(); oscillators.push(breathLfo);
    // Subtle pitch wobble (lung pressure variation)
    const wobble = ctx.createOscillator();
    wobble.frequency.value = 1.2;
    const wobbleG = ctx.createGain(); wobbleG.gain.value = 6;
    wobble.connect(wobbleG); wobbleG.connect(carrier.detune); wobble.start(); oscillators.push(wobble);

    gainNode.connect(this.masterGain!);
    this.layers.set(layer.id, { oscillators, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🐂 YAK BELLS (random metallic clanks of bells around yaks' necks)
  private createYakBellsLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    const bellFreqs = [380, 460, 540, 620]; // Cowbell-like low metallic
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      // Sparse irregular clanks (yaks moving in valley)
      for (let c = 0; c < 8 + Math.floor(Math.random() * 5); c++) {
        const start = Math.floor(Math.random() * (len - sr));
        const freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
        const decay = sr * (0.4 + Math.random() * 0.5);
        let phase = 0;
        for (let i = 0; i < decay; i++) {
          if (start + i >= len) break;
          const t = i / decay;
          const env = Math.exp(-t * 5);
          phase += freq / sr;
          // Cowbell: inharmonic clang
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 2 * Math.PI * 1.7) * 0.3 +
            Math.sin(phase * 2 * Math.PI * 2.9) * 0.2 +
            (i < 30 ? (Math.random() - 0.5) * 0.4 * (1 - i / 30) : 0)
          ) * env * 0.4;
          d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    source.connect(gainNode); gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 💧 CAVE DRIPS (mystical dripping water in cave with reverb tail)
  private createCaveDripsLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 10;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      // 6-12 drips
      const numDrips = 6 + Math.floor(Math.random() * 7);
      for (let i = 0; i < numDrips; i++) {
        const start = Math.floor(Math.random() * (len - sr * 2));
        const dripFreq = 800 + Math.random() * 1200;
        const dripLen = Math.floor(sr * 0.05);
        let phase = 0;
        for (let j = 0; j < dripLen; j++) {
          const t = j / dripLen;
          const env = Math.exp(-t * 25);
          phase += dripFreq / sr;
          if (start + j < len) d[start + j] += Math.sin(phase * 2 * Math.PI) * env * 0.45;
        }
        // Reverb tail (cave echo)
        const tailLen = Math.floor(sr * 1.5);
        for (let j = 0; j < tailLen; j++) {
          const tailPos = start + dripLen + j;
          if (tailPos >= len) break;
          const t = j / tailLen;
          const env = Math.exp(-t * 3);
          phase += dripFreq / sr;
          d[tailPos] += Math.sin(phase * 2 * Math.PI) * env * 0.08 * (Math.random() * 0.5 + 0.5);
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 3500; filter.Q.value = 1;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // ⛰️ AVALANCHE (deep distant rumble)
  private createAvalancheLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 8;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let last = 0;
      // Slow swell rumble
      for (let i = 0; i < len; i++) {
        const t = i / len;
        // Multi-stage envelope: build, sustain, decay
        const env = Math.sin(t * Math.PI) * (0.6 + Math.sin(t * 5) * 0.2);
        const w = Math.random() * 2 - 1;
        last = (last + 0.015 * w) / 1.015;
        // Occasional snow/rock cracks
        const crack = Math.random() < 0.0008 ? (Math.random() - 0.5) * 1.2 * env : 0;
        d[i] = (last * 4 + crack) * env;
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 200; filter.Q.value = 0.6;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🦁 BIG CAT ROARS (Lion / Tiger)
  private createBigCatRoarLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode, type: 'lion' | 'tiger') {
    const sr = ctx.sampleRate;
    const seconds = 10;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    const f0 = type === 'lion' ? 110 : 90;  // Lion slightly higher than tiger
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.003;
      // 1-2 roars per buffer
      const numRoars = 1 + Math.floor(Math.random() * 2);
      for (let r = 0; r < numRoars; r++) {
        const start = Math.floor(Math.random() * (len - sr * 4));
        const roarLen = Math.floor(sr * (2.5 + Math.random() * 1.5));
        let phase = 0;
        for (let i = 0; i < roarLen; i++) {
          const t = i / roarLen;
          // Powerful build then sustained roar then fade
          let env;
          if (t < 0.1) env = t / 0.1;
          else if (t < 0.5) env = 1;
          else if (t < 0.85) env = 1 - (t - 0.5) * 0.3;
          else env = (1 - 0.105) * (1 - (t - 0.85) / 0.15);
          // Growl modulation - very rough!
          const growl = 1 + Math.sin(t * 2 * Math.PI * (type === 'lion' ? 30 : 22)) * 0.18;
          // Slight pitch fall
          const freq = (f0 - t * 15) * growl;
          phase += freq / sr;
          // Stack of harmonics + noise = chest cavity resonance
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 6 * Math.PI) * 0.2 +
            Math.sin(phase * 8 * Math.PI) * 0.12 +
            (Math.random() - 0.5) * 0.18 * env  // breath/grit noise
          ) * env * 0.55;
          if (start + i < len) d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 800; filter.Q.value = 1.5;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🐘 ELEPHANT TRUMPET
  private createElephantLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.003;
      // 1-2 trumpets per buffer
      const numTrumpets = 1 + Math.floor(Math.random() * 2);
      for (let r = 0; r < numTrumpets; r++) {
        const start = Math.floor(Math.random() * (len - sr * 3));
        const callLen = Math.floor(sr * (1.5 + Math.random() * 1.0));
        // Two phases: rising blast + descending rumble
        let phase = 0;
        // Phase 1: rising trumpet blast
        const blastLen = Math.floor(callLen * 0.35);
        for (let i = 0; i < blastLen; i++) {
          const t = i / blastLen;
          const env = t < 0.15 ? t / 0.15 : 1;
          const freq = 350 + t * 600; // 350 → 950 Hz rise
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 6 * Math.PI) * 0.18 +
            Math.sin(phase * 8 * Math.PI) * 0.1 +
            (Math.random() - 0.5) * 0.15 * env
          ) * env * 0.6;
          if (start + i < len) d[start + i] += samp;
        }
        // Phase 2: descending rumble
        for (let i = blastLen; i < callLen; i++) {
          const localT = (i - blastLen) / (callLen - blastLen);
          const env = (1 - localT) * 0.7;
          const freq = 950 - localT * 700;  // descend
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.25 +
            (Math.random() - 0.5) * 0.1 * env
          ) * env * 0.55;
          if (start + i < len) d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 600; filter.Q.value = 1;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🐒 HOWLER MONKEY (deep haunting jungle howl)
  private createHowlerMonkeyLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 14;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.003;
      // 1-2 long howls
      const numHowls = 1 + Math.floor(Math.random() * 2);
      for (let h = 0; h < numHowls; h++) {
        const start = Math.floor(Math.random() * (len - sr * 5));
        const howlLen = Math.floor(sr * (3.5 + Math.random() * 1.5));
        let phase = 0;
        for (let i = 0; i < howlLen; i++) {
          const t = i / howlLen;
          let env;
          if (t < 0.15) env = t / 0.15;
          else if (t < 0.7) env = 1;
          else env = (1 - t) / 0.3;
          // Howler signature: deep guttural roar with breath rhythm
          const breathMod = 1 + Math.sin(t * 2 * Math.PI * 3) * 0.15;
          const freq = (200 + Math.sin(t * Math.PI) * 60) * breathMod;
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.45 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 6 * Math.PI) * 0.18 +
            (Math.random() - 0.5) * 0.18 * env
          ) * env * 0.5;
          if (start + i < len) d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 350; filter.Q.value = 1.5;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🐺 COYOTE (yipping & howling)
  private createCoyoteHowlLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.003;
      // Coyote calls = yipping (short bursts) followed by long howl
      let pos = Math.floor(Math.random() * sr);
      // Yips
      const numYips = 4 + Math.floor(Math.random() * 4);
      for (let y = 0; y < numYips; y++) {
        const yipLen = Math.floor(sr * 0.18);
        let phase = 0;
        const startFreq = 800 + Math.random() * 400;
        for (let i = 0; i < yipLen; i++) {
          const t = i / yipLen;
          const env = Math.sin(t * Math.PI);
          // Sharp pitch peak
          const freq = startFreq * (1 + Math.sin(t * Math.PI) * 0.4);
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.18 +
            (Math.random() - 0.5) * 0.06 * env
          ) * env * 0.45;
          if (pos + i < len) d[pos + i] += samp;
        }
        pos += yipLen + Math.floor(sr * (0.1 + Math.random() * 0.15));
        if (pos >= len) break;
      }
      // Long howl after yips
      if (pos < len - sr * 3) {
        const howlLen = Math.floor(sr * (1.8 + Math.random() * 1.2));
        let phase = 0;
        for (let i = 0; i < howlLen; i++) {
          const t = i / howlLen;
          let env;
          if (t < 0.1) env = t / 0.1;
          else if (t < 0.85) env = 1;
          else env = (1 - t) / 0.15;
          const slowSweep = Math.sin(t * Math.PI) * 200;
          const freq = 600 + slowSweep + Math.sin(t * Math.PI * 8) * 8;
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.5 +
            Math.sin(phase * 4 * Math.PI) * 0.22 +
            (Math.random() - 0.5) * 0.05 * env
          ) * env * 0.5;
          if (pos + i < len) d[pos + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 700; filter.Q.value = 2;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🐻 BEAR GROWL
  private createBearGrowlLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.002;
      const numGrowls = 1 + Math.floor(Math.random() * 2);
      for (let g = 0; g < numGrowls; g++) {
        const start = Math.floor(Math.random() * (len - sr * 3));
        const growlLen = Math.floor(sr * (1.5 + Math.random() * 1.5));
        let phase = 0;
        for (let i = 0; i < growlLen; i++) {
          const t = i / growlLen;
          const env = Math.sin(t * Math.PI);
          // Very rough modulation — bear vocal cords are gnarly
          const grit = 1 + Math.sin(t * 2 * Math.PI * 28) * 0.25 + Math.sin(t * 2 * Math.PI * 13) * 0.15;
          const freq = 80 * grit;
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.4 +
            Math.sin(phase * 4 * Math.PI) * 0.3 +
            Math.sin(phase * 8 * Math.PI) * 0.18 +
            (Math.random() - 0.5) * 0.22 * env
          ) * env * 0.5;
          if (start + i < len) d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 350; filter.Q.value = 1.2;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // 🦌 DEER CALL (rutting bugle)
  private createDeerCallLayer(ctx: AudioContext, layer: SoundLayer, gainNode: GainNode) {
    const sr = ctx.sampleRate;
    const seconds = 12;
    const len = sr * seconds;
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.003;
      const numCalls = 1 + Math.floor(Math.random() * 2);
      for (let c = 0; c < numCalls; c++) {
        const start = Math.floor(Math.random() * (len - sr * 4));
        const callLen = Math.floor(sr * (2.5 + Math.random() * 1.5));
        let phase = 0;
        for (let i = 0; i < callLen; i++) {
          const t = i / callLen;
          let env;
          if (t < 0.12) env = t / 0.12;
          else if (t < 0.7) env = 1;
          else env = (1 - t) / 0.3;
          // Bugle: rising then descending
          const arc = Math.sin(t * Math.PI);
          const freq = 600 + arc * 250 + Math.sin(t * Math.PI * 6) * 6;
          phase += freq / sr;
          const samp = (
            Math.sin(phase * 2 * Math.PI) * 0.5 +
            Math.sin(phase * 4 * Math.PI) * 0.22 +
            Math.sin(phase * 6 * Math.PI) * 0.1 +
            (Math.random() - 0.5) * 0.06 * env
          ) * env * 0.5;
          if (start + i < len) d[start + i] += samp;
        }
      }
    }
    const source = ctx.createBufferSource(); source.buffer = buf; source.loop = true;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 700; filter.Q.value = 2;
    source.connect(filter); filter.connect(gainNode);
    gainNode.connect(this.masterGain!); source.start(0);
    this.layers.set(layer.id, { source, gain: gainNode, filter, baseVolume: layer.baseVolume, layerId: layer.id, kind: layer.kind });
  }

  // =====================================================================
  // PUBLIC API
  // =====================================================================
  async playEnvironment(env: Environment): Promise<void> {
    const ctx = this.ensureContext();
    if (this.currentEnvId === env.id) {
      this.applyVolumes(env, 1); return;
    }
    this.fadeOutCurrent(400);
    await new Promise(r => setTimeout(r, 450));
    this.stopAllLayers();
    for (const layer of env.layers) {
      this.createLayer(ctx, layer);
    }
    this.currentEnvId = env.id;
    this.isStarted = true;
    setTimeout(() => this.applyVolumes(env, 1), 50);
  }

  applyVolumes(env: Environment, intensity: number = 1): void {
    intensity = Math.max(0, Math.min(1.5, intensity));
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    for (const layer of env.layers) {
      const playing = this.layers.get(layer.id);
      if (!playing) continue;
      const target = Math.min(1, layer.baseVolume * intensity);
      playing.gain.gain.cancelScheduledValues(t);
      playing.gain.gain.setValueAtTime(playing.gain.gain.value, t);
      playing.gain.gain.linearRampToValueAtTime(target, t + 0.4);
    }
  }

  setLayerVolume(layerId: string, volume: number): void {
    if (!this.ctx) return;
    const playing = this.layers.get(layerId);
    if (!playing) return;
    const t = this.ctx.currentTime;
    const target = Math.max(0, Math.min(1, volume));
    playing.baseVolume = target;
    playing.gain.gain.cancelScheduledValues(t);
    playing.gain.gain.setValueAtTime(playing.gain.gain.value, t);
    playing.gain.gain.linearRampToValueAtTime(target, t + 0.15);
  }

  async previewBird(bird: BirdSpecies): Promise<void> {
    const ctx = this.ensureContext();
    this.fadeOutCurrent(300);
    await new Promise(r => setTimeout(r, 320));
    this.stopAllLayers();
    const layer: SoundLayer = {
      id: `preview_${bird.id}`, name: bird.name, kind: 'bird',
      birdSpeciesId: bird.id, baseVolume: 0.7,
    };
    this.createLayer(ctx, layer);
    const playing = this.layers.get(layer.id);
    if (playing) {
      const t = ctx.currentTime;
      playing.gain.gain.linearRampToValueAtTime(0.7, t + 0.3);
    }
    this.currentEnvId = `preview_${bird.id}`;
    this.isStarted = true;
  }

  private fadeOutCurrent(ms: number): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    for (const playing of this.layers.values()) {
      playing.gain.gain.cancelScheduledValues(t);
      playing.gain.gain.setValueAtTime(playing.gain.gain.value, t);
      playing.gain.gain.linearRampToValueAtTime(0, t + ms / 1000);
    }
  }

  private stopAllLayers(): void {
    for (const playing of this.layers.values()) {
      try { playing.source?.stop(); } catch {}
      try { playing.source?.disconnect(); } catch {}
      playing.oscillators?.forEach(o => {
        try { o.stop(); } catch {}
        try { o.disconnect(); } catch {}
        const interval = (o as any)._noteInterval;
        if (interval) clearInterval(interval);
      });
      try { playing.filter?.disconnect(); } catch {}
      try { playing.gain.disconnect(); } catch {}
    }
    this.layers.clear();
  }

  async stop(): Promise<void> {
    this.fadeOutCurrent(400);
    await new Promise(r => setTimeout(r, 450));
    this.stopAllLayers();
    this.currentEnvId = null;
    this.isStarted = false;
  }
}

export const audioEngine = new AudioEngine();
