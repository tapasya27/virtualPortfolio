"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CircularStatProps {
  value: number;
  max?: number;
  label: string;
  suffix?: string;
  color?: string;
  size?: number;
}

export function CircularStat({
  value,
  max = 100,
  label,
  suffix = "",
  color = "rgb(124,58,237)",
  size = 120,
}: CircularStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  const radius = 46;
  const stroke = 7;
  const normalised = Math.min(value / max, 1);
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgb(var(--border))"
            strokeWidth={stroke}
            fill="none"
          />
          {/* Progress arc */}
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              inView
                ? { strokeDashoffset: circumference * (1 - normalised) }
                : { strokeDashoffset: circumference }
            }
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>

        {/* Centre value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">
            {display}
            <span className="text-base text-muted">{suffix}</span>
          </span>
        </div>
      </div>

      <p className="text-sm text-muted text-center leading-tight max-w-[100px]">
        {label}
      </p>
    </div>
  );
}
