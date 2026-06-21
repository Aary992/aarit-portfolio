"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav } from "@/lib/data";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 pt-4 sm:px-6"
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 rounded-full border border-edge bg-night/60 px-3 py-2 font-display text-base font-bold tracking-tight backdrop-blur-md"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-ember to-amber text-xs font-bold text-night">
          A
        </span>
        <span className="hidden sm:inline">Aarit Shah</span>
      </Link>

      <nav className="hidden items-center gap-0.5 rounded-full border border-edge bg-night/60 p-1 backdrop-blur-md md:flex">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                active ? "text-night" : "text-muted hover:text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-ember to-amber"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/#contact"
        className="group hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-night transition-transform duration-200 hover:scale-[1.03] md:inline-flex"
      >
        Book a call
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-10 w-10 place-items-center rounded-full border border-edge bg-night/60 text-ink backdrop-blur-md md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-[72px] rounded-2xl border border-edge bg-night/90 p-2 backdrop-blur-xl md:hidden"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-surface text-ink"
                    : "text-muted hover:bg-surface hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-ink px-4 py-3 text-center text-base font-medium text-night"
            >
              Book a call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
