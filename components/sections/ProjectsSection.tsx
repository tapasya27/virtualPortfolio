"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/portfolio";
import { Github, ExternalLink, Star } from "lucide-react";

const CATEGORIES = ["All", "Web", "Data", "Tools", "OSS"];

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section ref={ref} data-section="Projects" className="py-14 md:py-28 px-4 md:px-12" style={{ background: "rgba(26,24,23,0.88)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-8 md:mb-14">
          <div>
            <motion.p
              className="font-mono text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--accent)", letterSpacing: "0.16em" }}
              initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
            >
              Work
            </motion.p>
            <motion.h2
              className="font-display"
              style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "var(--text)", fontWeight: 400 }}
              initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            >
              Selected{" "}<span className="italic" style={{ color: "var(--accent)" }}>Projects</span>
            </motion.h2>
          </div>

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-1.5 font-mono text-xs uppercase tracking-widest rounded-sm border transition-all duration-200"
                style={{
                  letterSpacing: "0.1em",
                  background:   active === cat ? "var(--accent)" : "transparent",
                  color:        active === cat ? "var(--bg)"     : "var(--text-3)",
                  borderColor:  active === cat ? "var(--accent)"  : "var(--border)",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="glow-card rounded-sm border flex flex-col"
                style={{
                  background:   "var(--bg-3)",
                  borderColor:  project.highlight ? "rgba(212,168,67,0.35)" : "var(--border)",
                  boxShadow:    project.highlight ? "0 0 30px -8px rgba(212,168,67,0.12)" : "none",
                }}
              >
                {/* Top bar */}
                <div
                  className="h-1 rounded-t-sm"
                  style={{
                    background: project.highlight
                      ? "linear-gradient(90deg, var(--accent-3), var(--accent), var(--accent-2))"
                      : "var(--bg-4)",
                  }}
                />

                <div className="p-4 md:p-6 flex flex-col flex-1 gap-4">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display" style={{ fontSize: "20px", color: "var(--text)", fontWeight: 500, lineHeight: 1.2 }}>
                      {project.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0 mt-0.5">
                      {project.highlight && <Star size={14} style={{ color: "var(--accent)" }} />}
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-sm"
                        style={{ background: "var(--bg-5)", color: "var(--text-3)", fontSize: "10px" }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm flex-1" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-0.5 rounded-sm border"
                        style={{ background: "var(--bg-4)", borderColor: "var(--border)", color: "var(--text-3)", fontSize: "11px" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
                      style={{ color: "var(--text-3)", letterSpacing: "0.1em" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                    >
                      <Github size={13} /> Code
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200"
                        style={{ color: "var(--text-3)", letterSpacing: "0.1em" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--teal)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                      >
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
