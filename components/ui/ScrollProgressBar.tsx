"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sections, setSections] = useState<{ name: string }[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);

      const sectionElements = document.querySelectorAll("[data-section]");
      let activeIndex = 0;
      sectionElements.forEach((element, idx) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          activeIndex = idx;
        }
      });
      setActiveSectionIndex(activeIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Delay to ensure all sections are mounted
    const timer = setTimeout(() => {
      const sectionElements = document.querySelectorAll("[data-section]");
      const sectionList = Array.from(sectionElements).map((el) => ({
        name: el.getAttribute("data-section") || "",
      }));
      setSections(sectionList);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          height: "1px",
          background: "linear-gradient(90deg, rgba(196,138,14,1), rgba(230,168,23,1), rgba(255,215,0,1), rgba(0,212,170,1))",
          transformOrigin: "left",
          zIndex: 1000,
          pointerEvents: "none",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
      />

      {/* Footer bar — all scrollable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "10px clamp(12px, 3vw, 24px)",
          background: "linear-gradient(to top, rgba(15,14,14,0.98), rgba(15,14,14,0.8))",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(230,168,23,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <div style={{ display: "flex", gap: "4px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {sections.map((section, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                const element = document.querySelectorAll("[data-section]")[idx];
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(11px, 2.5vw, 13px)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: activeSectionIndex === idx ? "var(--accent)" : "var(--text-2)",
                background: "transparent",
                border: "none",
                padding: "8px clamp(8px, 2vw, 12px)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                minHeight: "44px",
              }}
            >
              {section.name}
              {activeSectionIndex === idx && (
                <motion.div
                  layoutId="active-tab"
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    left: "8px",
                    right: "8px",
                    height: "2px",
                    background: "var(--accent)",
                    borderRadius: "1px",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
