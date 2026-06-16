import Link from "next/link";
import { FONT, GLASS } from "../../components/ui";
import { SectionLabel, SectionHeading, Screenshot, PhoneFrame, Prose, PullQuote, StatRow } from "../../components/caseStudyUI";

// Phone screenshots are portrait (~1:2) with the device frame baked in.
const PHONE_ASPECT = "1/2";

// Tiny swatch + label, used to introduce the four pillars inline.
function PillarKey() {
  const pillars = [
    { label: "Family", color: "#F59E0B", goal: "25%" },
    { label: "Self-Care", color: "#10B981", goal: "20%" },
    { label: "Socialization", color: "#8B5CF6", goal: "15%" },
    { label: "Career", color: "#3B82F6", goal: "40%" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {pillars.map((p) => (
        <div
          key={p.label}
          className="flex flex-col gap-1.5 rounded-xl p-4"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <span className="flex items-center gap-2">
            <span className="inline-block rounded-full" style={{ width: 9, height: 9, background: p.color }} />
            <span className="text-[12px] font-normal" style={{ color: "var(--foreground)" }}>{p.label}</span>
          </span>
          <span className="text-[10px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>
            target {p.goal}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TimeTrackerCaseStudy() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 border-b border-[var(--border)]"
        style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-[1260px] mx-auto px-6 sm:px-24 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">
            Personal Project · 2026
          </span>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto w-full px-6 sm:px-24">

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--midtone)]">
            Product Design · Vibe Coding
          </p>
          <h1
            className="font-light"
            style={{ fontSize: "clamp(32px, 5vw, 68px)", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "12ch" }}
          >
            Time Tracker<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          {/* Context card: problem statement / role | platform / timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden" style={GLASS}>
            <div className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Problem statement</p>
                <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                  We budget money down to the dollar but almost no one budgets time. Where does your time actually go, and can you see it clearly enough to spend it on what matters?
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Role</p>
                <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                  Product partner: set the concept, the four life pillars, and the "spec first" approach; Claude Code built to the spec.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6 sm:border-l border-[var(--border)]">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Platform</p>
                <p className="font-light text-sm" style={{ color: "#3A3530" }}>Web app</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Timeline</p>
                <p className="font-light text-sm" style={{ color: "#3A3530" }}>March 2026: spec first, then built to it</p>
              </div>
            </div>
          </div>
          <StatRow stats={[
            { value: "4", label: "life pillars" },
            { value: "1", label: "categorization rule" },
            { value: "0", label: "databases in V1, on purpose" },
          ]} />
        </section>

        {/* ── Hero image (placeholder: to fill later) ── */}
        <PhoneFrame maxWidth={300}>
          <Screenshot
            aspect={PHONE_ASPECT}
            label="Hero image: to come"
          />
        </PhoneFrame>

        {/* ── The concept ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The concept</SectionLabel>
              <SectionHeading>Budget your time the way you budget money</SectionHeading>
            </div>
            <Prose>
              <p>
                A budget app breaks your spending into categories so you can see where the money goes. Time Tracker does the same thing with your week. Four life pillars, Family, Self-Care, Socialization, Career, each with a target share of your time. The app shows you the actual breakdown next to the one you intended.
              </p>
              <p>
                The primary view puts each pillar next to its target as a bar, where you went over, where you came up short, exactly like a budget flags the category you blew past. On top of it sits a plain-English balance read: <em>Balanced, On track, Drifting,</em> or <em>Off balance</em>, so the numbers resolve into a single judgment. And you can drop into any week to see the actual sessions that filled it. The point isn&apos;t to track for tracking&apos;s sake: it&apos;s to make an invisible thing visible enough to act on.
              </p>
              <p>
                Each pillar carries its own target, so the dashboard always has something to measure against:
              </p>
              <PillarKey />
            </Prose>
          </div>
          <div className="flex flex-nowrap gap-6 justify-center overflow-x-auto pb-2 sm:-mx-14">
            <PhoneFrame maxWidth={232}>
              <Screenshot
                src="/case-study/time-track/v2.1.png"
                aspect={PHONE_ASPECT}
                priority
                label="V2 dashboard: a week of time across Family, Self-Care, Socialization, and Career, each measured against its target"
                caption="The dashboard: each pillar next to its target"
              />
            </PhoneFrame>
            <PhoneFrame maxWidth={232}>
              <Screenshot
                src="/case-study/time-track/v2.3.png"
                aspect={PHONE_ASPECT}
                label="Balance states: Balanced, On track, Drifting, Off balance, the plain-English read on the week"
                caption="The balance read: where you land, in one word"
              />
            </PhoneFrame>
            <PhoneFrame maxWidth={232}>
              <Screenshot
                src="/case-study/time-track/v2.2.png"
                aspect={PHONE_ASPECT}
                label="Where your time went: the calendar and the actual sessions behind a week, sorted by most time or most frequent"
                caption="Drill into any week to see the sessions that filled it"
              />
            </PhoneFrame>
          </div>
        </section>

        {/* ── The decision ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The decision</SectionLabel>
              <SectionHeading>One rule keeps the whole thing honest</SectionHeading>
            </div>
            <Prose>
              <p>
                The hardest part of any tracker isn&apos;t the chart: it&apos;s categorization. The moment one event is allowed to count toward two things, the data turns to mush and the donut stops meaning anything. So I made a single rule and held it: <em>who you&apos;re with decides the pillar.</em>
              </p>
              <p>
                A hike with your kids is Family, not Self-Care, even though it&apos;s good for you. Self-Care is strictly solo: just you, recharging. One event, one pillar, no splitting. It sounds almost too simple, but that constraint <em>is</em> the product. It&apos;s what makes the breakdown trustworthy instead of negotiable.
              </p>
            </Prose>
          </div>

          <PullQuote>
            &ldquo;Who you&apos;re with determines the pillar. A hike with your kids is Family, not Self-Care. Self-Care is strictly solo time.&rdquo;
          </PullQuote>

          <div className="flex flex-nowrap gap-6 overflow-x-auto pb-2 sm:-mx-14">
            <div className="flex-none w-[232px]">
              <Screenshot
                src="/case-study/time-track/onboard.png"
                aspect={PHONE_ASPECT}
                label="Onboarding step 1: intro and setup framing"
                caption="Onboarding · intro"
              />
            </div>
            <div className="flex-none w-[232px]">
              <Screenshot
                src="/case-study/time-track/onboard-2.1.png"
                aspect={PHONE_ASPECT}
                label="Onboarding step 2: configuring preferences"
                caption="Onboarding · setup"
              />
            </div>
            <div className="flex-none w-[232px]">
              <Screenshot
                src="/case-study/time-track/onboard-2.2.png"
                aspect={PHONE_ASPECT}
                label="Onboarding step 3: pillar defaults and confirmation"
                caption="Onboarding · defaults"
              />
            </div>
            <div className="flex-none w-[232px]">
              <Screenshot
                src="/case-study/time-track/onbaord3.png"
                aspect={PHONE_ASPECT}
                label="Onboarding step 4: completion"
                caption="Onboarding · complete"
              />
            </div>
          </div>
        </section>

        {/* ── Evolution: V1 → V2 ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>Evolution</SectionLabel>
              <SectionHeading>The donut was the first cut, not the final one</SectionHeading>
            </div>
            <Prose>
              <p>
                V1 proved the concept on a realistic fake week: deep work blocks, a family hike, coffee with a friend, morning runs, all local, all dummy data, no account and no backend. The bet: if the dashboard doesn&apos;t feel useful with clean hand-made data, real calendar data won&apos;t save it.
              </p>
              <p>
                It led with a donut. Pretty, and good at answering <em>&ldquo;what was the shape of my week&rdquo;</em>, but weak at the question that actually matters: <em>am I on target?</em> Comparing a slice to a goal means eyeballing two arcs. The one thing V1 nailed was the plain-English read: <em>&ldquo;Career led the way… Self-Care was a little quieter than you&apos;d hoped&rdquo;</em>, because a number is information but a sentence is a nudge.
              </p>
              <p>
                V2 kept the sentence and promoted the goal-versus-actual bar to the primary view, then added an explicit balance state on top. Same data, a read you don&apos;t have to decode. Here&apos;s where it started:
              </p>
            </Prose>
          </div>

          <div className="flex flex-wrap gap-6 justify-center sm:-mx-14">
            <PhoneFrame maxWidth={232}>
              <Screenshot
                src="/case-study/time-track/v1.1.png"
                aspect={PHONE_ASPECT}
                label="V1 dashboard: the donut breakdown with pillar cards and the generated insight line"
                caption="V1 · the donut: shape of the week, weak on 'am I on target'"
              />
            </PhoneFrame>
            <PhoneFrame maxWidth={232}>
              <Screenshot
                src="/case-study/time-track/v1.3.png"
                aspect={PHONE_ASPECT}
                label="V1 goal vs. reality: paired goal and actual bars per pillar with plus/minus deltas"
                caption="V1 · goal vs. reality lived behind a flip. V2 made it the front door"
              />
            </PhoneFrame>
            <PhoneFrame maxWidth={232}>
              <Screenshot
                src="/case-study/time-track/v1.2.png"
                aspect={PHONE_ASPECT}
                label="V1 calendar: a month grid with a colored dot per pillar logged each day"
                caption="V1 · the calendar: a dot per pillar, per day"
              />
            </PhoneFrame>
          </div>
        </section>

        {/* ── What's next / learned ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>What I learned</SectionLabel>
              <SectionHeading>The bottleneck is the decisions, not the code</SectionHeading>
            </div>
            <Prose>
              <p>
                Writing the spec first changed the whole build. The time I spent wasn&apos;t on implementation: Claude handled that. It was on the decisions: what counts as Self-Care, whether to split events across pillars (no), what to refuse to build yet. Vibe coding&apos;s bottleneck isn&apos;t typing. It&apos;s judgment, and judgment is easier to apply consistently when you&apos;ve written it down.
              </p>
              <p>
                V2 earned its way to more surface area: the month calendar and the session-level &ldquo;where your time went&rdquo; breakdown, by proving the core read first. What&apos;s still deliberately ahead is the infrastructure: real Google Calendar sync, auto-categorizing live events into pillars with a manual override for the calls the algorithm gets wrong, and a database to replace localStorage. But only now, because the dummy-data version earned it.
              </p>
            </Prose>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-10 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <Link
            href="/"
            className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] transition-colors duration-200"
          >
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
