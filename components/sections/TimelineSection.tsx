"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TIMELINE } from "@/data/portfolio";
import { Briefcase, GraduationCap } from "lucide-react";

export function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} data-section="Timeline" className="py-14 md:py-28 px-4 md:px-12" style={{ background: "rgba(15,14,14,0.88)" }}>
      <div className="max-w-4xl mx-auto">

        <div className="mb-10 md:mb-16">
          <motion.p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)", letterSpacing: "0.16em" }}
            initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
          >
            Experience
          </motion.p>
          <motion.h2
            className="font-display"
            style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "var(--text)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 24 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          >
            Career{" "}<span className="italic" style={{ color: "var(--accent)" }}>Timeline</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "var(--border-2)" }}>
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{ background: "linear-gradient(to bottom, var(--accent), var(--teal))", originY: 0 }}
              initial={{ scaleY: 0 }}
              animate={visible ? { scaleY: 1 } : {}}
              transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="flex flex-col gap-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="relative pl-16 md:pl-20 pb-8 md:pb-14"
                initial={{ opacity: 0, x: -30 }}
                animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.25 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Icon dot */}
                <div
                  className="absolute left-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border"
                  style={{
                    background: item.isEducation ? "var(--teal-dim)" : "var(--bg-4)",
                    borderColor: item.isEducation ? "rgba(0,200,150,0.4)" : "var(--border-2)",
                    top: "2px",
                    boxShadow: item.isEducation ? "0 0 20px rgba(0,200,150,0.15)" : "0 0 20px rgba(212,168,67,0.08)",
                  }}
                >
                  {item.isEducation
                    ? <GraduationCap size={16} style={{ color: "var(--teal)" }} />
                    : <Briefcase     size={16} style={{ color: "var(--accent)" }} />
                  }
                </div>

                {/* Content */}
                <div
                  className="p-4 md:p-6 rounded-sm border glow-card"
                  style={{ background: "var(--bg-3)", borderColor: "var(--border)" }}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display" style={{ fontSize: "22px", color: "var(--text)", fontWeight: 500 }}>{item.role}</h3>
                      <p className="font-body text-sm mt-0.5" style={{ color: "var(--accent)", fontWeight: 500 }}>{item.company}</p>
                    </div>
                    <span
                      className="font-mono text-xs px-3 py-1 rounded-sm flex-shrink-0"
                      style={{ background: "var(--bg-4)", color: "var(--text-3)", letterSpacing: "0.06em", alignSelf: "flex-start" }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className="font-body text-sm mb-4" style={{ color: "var(--text-2)", lineHeight: 1.8 }}>{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2.5 py-1 rounded-sm border"
                        style={{ background: "var(--bg-5)", borderColor: "var(--border)", color: "var(--text-3)", fontSize: "11px" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
