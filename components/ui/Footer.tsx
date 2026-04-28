import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { SOCIAL } from "@/data/portfolio";

export function Footer() {
  return (
    <footer
      className="mt-32 border-t py-12 px-6 md:px-12"
      style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-lg" style={{ color: "var(--text-2)" }}>
          Built with Next.js, Framer Motion & Claude AI
        </p>
        <div className="flex items-center gap-6">
          <a href={SOCIAL.github}   target="_blank" rel="noopener noreferrer" aria-label="GitHub"   style={{ color: "var(--text-3)" }} className="hover:text-accent transition-colors"><Github   size={18} /></a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "var(--text-3)" }} className="hover:text-accent transition-colors"><Linkedin size={18} /></a>
          <a href={SOCIAL.twitter}  target="_blank" rel="noopener noreferrer" aria-label="Twitter"  style={{ color: "var(--text-3)" }} className="hover:text-accent transition-colors"><Twitter  size={18} /></a>
          <a href={`mailto:${SOCIAL.email}`} aria-label="Email" style={{ color: "var(--text-3)" }} className="hover:text-accent transition-colors"><Mail size={18} /></a>
        </div>
        <p className="font-mono text-xs" style={{ color: "var(--text-3)" }}>
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
