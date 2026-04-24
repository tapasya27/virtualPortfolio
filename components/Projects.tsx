"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { CircularStat } from "./CircularStat";
import { projects, projectStats } from "@/lib/data";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();

export function Projects() {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active ? projects.filter((p) => p.tags.includes(active)) : projects),
    [active]
  );

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold mb-2"
      >
        Projects
      </motion.h2>
      <p className="text-muted mb-10 max-w-xl">
        Selected things I've built. Click a card to flip it.
      </p>

      {/* Circular-ring stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 rounded-2xl border border-border bg-card/40 p-6">
        {projectStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <CircularStat
              value={stat.value}
              max={stat.max}
              label={stat.label}
              suffix={stat.suffix}
              color={stat.color ?? "rgb(236, 72, 153)"}
            />
          </motion.div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActive(null)}
          className={`rounded-full px-3 py-1 text-xs border transition ${
            active === null
              ? "bg-accent text-white border-accent"
              : "border-border text-muted hover:text-fg"
          }`}
        >
          all
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`rounded-full px-3 py-1 text-xs border transition ${
              active === tag
                ? "bg-accent text-white border-accent"
                : "border-border text-muted hover:text-fg"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </motion.div>
    </div>
  );
}
