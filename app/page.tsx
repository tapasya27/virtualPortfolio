import { HeroAboutSection } from "@/components/sections/HeroAboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ChatSection } from "@/components/sections/ChatSection";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <HeroAboutSection />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection />
      <ChatSection />
      <Footer />
    </main>
  );
}
