"use client";
import { HeroAboutSection } from "@/components/sections/HeroAboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ChatSection } from "@/components/sections/ChatSection";
import { Footer } from "@/components/ui/Footer";

export default function PageContent() {
  return (
    <main className="min-h-screen" style={{ background: "transparent" }}>
      <HeroAboutSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <ChatSection />
      <Footer />
    </main>
  );
}
