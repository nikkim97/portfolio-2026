import Image from "next/image";
import Link from "next/link";
import { FONT, GLASS } from "../../components/ui";

const PROSE = "prose text-sm font-light leading-[1.85]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };

function Placeholder({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl flex items-center justify-center"
      style={{ aspectRatio: aspect, background: "var(--card)", border: "1px dashed var(--border)" }}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
    </div>
  );
}

function Img({ src, alt, aspect = "16/9", fit = "cover" }: { src: string; alt: string; aspect?: string; fit?: "contain" | "cover" }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: aspect, background: "var(--card)" }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 1024px" style={{ objectFit: fit }} />
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
        {/* Context card — problem statement / role | platform / timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden" style={GLASS}>
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>Problem statement</p>
              <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                The pilot proved better feedback inputs led to better calibration conversations. Could that quality hold at 70,000-person scale — across business lines, seniority levels, and calibration models that looked nothing alike?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--midtone)]`}>Role</p>
              <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                Lead designer — owned the end-to-end calibration experience, from how sessions are created and managed to what leaders see in the room when decisions get made.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 p-6 sm:border-l border-[var(--border)]">
            <div className="flex flex-col gap-1">
              <p className={`${LABEL} text-[var(--midtone)]`}>Platform</p>
              <p className="font-light text-sm" style={{ color: "#3A3530" }}>Enterprise web · PATH performance platform</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className={`${LABEL} text-[var(--midtone)]`}>Timeline</p>
              <p className="font-light text-sm" style={{ color: "#3A3530" }}>May 2024 – Jun 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16 pb-0">
        <Placeholder label="Hero — PATH calibrations distribution UI showing rating distribution view" aspect="4/3" />
      </div>

      {/* ── The Challenge ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The Challenge</p>
              <h2 className="font-light" style={SECTION_HEADING}>Scaling something human</h2>
            </div>
            <div className="flex flex-col gap-8">
              <Metrics stats={[
                { value: "20K+", label: "employees reached in year one" },
                { value: "↑ 31%", label: "leader confidence in calibration" },
              ]} />
              <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
                <p>Calibration is where performance decisions actually get made. Leaders gather — sometimes with a room full of peers — to align on ratings, surface standouts, and identify development gaps. It's high stakes, politically charged, and deeply dependent on the quality of information available in the room.</p>
                <p>We'd proven with the pilot that better feedback inputs led to better calibration conversations. Now we needed to build a system that could hold that quality at 70,000-person scale — across business lines, seniority levels, and calibration models that looked very different from team to team.</p>
                <p>My role: lead design for the end-to-end calibration experience within PATH — from how sessions are created and managed, to what leaders see in the room when decisions are being made.</p>
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Img src="/case-study/pa-xd/image2.png" alt="Early whiteboard sessions mapping the end-to-end calibration workflow" aspect="1606/658" fit="cover" />
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

          <figure className="flex flex-col gap-2">
            <Img src="/case-study/pa-xd/image2.5-clean.png" alt="The three calibration personas — people leaders, PM champs / HRBPs, and facilitators — and what each needs" aspect="1756/608" fit="contain" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Three personas, three different needs — from a single consistent prep space to flexible tools for editing ratings</figcaption>
          </figure>

          <figure className="flex flex-col gap-2">
            <Img src="/case-study/pa-xd/image3.png" alt="Persona journey map — people leaders, HRBPs, and facilitators across prep, live, and post calibration" aspect="1558/632" fit="cover" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Personas mapped across the calibration journey — each role's jobs-to-be-done at every phase</figcaption>
          </figure>
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
            <Placeholder label="Session management UI — pre-calibration team view, rating distribution, and prep experience" aspect="16/9" />
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
            <Placeholder label="Live calibration UI — distribution view with individual deep-dive panel showing 360 feedback + performance data" aspect="4/3" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Live calibrations — 360 feedback and performance data surfaced together, in the moment decisions are made</figcaption>
          </figure>
        </section>
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
            <Img src="/case-study/pa-xd/image-last.png" alt="Early feedback from the field — leader and HR partner testimonials from the pilot" aspect="1506/770" fit="cover" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Early feedback from the field — leaders felt more prepared, conversations felt more fair</figcaption>
          </figure>
        </section>
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
