"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { EASE, FadeIn } from "./ui";

const PRINCIPLES = [
  {
    key: "systems",
    tab: "Strategy",
    title: "I think in systems",
    body: "I want the things I make to keep working long after I've moved on, so I start by mapping systems and thinking strategically about the problem we're solving.",
  },
  {
    key: "other-end",
    tab: "Audience",
    title: "Someone is on the other end",
    body: "I left engineering for design because I kept wondering who was actually using the systems I built. Figuring out who we're solving for still starts every project.",
  },
  {
    key: "simplicity",
    tab: "Simplicity",
    title: "Less is a decision",
    body: "Complex problems don't need complex solutions, they need someone willing to make calls. If a feature, a word, or a pixel isn't doing a job, I cut it.",
  },
  {
    key: "build",
    tab: "Feasibility",
    title: "I design what I can build",
    body: "My engineering foundations keep me honest about what's possible. I'll always design things I can build too.",
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
