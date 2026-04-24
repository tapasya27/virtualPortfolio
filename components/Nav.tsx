"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/resume", label: "Résumé" },
  { href: "/#chat", label: "Chat" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg/70 backdrop-blur"
    >
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          tapasya<span className="text-accent">.</span>
        </Link>
        <ul className="flex gap-5 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-fg transition">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
