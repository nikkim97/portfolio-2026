import Image from "next/image";
import Link from "next/link";
import { FONT } from "../../components/ui";
import AnimatedStat from "../../components/AnimatedStat";
import { IntroMetadataSection } from "../../components/caseStudyUI";

const PROSE = "prose font-light leading-[1.8] text-[16px] sm:text-[18px]";
const LABEL = "text-[10px] tracking-[0.28em] uppercase";
const SECTION_HEADING = { fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.25 };
const LIVE_CALIBRATION_PRINCIPLES = [
  "One consolidated place to view live calibration data, including associate calibration profiles and ratings in a pop-out drawer format.",
  "Drag-and-drop movement so people leaders and facilitators could move associates during live conversation, instead of managing the room manually in Google Sheets.",
  "Distribution data that helped people leaders and session facilitators track each session by percentage and pie chart, making it clear whether the calibration met requirements set by senior org leaders.",
];
const PREP_CALIBRATION_MARKERS = [
  { label: "01", text: "Bulk select, create session, and combine session CTAs" },
  { label: "02", text: "Session card title and role context" },
  { label: "03", text: "Card-level edit, share, and delete actions" },
  { label: "04", text: "Key roles card for assigned session responsibilities" },
];

type ImageMarker = {
  label: string;
  targetLeft: number;
  targetTop: number;
  badgeLeft: number;
  badgeTop: number;
};

function Placeholder({ label, aspect = "16/9" }: { label: string; aspect?: string }) {
  return (
    <div
      className="overflow-hidden rounded-xl flex items-center justify-center"
      style={{ aspectRatio: aspect, background: "var(--card)" }}
    >
      <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
    </div>
  );
}

function Img({ src, alt, aspect = "16/9", fit = "cover", position = "center", markers = [] }: { src: string; alt: string; aspect?: string; fit?: "contain" | "cover"; position?: string; markers?: ImageMarker[] }) {
  return (
    <div className="relative" style={{ aspectRatio: aspect }}>
      <div
        className="relative overflow-hidden rounded-xl h-full"
        style={{ background: "var(--card)" }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 1180px" style={{ objectFit: fit, objectPosition: position }} />
      </div>
      {markers.length > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id={`arrow-${src.replace(/[^a-z0-9]/gi, "-")}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,4 L0,8 z" fill="var(--accent)" />
            </marker>
          </defs>
          {markers.map((marker) => (
            <line
              key={`${src}-line-${marker.label}-${marker.badgeLeft}-${marker.badgeTop}`}
              x1={marker.badgeLeft}
              y1={marker.badgeTop}
              x2={marker.targetLeft}
              y2={marker.targetTop}
              stroke="var(--accent)"
              strokeWidth="0.8"
              markerEnd={`url(#arrow-${src.replace(/[^a-z0-9]/gi, "-")})`}
            />
          ))}
        </svg>
      )}
      {markers.map((marker) => (
        <span
          key={`${src}-marker-${marker.label}-${marker.badgeLeft}-${marker.badgeTop}`}
          aria-hidden
          className="absolute pointer-events-none flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold tracking-[0.08em]"
          style={{
            left: `${marker.badgeLeft}%`,
            top: `${marker.badgeTop}%`,
            color: "var(--background)",
            background: "var(--accent)",
            border: "2px solid rgba(255,255,255,0.94)",
            boxShadow: "0 0 0 6px rgba(155,101,57,0.18), 0 12px 28px rgba(0,0,0,0.18)",
          }}
        >
          {marker.label}
        </span>
      ))}
    </div>
  );
}

// A grid of outcome stat cards: big accent number over a short description.
// Mirrors the sa-xd outcome treatment so the headline results read as a scannable
// set of cards rather than a flat bulleted list.
function StatCards({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className={`grid grid-cols-1 ${stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"} gap-[2px]`}>
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-2 rounded-xl px-6 sm:px-8 py-5"
          style={{ background: "var(--card)" }}
        >
          <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--pop)" }}>
            <AnimatedStat value={s.value} />
          </p>
          <p className="text-[12px] font-light leading-snug" style={{ color: "#3A3530" }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function Path360CaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1260px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">Capital One · 2023 – 2025</span>
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 pt-16 pb-12 flex flex-col gap-6">
        <p className={`${LABEL} text-[var(--accent)]`}>Principal Associate, Experience Design · PATH</p>
        <h1 className="font-light max-w-[1100px]" style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}>
          Calibration sessions were held inconsistently across the enterprise. I designed a scalable system that brought structure, trust, and shared context into the room<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <IntroMetadataSection
          role="Lead product designer"
          timeline="May 2024 – Jun 2025"
          platform="Enterprise web platform"
          results={[
            { value: "↑ 70%", label: "PLs satisfied with the PM experience" },
            { value: "↑ 70%", label: "PLs confident in final ratings" },
          ]}
        />
      </div>

      {/* ── Hero image ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 pb-0">
        <Placeholder label="Hero image placeholder" aspect="1200/896" />
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>The problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Scaling something human</h2>
            </div>
            <div className="flex flex-col gap-8">
              <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
                <p>Calibration is where performance decisions actually get made. Leaders gather, sometimes with a room full of peers, to align on ratings, surface standouts, and identify development gaps. It's high stakes, politically charged, and deeply dependent on the quality of information available in the room.</p>
                <p>We'd proven with the pilot that better feedback inputs led to better calibration conversations. Now we needed to build a system that could hold that quality at 70,000-person scale, across business lines, seniority levels, and calibration models that looked very different from team to team.</p>
                <p>My role: lead design for the end-to-end calibration experience within PATH, from how sessions are created and managed, to what leaders see in the room when decisions are being made.</p>
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Img src="/case-study/pa-xd/image2.png" alt="Early whiteboard sessions mapping the end-to-end calibration workflow" aspect="1606/658" fit="cover" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Early whiteboard sessions helped us map the full calibration journey, far messier than the pilot suggested.</figcaption>
          </figure>
        </section>

        {/* ── Discovery ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>01</p>
              <h2 className="font-light" style={SECTION_HEADING}>Who's actually in the room</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We started with deep discovery, not just on the calibration session itself, but on all the people moving through it. The experience looked radically different depending on whether you were a first-time people leader, a senior VP running a large org, or an HR partner facilitating the session.</p>
              <p>We built out personas and jobs-to-be-done frameworks that let us design for the full range of needs, without forcing one interface to serve every persona equally. From there, we narrowed the scope to what was reasonably possible to build and validate in the first MVP.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-2">
            <Img src="/case-study/pa-xd/image2.5-clean.png" alt="The three calibration personas: people leaders, PM champs / HRBPs, and facilitators, and what each needs" aspect="1756/608" fit="contain" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Three personas, three different needs: from a single consistent prep space to flexible tools for editing ratings</figcaption>
          </figure>

          <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
            <p>Once the personas were clear, we mapped each job-to-be-done across the calibration phases: prep, live calibration, and post-calibration. That helped us decide which capabilities belonged in the first release and which needed to be descoped, so the MVP could focus on the moments where better structure would change the quality of the session.</p>
          </div>

          <figure className="flex flex-col gap-2">
            <Img src="/case-study/pa-xd/image3.png" alt="Persona journey map: people leaders, HRBPs, and facilitators across prep, live, and post calibration" aspect="1558/632" fit="cover" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Personas mapped across the calibration journey: each role's jobs-to-be-done at every phase</figcaption>
          </figure>
        </section>

        {/* ── Designing the System ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>02</p>
              <h2 className="font-light" style={SECTION_HEADING}>Before the room: Prep for calibrations</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>The calibration experience starts long before anyone walks into a session. Leaders need to see who's been nominated, understand the rating distribution across their team, flag concerns, and prepare talking points, all without the full picture that only comes together in the room.</p>
              <p>We designed the session management experience to give leaders exactly what they needed ahead of time: clear visibility into team standing, easy ways to surface edge cases, and a prep experience that reduced the cognitive load in the session itself.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Img src="/case-study/pa-xd/manage1.png" alt="Session management UI showing a pre-calibration team overview" aspect="1/1" fit="cover" />
              <Img
                src="/case-study/pa-xd/manage1.1.1.png"
                alt="Session management UI showing session details and setup controls"
                aspect="1/1"
                fit="cover"
                markers={[
                  { label: "01", targetLeft: 78, targetTop: 35.5, badgeLeft: 103, badgeTop: 16 },
                  { label: "02", targetLeft: 49, targetTop: 46, badgeLeft: 50, badgeTop: -7 },
                  { label: "03", targetLeft: 29, targetTop: 58.5, badgeLeft: -7, badgeTop: 72 },
                ]}
              />
              <Img
                src="/case-study/pa-xd/manage2.png"
                alt="Session management UI showing rating distribution and calibration prep"
                aspect="1/1"
                fit="cover"
                markers={[
                  { label: "04", targetLeft: 76, targetTop: 62, badgeLeft: 104, badgeTop: 74 },
                ]}
              />
              <Img src="/case-study/pa-xd/manage3.png" alt="Session management UI showing manager preparation details" aspect="1/1" fit="cover" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {PREP_CALIBRATION_MARKERS.map((marker) => (
                <div key={marker.label} className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ background: "var(--card)" }}>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold tracking-[0.08em]"
                    style={{ color: "var(--background)", background: "var(--accent)" }}
                  >
                    {marker.label}
                  </span>
                  <p className="m-0 text-[12px] leading-relaxed" style={{ color: "#3A3530" }}>{marker.text}</p>
                </div>
              ))}
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Session management: giving leaders a clear picture before the conversation begins</figcaption>
          </figure>
        </section>

        {/* ── Live Calibrations ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>03</p>
              <h2 className="font-light" style={SECTION_HEADING}>In the room: live calibrations</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Live calibrations are the hard part. We built this experience for two core personas: people leaders making talent decisions and facilitators responsible for keeping the session structured, fair, and moving. The room has multiple leaders, one shared screen, limited time, and years of performance data that need to resolve into actionable decisions.</p>
              <div className="not-prose flex flex-col gap-3 pt-1">
                {LIVE_CALIBRATION_PRINCIPLES.map((principle, index) => (
                  <div key={principle} className="flex gap-3">
                    <span className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-30 animate-ping" />
                      <span
                        className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
                        style={{ background: "var(--accent)", color: "var(--background)" }}
                      >
                        {index + 1}
                      </span>
                    </span>
                    <p className="m-0 text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "#3A3530" }}>{principle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-8">
              <div className="md:col-span-2">
                <Img src="/case-study/pa-xd/image4.1.png" alt="Live calibration UI showing session management, rating distribution, and prep experience" aspect="1582/706" fit="cover" />
              </div>
              <p className="md:col-span-2 text-[16px] sm:text-[18px] font-light leading-[1.8] py-2" style={{ color: "#3A3530" }}>
                The distribution view gave rooms a shared anchor. The individual view surfaced 360 feedback alongside performance data, so leaders weren&apos;t debating from memory and having informed conversations. Status tracking meant sessions could pause and resume without losing ground and it became easier for facilitators to keep track of session data.
              </p>
              <Img
                src="/case-study/pa-xd/04-2.png"
                alt="Live calibration UI showing an individual associate deep-dive panel"
                aspect="1/1"
                fit="cover"
                markers={[
                  { label: "3", targetLeft: 24, targetTop: 25, badgeLeft: -7, badgeTop: 15 },
                  { label: "2", targetLeft: 45.5, targetTop: 52.5, badgeLeft: -7, badgeTop: 58 },
                ]}
              />
              <Img
                src="/case-study/pa-xd/04-3.png"
                alt="Live calibration UI showing 360 feedback surfaced during a session"
                aspect="1/1"
                fit="cover"
                position="left top"
                markers={[
                  { label: "1", targetLeft: 82, targetTop: 14, badgeLeft: 105, badgeTop: 8 },
                  { label: "1", targetLeft: 43, targetTop: 40, badgeLeft: -7, badgeTop: 39 },
                ]}
              />
            </div>
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Live calibrations: 360 feedback and performance data surfaced together, in the moment decisions are made</figcaption>
          </figure>
        </section>
      </div>

      {/* ── Feedback + Scale ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>04</p>
              <h2 className="font-light" style={SECTION_HEADING}>Early signal from the field</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We ran iterative research throughout the build, not just usability studies, but ongoing conversations with people leaders and HR partners as the experience took shape. The early feedback validated our core bets and surfaced edge cases we hadn't anticipated.</p>
              <p>Leaders described calibrations as feeling "more grounded": less debate about facts, more real conversation about development. HR partners noted fewer escalations post-session. The signal was clear enough to accelerate the enterprise rollout.</p>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <Img src="/case-study/pa-xd/image-last2.png" alt="Early feedback from the field: leader and HR partner testimonials from the pilot" aspect="1667/871" fit="cover" />
            <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Early feedback from the field: leaders felt more prepared, conversations felt more fair</figcaption>
          </figure>
        </section>
      </div>

      {/* ── Outcome + Growth ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>Outcome</p>
              <h2 className="font-light" style={SECTION_HEADING}>From pilot to platform</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>PATH launched as Capital One's first enterprise performance management platform, built on the foundation the pilot established.</p>
              <div className="not-prose flex flex-col gap-3 pt-1">
                {[
                  "Calibration sessions reported fewer disputes and stronger post-session alignment",
                  "360 feedback became a standard, structured input into every calibration, not an afterthought",
                  "HR partners reported reduced escalations and cleaner outcomes in sessions using PATH",
                ].map((outcome) => (
                  <div key={outcome} className="flex gap-3">
                    <span className="relative mt-2 flex h-2.5 w-2.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-50 animate-ping" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                    </span>
                    <p className="m-0 text-[14px] sm:text-[15px] leading-relaxed" style={{ color: "#3A3530" }}>{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <StatCards stats={[
            { value: "↑ 1st", label: "enterprise performance management platform at Capital One" },
            { value: "↑ 70,000+", label: "employees across Capital One, scaled from an 800-person pilot" },
          ]} />
        </section>

        {/* ── Growth ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className={`${LABEL} text-[var(--accent)]`}>What I learned</p>
              <h2 className="font-light" style={SECTION_HEADING}>Growth as a leader</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>Building PATH taught me what it means to design at enterprise scale, where the system has to hold for every edge case, not just the happy path.</p>
              <p>The work that mattered most wasn't the interface. It was the alignment work: getting HR, engineering, product, and business stakeholders onto the same model of what calibration should do and for whom. Design was the medium for that conversation.</p>
              <p>I also learned that launching isn't the end. The most valuable research happened after PATH was in the field, when real users surfaced problems we never would have caught in a lab.</p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-10 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <Link href="/" className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] transition-colors duration-200">
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
