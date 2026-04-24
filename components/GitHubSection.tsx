"use client";

import { motion } from "framer-motion";
import { Heatmap } from "./Heatmap";
import { githubStats } from "@/lib/data";

export function GitHubSection() {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold mb-2"
      >
        GitHub
      </motion.h2>
      <p className="text-muted mb-8 max-w-xl">
        A year of commits, open-source work, and weekend tinkering.{" "}
        <a
          href={`https://github.com/${githubStats.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          @{githubStats.username} ↗
        </a>
      </p>

      {/* Summary counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Contributions", value: githubStats.totalContributions },
          { label: "Longest streak", value: `${githubStats.longestStreak}d` },
          { label: "Public repos", value: githubStats.publicRepos },
          { label: "Followers", value: githubStats.followers },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="rounded-2xl border border-border bg-card/60 p-4"
          >
            <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Heatmap panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card/50 p-5 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted">
            <span className="text-fg font-medium">{githubStats.totalContributions}</span>{" "}
            contributions in the last year
          </p>
          <p className="hidden sm:block text-xs text-muted">
            Current streak: <span className="text-fg">{githubStats.currentStreak} days</span>
          </p>
        </div>
        <Heatmap />
      </motion.div>
    </div>
  );
}
