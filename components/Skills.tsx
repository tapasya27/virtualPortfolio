"use client";

import { motion } from "framer-motion";
import { bio } from "@/lib/data";

export function Skills() {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold mb-6"
      >
        Skills
      </motion.h2>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="flex flex-wrap gap-2"
      >
        {bio.skills.map((skill) => (
          <motion.li
            key={skill}
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
