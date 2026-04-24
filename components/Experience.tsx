"use client";

import { motion } from "framer-motion";
import { Timeline } from "./Timeline";
import { CircularStat } from "./CircularStat";
import { workHistory, experienceStats } from "@/lib/data";

export function Experience() {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-semibold mb-2"
      >
        Experience
      </motion.h2>
      <p className="text-muted mb-10 max-w-xl">
        Roles, teams, and the systems I helped build. Stats are updated quarterly.
      </p>

      {/* Circular-ring stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 rounded-2xl border border-border bg-card/40 p-6">
        {experienceStats.map((stat, i) => (
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
              color={stat.color ?? "rgb(124,58,237)"}
            />
          </motion.div>
        ))}
      </div>

      {/* Work history timeline */}
      <h3 className="text-xl font-semibold mb-6">Work history</h3>
      <Timeline items={workHistory} />
    </div>
  );
}
