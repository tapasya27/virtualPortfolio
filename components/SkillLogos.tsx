"use client";

import { motion } from "framer-motion";

// Uses Simple Icons CDN (https://simpleicons.org) — no package install needed.
// img-src CSP already allows https: so these load fine.
const skills: { name: string; slug: string; color: string }[] = [
  { name: "TypeScript",    slug: "typescript",    color: "3178C6" },
  { name: "React",         slug: "react",         color: "61DAFB" },
  { name: "Next.js",       slug: "nextdotjs",     color: "FFFFFF" },
  { name: "Node.js",       slug: "nodedotjs",     color: "5FA04E" },
  { name: "Python",        slug: "python",        color: "3776AB" },
  { name: "PostgreSQL",    slug: "postgresql",    color: "4169E1" },
  { name: "Tailwind CSS",  slug: "tailwindcss",   color: "06B6D4" },
  { name: "Docker",        slug: "docker",        color: "2496ED" },
  { name: "Git",           slug: "git",           color: "F05032" },
  { name: "AWS",           slug: "amazonaws",     color: "FF9900" },
];

export function SkillLogos() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted mb-4">Tech I work with</p>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.slug}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            whileHover={{ y: -3, scale: 1.05 }}
            className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5"
            title={skill.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${skill.slug}/${skill.color}`}
              alt={skill.name}
              width={16}
              height={16}
              className="size-4"
            />
            <span className="text-xs font-medium text-fg">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
