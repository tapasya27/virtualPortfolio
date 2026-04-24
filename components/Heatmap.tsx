"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const WEEKS = 52;
const DAYS = 7;

// Deterministic pseudo-random so SSR and client match (no hydration mismatch)
function seededRand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function buildGrid(): number[][] {
  const grid: number[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    const col: number[] = [];
    for (let d = 0; d < DAYS; d++) {
      const r = seededRand(w * 7 + d);
      // weight towards lower values, occasional spikes
      const raw = Math.pow(r, 1.8);
      const level = raw > 0.75 ? 4 : raw > 0.55 ? 3 : raw > 0.35 ? 2 : raw > 0.15 ? 1 : 0;
      col.push(level);
    }
    grid.push(col);
  }
  return grid;
}

const levelClass: Record<number, string> = {
  0: "bg-card border-border/50",
  1: "bg-accent/20 border-accent/20",
  2: "bg-accent/40 border-accent/30",
  3: "bg-accent/70 border-accent/50",
  4: "bg-accent border-accent",
};

export function Heatmap() {
  const grid = useMemo(buildGrid, []);

  return (
    <div className="w-full">
      <div className="flex gap-4 items-start">
        {/* Day labels */}
        <div className="hidden sm:flex flex-col justify-between py-1 text-[10px] text-muted pr-1" style={{ height: "98px" }}>
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Scrollable grid */}
        <div className="overflow-x-auto no-scrollbar flex-1 -mx-1 px-1">
          <div
            className="grid grid-flow-col gap-[3px]"
            style={{
              gridTemplateRows: `repeat(${DAYS}, minmax(0, 1fr))`,
              width: "max-content",
            }}
          >
            {grid.flatMap((week, w) =>
              week.map((level, d) => (
                <motion.div
                  key={`${w}-${d}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (w * DAYS + d) * 0.0015, duration: 0.25 }}
                  className={`size-[11px] sm:size-3 rounded-[2px] border ${levelClass[level]}`}
                  title={`Week ${w + 1}, Day ${d + 1}: ${level} contributions`}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 justify-end mt-4 text-[10px] text-muted">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <span
            key={lvl}
            className={`size-3 rounded-[2px] border ${levelClass[lvl]}`}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
