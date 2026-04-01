import type { Metadata } from "next";
import "./globals.css";
import OrbBackground from "@/components/OrbBackground";

export const metadata: Metadata = {
  title: "もちつきリズム | 2人で餅をつけ！",
  description: "BPMに合わせて2人で交互タップ！ズレたら餅に手が刺さる爆笑リズムゲーム。年末年始に家族・友達と盛り上がろう！",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1a0a00" />
      </head>
      <body>
        <OrbBackground />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
