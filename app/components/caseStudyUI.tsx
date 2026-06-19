// Shared presentational primitives for case-study pages (Bloom, Time Tracker).
// Server-component safe. No client hooks.
import type { ReactNode } from "react";
import Image from "next/image";
import AnimatedStat from "./AnimatedStat";

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
  src,
  priority = false,
}: {
  label: string;
  caption?: string;
  aspect?: string;
  // When provided, renders the real image (contained, no crop) instead of the
  // dashed placeholder. Mobile screenshots already carry their device frame,
  // so we letterbox-blend against the page background rather than cover-crop.
  src?: string;
  priority?: boolean;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <div
        className="w-full rounded-xl overflow-hidden relative flex items-center justify-center"
        style={{
          aspectRatio: aspect,
          background: src ? "transparent" : "var(--card)",
          border: "none",
        }}
      >
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 90vw, 45vw"
            priority={priority}
          />
        ) : (
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
        )}
      </div>
      {caption && (
        <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Centers and caps a portrait phone screenshot so a single mobile shot doesn't
// stretch to the full content width.
export function PhoneFrame({ children, maxWidth = 300 }: { children: ReactNode; maxWidth?: number }) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth }}>
      {children}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex flex-col gap-5 font-light text-[16px] sm:text-[18px] leading-[1.8]"
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

// Big, bold, pop-colored metric row for the intro — sits above the hero image.
export function IntroMetrics({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-12 sm:gap-x-16 gap-y-6">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1.5" style={{ maxWidth: "26ch" }}>
          <p
            className="font-semibold tabular-nums"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--pop)" }}
          >
            <AnimatedStat value={s.value} />
          </p>
          <p className="text-[12px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function IntroMetadataSection({
  role,
  timeline,
  platform,
  results,
}: {
  role: ReactNode;
  timeline: ReactNode;
  platform: ReactNode;
  results?: { value: string; label: string }[];
}) {
  const metadata = [
    { label: "My role", value: role },
    { label: "Timeline", value: timeline },
    { label: "Platform", value: platform },
  ];

  return (
    <div className="flex flex-col gap-[2px]">
      <div className="grid grid-cols-1 gap-[2px] md:grid-cols-3">
        {metadata.map((item) => (
          <div
            key={item.label}
            className="rounded-xl px-6 sm:px-8 py-5 flex flex-col gap-1 min-w-0"
            style={{ background: "var(--card)" }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] font-normal" style={{ color: "var(--accent)" }}>
              {item.label}
            </p>
            <div className="flex flex-col gap-1.5 text-[15px] sm:text-[16px] font-light leading-snug break-words" style={{ color: "#3A3530" }}>
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {results && results.length > 0 && (
        <div className="rounded-xl px-6 sm:px-8 py-5" style={{ background: "var(--card)" }}>
          <div className="flex flex-col gap-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-normal" style={{ color: "var(--accent)" }}>Results</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
              {results.map((result) => (
                <div key={`${result.value}-${result.label}`} className="flex items-baseline gap-3">
                  <span className="font-semibold tabular-nums shrink-0" style={{ color: "var(--pop)", fontSize: "clamp(20px, 4vw, 36px)", letterSpacing: "-0.03em" }}>
                    <AnimatedStat value={result.value} />
                  </span>
                  <span className="text-[13px] sm:text-[15px] font-light leading-snug" style={{ color: "#3A3530" }}>
                    {result.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <p
            className="font-semibold tabular-nums"
            style={{ fontSize: "clamp(30px, 3.6vw, 46px)", letterSpacing: "-0.03em", color: "var(--pop)" }}
          >
            <AnimatedStat value={s.value} />
          </p>
          <p className="text-[11px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
