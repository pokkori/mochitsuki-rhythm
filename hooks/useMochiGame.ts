"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type GamePhase = "ready" | "countdown" | "playing" | "foul" | "gameover";
export type ActivePlayer = 1 | 2;

const BPM = 100;
const BEAT_MS = (60 / BPM) * 1000;
const TOLERANCE_MS = BEAT_MS * 0.45; // ±45%の許容範囲
const MAX_COMBO = 999;

export interface MochiState {
  phase: GamePhase;
  combo: number;
  bestCombo: number;
  activePlayer: ActivePlayer;
  countdown: number;
  beatTime: number; // 次のビートの絶対時刻(ms)
  lastHitMs: number | null;
  mochiHealth: number; // 0=爆発, 100=完璧
}

function initState(best: number): MochiState {
  return {
    phase: "ready", combo: 0, bestCombo: best,
    activePlayer: 1, countdown: 3,
    beatTime: 0, lastHitMs: null, mochiHealth: 100,
  };
}

export function useMochiGame() {
  const [state, setState] = useState<MochiState>(() => initState(0));
  const stateRef = useRef<MochiState>(state);
  const beatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const updateState = (updates: Partial<MochiState>) => {
    const next = { ...stateRef.current, ...updates };
    stateRef.current = next;
    setState({ ...next });
  };

  useEffect(() => {
    const bs = localStorage.getItem("mochi_best");
    if (bs) {
      const best = parseInt(bs);
      updateState({ bestCombo: best });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playBeep = useCallback((freq: number, duration: number = 0.08) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch { /* audio error non-fatal */ }
  }, []);

  const triggerFoul = useCallback((type: "early" | "miss") => {
    void type;
    if (stateRef.current.phase !== "playing") return;
    const combo = stateRef.current.combo;
    const best = Math.max(combo, stateRef.current.bestCombo);
    if (best > stateRef.current.bestCombo) {
      localStorage.setItem("mochi_best", String(best));
    }
    if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
    playBeep(200, 0.3);
    updateState({ phase: "foul", bestCombo: best });
    setTimeout(() => {
      updateState({ phase: "gameover" });
    }, 600);
  }, [playBeep]);

  const startCountdown = useCallback(() => {
    updateState({ phase: "countdown", countdown: 3 });
    let count = 3;
    const tick = () => {
      playBeep(660, 0.1);
      count--;
      updateState({ countdown: count });
      if (count > 0) {
        countdownRef.current = setTimeout(tick, 800);
      } else {
        playBeep(880, 0.15);
        // Start game
        const startTime = performance.now() + 200;
        updateState({
          phase: "playing",
          activePlayer: 1,
          combo: 0,
          beatTime: startTime,
          mochiHealth: 100,
        });
        beatTimerRef.current = setTimeout(() => {
          if (stateRef.current.phase === "playing") triggerFoul("miss");
        }, 200 + BEAT_MS + TOLERANCE_MS);
      }
    };
    countdownRef.current = setTimeout(tick, 200);
  }, [playBeep, triggerFoul]);

  const handleTap = useCallback((player: 1 | 2) => {
    const s = stateRef.current;
    if (s.phase === "ready" || s.phase === "gameover") {
      if (player === 1) startCountdown();
      return;
    }
    if (s.phase !== "playing") return;

    // Foul: wrong player
    if (s.activePlayer !== player) {
      triggerFoul("early");
      return;
    }

    // Check timing
    const now = performance.now();
    const timingErr = Math.abs(now - s.beatTime);
    const isGood = timingErr < TOLERANCE_MS;

    if (!isGood) {
      triggerFoul("miss");
      return;
    }

    // Good hit!
    if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
    const newCombo = s.combo + 1;
    const freq = player === 1 ? 523 : 659; // C5 or E5
    playBeep(freq, 0.1);

    updateState({
      combo: newCombo,
      lastHitMs: timingErr,
      mochiHealth: Math.min(100, s.mochiHealth + 2),
      activePlayer: player === 1 ? 2 : 1,
      beatTime: now + BEAT_MS,
    });

    // Schedule next beat timeout
    beatTimerRef.current = setTimeout(() => {
      if (stateRef.current.phase === "playing") triggerFoul("miss");
    }, BEAT_MS + TOLERANCE_MS);
  }, [startCountdown, triggerFoul, playBeep]);

  const resetGame = useCallback(() => {
    if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
    if (countdownRef.current) clearTimeout(countdownRef.current);
    const best = stateRef.current.bestCombo;
    updateState(initState(best));
  }, []);

  useEffect(() => {
    return () => {
      if (beatTimerRef.current) clearTimeout(beatTimerRef.current);
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, []);

  // suppress unused warning for MAX_COMBO
  void MAX_COMBO;

  return { state, handleTap, resetGame, BEAT_MS, TOLERANCE_MS };
}
