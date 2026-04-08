/**
 * Play a short success chime using the Web Audio API.
 * Two‑note ascending tone – cheerful but distinct from Duolingo.
 */
export function playCorrectSound() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    // Note 1 – E5
    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, now);
    osc1.connect(gain);
    osc1.start(now);
    osc1.stop(now + 0.2);

    // Note 2 – A5 (a fourth up, bright & warm)
    const gain2 = ctx.createGain();
    gain2.connect(ctx.destination);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.12);
    osc2.connect(gain2);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.5);

    // Clean up
    setTimeout(() => ctx.close(), 600);
  } catch {
    // Audio not available – silent fail
  }
}
