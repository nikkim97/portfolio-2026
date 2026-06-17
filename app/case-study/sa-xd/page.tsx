import Image from "next/image";
import Link from "next/link";
import { FONT } from "../../components/ui";
import AnimatedStat from "../../components/AnimatedStat";
import MeasureCarousel from "./MeasureCarousel";

const PROSE = "prose font-light leading-[1.8] text-[16px] sm:text-[18px]";
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

// A grid of outcome stat cards: big accent number over a short description.
// Used where a flat bulleted list of results would read as undifferentiated copy.
function StatCards({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-2 rounded-xl p-5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
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

export default function SaXdCaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[1260px] mx-auto px-6 sm:px-24 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-24 pt-20 pb-14 flex flex-col gap-16">
        <h1 className="font-light max-w-[1100px]" style={{ fontSize: "clamp(32px, calc(5vw - 2px), 66px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}>
          Leaders and associates both distrusted 360 feedback. I used research to turn a noisy process into clearer, more actionable growth conversations<span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-24 md:gap-y-12">
          <div className="flex flex-col gap-4 min-w-0">
            <p className="text-[18px] font-normal" style={{ color: "var(--accent)" }}>My role</p>
            <div className="flex flex-col gap-3 text-[16px] sm:text-[18px] font-light leading-relaxed" style={{ color: "#3A3530" }}>
              <p>Design and research lead</p>
              <p>Research synthesis and product strategy</p>
              <p>Evidence-based roadmap foundations</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 min-w-0">
            <p className="text-[18px] font-normal" style={{ color: "var(--accent)" }}>Timeline & platform</p>
            <div className="flex flex-col gap-3 text-[16px] sm:text-[18px] font-light leading-relaxed break-words" style={{ color: "#3A3530" }}>
              <p>2022–2023 pilot</p>
              <p>Capital One performance management</p>
              <p>360 feedback, calibration, and Workday inputs</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <p className="text-[18px] font-normal" style={{ color: "var(--accent)" }}>Results</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { value: "↑ 58%", label: "gained clarity on development opportunities" },
                { value: "↑ 73%", label: "more feedback leveraged in performance management" },
              ].map((result) => (
                <div
                  key={result.value}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-semibold tabular-nums shrink-0" style={{ color: "var(--pop)", fontSize: "clamp(22px, 3vw, 32px)", letterSpacing: "-0.03em" }}>
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
      </div>

      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/case-study/sa-xd/xd-1.png"
          alt="Where the 360 feedback experience broke down across the performance cycle"
          className="block w-full h-auto rounded-xl select-none"
          draggable={false}
        />
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-24 mt-16">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-light" style={SECTION_HEADING}>Low trust in a system that was supposed to help people grow</h2>
            </div>
            <div className="flex flex-col gap-8">
              <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
                <p>360 feedback was poorly connected to the broader performance flow. Feedback templates varied wildly across teams. Responses skewed positive, not because everyone was performing exceptionally, but because the system gave people no reason to be specific or honest.</p>
                <p>People leaders lacked confidence in the feedback they received. Associates didn't know how it would be used. The result was a process that consumed time and produced noise.</p>
                <p>My job: improve the quality and actionability of 360 feedback during the performance cycle, and provide validated, evidence-based insights that could de-risk and define the foundation for a product roadmap.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:-mx-14">
            <div className="w-full overflow-hidden rounded-xl aspect-[1505/732]" style={{ background: "var(--card)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/case-study/sa-xd/xd-1.1.png"
                alt="Detail of the 360 feedback experience breakdown"
                className="block w-full h-full object-cover object-top select-none"
                draggable={false}
              />
            </div>
          </div>
        </section>

        {/* ── Foundation Principles ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-2">
            <h2 className="font-light" style={{ ...SECTION_HEADING, maxWidth: "54ch" }}>Rather than jump to solutions, we used research to define the principles the system had to be built on.</h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-20 sm:-mx-14">
            {[
              {
                visual: "/case-study/sa-xd/principle-1-quant-qual.png",
                title: "Quant & qual data together",
                body: "Standardized, competency-based ratings paired with required qualitative comments so leaders had both structure and context.",
                imageClass: "md:aspect-[4/3]",
              },
              {
                visual: "/case-study/sa-xd/principle-2-anonymity.png",
                title: "Psychological safety through anonymity",
                body: "Complete anonymity encouraged more candid and constructive responses, especially when feedback had to move into calibration.",
                imageClass: "md:aspect-[5/4]",
              },
              {
                visual: "/case-study/sa-xd/principle-3-comparative.png",
                title: "Comparative context to reduce bias",
                body: "A compared-to-peers scale gave calibration conversations a clearer anchor and reduced subjective interpretation.",
                imageClass: "md:aspect-[4/3]",
              },
            ].map((p) => (
              <article key={p.visual} className={`flex flex-col gap-5 ${p.cardClass ?? ""}`}>
                <div
                  className={`w-full overflow-hidden rounded-xl aspect-[16/10] ${p.imageClass}`}
                  style={{ background: "var(--card)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.visual} alt={p.title} className="w-full h-full object-cover object-top select-none" draggable={false} />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-light" style={{ fontSize: "clamp(18px, 2.2vw, 26px)", letterSpacing: "-0.02em", lineHeight: 1.18 }}>
                    {p.title}<span style={{ color: "var(--accent)" }}>.</span>
                  </h3>
                  <p className="max-w-[28rem] text-[13px] sm:text-[15px] font-light leading-[1.6]" style={{ color: "var(--midtone)" }}>
                    {p.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </section>

        {/* ── Key Experience Decisions ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-light" style={SECTION_HEADING}>Connecting feedback to calibration</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We partnered with PwC to build the feedback system on these foundations, grounding every question in Capital One's competency framework, making the entire process anonymous by design.</p>
              <p>The key decision: making 360 feedback a first-class input in calibration, not an afterthought. We redesigned the calibration one-pager to surface feedback directly alongside performance data. Peer comparison graphs showed ratings relative to the cohort. Written feedback was structured to surface strengths and development opportunities side by side, something managers could actually reference mid-conversation.</p>
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:-mx-14">
            <figure className="flex flex-col gap-3">
              <Img src="/case-study/sa-xd/sa-xd-12-2.png" alt="Feedback form: competency-based ratings, required qualitative comments, fully anonymous" aspect="1345/672" />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Feedback form: competency-based ratings, required qualitative comments, fully anonymous</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/case-study/sa-xd/sa-xd-13-2.png"
                alt="Calibration one-pager: 360 feedback as first-class input with peer comparison graph and written feedback"
                className="block w-full h-auto rounded-xl select-none"
                draggable={false}
              />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Calibration one-pager: feedback as a first-class input, not an afterthought</figcaption>
            </figure>
          </div>
        </section>

        {/* ── Measuring What Mattered ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-light" style={SECTION_HEADING}>Measuring what mattered</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>We measured impact by triangulating three data sources: raw system data, live calibration observations, and milestone surveys. Tracking clarity, consistency, quality, and actionability throughout the pilot, not just at the end.</p>
              <p>This wasn't a post-launch audit. It was how we built the case for the next phase.</p>
            </div>
          </div>

          <div className="sm:-mx-14">
            <MeasureCarousel />
          </div>
        </section>
      </div>

      {/* ── Outcome ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-24">
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-light" style={SECTION_HEADING}>The pilot made the case</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>The results were strong enough to convince our partners to use 360-feedback as the foundation for the new enterprise performance platform, PATH.</p>
            </div>
          </div>
          <StatCards stats={[
            { value: "↑ 65%", label: "improvement in clarity & consistency of feedback received" },
            { value: "↑ 58%", label: "improvement in feedback quality: anonymity made a measurable difference" },
            { value: "↑ 52%", label: "improvement in actionability: feedback used more actively in live calibrations" },
          ]} />
        </section>

        {/* ── Growth ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-light" style={SECTION_HEADING}>Growth as a designer</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "#3A3530" }}>
              <p>This was my first major lead effort. It shaped how I think about product and strategy design.</p>
              <p>Cross-functional alignment, pulled in early, creates shared ownership that carries a project through. And measurement isn't a post-launch activity. It's how you earn the next phase.</p>
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
