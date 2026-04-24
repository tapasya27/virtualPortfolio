import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { GitHubSection } from "@/components/GitHubSection";
import { Socials } from "@/components/Socials";
import { Chatbot } from "@/components/Chatbot";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-32">
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="github">
        <GitHubSection />
      </section>

      <section id="chat">
        <h2 className="text-3xl font-semibold mb-2">Ask me anything</h2>
        <p className="text-muted mb-6 max-w-xl">
          A Claude-powered chatbot trained on my bio and résumé. Ask away.
        </p>
        <Chatbot />
      </section>

      <section id="contact">
        <Socials />
      </section>
    </div>
  );
}
