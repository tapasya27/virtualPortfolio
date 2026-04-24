"use client";

import { motion } from "framer-motion";
import { bio } from "@/lib/data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-[70vh] flex flex-col justify-center"
    >
      <motion.p variants={item} className="text-sm uppercase tracking-widest text-accent mb-4">
        Hi, I'm
      </motion.p>
      <motion.h1 variants={item} className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight">
        {bio.name}
      </motion.h1>
      <motion.p variants={item} className="mt-4 text-lg sm:text-xl text-muted max-w-xl">
        {bio.tagline}
      </motion.p>
      <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
        <a
          href="#chat"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
        >
          Ask me anything
        </a>
        <a
          href="#projects"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-card transition"
        >
          See my work
        </a>
      </motion.div>

      {/* Floating avatar blob */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-8 top-40 hidden md:block size-48 rounded-full bg-gradient-to-br from-accent/70 to-pink-400/50 blur-2xl"
      />
    </motion.div>
  );
}
