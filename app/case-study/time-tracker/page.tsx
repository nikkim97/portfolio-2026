import Link from "next/link";
import { FONT, GLASS } from "../../components/ui";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--accent)]">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-light"
      style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
    >
      {children}
    </h2>
  );
}

function Screenshot({
  label,
  caption,
  aspect = "16/9",
}: {
  label: string;
  caption?: string;
  aspect?: string;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <div
        className="w-full rounded-xl overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: aspect, background: "var(--card)", border: "1px dashed var(--border)" }}
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--midtone)] opacity-50 px-4 text-center">{label}</p>
      </div>
      {caption && (
        <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-4 font-light text-sm leading-[1.85]"
      style={{ color: "#3A3530" }}
    >
      {children}
    </div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="font-light"
      style={{
        fontSize: "clamp(16px, 1.6vw, 20px)",
        letterSpacing: "-0.01em",
        lineHeight: 1.5,
        color: "var(--foreground)",
        borderLeft: "2px solid var(--accent)",
        paddingLeft: "1.25em",
        margin: "0",
      }}
    >
      {children}
    </blockquote>
  );
}

function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-8">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <p
            className="font-light tabular-nums"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em", color: "var(--foreground)" }}
          >
            {s.value}
          </p>
          <p className="text-[11px] font-light tracking-wide" style={{ color: "var(--midtone)" }}>
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

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
        <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">
            Personal Project · 2026
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 sm:px-16">

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
          <p
            className="font-light leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.3vw, 17px)", color: "var(--midtone)", maxWidth: "58ch" }}
          >
            We track money obsessively — budgets, categories, where every dollar goes. But{" "}
            <em>time is money</em> is the oldest cliché there is, and almost no one budgets it.
            Time Tracker answers one question: where did my time actually go?
          </p>
          <StatRow stats={[
            { value: "4", label: "life pillars" },
            { value: "1", label: "categorization rule" },
            { value: "0", label: "databases in V1 — on purpose" },
          ]} />
        </section>

        {/* ── Hero image ── */}
        <Screenshot
          label="Hero — Time Tracker dashboard: a week of time broken into Family, Self-Care, Socialization, and Career"
          caption="The dashboard — a week of time, budgeted across four life pillars"
        />

        {/* ── The concept ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The concept</SectionLabel>
              <SectionHeading>Budget your time the way you budget money</SectionHeading>
            </div>
            <Prose>
              <p>
                A budget app breaks your spending into categories so you can see where the money goes. Time Tracker does the same thing with your week. Four life pillars — Family, Self-Care, Socialization, Career — each with a target share of your time. The app shows you the actual breakdown next to the one you intended.
              </p>
              <p>
                The primary view is a donut: the shape of your week at a glance. Flip it and the same data becomes a goal-versus-actual bar — where you went over, where you came up short — exactly like a budget flags the category you blew past. The point isn&apos;t to track for tracking&apos;s sake. It&apos;s to make an invisible thing visible enough to act on.
              </p>
              <p>
                Each pillar carries its own target, so the dashboard always has something to measure against:
              </p>
              <PillarKey />
            </Prose>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="Donut breakdown — the shape of the week across the four pillars, with hours and share per slice"
              caption="The donut — the shape of your week at a glance"
            />
            <Screenshot
              label="Goal vs. actual — the bar view comparing where your time went against where you meant it to go"
              caption="Flip the view: goal vs. actual, the way a budget flags an over-spent category"
            />
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
                The hardest part of any tracker isn&apos;t the chart — it&apos;s categorization. The moment one event is allowed to count toward two things, the data turns to mush and the donut stops meaning anything. So I made a single rule and held it: <em>who you&apos;re with decides the pillar.</em>
              </p>
              <p>
                A hike with your kids is Family, not Self-Care — even though it&apos;s good for you. Self-Care is strictly solo: just you, recharging. One event, one pillar, no splitting. It sounds almost too simple, but that constraint <em>is</em> the product. It&apos;s what makes the breakdown trustworthy instead of negotiable.
              </p>
            </Prose>
          </div>

          <PullQuote>
            &ldquo;Who you&apos;re with determines the pillar. A hike with your kids is Family, not Self-Care. Self-Care is strictly solo time.&rdquo;
          </PullQuote>

          <Screenshot
            label="Onboarding — choosing pillars, with sensible defaults pre-selected and a 'use defaults and skip' option"
            caption="Onboarding: pick your pillars, or skip with defaults — every step has a sensible default"
          />
        </section>

        {/* ── The build ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The build</SectionLabel>
              <SectionHeading>This time, I wrote the spec first</SectionHeading>
            </div>
            <Prose>
              <p>
                Bloom taught me one thing the hard way: I&apos;d let the visual design emerge reactively instead of deciding it up front. My note to myself afterward was literally to spec the system <em>before</em> the first build command. Time Tracker is that lesson applied.
              </p>
              <p>
                Before I opened a terminal, I wrote a brief for Claude Code to build against — not just a feature list, but the pillars and their definitions, the categorization rule, the design language (calm, editorial, muted and warm — &ldquo;editorial over dashboard&rdquo;), and a hard line on scope. V1 validates the concept with dummy data and localStorage. No Google Calendar, no database, no auth — none of it until the dummy-data version proves the idea is worth the infrastructure.
              </p>
              <p>
                Same collaboration model as Bloom — I&apos;m the product partner, Claude Code is the developer — but this time the product thinking existed on paper before a single file did. Claude built to the spec; I reviewed on localhost and redirected.
              </p>
            </Prose>
          </div>

          <PullQuote>
            &ldquo;Don&apos;t add infrastructure for unvalidated features. Build the simplest thing that tests the idea first.&rdquo;
          </PullQuote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="The spec — a product brief written before any code: pillars, the categorization rule, design language, and V1-vs-V2 scope"
              caption="The brief, written first — pillars, the rule, the design language, and a hard line on scope"
            />
            <Screenshot
              label="Claude Code building the dashboard to spec — Next.js, a custom Recharts donut, the onboarding flow"
              caption="Claude Code building to the spec — donut chart, pillar cards, onboarding, in one pass"
            />
          </div>
        </section>

        {/* ── V1 ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>V1</SectionLabel>
              <SectionHeading>Prove it with perfect dummy data first</SectionHeading>
            </div>
            <Prose>
              <p>
                The whole V1 bet: if the dashboard doesn&apos;t feel useful with clean, hand-made data, real calendar data won&apos;t save it. So I built the full experience on a realistic fake week — deep work blocks, a family hike, coffee with a friend, morning runs — and judged whether the picture it painted actually told me something.
              </p>
              <p>
                The dashboard does a few quiet things well. A weekly-or-monthly toggle. Pillar cards showing hours and share. A donut you can flip to goal-versus-actual. And a one-line plain-English read on the week — <em>&ldquo;Career led the way… Self-Care was a little quieter than you&apos;d hoped&rdquo;</em> — generated from the data, because a number is information but a sentence is a nudge.
              </p>
              <p>
                It&apos;s all local. localStorage holds your setup; there&apos;s no account and no backend. On purpose — the simplest thing that could test the idea.
              </p>
            </Prose>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Screenshot
              label="Weekly dashboard — pillar cards with hours and share, donut breakdown, week/month toggle"
              caption="The weekly view running on a realistic dummy week"
            />
            <Screenshot
              label="The generated insight line — a plain-English read on the week, written from the underlying data"
              caption="A number is information; a sentence is a nudge — the insight line is generated from the data"
            />
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
                Writing the spec first changed the whole build. The time I spent wasn&apos;t on implementation — Claude handled that. It was on the decisions: what counts as Self-Care, whether to split events across pillars (no), what to refuse to build yet. Vibe coding&apos;s bottleneck isn&apos;t typing. It&apos;s judgment — and judgment is easier to apply consistently when you&apos;ve written it down.
              </p>
              <p>
                What&apos;s next is the part I deliberately didn&apos;t build: Google Calendar integration, auto-categorizing real events into pillars — with a manual override for the calls the algorithm gets wrong — and a real database to replace localStorage. But only now, because the dummy-data version earned it.
              </p>
            </Prose>
          </div>

          <div
            className="flex flex-col gap-4 p-6 rounded-2xl"
            style={GLASS}
          >
            <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Built with</p>
            <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
              Claude Code · Next.js 14 · TypeScript · Tailwind CSS · Recharts · shadcn/ui
            </p>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)] mt-2">Timeline</p>
            <p className="font-light text-sm" style={{ color: "#3A3530" }}>March 2026 — spec first, then built to it</p>
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
