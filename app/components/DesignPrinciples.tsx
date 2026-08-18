"use client";

import { FadeIn } from "./ui";

const PRINCIPLES = [
  {
    key: "systems",
    tab: "Strategy",
    title: "I think in systems.",
    body: "I design beyond the moment of launch by considering the broader system, the incentives that shape it, and how an experience may evolve over time.",
  },
  {
    key: "other-end",
    tab: "Audience",
    title: "I start with the person.",
    body: "I begin by understanding the context people are in, what they need, and how they make decisions. The closer I can get to the people using a product, the better I can build for them.",
  },
  {
    key: "simplicity",
    tab: "Simplicity",
    title: "I make the call.",
    body: "I believe good design requires judgment. I focus on what matters most, keep unnecessary complexity behind the scenes, and remove anything that does not earn its place in the experience.",
  },
  {
    key: "build",
    tab: "Feasibility",
    title: "I build toward something real.",
    body: "I design with a clear path to shipping in mind. I work within constraints, while also recognizing when those constraints need to be challenged to make the work better.",
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
            <p className="text-base font-normal leading-[1.75]" style={{ color: "var(--body)" }}>
              <strong className="font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
                <span className="font-light tabular-nums text-[var(--accent)]" style={{ fontSize: "clamp(24px, 2.4vw, 30px)", opacity: 0.82 }}>
                  {String(index + 1).padStart(2, "0")} —
                </span>{" "}
                {principle.title}
              </strong>
              <br />
              {principle.body}
            </p>
          </li>
        ))}
      </ol>
    </FadeIn>
  );
}
