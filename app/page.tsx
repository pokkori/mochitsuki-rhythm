import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-10"
      style={{ background: "linear-gradient(160deg, #1a0a00, #2d1800, #1a0a00)" }}>
      <div className="text-center mb-8">
        <div className="text-5xl mb-3 font-black" style={{ filter: "drop-shadow(0 0 20px rgba(251,191,36,0.6))" }}>
          <span style={{ color: "#fbbf24" }}>もちつき</span>
        </div>
        <h1 className="text-4xl font-black mb-1"
          style={{ color: "#fbbf24", textShadow: "0 0 20px rgba(251,191,36,0.5)" }}>
          もちつきリズム
        </h1>
        <p className="text-amber-300 text-sm mt-1">2人で交互にタップして餅をつけ！</p>
      </div>

      <Link href="/game"
        aria-label="ペアでゲームを遊ぶ"
        className="inline-block px-14 py-4 rounded-2xl text-xl font-black mb-8 transition-all active:scale-95"
        style={{
          background: "linear-gradient(135deg, #fbbf24, #d97706)",
          color: "#1a0a00",
          boxShadow: "0 0 30px rgba(251,191,36,0.4)",
        }}>
        ペアで遊ぶ
      </Link>

      <div className="w-full max-w-xs space-y-3">
        {[
          { icon: "SP", title: "2人でスマホを縦に持つ", desc: "上の人がP2、下の人がP1" },
          { icon: "BM", title: "BPMに合わせて交互タップ", desc: "P1→P2→P1→P2のリズムで" },
          { icon: "NG", title: "ズレたら手が刺さる！", desc: "相手のターンに叩くとファウル" },
          { icon: "HI", title: "最高連続記録を競う", desc: "100回連続で称号ゲット！" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-center p-3 rounded-xl"
            style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black"
              style={{ background: "rgba(251,191,36,0.2)", color: "#fbbf24" }}>
              {item.icon}
            </div>
            <div>
              <div className="font-bold text-amber-200 text-sm">{item.title}</div>
              <div className="text-xs text-amber-600">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-12 text-center text-amber-900 text-xs space-y-2">
        <div className="flex justify-center gap-4">
          <Link href="/legal" className="hover:text-amber-700">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-amber-700">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-amber-700">利用規約</Link>
        </div>
        <p>© 2026 ポッコリラボ</p>
      </footer>
    </div>
  );
}
