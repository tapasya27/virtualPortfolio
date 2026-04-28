"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [dot, setDot] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const moveDot = (e: MouseEvent) => {
      setDot({ x: e.clientX, y: e.clientY });
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[role='button']")) setHovered(true);
    };
    const out = () => setHovered(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", moveDot);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", moveDot);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
        style={{ borderColor: "var(--accent)" }}
        animate={{
          x: pos.x - (hovered ? 20 : 16),
          y: pos.y - (hovered ? 20 : 16),
          width:  hovered ? 40 : 32,
          height: hovered ? 40 : 32,
          opacity: hovered ? 0.6 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{ background: "var(--accent)", width: 5, height: 5 }}
        animate={{ x: dot.x - 2.5, y: dot.y - 2.5 }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
      />
    </>
  );
}
