"use client";

import { motion } from "framer-motion";
import { socials } from "@/lib/data";

export function Socials() {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Get in touch</h2>
      <div className="flex flex-wrap gap-3">
        {socials.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm hover:border-accent transition"
          >
            {s.label}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
