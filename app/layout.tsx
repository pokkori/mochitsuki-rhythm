import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🎍 もちつきリズム | 2人で餅をつけ！",
  description: "BPMに合わせて2人で交互タップ！ズレたら餅に手が刺さる爆笑リズムゲーム。年末年始に家族・友達と盛り上がろう！",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ja"><body>{children}</body></html>;
}
