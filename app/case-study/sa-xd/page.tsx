import Image from "next/image";
import Link from "next/link";
import { FONT, GLASS } from "../../components/ui";

const PROSE = "prose text-sm font-light leading-[1.85]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

function Img({ src, alt, aspect = "16/9", fit = "contain" }: { src: string; alt: string; aspect?: string; fit?: "contain" | "cover" }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: aspect, background: "var(--card)" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 1024px"
        style={{ objectFit: fit }}
      />
    </div>
  );
}

function Metrics({ label = "Success metrics · OKRs", stats }: { label?: string; stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-4 pb-2 border-b border-[var(--border)]">
      <p className={`${LABEL} text-[var(--midtone)]`}>{label}</p>
      <div className="flex flex-wrap gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <p className="font-light tabular-nums" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em", color: "var(--accent)" }}>{s.value}</p>
            <p className="text-[11px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SaXdCaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">Capital One · Oct 2023 – Jun 2024</span>
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pt-16 pb-12 flex flex-col gap-6">
        <p className={`${LABEL} text-[var(--midtone)]`}>Design & Research Lead · PM Pilots</p>
        <h1 className="font-light" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "16ch" }}>
          360 Feedback<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        {/* Context card — problem statement / role | platform / timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden" style={GLASS}>
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>Problem statement</p>
              <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                Leaders and associates both distrusted 360 feedback — templates varied by team, responses skewed positive, and no one knew how results would be used. Why was a system meant to help people grow just producing noise?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>Role</p>
              <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                Design & research lead — improved the quality and actionability of 360 feedback during the performance cycle, delivering validated insights to de-risk the product roadmap.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-6 sm:border-l border-[var(--border)]">
            <div className="flex flex-col gap-1">
              <p className={`${LABEL} text-[var(--midtone)]`}>Platform</p>
              <p className="font-light text-sm" style={{ color: "#3A3530" }}>Internal web tool</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className={`${LABEL} text-[var(--midtone)]`}>Timeline</p>
              <p className="font-light text-sm" style={{ color: "#3A3530" }}>Dec 2023 – Dec 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero image — before / after composite ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pb-0">
        <Img src="/case-study/sa-xd/hero-before-after.png" alt="Before and after — the original 360 feedback experience and the redesigned version" aspect="1908/800" />
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 mt-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The Problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Low trust in a system that was supposed to help people grow</h2>
            </div>
            <div className="flex flex-col gap-8">
              <Metrics stats={[
                { value: "↑ 42%", label: "feedback quality & specificity" },
                { value: "↓ 28%", label: "escalations post-cycle" },
              ]} />
              <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
                <p>360 feedback was poorly connected to the broader performance flow. Feedback templates varied wildly across teams. Responses skewed positive — not because everyone was performing exceptionally, but because the system gave people no reason to be specific or honest.</p>
                <p>People leaders lacked confidence in the feedback they received. Associates didn't know how it would be used. The result was a process that consumed time and produced noise.</p>
                <p>My job: improve the quality and actionability of 360 feedback during the performance cycle — and provide validated, evidence-based insights that could de-risk and define the foundation for a product roadmap.</p>
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Img src="/case-study/sa-xd/sa-xd-10.png" alt="Experience map — showing where 360 feedback broke down across the performance cycle" aspect="16/9" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">The experience map made the gaps visible in a way that was hard to argue with — feedback wasn't designed around how leaders actually used it.</figcaption>
          </figure>
        </section>

        {/* ── Foundation Principles ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>01</p>
              <h2 className="font-light" style={SECTION_HEADING}>Building on three foundation principles</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Rather than jump to solutions, we used research to define the principles the system had to be built on. These shaped every design decision that followed.</p>
              <p><strong>Quant & qual data together.</strong> Standardized, competency-based ratings paired with required qualitative comments. Ratings without context were too easy to dismiss.</p>
              <p><strong>Psychological safety through anonymity.</strong> Complete anonymity consistently produced more candid, constructive responses. Without it, people optimized for relationships, not honesty.</p>
              <p><strong>Comparative context to reduce bias.</strong> A "compared to peers" scale reduced subjective ratings and gave calibration conversations something concrete to anchor to.</p>
            </div>
          </div>

        </section>

        {/* ── Key Experience Decisions ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>02</p>
              <h2 className="font-light" style={SECTION_HEADING}>Connecting feedback to calibration</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We partnered with PwC to build the feedback system on these foundations — grounding every question in Capital One's competency framework, making the entire process anonymous by design.</p>
              <p>The key decision: making 360 feedback a first-class input in calibration, not an afterthought. We redesigned the calibration one-pager to surface feedback directly alongside performance data. Peer comparison graphs showed ratings relative to the cohort. Written feedback was structured to surface strengths and development opportunities side by side — something managers could actually reference mid-conversation.</p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <figure className="flex flex-col gap-3">
              <Img src="/case-study/sa-xd/sa-xd-12.png" alt="Feedback form — competency-based ratings, required qualitative comments, fully anonymous" aspect="16/9" />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Feedback form — competency-based ratings, required qualitative comments, fully anonymous</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <Img src="/case-study/sa-xd/sa-xd-13.png" alt="Calibration one-pager — 360 feedback as first-class input with peer comparison graph and written feedback" aspect="16/9" />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Calibration one-pager — feedback as a first-class input, not an afterthought</figcaption>
            </figure>
          </div>
        </section>

        {/* ── Measuring What Mattered ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>03</p>
              <h2 className="font-light" style={SECTION_HEADING}>Measuring what mattered</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We measured impact by triangulating three data sources: raw system data, live calibration observations, and milestone surveys. Tracking clarity, consistency, quality, and actionability throughout the pilot — not just at the end.</p>
              <p>This wasn't a post-launch audit. It was how we built the case for the next phase.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Img src="/case-study/sa-xd/sa-xd-14.png" alt="Measurement framework — data triangulation across system data, live observations, and milestone surveys" aspect="16/9" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Data triangulation — measuring clarity, consistency, quality, and actionability throughout the pilot</figcaption>
          </figure>
        </section>
      </div>

      {/* ── Outcome ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>Outcome</p>
              <h2 className="font-light" style={SECTION_HEADING}>The pilot made the case</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>The results were strong enough to convince our partners to use 360-feedback as the foundation for the new enterprise performance platform, PATH.</p>
              <ul>
                <li><strong>65%</strong> improvement in clarity & consistency of feedback received</li>
                <li><strong>58%</strong> improvement in feedback quality — anonymity made a measurable difference</li>
                <li><strong>52%</strong> improvement in actionability — feedback was more actively used during live calibrations</li>
                <li><strong>58%</strong> of pilot associates reported having clarity on their development opportunities</li>
                <li>Feedback was <strong>73% more leveraged</strong> in the overall performance management process</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Growth ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>What I learned</p>
              <h2 className="font-light" style={SECTION_HEADING}>Growth as a designer</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>This was my first major lead effort. It shaped how I think about product and strategy design.</p>
              <p>Cross-functional alignment — pulled in early — creates shared ownership that carries a project through. And measurement isn't a post-launch activity. It's how you earn the next phase.</p>
              <p>Next time I'd manage scope more intentionally. We took on too many changes at once. Being more deliberate about thin-slicing and sequencing big bets would help maximize impact.</p>
            </div>
          </div>

        </section>

        {/* ── Footer ── */}
        <footer className="py-10 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <Link href="/" className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] transition-colors duration-200">
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
