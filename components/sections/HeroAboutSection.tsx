"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL } from "@/data/portfolio";

const TAGLINES = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Creative Problem Solver",
];

const EN_NAME = "TAPASYA SHARMA";
const HI_NAME = "तपस्या शर्मा";

function useTypingName() {
  const [displayed, setDisplayed] = useState("");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting">("typing");

  useEffect(() => {
    const target = lang === "en" ? EN_NAME : HI_NAME;
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timer = setTimeout(
          () => setDisplayed(target.slice(0, displayed.length + 1)),
          60
        );
      } else {
        timer = setTimeout(() => setPhase("waiting"), 2600);
      }
    } else if (phase === "waiting") {
      timer = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed((prev) => prev.slice(0, -1)),
          30
        );
      } else {
        setLang((l) => (l === "en" ? "hi" : "en"));
        setPhase("typing");
      }
    }

    return () => clearTimeout(timer);
  }, [displayed, phase, lang]);

  return { fullName: displayed, lang, phase };
}

export function HeroAboutSection() {
  const [ready, setReady] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const { fullName, lang, phase } = useTypingName();
  const nameFont =
    lang === "hi" ? "var(--font-devanagari)" : "var(--font-bebas)";

  useEffect(() => {
    setReady(true);
    const id = setInterval(
      () => setTaglineIndex((i) => (i + 1) % TAGLINES.length),
      3200
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAboutVisible(true);
      },
      { threshold: 0.15 }
    );
    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      data-section="Hero"
      ref={containerRef}
      style={{
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{ position: "relative", zIndex: 1, y: heroY, opacity: heroOpacity }}
      >
        {/* Social icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "min(140px, 12vh) 48px 0",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {[
              { href: SOCIAL.github, Icon: Github, label: "GitHub", color: "#f0f0f0" },
              { href: SOCIAL.linkedin, Icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
              { href: `mailto:${SOCIAL.email}`, Icon: Mail, label: "Email", color: "#e6a817" },
            ].map(({ href, Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color, transition: "opacity 0.2s", opacity: 1 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.7")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* Name block */}
        <motion.div
          style={{
            padding: "0 40px",
            marginTop: "min(60px, 5vh)",
            position: "relative",
            display: "inline-block",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="name-glow"
            style={{
              fontFamily: nameFont,
              fontSize: "clamp(48px, 12vw, 140px)",
              fontWeight: 700,
              color: lang === "en" ? "var(--text)" : "var(--accent)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
              userSelect: "none",
              overflow: "visible",
              textShadow: "none",
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {fullName}
            <span
              className="cursor-blink"
              style={{ color: "var(--accent)", marginLeft: "4px" }}
            >
              |
            </span>
          </motion.h1>

          {/* Language badge */}
          <AnimatePresence mode="wait">
            {phase !== "deleting" && (
              <motion.div
                key={lang}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25, delay: 0.8 }}
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  right: "0",
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "var(--accent)",
                  border: "1.5px solid rgba(230,168,23,0.5)",
                  background: "rgba(230,168,23,0.1)",
                  padding: "8px 16px",
                  borderRadius: "2px",
                  userSelect: "none",
                  textTransform: "uppercase",
                }}
              >
                {lang === "en" ? "EN" : "HI"}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tagline bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            padding: "28px 48px 48px",
            marginTop: "16px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              style={{
                width: 40,
                height: 1,
                background: "var(--accent)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                }}
              >
                {TAGLINES[taglineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* ── ABOUT (below name, same section) ── */}
      <div
        ref={aboutRef}
        style={{ padding: "80px 48px 120px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "80px",
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={aboutVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "16px",
              }}
            >
              About Me
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 400,
                color: "var(--text)",
                lineHeight: 1.1,
                marginBottom: "32px",
              }}
            >
              Crafting digital
              <br />
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                experiences
              </span>
            </h2>
            {[
              "I'm a full-stack developer with a deep love for building things that are both performant and beautiful. I believe great software is as much about the feeling it gives users as the code underneath.",
              "Based in Burnaby, BC, I work across the full stack — from pixel-perfect UIs to scalable backend systems. Currently exploring AI-powered interfaces and 3D web.",
              "When I'm not coding, you'll find me hiking the Lower Mainland trails, experimenting with generative art, or deep in a good book.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={aboutVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--text-2)",
                  lineHeight: 1.85,
                  marginBottom: "18px",
                  fontSize: "15px",
                }}
              >
                {para}
              </motion.p>
            ))}
            <motion.div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "32px",
                marginTop: "8px",
                display: "flex",
                gap: "40px",
                flexWrap: "wrap",
              }}
              initial={{ opacity: 0 }}
              animate={aboutVisible ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              {[
                { label: "Years exp.", value: "3+" },
                { label: "Projects", value: "20+" },
                { label: "Technologies", value: "15+" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "42px",
                      color: "var(--accent)",
                      lineHeight: 1,
                      fontWeight: 400,
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--text-3)",
                      marginTop: "4px",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {[
              {
                icon: "⚡",
                title: "Performance First",
                body: "I obsess over load times, bundle sizes, and Core Web Vitals. Fast is a feature.",
              },
              {
                icon: "🎨",
                title: "Design Fluent",
                body: "Comfortable in Figma and code alike. I translate design systems into living interfaces.",
              },
              {
                icon: "🔒",
                title: "Security Minded",
                body: "From CSP headers to rate limiting — I build with threat models in mind, not as an afterthought.",
              },
              {
                icon: "🤝",
                title: "Collaborative",
                body: "Strong communicator across engineering, design, and product. I make PRs people enjoy reviewing.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="glow-card"
                style={{
                  background: "var(--bg-3)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "20px 22px",
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={aboutVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.08 + i * 0.1 }}
              >
                <span
                  style={{ fontSize: "20px", flexShrink: 0, marginTop: "2px" }}
                >
                  {card.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      color: "var(--text)",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--text-2)",
                      fontSize: "13px",
                      lineHeight: 1.7,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
