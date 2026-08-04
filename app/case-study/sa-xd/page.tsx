import Image from "next/image";
import CaseStudyShell from "../../components/CaseStudyShell";
import AnimatedStat from "../../components/AnimatedStat";
import {
  ArticleHero,
  ArticleMeta,
  Prose,
  SectionHeader,
} from "../../components/caseStudyUI";
import LightboxFrame from "../../components/LightboxFrame";
import { caseStudyMetadata } from "../../lib/siteMetadata";
import MeasureCarousel from "./MeasureCarousel";

export const metadata = caseStudyMetadata({
  title: "360 Feedback",
  description:
    "Research that turned a noisy, distrusted 360 feedback process at Capital One into actionable growth conversation.",
  slug: "sa-xd",
});

function Img({ src, alt, aspect = "16/9", fit = "contain" }: { src: string; alt: string; aspect?: string; fit?: "contain" | "cover" }) {
  return (
    <LightboxFrame alt={alt}>
      <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: aspect, background: "var(--card)" }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 1024px" style={{ objectFit: fit }} />
      </div>
    </LightboxFrame>
  );
}

function StatCards({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="col-wide media-inset grid grid-cols-2 sm:grid-cols-3 gap-[2px]">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 rounded-xl px-6 sm:px-8 py-5" style={{ background: "var(--card)" }}>
          <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.03em", lineHeight: 1, color: "var(--pop)" }}>
            <AnimatedStat value={stat.value} />
          </p>
          <p className="text-[12px] font-light leading-snug" style={{ color: "var(--body)" }}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

const PRINCIPLES = [
  {
    title: "Quant & qual data together",
    body: "Standardized, competency-based ratings paired with required qualitative comments improved consistency while gathering feedback.",
    visual: "/case-study/sa-xd/principle-1-quant-qual.webp",
    w: 1600,
    h: 1590,
    caption: "Principle screen: quantitative ratings paired with qualitative context.",
  },
  {
    title: "Psychological safety through anonymity",
    body: "Complete anonymity encouraged more candid and constructive responses, improving the quality of feedback received by people leaders.",
    visual: "/case-study/sa-xd/principle-2-anonymity.webp",
    w: 1574,
    h: 1600,
    caption: "Principle screen: anonymity made candid feedback safer to give.",
  },
  {
    title: "Comparative context to reduce bias",
    body: "Use of a comparative scale reduced bias and subjective ratings, increasing actionability during live calibrations.",
    visual: "/case-study/sa-xd/principle-3-comparative.webp",
    w: 1600,
    h: 1527,
    caption: "Principle screen: comparative context helped reduce subjective rating drift.",
  },
];

export default function SaXdCaseStudy() {
  return (
    <CaseStudyShell context="Capital One · 2023 – 2024" currentHref="/case-study/sa-xd">
      <ArticleHero
        eyebrow="Design & Research Lead · Capital One"
        title={
          <>
            Leaders and associates at Capital One distrusted 360 feedback they received. I used research to turn
            the process into actionable growth conversation
            <span style={{ color: "var(--accent)" }}>.</span>
          </>
        }
        meta={
          <ArticleMeta
            role="Design and research lead"
            timeline="Capital One · Dec 2023 – Sept 2024"
            platform="Web platform"
            resultsLabel="Directional signal"
            results={[
              { value: "↑ 58%", label: "gained clarity on development opportunities" },
              { value: "↑ 73%", label: "more feedback used in performance conversations" },
            ]}
          />
        }
      />

      <figure className="col-wide media-inset">
        <LightboxFrame alt="Where the 360 feedback experience broke down across the performance cycle">
          <Image
            src="/case-study/sa-xd/xd-1.webp"
            alt="Where the 360 feedback experience broke down across the performance cycle"
            width={1946}
            height={740}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="block w-full h-auto rounded-xl select-none"
            draggable={false}
          />
        </LightboxFrame>
        <figcaption className="figure-caption">Performance management end-to-end process. Highlighted areas represent selected scope.</figcaption>
      </figure>

      <SectionHeader index="01" label="The problem" heading="Low trust in a system that was supposed to help people grow" />
      <Prose>
        <p>
          360 feedback was poorly connected to the broader performance flow. Feedback templates varied wildly
          across teams. Responses skewed positive, not because everyone was performing exceptionally, but because
          the system gave people no reason to be specific or honest. People leaders lacked confidence in the
          feedback they received. Associates didn&apos;t know how it would be used. The result was a process that
          consumed time and produced noise.
        </p>
        <p>
          We interviewed leaders and associates and looked closely at how feedback was actually being written and
          read. The same patterns kept surfacing: people discounted feedback they couldn&apos;t <strong>put in
          context</strong>, and they <strong>softened their input</strong> when they weren&apos;t sure <strong>how it
          would be used</strong> or who would see it.
        </p>
      </Prose>
      <div className="col-wide media-inset">
        <Img src="/case-study/sa-xd/xd-1.1.webp" alt="Detail of the 360 feedback experience breakdown" aspect="1422/652" fit="cover" />
        <p className="figure-caption">Detail view: the 360 feedback process was disconnected from the moments where leaders needed to use it.</p>
      </div>

      <SectionHeader index="02" label="The principles" heading="Foundational principles" />
      <Prose>
        <p>
          From research, we knew that we needed to improve the consistency, quality &amp; actionability of the
          feedback received for it to be useful during the performance process. Our hypotheses were:
        </p>
        <div role="list" className="not-prose flex flex-col gap-4">
          {PRINCIPLES.map((principle, index) => (
            <div role="listitem" key={principle.title} className="flex gap-3.5">
              <span className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-30 animate-ping" />
                <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold" style={{ background: "var(--accent-text)", color: "var(--background)" }}>
                  {index + 1}
                </span>
              </span>
              <span>
                <span className="italic font-normal" style={{ color: "var(--foreground)" }}>
                  {principle.title}<span style={{ color: "var(--accent)" }}>.</span>
                </span>{" "}
                {principle.body}
              </span>
            </div>
          ))}
        </div>
      </Prose>
      <div className="col-wide media-inset grid grid-cols-1 items-start gap-10">
        {PRINCIPLES.map((principle, index) => (
          <figure key={principle.visual} className="flex flex-col gap-0">
            <LightboxFrame alt={principle.title}>
              <div className="relative w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
                <Image src={principle.visual} alt={principle.title} width={principle.w} height={principle.h} sizes="(max-width: 768px) 90vw, 400px" className="block w-full h-auto select-none" draggable={false} />
                <span className="pointer-events-none absolute right-3 top-3 flex h-7 w-7 items-center justify-center" aria-hidden>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-30 animate-ping" />
                  <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold" style={{ background: "var(--accent-text)", color: "var(--background)" }}>
                    {index + 1}
                  </span>
                </span>
              </div>
            </LightboxFrame>
            <figcaption className="figure-caption">{principle.caption}</figcaption>
          </figure>
        ))}
      </div>

      <SectionHeader index="03" label="The calibration" heading="Connecting feedback to calibration" />
      <Prose>
        <p>
          Before we built the system, we wanted to pilot our hypotheses. We partnered with PwC to build the
          feedback system on these foundations, grounding every question in Capital One&apos;s competency framework
          and making the entire process anonymous by design.
        </p>
      </Prose>
      <figure className="col-wide media-inset">
        <Img src="/case-study/sa-xd/sa-xd-12-2.webp" alt="Feedback form: competency-based ratings, required qualitative comments, fully anonymous" aspect="1345/672" />
        <figcaption className="figure-caption">Feedback form: competency-based ratings, required qualitative comments, fully anonymous.</figcaption>
      </figure>
      <Prose>
        <p>
          The bet wasn&apos;t obviously safe. Full anonymity could have made leaders trust the feedback <em>less</em>{" "}
          (it&apos;s easy to dismiss a critique you can&apos;t attribute), and &ldquo;compared to peers&rdquo; framing
          risked turning a growth tool into a ranking. We were trading those risks for candor, and wouldn&apos;t know
          which way it broke until the pilot.
        </p>
        <p>
          The key decision: <strong>making 360 feedback a first-class input in calibration, not an
          afterthought</strong>. At the time, people leaders used Google Slides to represent their associates
          during calibrations. For our pilot group, we redesigned the calibration slide to surface feedback
          directly alongside the performance data leaders collected.
        </p>
      </Prose>
      <figure className="col-wide media-inset">
        <LightboxFrame alt="Calibration one-pager: 360 feedback as first-class input with peer comparison graph and written feedback">
          <Image
            src="/case-study/sa-xd/sa-xd-13-2.webp"
            alt="Calibration one-pager: 360 feedback as first-class input with peer comparison graph and written feedback"
            width={1308}
            height={687}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="block w-full h-auto rounded-xl select-none"
            draggable={false}
          />
        </LightboxFrame>
        <figcaption className="figure-caption">Calibration one-pager: feedback as a first-class input, not an afterthought.</figcaption>
      </figure>

      <SectionHeader index="04" label="The measurement" heading="Measuring what mattered" />
      <Prose>
        <p>
          After the performance cycle, we measured impact by surveying, observing, and interviewing different
          participating user groups, then triangulating those data sources. This helped us understand what was
          resonating with users at each step of the performance cycle, how much the feedback was actually used,
          and how it shaped performance conversations.
        </p>
      </Prose>
      <div className="col-wide media-inset">
        <MeasureCarousel />
      </div>

      <SectionHeader index="05" label="The outcome" heading="The pilot made the case" />
      <Prose>
        <p>
          The results were strong enough to convince our HR stakeholders to <strong>discontinue using
          Workday</strong> as the primary tool for performance and talent, and <strong>invest in building an
          in-house performance system</strong> that understood Capital One&apos;s internal performance process and
          was grounded in 360 feedback as the foundation.
        </p>
      </Prose>
      <StatCards
        stats={[
          { value: "↑ 65%", label: "improvement in clarity & consistency of feedback received" },
          { value: "↑ 58%", label: "improvement in feedback quality: anonymity made a measurable difference" },
          { value: "↑ 52%", label: "improvement in actionability: feedback used more actively in live calibrations" },
        ]}
      />
      <Prose>
        <p>
          That in-house platform became PATH (the next case study), where this pilot&apos;s bet got built for the
          whole enterprise.
        </p>
      </Prose>

      <SectionHeader index="06" label="The reflection" heading="Growth as a designer" />
      <Prose>
        <p>
          This was my first major lead effort, and it changed the way I think about product and strategy design.
        </p>
        <p>
          What stayed with me most was how much stronger the work became when alignment happened early. Bringing
          cross-functional partners in from the beginning didn&apos;t just improve the solution: it created a shared
          sense of ownership that carried the project forward. It also taught me that measurement isn&apos;t
          something you do after launch; it&apos;s how you understand whether the work is resonating, and how you
          earn the next phase.
        </p>
      </Prose>
    </CaseStudyShell>
  );
}
