import Link from "next/link";
import Image from "next/image";
import { FONT } from "../../components/ui";

const IMG = (name: string) => `/case-study/vpr/${name}.jpg`;

const PROSE = "prose text-sm font-light leading-[1.85]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

export default function Path360CaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">Capital One · 2023 – 2025</span>
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pt-16 pb-12 flex flex-col gap-6">
        <p className={`${LABEL} text-[var(--midtone)]`}>Principal Associate, Experience Design · PATH</p>
        <h1 className="font-light" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "16ch" }}>
          Calibrations Ecosystem<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p className="font-light leading-relaxed max-w-[58ch]" style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "#3A3530" }}>
          The pilot proved the concept. Now we had to build for 70,000 people. PATH became Capital One's first enterprise performance platform — and the calibrations ecosystem was the hardest part to get right.
        </p>
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pb-0">
        <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
          <Image src={IMG("path-hero")} alt="PATH calibrations distribution UI" width={1280} height={960} className="w-full h-full object-cover object-left" priority />
        </div>
      </div>

      {/* ── Full-bleed HMW ── */}
      <div className="mt-16 w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
        <Image src={IMG("path-hmw")} alt="How do we design a calibration experience that gives every leader what they need to make fair, confident decisions?" width={1600} height={700} className="w-full h-full object-cover" />
      </div>

      {/* ── The Challenge ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The Challenge</p>
              <h2 className="font-light" style={SECTION_HEADING}>Scaling something human</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Calibration is where performance decisions actually get made. Leaders gather — sometimes with a room full of peers — to align on ratings, surface standouts, and identify development gaps. It's high stakes, politically charged, and deeply dependent on the quality of information available in the room.</p>
              <p>We'd proven with the pilot that better feedback inputs led to better calibration conversations. Now we needed to build a system that could hold that quality at 70,000-person scale — across business lines, seniority levels, and calibration models that looked very different from team to team.</p>
              <p>My role: lead design for the end-to-end calibration experience within PATH — from how sessions are created and managed, to what leaders see in the room when decisions are being made.</p>
            </div>
          </div>

          {/* Brainstorm image */}
          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
              <Image src={IMG("path-brainstorm")} alt="Early brainstorming session — mapping the calibration workflow end to end" width={1280} height={720} className="w-full h-full object-cover object-left-top" />
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Early whiteboard sessions helped us map the full calibration journey — far messier than the pilot suggested.</figcaption>
          </figure>
        </section>

        {/* ── Discovery ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>01</p>
              <h2 className="font-light" style={SECTION_HEADING}>Who's actually in the room</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We started with deep discovery — not just on the calibration session itself, but on all the people moving through it. The experience looked radically different depending on whether you were a first-time people leader, a senior VP running a large org, or an HR partner facilitating the session.</p>
              <p>We built out personas and jobs-to-be-done frameworks that let us design for the full range — without trying to make one interface do everything for everyone.</p>
            </div>
          </div>

          {/* Personas + JTBD asymmetric pair */}
          <div className="flex flex-col sm:flex-row gap-4">
            <figure className="flex flex-col gap-2 sm:w-[55%]">
              <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
                <Image src={IMG("path-personas")} alt="Personas for PATH — people leaders, senior leaders, HR partners" width={800} height={600} className="w-full h-full object-cover object-top" />
              </div>
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Personas — each role had a fundamentally different relationship to calibration</figcaption>
            </figure>
            <figure className="flex flex-col gap-2 sm:w-[45%]">
              <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
                <Image src={IMG("path-jtbd")} alt="Jobs-to-be-done framework for calibration workflow" width={800} height={600} className="w-full h-full object-cover object-top" />
              </div>
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Jobs-to-be-done — the same session, five different goals</figcaption>
            </figure>
          </div>
        </section>

        {/* ── Designing the System ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>02</p>
              <h2 className="font-light" style={SECTION_HEADING}>Before the room: managing sessions</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>The calibration experience starts long before anyone walks into a session. Leaders need to see who's been nominated, understand the rating distribution across their team, flag concerns, and prepare talking points — all without the full picture that only comes together in the room.</p>
              <p>We designed the session management experience to give leaders exactly what they needed ahead of time: clear visibility into team standing, easy ways to surface edge cases, and a prep experience that reduced the cognitive load in the session itself.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
              <Image src={IMG("path-sessions")} alt="PATH session management — pre-calibration team view and prep experience" width={1280} height={720} className="w-full h-full object-cover object-top" />
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Session management — giving leaders a clear picture before the conversation begins</figcaption>
          </figure>
        </section>

        {/* ── Live Calibrations ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>03</p>
              <h2 className="font-light" style={SECTION_HEADING}>In the room: designing for real decisions</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Live calibrations are the hard part. You have multiple leaders, one screen, limited time, and years of performance data that needs to resolve into actionable decisions. We designed the live experience around a single constraint: the right information, at the right moment, without noise.</p>
              <p>The distribution view gave rooms a shared anchor. The individual view surfaced 360 feedback alongside performance data, so leaders weren't debating from memory. Status tracking meant sessions could pause and resume without losing ground.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
              <Image src={IMG("path-live")} alt="Live calibration UI — distribution view with individual deep-dive" width={1280} height={960} className="w-full h-full object-cover object-top" />
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Live calibrations — 360 feedback and performance data surfaced together, in the moment decisions are made</figcaption>
          </figure>
        </section>
      </div>

      {/* ── Full-bleed live states ── */}
      <div className="w-full my-4 overflow-hidden" style={{ background: "var(--card)" }}>
        <Image src={IMG("path-live-states")} alt="Three states of the live calibration experience — distribution, individual, and completed" width={1600} height={900} className="w-full h-auto" />
      </div>

      {/* ── Feedback + Scale ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>04</p>
              <h2 className="font-light" style={SECTION_HEADING}>Early signal from the field</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We ran iterative research throughout the build — not just usability studies, but ongoing conversations with people leaders and HR partners as the experience took shape. The early feedback validated our core bets and surfaced edge cases we hadn't anticipated.</p>
              <p>Leaders described calibrations as feeling "more grounded" — less debate about facts, more real conversation about development. HR partners noted fewer escalations post-session. The signal was clear enough to accelerate the enterprise rollout.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
              <Image src={IMG("path-feedback")} alt="Early pilot feedback from leaders and HR partners" width={1280} height={720} className="w-full h-full object-cover object-left-top" />
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Early feedback from the field — leaders felt more prepared, conversations felt more fair</figcaption>
          </figure>
        </section>
      </div>

      {/* ── Full-bleed scale stat ── */}
      <div className="w-full my-4" style={{ background: "var(--card)" }}>
        <Image src={IMG("path-scale")} alt="PATH reached 20,000+ employees in year one" width={1600} height={900} className="w-full h-auto" />
      </div>

      {/* ── Outcome + Growth ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>Outcome</p>
              <h2 className="font-light" style={SECTION_HEADING}>From pilot to platform</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>PATH launched as Capital One's first enterprise performance management platform — built on the foundation the pilot established.</p>
              <ul>
                <li>Scaled from an <strong>800-person pilot</strong> to <strong>70,000+ employees</strong> across Capital One</li>
                <li>Reached <strong>20,000+ employees</strong> in year one of the enterprise rollout</li>
                <li>Calibration sessions reported fewer disputes and stronger post-session alignment</li>
                <li>360 feedback became a standard, structured input into every calibration — not an afterthought</li>
                <li>HR partners reported reduced escalations and cleaner outcomes in sessions using PATH</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Growth ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>What I learned</p>
              <h2 className="font-light" style={SECTION_HEADING}>Growth as a leader</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Building PATH taught me what it means to design at enterprise scale — where the system has to hold for every edge case, not just the happy path.</p>
              <p>The work that mattered most wasn't the interface. It was the alignment work — getting HR, engineering, product, and business stakeholders onto the same model of what calibration should do and for whom. Design was the medium for that conversation.</p>
              <p>I also learned that launching isn't the end. The most valuable research happened after PATH was in the field — when real users surfaced problems we never would have caught in a lab.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
              <Image src={IMG("path-growth")} alt="Growth as a leader — enterprise design, cross-functional alignment, evidence-driven decisions" width={1280} height={720} className="w-full h-auto" />
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
