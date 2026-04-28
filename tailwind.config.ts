import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display:    ["var(--font-display)", "serif"],
        body:       ["var(--font-body)", "sans-serif"],
        mono:       ["var(--font-mono)", "monospace"],
        devanagari: ["var(--font-devanagari)", "sans-serif"],
      },
      colors: {
        accent:  { DEFAULT: "#d4a843", light: "#e8bf6a", dark: "#9e7520" },
        teal:    "#00c896",
        crimson: "#e84040",
      },
      animation: {
        "spin-slow": "spin-slow 22s linear infinite",
        "float-y":   "float-y 6s ease-in-out infinite",
        "pulse-glow":"pulse-glow 4s ease-in-out infinite",
        "shimmer":   "shimmer 4s linear infinite",
        "grain":     "grain 8s steps(10) infinite",
        "blink":     "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
