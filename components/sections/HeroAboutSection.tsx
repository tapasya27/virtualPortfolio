"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIAL } from "@/data/portfolio";

const TAGLINES = [
  "Software Engineer",
  "Adventure Enthusiast",
  "Data Engineer",
  "Dancer",
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
            padding: "min(100px, 10vh) clamp(16px, 5vw, 48px) 0",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { href: SOCIAL.github, Icon: Github, label: "GitHub", bg: "rgba(255,255,255,0.12)", hoverBg: "rgba(255,255,255,0.22)", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" },
              { href: SOCIAL.linkedin, Icon: Linkedin, label: "LinkedIn", bg: "rgba(10,102,194,0.2)", hoverBg: "rgba(10,102,194,0.4)", color: "#6cb4f0", borderColor: "rgba(77,157,224,0.4)" },
              { href: `mailto:${SOCIAL.email}`, Icon: Mail, label: "Email", bg: "rgba(230,168,23,0.18)", hoverBg: "rgba(230,168,23,0.35)", color: "#f0c040", borderColor: "rgba(230,168,23,0.4)" },
            ].map(({ href, Icon, label, bg, hoverBg, color, borderColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color,
                  background: bg,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: "999px",
                  padding: "8px clamp(10px, 2vw, 16px) 8px clamp(8px, 2vw, 12px)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(10px, 2.5vw, 11px)",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = hoverBg;
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${borderColor}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = bg;
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Name block */}
        <motion.div
          style={{
            padding: "0 clamp(16px, 5vw, 40px)",
            marginTop: "min(40px, 5vh)",
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
        {/* Tagline rotator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{
            padding: "20px clamp(16px, 5vw, 48px) 32px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Rotating role */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "38px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={taglineIndex}
                    initial={{ y: 30, opacity: 0, rotateX: -40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -30, opacity: 0, rotateX: 40 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "28px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {TAGLINES[taglineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>


            </div>

            {/* Pronouns */}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "lowercase",
                color: "var(--text-3)",
                opacity: 0.7,
              }}
            >
              she / her
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── ABOUT (below name, same section) ── */}
      <div
        ref={aboutRef}
        style={{ padding: "clamp(24px, 6vw, 48px) clamp(16px, 5vw, 48px) clamp(60px, 10vw, 120px)", maxWidth: "1200px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={aboutVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
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
              About{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                Me
              </span>
            </h2>
            {[
              "Hii, thanks for stopping by! It truly means a lot to me that you're here checking out my portfolio. This portfolio, unlike traditional ones, has been created to represent me as a person rather than just my technical skills. Hope you enjoy it ✨",
              "In the background you'll find snippets of my life - moments I've captured and things that inspire me. I have a passion for numerous things in life, including but not limited to technology, adventure, nature, reading, and yapping.",
              "I'm also a Software Engineer at Microsoft, building performant and secure data products and APIs. I also hold a Bachelor's degree in Data Science from Drexel University.",
              "Currently based in British Columbia, Canada 📍",
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
                icon: "🔥",
                title: "Gritty & Disciplined",
                body: "I push through the hard stuff. Consistency and discipline over motivation — all day, every day.",
              },
              {
                icon: "💻",
                title: "Tech Savvy",
                body: "Have been playing with tech since childhood. Be it swapping a laptop battery, building CI/CD pipelines, or refactoring a whole codebase — this is my home turf.",
              },
              {
                icon: "✈️",
                title: "Adrenaline Junkie",
                body: "I enjoy things that give me adrenaline. I've jumped off a plane out of choice - twice.",
              },
              {
                icon: "🎨",
                title: "Creative & Expressive",
                body: "Painting, dancing, lifting, and exploring nature - these are the things that fuel my creativity and keep me human.",
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
