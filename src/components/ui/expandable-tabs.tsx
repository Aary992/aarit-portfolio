"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Tab {
  title: string;
  icon: LucideIcon;
  href?: string;
}
export interface Separator {
  type: "separator";
}
export type TabItem = Tab | Separator;

const buttonVariants = {
  animate: (isActive: boolean) => ({
    gap: isActive ? ".5rem" : 0,
    paddingLeft: isActive ? "1rem" : ".6rem",
    paddingRight: isActive ? "1rem" : ".6rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition: Transition = { type: "spring", bounce: 0.1, duration: 0.5 };

function isSeparator(item: TabItem): item is Separator {
  return (item as Separator).type === "separator";
}

export function ExpandableTabs({
  tabs,
  className,
  onChange,
}: {
  tabs: TabItem[];
  className?: string;
  onChange?: (index: number) => void;
}) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);

  const active = hovered ?? selected;

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex items-center gap-1 rounded-full border border-edge bg-night/60 p-1 backdrop-blur-md",
        className,
      )}
    >
      {tabs.map((tab, index) => {
        if (isSeparator(tab)) {
          return (
            <div
              key={`sep-${index}`}
              className="mx-1 h-5 w-px bg-edge"
              aria-hidden="true"
            />
          );
        }
        const Icon = tab.icon;
        const isActive = active === index;
        return (
          <motion.button
            key={tab.title}
            type="button"
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isActive}
            transition={transition}
            onMouseEnter={() => setHovered(index)}
            onFocus={() => setHovered(index)}
            onClick={() => {
              setSelected(index);
              onChange?.(index);
            }}
            aria-label={tab.title}
            className={cn(
              "relative flex cursor-pointer items-center rounded-full py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-amber",
              isActive ? "text-night" : "text-muted hover:text-ink",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="expandable-tab-bg"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-ember to-amber"
                transition={transition}
              />
            )}
            <span className="relative z-10 flex items-center">
              <Icon className="h-4 w-4 shrink-0" />
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <span className="pl-2">{tab.title}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
