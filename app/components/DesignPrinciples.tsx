"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE, FadeIn } from "./ui";

const PRINCIPLES = [
  {
    key: "systems",
    tab: "Strategy",
    title: "Think in systems",
    body: "I design for what happens beyond the first launch. That means understanding the broader system, the incentives within it, and how an experience needs to hold up as it evolves.",
  },
  {
    key: "other-end",
    tab: "Audience",
    title: "Start with the person",
    body: "I moved from engineering to design because I wanted to get closer to the people using what I built. Understanding their context, needs, and decision-making is where every project begins.",
  },
  {
    key: "simplicity",
    tab: "Simplicity",
    title: "Make the call",
    body: "Complexity is often necessary behind the scenes—not in the experience itself. I simplify by deciding what matters most and removing what doesn't.",
  },
  {
    key: "build",
    tab: "Feasibility",
    title: "Build toward real",
    body: "My engineering background helps me work productively within constraints and recognize where to push them. I design with a clear path to making the work real.",
  },
];

export default function DesignPrinciples() {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();
  const current = PRINCIPLES[active];

  return (
    <div className="flex flex-col gap-8">
      <FadeIn>
        <p
          className="font-light text-[var(--foreground)]"
          style={{ fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "-0.015em", lineHeight: 1.2 }}
        >
          My design principles
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        {/* Tab row */}
        <div
          role="tablist"
          aria-label="Design principles"
          className="flex flex-wrap gap-x-12 gap-y-3 border-b border-[var(--border)]"
        >
          {PRINCIPLES.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.key}
                role="tab"
                aria-selected={isActive}
                aria-label={p.title}
                onClick={() => setActive(i)}
                className="relative pb-3 text-[11px] font-normal tracking-[0.2em] uppercase transition-colors duration-200"
                style={{ color: isActive ? "var(--foreground)" : "var(--midtone)" }}
              >
                {p.tab}
                {isActive && (
                  <motion.span
                    layoutId="dp-underline"
                    className="absolute left-0 right-0 -bottom-px h-px bg-[var(--foreground)]"
                    transition={{ duration: prefersReduced ? 0 : 0.4, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Content */}
      <div className="min-h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={{ duration: prefersReduced ? 0 : 0.35, ease: EASE }}
            className="flex flex-col gap-3 max-w-2xl"
          >
            <p
              className="font-light text-[var(--foreground)]"
              style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.015em", lineHeight: 1.25 }}
            >
              {current.title}
            </p>
            <p className="text-base font-normal leading-[1.9]" style={{ color: "var(--body)" }}>
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
