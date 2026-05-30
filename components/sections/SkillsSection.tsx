"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { SKILLS, SOCIAL } from "@/data/portfolio";
import { GitHubHeatmap } from "@/components/ui/GitHubHeatmap";

const TIERS = [
  {
    id: "daily",
    label: "Building With",
    sub: "My current toolkit",
  },
  {
    id: "production",
    label: "Have Built With",
    sub: "Shipped in past roles",
  },
  {
    id: "learning",
    label: "Want to Build With",
    sub: "On my radar",
  },
] as const;

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      data-section="Skills"
      className="py-14 md:py-28 px-4 md:px-12"
      style={{ background: "rgba(15,14,14,0.88)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-16">
          <motion.p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)", letterSpacing: "0.16em" }}
            initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
          >
            Expertise
          </motion.p>
          <motion.h2
            className="font-display"
            style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "var(--text)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
          >
            Skills &{" "}
            <span className="italic" style={{ color: "var(--accent)" }}>Toolkit</span>
          </motion.h2>
        </div>

        {/* GitHub Activity Card */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--accent)", letterSpacing: "0.16em" }}>
                Activity
              </p>
              <h3 className="font-display" style={{ fontSize: "26px", color: "var(--text)", fontWeight: 400 }}>
                GitHub{" "}<span className="italic" style={{ color: "var(--accent)" }}>Contributions</span>
              </h3>
            </div>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: "var(--text-3)", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
            >
              <Github size={14} /> View Profile
            </a>
          </div>

          <div
            className="rounded-sm border p-4 md:p-6 overflow-hidden"
            style={{ background: "var(--bg-3)", borderColor: "var(--border)" }}
          >
            {/* Live contributions heatmap via GitHub GraphQL */}
            <div>
              <GitHubHeatmap />
            </div>

            <p className="font-mono text-xs mt-4" style={{ color: "var(--text-3)", letterSpacing: "0.06em" }}>
              * Heatmap shows the last year · Updates hourly
            </p>
            <p className="font-mono text-xs mt-2" style={{ color: "var(--text-3)", letterSpacing: "0.04em", lineHeight: 1.5 }}>
              This reflects personal/public GitHub activity. Many work contributions happen in private enterprise repos and are not visible here.
            </p>
          </div>
        </motion.div>

        {/* Skills by tier */}
        <div className="flex flex-col gap-10 md:gap-14">
          {TIERS.map((tier, ti) => {
            const items = SKILLS.filter((s) => s.tier === tier.id);
            if (items.length === 0) return null;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 24 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + ti * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Tier header */}
                <div className="flex items-baseline gap-4 mb-5">
                  <h3
                    className="font-display"
                    style={{ fontSize: "24px", color: "var(--text)", fontWeight: 500 }}
                  >
                    {tier.label}
                  </h3>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--text-3)", letterSpacing: "0.08em" }}
                  >
                    {tier.sub}
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-3">
                  {items.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2.5 rounded-full border pl-1.5 pr-4 py-1.5 glow-card"
                      style={{
                        background: "var(--bg-3)",
                        borderColor: "var(--border)",
                      }}
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={visible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.45, delay: 0.4 + ti * 0.12 + si * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        className="flex items-center justify-center rounded-full overflow-hidden"
                        style={{
                          width: "32px",
                          height: "32px",
                          background: "#ffffff",
                          padding: "5px",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <span
                        className="font-body"
                        style={{ color: "var(--text)", fontSize: "14px", fontWeight: 500 }}
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
