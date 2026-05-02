"use client";
import dynamic from "next/dynamic";

const PageContent = dynamic(() => import("@/components/PageContent"), {
  ssr: false,
  loading: () => (
    <div style={{ minHeight: "100vh", background: "transparent" }} />
  ),
});

export default function Home() {
  return <PageContent />;
}
