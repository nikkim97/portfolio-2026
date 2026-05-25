// Shared presentational primitives for case-study pages (Bloom, Time Tracker).
// Server-component safe — no client hooks.
import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--accent)]">
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-light"
      style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
    >
      {children}
    </h2>
  );
}

export function Screenshot({
  label,
  caption,
  aspect = "16/9",
}: {
  label: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <div
        className="w-full rounded-xl overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: aspect, background: "var(--card)", border: "1px dashed var(--border)" }}
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
      </div>
      {caption && (
        <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-col gap-4 font-light text-sm leading-[1.85]"
      style={{ color: "#3A3530" }}
    >
      {children}
    </div>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      className="font-light"
      style={{
        fontSize: "clamp(16px, 1.6vw, 20px)",
        letterSpacing: "-0.01em",
        lineHeight: 1.5,
        color: "var(--foreground)",
        borderLeft: "2px solid var(--accent)",
        paddingLeft: "1.25em",
        margin: "0",
      }}
    >
      {children}
    </blockquote>
  );
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <p
            className="font-light tabular-nums"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em", color: "var(--foreground)" }}
          >
            {s.value}
          </p>
          <p className="text-[11px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
