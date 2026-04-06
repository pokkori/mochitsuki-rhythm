import Link from "next/link";

/* ---------- Inline SVG icons ---------- */
function MochiIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="38" rx="26" ry="18" fill="#fbbf24" opacity={0.9} />
      <ellipse cx="32" cy="34" rx="22" ry="16" fill="#fef3c7" />
      <ellipse cx="28" cy="30" rx="4" ry="3" fill="#fff" opacity={0.6} />
      <ellipse cx="32" cy="50" rx="20" ry="4" fill="#92400e" opacity={0.15} />
    </svg>
  );
}

function SmartphoneIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="7" y="3" width="14" height="22" rx="3" stroke="#fbbf24" strokeWidth="2" fill="none" />
      <line x1="12" y1="21" x2="16" y2="21" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RhythmIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#fbbf24" strokeWidth="2" fill="none" />
      <path d="M14 8v6l4 3" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FoulIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="#ef4444" strokeWidth="2" fill="none" />
      <path d="M10 10l8 8M18 10l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M9 5h10v8c0 4-2.5 6-5 6s-5-2-5-6V5z" stroke="#fbbf24" strokeWidth="2" fill="none" />
      <path d="M9 8H6c0 3 1.5 5 3 5M19 8h3c0 3-1.5 5-3 5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="11" y="19" width="6" height="2" rx="1" fill="#fbbf24" />
      <rect x="9" y="21" width="10" height="2" rx="1" fill="#fbbf24" />
    </svg>
  );
}

/* ---------- Particle field ---------- */
function ParticleField() {
  const particles = [
    { top: "10%", left: "12%", size: 4, delay: "0s", dur: "6s", color: "rgba(251,191,36,0.4)" },
    { top: "22%", left: "80%", size: 5, delay: "1s", dur: "7s", color: "rgba(251,191,36,0.3)" },
    { top: "50%", left: "20%", size: 3, delay: "2s", dur: "5s", color: "rgba(217,119,6,0.35)" },
    { top: "65%", left: "75%", size: 6, delay: "0.5s", dur: "8s", color: "rgba(254,243,199,0.3)" },
    { top: "80%", left: "45%", size: 4, delay: "3s", dur: "6s", color: "rgba(251,191,36,0.35)" },
    { top: "15%", left: "60%", size: 3, delay: "1.5s", dur: "7s", color: "rgba(217,119,6,0.3)" },
  ];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `floatP ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatP {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-18px) scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const RULE_ICONS = [<SmartphoneIcon key="sp" />, <RhythmIcon key="rh" />, <FoulIcon key="fo" />, <TrophyIcon key="tr" />];

export default function HomePage() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-4 py-10 relative"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(99,179,237,0.1) 0%, transparent 50%), #0F0F1A",
      }}
    >
      <ParticleField />

      <div className="text-center mb-8 relative z-10">
        <div className="flex justify-center mb-4">
          <MochiIcon size={72} />
        </div>
        <h1
          className="text-4xl font-black mb-1"
          style={{
            background: "linear-gradient(135deg, #FFD93D, #FF6B6B, #EE5A24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(255,217,61,0.3))",
          }}
        >
          もちつきリズム
        </h1>
        <p className="text-amber-300/80 text-sm mt-2">2人で交互にタップして餅をつけ!</p>
      </div>

      <Link
        href="/game"
        aria-label="ペアでゲームを遊ぶ"
        className="relative z-10 inline-block px-14 py-4 rounded-2xl text-xl font-black mb-8 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] text-white min-h-[52px]"
        style={{
          background: "linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)",
          boxShadow: "0 0 20px rgba(238,90,36,0.4)",
        }}
      >
        ペアで遊ぶ
      </Link>

      <div className="w-full max-w-xs space-y-3 relative z-10">
        {[
          { title: "2人でスマホを縦に持つ", desc: "上の人がP2、下の人がP1" },
          { title: "BPMに合わせて交互タップ", desc: "P1 -> P2 -> P1 -> P2のリズムで" },
          { title: "ズレたら手が刺さる!", desc: "相手のターンに叩くとファウル" },
          { title: "最高連続記録を競う", desc: "100回連続で称号ゲット!" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-3 items-center p-3 rounded-[20px]"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {RULE_ICONS[i]}
            </div>
            <div>
              <div className="font-bold text-amber-200 text-sm">{item.title}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-gray-500 text-xs space-y-2 relative z-10">
        <div className="flex justify-center gap-4">
          <Link href="/legal" className="hover:text-gray-300 min-h-[44px] flex items-center">
            特定商取引法
          </Link>
          <Link href="/privacy" className="hover:text-gray-300 min-h-[44px] flex items-center">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-gray-300 min-h-[44px] flex items-center">
            利用規約
          </Link>
        </div>
        <p>(C) 2026 ポッコリラボ</p>
      </footer>
    </div>
  );
}
