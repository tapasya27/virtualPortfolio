"use client";
import dynamic from "next/dynamic";

const ScrollProgressBar = dynamic(
  () => import("./ScrollProgressBar").then((mod) => mod.ScrollProgressBar),
  { ssr: false }
);

export function ClientScrollProgressBar() {
  return <ScrollProgressBar />;
}
