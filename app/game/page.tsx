"use client";

import dynamic from "next/dynamic";

const MochiGame = dynamic(() => import("@/components/MochiGame"), { ssr: false });

export default function GamePage() {
  return <MochiGame />;
}
