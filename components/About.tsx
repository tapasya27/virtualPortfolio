"use client";

import { motion } from "framer-motion";
import { bio } from "@/lib/data";
import { SkillLogos } from "./SkillLogos";

export function About() {
  return (
    <div className="flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4">About</h2>
        <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
          {bio.summary}
        </p>
        <p className="mt-4 text-sm text-muted">
          Based in <span className="text-fg">{bio.location}</span>. Currently:{" "}
          <span className="text-fg">{bio.currently}</span>.
        </p>
      </motion.div>

      <SkillLogos />
    </div>
  );
}
