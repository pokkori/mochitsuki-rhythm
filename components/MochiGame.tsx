"use client";

import { useRef, useCallback } from "react";
import { useMochiGame } from "@/hooks/useMochiGame";

function getComboTitle(combo: number): string {
  if (combo >= 100) return "餅神！";
  if (combo >= 50) return "達人！";
  if (combo >= 30) return "上手い！";
  if (combo >= 10) return "いいね！";
  return "がんばれ！";
}

function getMochiEmoji(health: number, isFoul: boolean): string {
  if (isFoul) return "💀";
  if (health > 80) return "🍡";
  if (health > 50) return "😰";
  return "😱";
}

export default function MochiGame() {
  const { state, handleTap, resetGame, BEAT_MS } = useMochiGame();
  const p1AnimRef = useRef<string>("");
  const p2AnimRef = useRef<string>("");
  const mochiAnimRef = useRef<string>("");

  // suppress unused warnings
  void p1AnimRef;
  void p2AnimRef;
  void mochiAnimRef;

  const isFoul = state.phase === "foul";
  const isGameOver = state.phase === "gameover";
  const isPlaying = state.phase === "playing";
  const isCountdown = state.phase === "countdown";

  const now = typeof performance !== "undefined" ? performance.now() : 0;
  const beatProgress = isPlaying
    ? Math.min(1, Math.max(0, 1 - (state.beatTime - now) / BEAT_MS))
    : 0;

  const handleP1Tap = useCallback(() => {
    handleTap(1);
  }, [handleTap]);

  const handleP2Tap = useCallback(() => {
    handleTap(2);
  }, [handleTap]);

  const shareText = `🍡 もちつきリズムで${state.bestCombo}回連続もちつき成功！\n${getComboTitle(state.bestCombo)}\n#もちつきリズム #餅つき\nhttps://mochi-rhythm.vercel.app`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="flex flex-col min-h-dvh select-none"
      style={{ background: "linear-gradient(160deg, #1a0a00, #2d1800)", touchAction: "none" }}>

      {/* P2 tap zone (top half, rotated 180deg for player facing other way) */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative cursor-pointer"
        style={{
          transform: "rotate(180deg)",
          background: state.activePlayer === 2 && isPlaying
            ? "rgba(251,191,36,0.12)" : "transparent",
          transition: "background 0.1s",
        }}
        onClick={handleP2Tap}
        onTouchStart={(e) => { e.preventDefault(); handleP2Tap(); }}
      >
        <div className="text-5xl mb-2"
          style={{ opacity: state.activePlayer === 2 && isPlaying ? 1 : 0.3 }}>
          <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect x="20" y="20" width="10" height="22" rx="3" fill="#92400e"/>
            <rect x="8" y="6" width="32" height="16" rx="4" fill="#78716c"/>
            <rect x="10" y="8" width="28" height="12" rx="3" fill="#a8a29e"/>
          </svg>
        </div>
        <div className="text-lg font-black"
          style={{ color: state.activePlayer === 2 && isPlaying ? "#fbbf24" : "#78350f" }}>
          P2
        </div>
        {state.activePlayer === 2 && isPlaying && (
          <div className="absolute bottom-4 text-amber-300 text-sm font-bold animate-pulse">
            ← タップ！
          </div>
        )}
      </div>

      {/* Center: Mochi + Score */}
      <div className="flex flex-col items-center justify-center py-4 px-4"
        style={{ background: "rgba(0,0,0,0.3)" }}>

        {/* Beat progress bar */}
        {isPlaying && (
          <div className="w-full max-w-xs h-2 rounded-full mb-3"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full transition-none"
              style={{
                width: `${beatProgress * 100}%`,
                background: state.activePlayer === 1 ? "#dc2626" : "#2563eb",
              }} />
          </div>
        )}

        {/* Mochi */}
        <div className="text-7xl mb-2 transition-transform"
          style={{ filter: isFoul ? "drop-shadow(0 0 20px red)" : "drop-shadow(0 0 12px rgba(251,191,36,0.5))" }}>
          {getMochiEmoji(state.mochiHealth, isFoul)}
        </div>

        {/* Combo counter */}
        {isPlaying && (
          <div className="text-4xl font-black mb-1" style={{ color: "#fbbf24" }}>
            {state.combo}
          </div>
        )}
        {isCountdown && (
          <div className="text-6xl font-black bounce-in" style={{ color: "#fbbf24" }}>
            {state.countdown > 0 ? state.countdown : "GO!"}
          </div>
        )}
        {(state.phase === "ready") && (
          <div className="text-center">
            <div className="text-amber-300 text-sm mb-1 font-bold">P1がタップでスタート</div>
            {state.bestCombo > 0 && (
              <div className="text-amber-600 text-xs">ベスト: {state.bestCombo}回 {getComboTitle(state.bestCombo)}</div>
            )}
          </div>
        )}

        {/* Game Over */}
        {isGameOver && (
          <div className="bounce-in text-center">
            <div className="text-2xl font-black mb-1 text-red-400">失敗！</div>
            <div className="text-amber-200 mb-1">連続: <span className="font-black text-xl text-amber-400">{state.combo}</span>回</div>
            <div className="text-amber-600 text-xs mb-3">ベスト: {state.bestCombo}回</div>
            <div className="space-y-2">
              <button onClick={resetGame}
                className="block w-40 py-2 rounded-xl font-bold text-sm transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg,#fbbf24,#d97706)", color: "#1a0a00" }}>
                もう一度
              </button>
              <a href={shareUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-40 py-2 rounded-xl text-sm font-bold"
                style={{ background: "#000", color: "#fff" }}>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                シェア
              </a>
            </div>
          </div>
        )}

        {/* Active indicator */}
        {isPlaying && (
          <div className="mt-2 text-xs font-bold"
            style={{ color: state.activePlayer === 1 ? "#dc2626" : "#3b82f6" }}>
            {state.activePlayer === 1 ? "🔴 P1の番" : "🔵 P2の番"}
          </div>
        )}
      </div>

      {/* P1 tap zone (bottom half) */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative cursor-pointer"
        style={{
          background: state.activePlayer === 1 && isPlaying
            ? "rgba(220,38,38,0.12)" : "transparent",
          transition: "background 0.1s",
        }}
        onClick={handleP1Tap}
        onTouchStart={(e) => { e.preventDefault(); handleP1Tap(); }}
      >
        <div className="text-5xl mb-2"
          style={{ opacity: state.activePlayer === 1 && isPlaying ? 1 : 0.3 }}>
          <svg className="w-12 h-12 mx-auto" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect x="20" y="20" width="10" height="22" rx="3" fill="#92400e"/>
            <rect x="8" y="6" width="32" height="16" rx="4" fill="#78716c"/>
            <rect x="10" y="8" width="28" height="12" rx="3" fill="#a8a29e"/>
          </svg>
        </div>
        <div className="text-lg font-black"
          style={{ color: state.activePlayer === 1 && isPlaying ? "#fca5a5" : "#7f1d1d" }}>
          P1
        </div>
        {state.activePlayer === 1 && isPlaying && (
          <div className="absolute top-4 text-red-300 text-sm font-bold animate-pulse">
            タップ！ →
          </div>
        )}
        {state.phase === "ready" && (
          <div className="absolute top-4 text-red-400 text-xs">ここをタップでスタート</div>
        )}
      </div>
    </div>
  );
}
