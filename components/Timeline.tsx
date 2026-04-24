"use client";

import { motion } from "framer-motion";
import type { WorkItem } from "@/lib/data";

export function Timeline({ items }: { items: WorkItem[] }) {
  return (
    <ol className="relative border-l border-border pl-8 flex flex-col gap-10">
      {items.map((item, i) => (
        <motion.li
          key={`${item.company}-${i}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative"
        >
          <span className="absolute -left-[37px] top-1.5 size-3 rounded-full bg-accent ring-4 ring-bg" />
          <p className="text-xs uppercase tracking-widest text-muted">{item.period}</p>
          <h3 className="text-lg font-medium mt-1">
            {item.role} · <span className="text-muted">{item.company}</span>
          </h3>
          <p className="text-sm text-muted mt-1 max-w-xl">{item.summary}</p>
        </motion.li>
      ))}
    </ol>
  );
}
