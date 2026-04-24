"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative h-56 [perspective:1000px]"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 [transform-style:preserve-3d]"
        onClick={() => setFlipped((f) => !f)}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl border border-border bg-card/60 p-5 [backface-visibility:hidden] cursor-pointer">
          <h3 className="text-lg font-medium">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">{project.blurb}</p>
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent/10 text-accent px-2 py-0.5 text-xs">
                {t}
              </span>
            ))}
          </div>
          <span className="absolute top-4 right-4 text-xs text-muted">click to flip →</span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl border border-accent/40 bg-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] cursor-pointer">
          <h3 className="text-lg font-medium">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">{project.details}</p>
          <div className="absolute bottom-4 left-5 right-5 flex gap-3 text-sm">
            {project.demo && (
              <a
                href={project.demo}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Demo ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Repo ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
