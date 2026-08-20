import type { ReactNode } from "react";
import CaseStudyShell from "../../components/CaseStudyShell";
import {
  ArticleHero,
  ArticleMeta,
  HeroVideo,
  PhoneFrame,
  Prose,
  PullQuote,
  Screenshot,
  SectionHeader,
} from "../../components/caseStudyUI";
import { caseStudyMetadata } from "../../lib/siteMetadata";

export const metadata = caseStudyMetadata({
  title: "Time Tracking Dashboard",
  description:
    "A lightweight tracker that makes the shape of a week visible, so you can see where your time actually goes, and reflect on it.",
  slug: "time-tracker",
});

const PHONE_ASPECT = "1/2";

function PillarKey() {
  const pillars = [
    { label: "Family", color: "#F59E0B", goal: "25%" },
    { label: "Self-Care", color: "#10B981", goal: "20%" },
    { label: "Socialization", color: "#8B5CF6", goal: "15%" },
    { label: "Career", color: "#3B82F6", goal: "40%" },
  ];
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3">
      {pillars.map((pillar) => (
        <div key={pillar.label} className="flex flex-col gap-1.5 rounded-xl p-4" style={{ background: "var(--card)" }}>
          <span className="flex items-center gap-2">
            <span className="inline-block rounded-full" style={{ width: 9, height: 9, background: pillar.color }} />
            <span className="text-[12px] font-normal" style={{ color: "var(--foreground)" }}>{pillar.label}</span>
          </span>
          <span className="text-[10px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>
            target {pillar.goal}
          </span>
        </div>
      ))}
    </div>
  );
}

function PhoneGrid({ children, cols = 3 }: { children: ReactNode; cols?: 3 | 4 }) {
  return (
    <div className={`col-wide media-inset grid grid-cols-1 gap-6 items-start ${cols === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
      {children}
    </div>
  );
}

export default function TimeTrackerCaseStudy() {
  return (
    <CaseStudyShell context="Personal Project · June 2026" currentHref="/case-study/time-tracker">
      <ArticleHero
        eyebrow="Product Design · Vibe Coding"
        live={{ href: "https://time-tracker-pi-sandy.vercel.app/", label: "Live prototype" }}
        title={
          <>
            People budget money carefully but rarely see where their time goes. I designed a lightweight tracker
            that makes the shape of a week visible enough to reflect on
            <span style={{ color: "var(--accent)" }}>.</span>
          </>
        }
        meta={
          <ArticleMeta
            role='Builder: concept, four life pillars, and "spec first" approach'
            timeline="Personal June 2026"
            platform="Mobile web"
          />
        }
      />

      <div className="col-wide media-inset">
        <HeroVideo
          src="/case-study/time-track/regular-flow.mp4"
          poster="/case-study/time-track/regular-flow-poster.webp"
          aspect="540/1110"
          label="Time Tracker walkthrough: logging a session and watching the weekly balance update across the four life pillars"
          maxWidth={420}
        />
        <p className="figure-caption mx-auto w-full" style={{ maxWidth: 420 }}>
          Walkthrough: logging a session and watching the weekly balance update across the four life pillars.
        </p>
      </div>

      <SectionHeader index="01" label="The concept" heading="Budget your time the way you budget money" />
      <Prose>
        <p>
          A budget app breaks your spending into categories so you can see where the money goes. Time Tracker
          does the same thing with your calendar. Four life pillars (Family, Self-Care, Socialization, and
          Career) are the default categories, each assigned a target share of your time. The app shows you the
          actual breakdown next to the one you choose for yourself.
        </p>
        <p>
          Each pillar carries its own target, so the dashboard always has something to measure against. My goal
          was to create something that could hold you accountable to how you want to spend your time, because
          most people, including me, feel like life runs on autopilot without us directing it. And almost always,
          people&apos;s regrets have to do with, &ldquo;I wish I did that with my time at that age.&rdquo; So I wanted to
          see where the time was actually going, in more than one view.
        </p>
        <PillarKey />
      </Prose>
      <PhoneGrid>
        <PhoneFrame maxWidth={520}>
          <Screenshot src="/case-study/time-track/v2.1.webp" aspect={PHONE_ASPECT} priority label="V2 dashboard: a week of time across Family, Self-Care, Socialization, and Career, each measured against its target" caption="The dashboard: each pillar next to its target" />
        </PhoneFrame>
        <PhoneFrame maxWidth={520}>
          <Screenshot src="/case-study/time-track/v2.3.webp" aspect={PHONE_ASPECT} label="Balance states: Balanced, On track, Drifting, Off balance, the plain-English read on the week" caption="The balance read: where you land, in one word" />
        </PhoneFrame>
        <PhoneFrame maxWidth={520}>
          <Screenshot src="/case-study/time-track/v2.2.webp" aspect={PHONE_ASPECT} label="Where your time went: the calendar and the actual sessions behind a week" caption="Drill into any week to see the sessions that filled it" />
        </PhoneFrame>
      </PhoneGrid>

      <SectionHeader index="02" label="The decision" heading="Pillars have to fit the life you're living" />
      <Prose>
        <p>
          The hardest part of any tracker isn&apos;t the chart: it&apos;s categorization. Pillars have to be personal,
          because different things matter to different people at different stages in their life.
        </p>
        <p>
          Since some categories could overlap, we also needed to set definitions around each category. So the
          onboarding starts with defaults, but lets people shape the system around what they actually want to
          track. The point is not to force one universal definition of a balanced life; it is to make the
          categories meaningful enough that the breakdown feels honest.
        </p>
      </Prose>
      <PullQuote>
        &ldquo;Different things matter at different stages of life, so the pillars need to be personal enough to grow
        with you.&rdquo;
      </PullQuote>
      <PhoneGrid>
        <Screenshot src="/case-study/time-track/onboard.webp" aspect={PHONE_ASPECT} label="Onboarding step 1: intro and setup framing" caption="Onboarding · intro" />
        <Screenshot src="/case-study/time-track/onboard-2.1.webp" aspect={PHONE_ASPECT} label="Onboarding step 2: configuring preferences" caption="Onboarding · setup" />
        <Screenshot src="/case-study/time-track/onboard-2.2.webp" aspect={PHONE_ASPECT} label="Onboarding step 3: pillar defaults and confirmation" caption="Onboarding · defaults" />
      </PhoneGrid>

      <SectionHeader index="03" label="The reflection" heading="It's fun to see my ideas come to life" />
      <Prose>
        <p>
          Bloom showed me I could move at the speed of my own judgment. Time Tracker showed me that judgment
          travels further when I write it down before I build, which is the difference between exploring an idea
          and shipping a coherent one.
        </p>
      </Prose>
      <div className="col-wide media-inset">
        <div className="mx-auto w-full" style={{ maxWidth: 420 }}>
          <Screenshot
            expandable={false}
            src="/case-study/time-track/herofinal.webp"
            aspect="731/1456"
            label="Time Tracker: the balance read and the weekly breakdown of hours across four life pillars"
            priority
          />
        </div>
      </div>
    </CaseStudyShell>
  );
}
