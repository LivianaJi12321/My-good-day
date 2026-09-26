// Original, quiet mechanical effects synthesized locally; no audio downloads.
export function createSound() {
  let context;
  let master;
  let enabled = true;
  let generation = 0;
  const sources = new Set();
  try { enabled = localStorage.getItem('my-good-day-sound') !== 'off'; } catch {}

  function stop() {
    generation++;
    for (const source of sources) {
      try { source.stop(); } catch {}
      source.disconnect();
    }
    sources.clear();
  }

  function tone(time, frequency, duration, volume, endFrequency = frequency, type = 'sine') {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, time + duration);
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(volume, time + Math.min(.008, duration / 4));
    envelope.gain.exponentialRampToValueAtTime(.0001, time + duration);
    oscillator.connect(envelope).connect(master);
    sources.add(oscillator);
    oscillator.onended = () => { sources.delete(oscillator); oscillator.disconnect(); envelope.disconnect(); };
    oscillator.start(time);
    oscillator.stop(time + duration + .01);
  }

  async function play({ reduced = false } = {}) {
    stop();
    if (!enabled) return;
    const current = generation;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!context) {
        context = new AudioContext();
        master = context.createGain();
        master.gain.value = .24;
        master.connect(context.destination);
      }
      if (context.state === 'suspended') await context.resume();
      if (!enabled || current !== generation || document.hidden) return;
      const now = context.currentTime + .01;
      // Button: a short, rounded plastic click.
      tone(now, 460, .07, .5, 140, 'triangle');
      tone(now + .025, 180, .06, .24, 90);
      if (reduced) {
        tone(now + .12, 660, .1, .2, 880);
        return;
      }
      // Crank ratchet and gently rattling capsules during the first 1.8 seconds.
      tone(now + .12, 85, 1.65, .16, 115, 'triangle');
      for (let i = 0; i < 22; i++) {
        const at = now + .12 + i * .076;
        tone(at, 330 + (i % 4) * 65, .045, .16, 170, 'triangle');
      }
      // Capsule rolls out at 55% of the 3.3-second animation.
      for (let i = 0; i < 12; i++) {
        tone(now + 1.82 + i * .065, 190 + (i % 3) * 40, .055, .2 - i * .009, 100, 'triangle');
      }
      tone(now + 2.54, 240, .11, .35, 95, 'triangle');
      tone(now + 2.85, 310, .075, .22, 150, 'triangle');
      // The capsule opens with a light pop and two soft notes.
      tone(now + 2.9, 550, .08, .25, 180, 'triangle');
      tone(now + 2.98, 660, .15, .2, 660);
      tone(now + 3.08, 880, .16, .16, 880);
    } catch {
      // Audio restrictions or unavailable devices must never block a spin.
      stop();
    }
  }

  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  return {
    get enabled() { return enabled; },
    toggle() {
      enabled = !enabled;
      if (!enabled) stop();
      try { localStorage.setItem('my-good-day-sound', enabled ? 'on' : 'off'); } catch {}
      return enabled;
    },
    play,
    stop,
  };
}
