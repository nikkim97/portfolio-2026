"use client";

import { FadeIn } from "./ui";

const PRINCIPLES = [
  {
    key: "systems",
    tab: "Strategy",
    title: "Think in systems",
    body: "Design beyond launch. Understand the broader system, its incentives, and how the experience evolves.",
  },
  {
    key: "other-end",
    tab: "Audience",
    title: "Start with the person",
    body: "Begin with context, needs, and decision-making. Get closer to the people using what I build.",
  },
  {
    key: "simplicity",
    tab: "Simplicity",
    title: "Make the call",
    body: "Decide what matters. Keep complexity behind the scenes and remove what doesn't belong in the experience.",
  },
  {
    key: "build",
    tab: "Feasibility",
    title: "Build toward real",
    body: "Design with a clear path to shipping. Work within constraints and recognize where to push them.",
  },
];

export default function DesignPrinciples() {
  return (
    <FadeIn delay={0.05}>
      <ol className="grid gap-x-14 gap-y-10 sm:grid-cols-2">
        {PRINCIPLES.map((principle, index) => (
          <li
            key={principle.key}
            className="flex flex-col"
          >
            <span className="font-light leading-none tabular-nums text-[var(--accent)]" style={{ fontSize: "clamp(24px, 2.4vw, 30px)", opacity: 0.82 }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-base font-normal leading-[1.75]" style={{ color: "var(--body)" }}>
              <strong className="font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">{principle.title}</strong>
              <br />
              {principle.body}
            </p>
          </li>
        ))}
      </ol>
    </FadeIn>
  );
}
