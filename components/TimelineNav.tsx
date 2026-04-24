"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "chat", label: "Chat" },
  { id: "contact", label: "Contact" },
];

export function TimelineNav() {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <>
      {/* Desktop: vertical left rail */}
      <nav
        aria-label="Section navigation"
        className="hidden lg:flex fixed top-1/2 left-6 xl:left-10 -translate-y-1/2 z-50 flex-col gap-7"
      >
        <div
          aria-hidden
          className="absolute left-[7px] top-3 bottom-3 w-px bg-border"
        />
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className="group relative flex items-center gap-4 cursor-pointer"
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.3 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative z-10 size-3.5 rounded-full ring-4 ring-bg transition-colors ${
                  isActive ? "bg-accent" : "bg-border group-hover:bg-muted"
                }`}
              />
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.55,
                  x: isActive ? 0 : -2,
                }}
                transition={{ duration: 0.25 }}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-fg" : "text-muted group-hover:text-fg"
                }`}
              >
                {s.label}
              </motion.span>
            </a>
          );
        })}
      </nav>

      {/* Mobile/tablet: horizontal sticky scroll-spy */}
      <nav
        aria-label="Section navigation"
        className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-bg/85 backdrop-blur"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 px-4 py-3 w-max">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="flex items-center gap-1">
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => handleClick(e, s.id)}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-muted hover:text-fg"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-accent -z-0"
                      />
                    )}
                    <span className="relative z-10">{s.label}</span>
                  </a>
                  {/* connector line between pills */}
                  <span aria-hidden className="size-1 rounded-full bg-border last:hidden" />
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
