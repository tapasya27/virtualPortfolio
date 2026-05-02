"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SKILLS } from "@/data/portfolio";

const CATEGORIES = ["all", "frontend", "backend", "devops", "design"] as const;

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = active === "all" ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <section
      ref={ref}
      data-section="Skills"
      className="py-14 md:py-28 px-4 md:px-12"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-14">
          <div>
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
              <span className="italic" style={{ color: "var(--accent)" }}>Proficiencies</span>
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-3 py-1.5 font-mono text-xs uppercase tracking-widest rounded-sm border transition-all duration-250 min-h-[44px] md:min-h-0"
                style={{
                  letterSpacing: "0.1em",
                  background: active === cat ? "var(--accent)" : "transparent",
                  color:       active === cat ? "var(--bg)"    : "var(--text-3)",
                  borderColor: active === cat ? "var(--accent)" : "var(--border)",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Skill bars — long, posh */}
        <div className="flex flex-col gap-4 md:gap-6">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Label row */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded-sm"
                    style={{ background: "var(--bg-4)", color: "var(--text-3)", fontSize: "10px", letterSpacing: "0.08em" }}
                  >
                    {skill.category}
                  </span>
                  <span className="font-body font-medium" style={{ color: "var(--text)", fontSize: "14px" }}>{skill.name}</span>
                </div>
                <span className="font-mono text-xs" style={{ color: "var(--accent)", letterSpacing: "0.06em" }}>{skill.level}%</span>
              </div>

              {/* Full-width bar track */}
              <div className="skill-bar-track w-full" style={{ height: "3px" }}>
                <div
                  className={`skill-bar-fill${visible ? " animated" : ""}`}
                  style={{
                    transform: visible ? `scaleX(${skill.level / 100})` : "scaleX(0)",
                    transitionDelay: `${0.2 + i * 0.07}s`,
                  }}
                />
              </div>

              {/* Subtle notches */}
              <div className="flex justify-between mt-1.5 px-0">
                {[0, 25, 50, 75, 100].map((n) => (
                  <span
                    key={n}
                    className="font-mono"
                    style={{ fontSize: "9px", color: skill.level >= n ? "var(--accent-3)" : "var(--bg-5)", letterSpacing: "0.04em" }}
                  >
                    {n === 0 ? "" : `${n}`}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
