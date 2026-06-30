import Image from "next/image";
import Link from "next/link";
import { FONT } from "../../components/ui";
import AnimatedStat from "../../components/AnimatedStat";
import { IntroMetadataSection } from "../../components/caseStudyUI";
import LightboxFrame from "../../components/LightboxFrame";
import { NextProjectCard, NextProjectLink } from "../../components/ProjectNavigation";
import MeasureCarousel from "./MeasureCarousel";

const PROSE = "prose font-light leading-[1.8] text-[16px] sm:text-[18px]";
const SECTION_HEADING = { fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 };
const CARD = {
  background: "var(--card)",
};

function Img({ src, alt, aspect = "16/9", fit = "contain" }: { src: string; alt: string; aspect?: string; fit?: "contain" | "cover" }) {
  return (
    <LightboxFrame alt={alt}>
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
    </LightboxFrame>
  );
}

// A grid of outcome stat cards: big accent number over a short description.
// Used where a flat bulleted list of results would read as undifferentiated copy.
function StatCards({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-[2px]">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-2 rounded-xl px-6 sm:px-8 py-5"
          style={CARD}
        >
          <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--pop)" }}>
            <AnimatedStat value={s.value} />
          </p>
          <p className="text-[12px] font-light leading-snug" style={{ color: "var(--body)" }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function SaXdCaseStudy() {
  return (
    <main style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgb(245,241,235)" }}>
        <div className="max-w-[1260px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="hidden text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] md:inline">Capital One · 2023 – 2024</span>
          <NextProjectLink currentHref="/case-study/sa-xd" />
        </div>
      </div>

      {/* ── Hero text ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 pt-20 pb-14 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>Design &amp; Research Lead · Capital One</p>
          <h1 className="font-light max-w-[1100px]" style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}>
            Leaders and associates both distrusted 360 feedback they received. I used research to turn a noisy process into clearer, more actionable growth conversations<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </div>
        <IntroMetadataSection
          role="Design and research lead"
          timeline="Dec 2023 – Sept 2024"
          platform="Web platform"
          resultsLabel="Directional signal"
          results={[
            { value: "↑ 58%", label: "gained clarity on development opportunities" },
            { value: "↑ 73%", label: "more feedback leveraged in performance management" },
          ]}
        />
      </div>

      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        <figure className="flex flex-col gap-3">
          <LightboxFrame alt="Where the 360 feedback experience broke down across the performance cycle">
            <Image
              src="/case-study/sa-xd/xd-1.png"
              alt="Where the 360 feedback experience broke down across the performance cycle"
              width={1946}
              height={740}
              sizes="(max-width: 768px) 100vw, 1200px"
              className="block w-full h-auto rounded-xl select-none"
              draggable={false}
            />
          </LightboxFrame>
          <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
            Performance management end-to-end process. Highlighted areas represent selected scope.
          </figcaption>
        </figure>
      </div>

      {/* ── The Problem ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10 mt-16">
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>The Problem</p>
              <h2 className="font-light" style={SECTION_HEADING}>Low trust in a system that was supposed to help people grow</h2>
            </div>
            <div className="flex flex-col gap-8">
              <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
                <p>360 feedback was poorly connected to the broader performance flow. Feedback templates varied wildly across teams. Responses skewed positive, not because everyone was performing exceptionally, but because the system gave people no reason to be specific or honest. People leaders lacked confidence in the feedback they received. Associates didn't know how it would be used. The result was a process that consumed time and produced noise.</p>
                <p>We interviewed leaders and associates and looked closely at how feedback was actually being written and read. The same patterns kept surfacing: people discounted feedback they couldn&apos;t <strong>put in context</strong>, and they <strong>softened their input</strong> when they weren&apos;t sure <strong>how it would be used</strong> or who would see it.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <LightboxFrame alt="Detail of the 360 feedback experience breakdown">
              <div className="relative w-full overflow-hidden rounded-xl aspect-[1422/652]" style={{ background: "var(--card)" }}>
                <Image
                  src="/case-study/sa-xd/xd-1.1.png"
                  alt="Detail of the 360 feedback experience breakdown"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover object-top select-none"
                  draggable={false}
                />
              </div>
            </LightboxFrame>
          </div>
        </section>

        {/* ── Foundation Principles ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>01</p>
              <h2 className="font-light" style={SECTION_HEADING}>Foundational principles</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>From research, we knew that we needed to improve the consistency, quality &amp; actionability of the feedback received for it to be useful during the performance process. Our hypotheses were:</p>
              <div role="list" className="flex flex-col gap-4">
                {[
                  { title: "Quant & qual data together", body: "Standardized, competency-based ratings paired with required qualitative comments improved consistency while gathering feedback." },
                  { title: "Psychological safety through anonymity", body: "Complete anonymity encouraged more candid and constructive responses, improving the quality of feedback received by people leaders." },
                  { title: "Comparative context to reduce bias", body: "Use of a comparative scale (e.g., “compared to peers”) reduced bias and subjective ratings, increasing actionability during live calibrations." },
                ].map((p, index) => (
                  <div role="listitem" key={p.title} className="flex gap-3.5">
                    <span className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden>
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-30 animate-ping"></span>
                      <span
                        className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
                        style={{ background: "var(--accent-text)", color: "var(--background)" }}
                      >
                        {index + 1}
                      </span>
                    </span>
                    <span><span className="italic font-normal" style={{ color: "#242117" }}>{p.title}<span style={{ color: "var(--accent)" }}>.</span></span> {p.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-3 md:gap-x-10 md:gap-y-20">
            {[
              {
                visual: "/case-study/sa-xd/principle-1-quant-qual.png",
                title: "Quant & qual data together",
                w: 1600, h: 1590,
              },
              {
                visual: "/case-study/sa-xd/principle-2-anonymity.png",
                title: "Psychological safety through anonymity",
                w: 1574, h: 1600,
              },
              {
                visual: "/case-study/sa-xd/principle-3-comparative.png",
                title: "Comparative context to reduce bias",
                w: 1600, h: 1527,
              },
            ].map((p, index) => (
              <article key={p.visual} className="flex flex-col gap-5">
                <LightboxFrame alt={p.title}>
                  <div
                    className="relative w-full overflow-hidden rounded-xl"
                    style={{ background: "var(--card)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image src={p.visual} alt={p.title} width={p.w} height={p.h} sizes="(max-width: 768px) 90vw, 400px" className="block w-full h-auto select-none" draggable={false} />
                    {(index === 0 || index === 1 || index === 2) && (
                      <span className="pointer-events-none absolute right-3 top-3 flex h-7 w-7 items-center justify-center" aria-hidden>
                        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-30 animate-ping"></span>
                        <span
                          className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
                          style={{ background: "var(--accent-text)", color: "var(--background)" }}
                        >
                          {index + 1}
                        </span>
                      </span>
                    )}
                  </div>
                </LightboxFrame>
              </article>
            ))}
          </div>

        </section>

        {/* ── Key Experience Decisions ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>02</p>
              <h2 className="font-light" style={SECTION_HEADING}>Connecting feedback to calibration</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>Before we built the system, we wanted to pilot our hypotheses. We partnered with PwC to build the feedback system on these foundations, grounding every question in Capital One&apos;s competency framework and making the entire process anonymous by design.</p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <figure className="flex flex-col gap-3">
              <Img src="/case-study/sa-xd/sa-xd-12-2.png" alt="Feedback form: competency-based ratings, required qualitative comments, fully anonymous" aspect="1345/672" />
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Feedback form: competency-based ratings, required qualitative comments, fully anonymous</figcaption>
            </figure>
            <p className={`${PROSE}`} style={{ color: "var(--body)" }}>The key decision: <strong>making 360 feedback a first-class input in calibration, not an afterthought</strong>. At the time, people leaders used Google Slides to represent their associates during calibrations. For our pilot group, we redesigned the calibration slide to surface feedback directly alongside the performance data leaders collected. Peer comparison graphs showed ratings relative to the cohort. Written feedback was structured to surface strengths and development opportunities side by side, with context on who provided the feedback — something managers could actually reference mid-conversation.</p>
            <figure className="flex flex-col gap-3">
              <LightboxFrame alt="Calibration one-pager: 360 feedback as first-class input with peer comparison graph and written feedback">
                <Image
                  src="/case-study/sa-xd/sa-xd-13-2.png"
                  alt="Calibration one-pager: 360 feedback as first-class input with peer comparison graph and written feedback"
                  width={1308}
                  height={687}
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="block w-full h-auto rounded-xl select-none"
                  draggable={false}
                />
              </LightboxFrame>
              <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Calibration one-pager: feedback as a first-class input, not an afterthought</figcaption>
            </figure>
          </div>
        </section>

        {/* ── Measuring What Mattered ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>03</p>
              <h2 className="font-light" style={SECTION_HEADING}>Measuring what mattered</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>After the performance cycle, we measured impact by surveying, observing, and interviewing different participating user groups, then triangulating those data sources. This helped us understand what was resonating with users at each step of the performance cycle, how meaningful the leverage was, and how it shaped performance conversations.</p>
            </div>
          </div>

          <div>
            <MeasureCarousel />
          </div>
        </section>
      </div>

      {/* ── Outcome ── */}
      <div className="max-w-[1260px] mx-auto px-6 sm:px-10">
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>04</p>
              <h2 className="font-light" style={SECTION_HEADING}>The pilot made the case</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>The results were strong enough to convince our HR stakeholders to discontinue using Workday as the primary tool for performance and talent, and invest in building an in-house performance system that understood Capital One&apos;s internal performance process and was grounded in 360 feedback as the foundation.</p>
            </div>
          </div>
          <StatCards stats={[
            { value: "↑ 65%", label: "improvement in clarity & consistency of feedback received" },
            { value: "↑ 58%", label: "improvement in feedback quality: anonymity made a measurable difference" },
            { value: "↑ 52%", label: "improvement in actionability: feedback used more actively in live calibrations" },
          ]} />
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
            Directional figures from the pilot study — the signal that convinced HR to invest in an in-house platform.
          </p>
        </section>

        {/* ── Growth ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-[0.28em] font-normal" style={{ color: "var(--accent-text)" }}>05</p>
              <h2 className="font-light" style={SECTION_HEADING}>Growth as a designer</h2>
            </div>
            <div className={`${PROSE}`} style={{ color: "var(--body)" }}>
              <p>This was my first major lead effort, and it changed the way I think about product and strategy design.</p>
              <p>What stayed with me most was how much stronger the work became when alignment happened early. Bringing cross-functional partners in from the beginning didn&apos;t just improve the solution — it created a shared sense of ownership that carried the project forward. It also taught me that measurement isn&apos;t something you do after launch; it&apos;s how you understand whether the work is resonating, and how you earn the next phase.</p>
              <p>It also gave me a clearer sense of where I&apos;d grow next. We took on a lot of change at once, and in hindsight I&apos;d be more intentional about managing scope, thin-slicing the problem, and sequencing bigger bets so the impact of each decision can be seen more clearly.</p>
            </div>
          </div>

        </section>

        <NextProjectCard currentHref="/case-study/sa-xd" />

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
