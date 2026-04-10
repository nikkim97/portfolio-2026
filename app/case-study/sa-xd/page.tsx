import Link from "next/link";
import Image from "next/image";
import { FONT } from "../../components/ui";

const IMG = (name: string) => `/case-study/vpr/${name}.jpg`;

const PROSE = "prose text-sm font-light leading-[1.85]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

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
          Performance Platform<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="font-light leading-relaxed max-w-[58ch]" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "#3A3530" }}>
          The performance management system at Capital One was broken in a specific way — leaders and associates both had low trust in 360 feedback results. Before we built anything, we needed to understand why. This is the story of a pilot that became the foundation for an enterprise platform.
        </p>
      </div>

      {/* ── Hero image — feedback form UI ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pb-0">
        <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
          <Image src={IMG("sa-xd-hero")} alt="360 feedback form interface" width={1280} height={960} className="w-full h-full object-cover object-left" priority />
        </div>
      </div>

      {/* ── Full-bleed HMW ── */}
      <div className="mt-16 w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
        <Image src={IMG("sa-xd-hmw")} alt="How do we design a 360-degree feedback experience that ensures high-quality, actionable insights?" width={1600} height={700} className="w-full h-full object-cover" />
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The Problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Low trust in a system that was supposed to help people grow</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>360 feedback was poorly connected to the broader performance flow. Feedback templates varied wildly across teams. Responses skewed positive — not because everyone was performing exceptionally, but because the system gave people no reason to be specific or honest.</p>
              <p>People leaders lacked confidence in the feedback they received. Associates didn't know how it would be used. The result was a process that consumed time and produced noise.</p>
              <p>My job: improve the quality and actionability of 360 feedback during the performance cycle — and provide validated, evidence-based insights that could de-risk and define the foundation for a product roadmap.</p>
            </div>
          </div>

          {/* Experience map — full width */}
          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
              <Image src={IMG("sa-xd-experience-map")} alt="Experience map showing where 360 feedback broke down across the performance cycle" width={1280} height={720} className="w-full h-full object-cover object-left-top" />
            </div>
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

          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
              <Image src={IMG("sa-xd-principles")} alt="Three foundation principles: Quant & Qual, Psychological Safety, Comparative Context" width={1280} height={720} className="w-full h-auto" />
            </div>
          </figure>
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

          {/* Asymmetric pair — 60/40 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <figure className="flex flex-col gap-2 sm:w-[60%]">
              <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
                <Image src={IMG("sa-xd-feedback-form")} alt="360 feedback form built with PwC — competency-based, anonymous by design" width={800} height={600} className="w-full h-full object-cover object-top" />
              </div>
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Feedback form — competency-based ratings, required qualitative comments, fully anonymous</figcaption>
            </figure>
            <figure className="flex flex-col gap-2 sm:w-[40%]">
              <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
                <Image src={IMG("sa-xd-calibration")} alt="Calibration one-pager with peer comparison graph and written feedback" width={800} height={600} className="w-full h-full object-cover object-top" />
              </div>
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
            <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
              <Image src={IMG("sa-xd-measurement")} alt="Measurement framework in Lucid — data triangulation across system data, observations, and surveys" width={1280} height={720} className="w-full h-full object-cover object-left-top" />
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Data triangulation in Lucid — measuring clarity, consistency, quality, and actionability throughout the pilot</figcaption>
          </figure>
        </section>
      </div>

      {/* ── Full-bleed Impact stats ── */}
      <div className="w-full my-4" style={{ background: "var(--card)" }}>
        <Image src={IMG("sa-xd-impact")} alt="Impact: 65% Clarity & Consistency, 58% Quality, 52% Actionability" width={1600} height={900} className="w-full h-auto" />
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

          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
              <Image src={IMG("sa-xd-growth")} alt="Growth as a designer — strategic foundations, cross-functional leadership, evidence-driven design" width={1280} height={720} className="w-full h-auto" />
            </div>
          </figure>
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
