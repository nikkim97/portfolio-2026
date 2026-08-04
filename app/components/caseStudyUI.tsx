// Shared presentational primitives for case-study pages (Bloom, Time Tracker).
// Server-component safe. No client hooks.
import type { ReactNode } from "react";
import Image from "next/image";
import AnimatedStat from "./AnimatedStat";
import LightboxFrame from "./LightboxFrame";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mono-label" style={{ color: "var(--accent-text)" }}>
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="serif-display"
      style={{ fontSize: "clamp(22px, 2.5vw, 31px)", lineHeight: 1.2, fontWeight: 400 }}
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
  expandable = true,
  fit = "contain",
  position = "center",
  scale = 1,
  priority = false,
}: {
  label: string;
  caption?: string;
  aspect?: string;
  // When provided, renders the real image (contained, no crop) instead of the
  // dashed placeholder. Mobile screenshots already carry their device frame,
  // so we letterbox-blend against the page background rather than cover-crop.
  src?: string;
  expandable?: boolean;
  fit?: "contain" | "cover";
  position?: string;
  scale?: number;
  priority?: boolean;
}) {
  const [aspectWidth, aspectHeight] = aspect.split("/").map((value) => Number.parseFloat(value.trim()));
  const isPortrait = Number.isFinite(aspectWidth) && Number.isFinite(aspectHeight) && aspectWidth / aspectHeight < 0.85;
  const modalWidth = isPortrait ? "min(82vw, 460px)" : undefined;

  return (
    <figure className="media-inset flex flex-col gap-2">
      {src ? (
        <LightboxFrame alt={label} expandable={expandable} modalWidth={modalWidth}>
          <div
            className="w-full rounded-xl overflow-hidden relative flex items-center justify-center"
            style={{
              aspectRatio: aspect,
              background: "transparent",
              border: "none",
            }}
          >
            <Image
              src={src}
              alt={label}
              fill
              className={fit === "cover" ? "object-cover" : "object-contain"}
              style={{ objectPosition: position, transform: scale === 1 ? undefined : `scale(${scale})` }}
              sizes="(max-width: 640px) 90vw, 45vw"
              priority={priority}
            />
          </div>
        </LightboxFrame>
      ) : (
        <div
          className="w-full rounded-xl overflow-hidden relative flex items-center justify-center"
          style={{
            aspectRatio: aspect,
            background: "var(--card)",
            border: "none",
          }}
        >
          <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
        </div>
      )}
      {caption && (
        <figcaption className="figure-caption">{caption}</figcaption>
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

// Autoplaying, looping, muted hero video. autoPlay/loop/muted/playsInline are
// declarative attributes, so this stays a server component. The container holds
// the aspect ratio to avoid layout shift before the video loads; the poster
// covers the first paint.
export function HeroVideo({
  src,
  poster,
  aspect,
  label,
  maxWidth = 420,
}: {
  src: string;
  poster?: string;
  aspect: string;
  label: string;
  maxWidth?: number;
}) {
  return (
    <div className="mx-auto w-full" style={{ maxWidth }}>
      <div className="w-full rounded-xl overflow-hidden relative" style={{ aspectRatio: aspect }}>
        <video
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose">{children}</div>;
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

export function ArticleHero({
  eyebrow,
  live,
  title,
  meta,
}: {
  eyebrow: ReactNode;
  live?: { href: string; label: string };
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="pt-14 sm:pt-20 pb-2 flex flex-col gap-7">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <span className="mono-label" style={{ color: "var(--accent-text)" }}>{eyebrow}</span>
        {live && (
          <a
            href={live.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label border-b border-[var(--border)] pb-0.5 hover:border-[var(--accent)] transition-colors duration-200"
            style={{ color: "var(--accent-text)" }}
          >
            {live.label} ↗︎
          </a>
        )}
      </div>
      <h1
        className="serif-display"
        style={{ fontSize: "clamp(30px, 4.4vw, 50px)", lineHeight: 1.12, fontWeight: 400 }}
      >
        {title}
      </h1>
      {meta}
    </header>
  );
}

export function ArticleMeta({
  role,
  timeline,
  platform,
  results,
  resultsLabel = "Results",
}: {
  role: ReactNode;
  timeline: ReactNode;
  platform: ReactNode;
  results?: { value: string; label: string }[];
  resultsLabel?: string;
}) {
  const items = [
    { label: "Role", value: role },
    { label: "Timeline", value: timeline },
    { label: "Platform", value: platform },
  ];

  return (
    <div
      className="flex flex-col gap-6 py-6"
      style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5 min-w-0">
            <span className="mono-label">{item.label}</span>
            <span
              className="serif-display"
              style={{ fontSize: 15, lineHeight: 1.45, color: "var(--body)", letterSpacing: 0 }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {results && results.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <span className="mono-label">{resultsLabel}</span>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {results.map((result) => (
              <div key={`${result.value}-${result.label}`} className="flex items-baseline gap-3">
                <span
                  className="serif-display tabular-nums"
                  style={{ color: "var(--pop)", fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 500, letterSpacing: "-0.02em" }}
                >
                  <AnimatedStat value={result.value} />
                </span>
                <span
                  className="serif-display"
                  style={{ fontSize: 15, lineHeight: 1.4, color: "var(--body)", letterSpacing: 0 }}
                >
                  {result.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SectionHeader({
  index,
  label,
  heading,
  first = false,
}: {
  index?: string;
  label: ReactNode;
  heading: ReactNode;
  first?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-3${first ? "" : " article-section-gap"}`}>
      <span className="mono-label" style={{ color: "var(--accent-text)" }}>
        {index ? `${index} / ` : ""}
        {label}
      </span>
      <h2
        className="serif-display"
        style={{ fontSize: "clamp(22px, 2.5vw, 31px)", lineHeight: 1.2, fontWeight: 400 }}
      >
        {heading}
      </h2>
    </div>
  );
}

const FIGURE_COL: Record<"text" | "wide" | "full", string> = {
  text: "",
  wide: "col-wide",
  full: "col-full",
};

export function Figure({
  src,
  alt,
  caption,
  aspect = "16/9",
  variant = "wide",
  maxWidth,
  fit = "contain",
  background,
  expandable = true,
  priority = false,
}: {
  src?: string;
  alt: string;
  caption?: ReactNode;
  aspect?: string;
  variant?: "text" | "wide" | "full";
  maxWidth?: number;
  fit?: "contain" | "cover";
  background?: string;
  expandable?: boolean;
  priority?: boolean;
}) {
  const full = variant === "full";

  return (
    <figure
      className={`${FIGURE_COL[variant]} media-inset`}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {src ? (
        <LightboxFrame alt={alt} expandable={expandable}>
          <div
            className="w-full overflow-hidden relative flex items-center justify-center"
            style={{ aspectRatio: aspect, borderRadius: full ? 0 : 12, background }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className={fit === "cover" ? "object-cover" : "object-contain"}
              sizes={full ? "100vw" : "(max-width: 640px) 92vw, 900px"}
              priority={priority}
            />
          </div>
        </LightboxFrame>
      ) : (
        <div
          className="w-full overflow-hidden relative flex items-center justify-center"
          style={{ aspectRatio: aspect, background: background ?? "var(--card)", borderRadius: full ? 0 : 12 }}
        >
          <p className="mono-label opacity-50 px-4 text-center">{alt}</p>
        </div>
      )}
      {caption && (
        <figcaption className="figure-caption">{caption}</figcaption>
      )}
    </figure>
  );
}

const FIGURE_GROUP_COLS: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1",
  3: "grid-cols-1",
  4: "grid-cols-1",
};

export function FigureGroup({
  children,
  cols = 2,
  caption,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  caption?: ReactNode;
}) {
  return (
    <div className="col-wide media-inset">
      <div className={`grid gap-4 items-start ${FIGURE_GROUP_COLS[cols]}`}>{children}</div>
      {caption && (
        <div className="figure-caption">{caption}</div>
      )}
    </div>
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
  resultsLabel = "Results",
}: {
  role: ReactNode;
  timeline: ReactNode;
  platform: ReactNode;
  results?: { value: string; label: string }[];
  resultsLabel?: string;
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
            <p className="mono-label" style={{ color: "var(--accent-text)" }}>
              {item.label}
            </p>
            <div
              className="serif-display flex flex-col gap-1.5 text-[15px] sm:text-[16px] leading-snug break-words"
              style={{ color: "var(--body)", letterSpacing: 0 }}
            >
              <p>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {results && results.length > 0 && (
        <div className="rounded-xl px-6 sm:px-8 py-5" style={{ background: "var(--card)" }}>
          <div className="flex flex-col gap-3">
            <p className="mono-label" style={{ color: "var(--accent-text)" }}>{resultsLabel}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
              {results.map((result) => (
                <div key={`${result.value}-${result.label}`} className="flex items-baseline gap-3">
                  <span className="serif-display tabular-nums shrink-0" style={{ color: "var(--pop)", fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
                    <AnimatedStat value={result.value} />
                  </span>
                  <span className="serif-display text-[13px] sm:text-[15px] leading-snug" style={{ color: "var(--body)", letterSpacing: 0 }}>
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
