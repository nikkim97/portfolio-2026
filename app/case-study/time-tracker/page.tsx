import Link from "next/link";
import { FONT } from "../../components/ui";

export default function TimeTrackerCaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100dvh", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">Vibe Coded · 2026</span>
        </div>
      </div>

      {/* ── Coming soon ── */}
      <div className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: "calc(100dvh - 48px)" }}>
        <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)] mb-6">Coming Soon</p>
        <h1
          className="font-semibold"
          style={{ fontSize: "clamp(32px, 6vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 700 }}
        >
          Time Tracking Dashboard
        </h1>
        <p className="font-light mt-6 text-[var(--midtone)]" style={{ fontSize: "clamp(14px, 1.5vw, 18px)", maxWidth: 480, lineHeight: 1.7 }}>
          How do you help people see where their time is actually going? Case study in progress.
        </p>
      </div>

    </main>
  );
}
