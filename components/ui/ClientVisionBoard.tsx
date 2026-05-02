"use client";
import dynamic from "next/dynamic";

const VisionBoard = dynamic(
  () => import("./VisionBoard").then((mod) => mod.VisionBoard),
  { ssr: false }
);

export function ClientVisionBoard() {
  return <VisionBoard />;
}
