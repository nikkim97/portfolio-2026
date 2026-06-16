import Link from "next/link";
import { FONT, GLASS } from "../../components/ui";
import { SectionLabel, SectionHeading, Prose, PullQuote, StatRow } from "../../components/caseStudyUI";

// Standard image: shows at natural height, full column width.
function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="flex flex-col gap-2 sm:-mx-14">
      <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto select-none" draggable={false} />
      </div>
      {caption && <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">{caption}</figcaption>}
    </figure>
  );
}

// Long-form screens (full calibration profiles, full tab views) shown at their
// full natural height — as long as they need to be.
function TallFigure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="flex flex-col gap-2 sm:-mx-14">
      <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto select-none" draggable={false} />
      </div>
      {caption && <figcaption className="text-[10px] font-light text-[var(--midtone)] tracking-wide">{caption}</figcaption>}
    </figure>
  );
}

export default function PeopleLeaderRedesignCaseStudy() {
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
            Capital One · 2024
          </span>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto w-full px-6 sm:px-24">

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--midtone)]">
            Manager, Experience Design · PATH
          </p>
          <h1
            className="font-light"
            style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: "14ch" }}
          >
            People Leader 2.0<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="font-light leading-relaxed" style={{ fontSize: "clamp(15px, 1.6vw, 19px)", color: "#3A3530", maxWidth: "60ch" }}>
            Preparing for a single calibration meant moving through 18+ screens. The redesign brought it down to four — every input a leader needs, side by side on one page.
          </p>
          {/* Context card */}
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden" style={GLASS}>
            <div className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Problem statement</p>
                <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                  To prepare for calibration, leaders moved through 18+ screens — a table-based team list, separate feedback and results flows, and a multi-page profile builder. The fragmentation clashed with how leaders actually assess: holistically, synthesizing the associate&apos;s self-evaluation, peer feedback, and their own perspective.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Role</p>
                <p className="font-light text-sm leading-relaxed" style={{ color: "#3A3530" }}>
                  Co-design lead on a cross-functional venture sprint — drove the &ldquo;My Team&rdquo; framework and the holistic, 360-degree associate view.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-6 sm:border-l border-[var(--border)]">
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Platform</p>
                <p className="font-light text-sm" style={{ color: "#3A3530" }}>Enterprise web · PATH</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Customer</p>
                <p className="font-light text-sm" style={{ color: "#3A3530" }}>People Leaders</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Timeline</p>
                <p className="font-light text-sm" style={{ color: "#3A3530" }}>3-day venture sprint · 2024</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero image ── */}
        <Figure
          src="/case-study/pl-redesign/tab0.png"
          alt="Redesigned My Team view: a leader's direct reports as cards, each showing feedback received, approvals, results, and calibration profile status"
          caption="The redesigned 'My Team' page — every stat a leader needs for calibration, in one place"
        />

        {/* ── The problem ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>18+ screens to prepare for one conversation</SectionHeading>
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 pb-2 border-b border-[var(--border)]">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Success metrics · OKRs</p>
                <StatRow stats={[
                  { value: "↓ 50%", label: "target cut in time leaders spend identifying people insights" },
                  { value: "↑ > 80%", label: "people leaders satisfied with the PM cycle (67% at YE25)" },
                ]} />
              </div>
              <Prose>
                <p>
                  To build calibration materials, a people leader had to work across the whole system. A <strong>table-based &ldquo;My Team&rdquo; list</strong> was just the index: from it, they clicked into a feedback flow to review each associate&apos;s responses, looked through results on separate screens, then moved through a distinct <strong>five-step flow — Overview, Key results, Strengths, Opportunities, Preview</strong> — to assemble every calibration profile.
                </p>
                <p>
                  All told, <strong>18+ screens for a single conversation.</strong> Information was split across all of them, so leaders had to hold the synthesis in their heads — high cognitive load, endless clicking, and judgment formed from scattered context.
                </p>
              </Prose>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Figure
              src="/case-study/pl-redesign/old-myteam-table.png"
              alt="The old table-based My Team: a row per associate, with feedback, results, and the calibration profile each behind a separate link"
              caption="Before: the table-based 'My Team' — a row per person, every input behind its own link"
            />
            <TallFigure
              src="/case-study/pl-redesign/old-profile-builder.png"
              alt="The old calibration profile builder: a separate multi-step flow with Overview, Key results, Strengths, Opportunities, and Preview steps"
              caption="Before: each calibration profile was assembled in a separate five-step flow"
            />
          </div>
        </section>

        {/* ── The insight ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The insight · 01</SectionLabel>
              <SectionHeading>Leaders assess people, not rows in a table</SectionHeading>
            </div>
            <Prose>
              <p>
                A three-day venture sprint surfaced the core friction: the legacy design fundamentally clashed with the People Leader mental model. The old system relied on <strong>table-based navigation</strong>, but research showed that leaders don&apos;t evaluate a spreadsheet of people — they assess each associate <em>holistically</em>, one person at a time.
              </p>
              <p>
                That reframed the whole problem. If the experience mirrored how leaders actually think — pulling self-evaluation, peer feedback, and their own perspective into one place per person — the workflow would feel intuitive, and calibration would get more objective as a result.
              </p>
            </Prose>
          </div>
          <PullQuote>
            Aligning the experience with a leader&apos;s mental model of holistic assessment creates an intuitive workflow — and enables more objective calibration sessions.
          </PullQuote>
        </section>

        {/* ── The solution ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The solution · 02</SectionLabel>
              <SectionHeading>Four screens, everything side by side</SectionHeading>
            </div>
            <Prose>
              <p>
                We abandoned the table-based navigation for a <strong>&ldquo;My Team&rdquo; framework</strong> that anchors the experience on the individual direct report — and collapsed <strong>18+ screens to four</strong>. A leader now opens one My Team page and sees every stat they need for calibration at a glance.
              </p>
              <p>
                From there, a single <strong>360-degree associate view</strong> puts feedback, results, strengths, and the calibration profile <strong>side by side</strong> — dynamic tabs and sliding drawers keep the leader in flow instead of hopping across screens. The work also produced reusable UI patterns now standardized across the PATH ecosystem, plus a rigorous accessibility review for the enterprise release.
              </p>
            </Prose>
          </div>
          <TallFigure
            src="/case-study/pl-redesign/360-view.png"
            alt="The 360 associate view: dynamic tabs for feedback, results, strengths, and the calibration profile, with a sliding drawer for the full profile"
            caption="The 360 associate view: dynamic tabs and a sliding calibration drawer keep the leader in flow"
          />
          <TallFigure
            src="/case-study/pl-redesign/360-results.png"
            alt="Key results tab: the associate's key results and impact, surfaced as a dynamic tab within the 360 view"
            caption="A dynamic tab in the same view — key results and impact, without losing the associate's context"
          />
        </section>

        {/* ── The process ── */}
        <section className="py-16 flex flex-col gap-10 border-b border-[var(--border)]">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The process · 03</SectionLabel>
              <SectionHeading>A 3-day, in-person venture sprint</SectionHeading>
            </div>
            <Prose>
              <p>
                A cross-functional team ran a three-day, in-person discovery sprint with one goal: a high-fidelity prototype by day four. Design leads Niharika Mishra and Marina Sheridan drove the framework, product partners Tyler Benjamin and Matt Oliver kept it anchored to real needs, and Sean Kelly translated the &ldquo;My Team&rdquo; framework into the interaction model and led the accessibility review.
              </p>
              <p>
                The format did the heavy lifting. Being in the same room collapsed weeks of fragmented virtual meetings into <strong>72 focused hours</strong> — discovery, framework, and a shared high-fidelity prototype, end to end.
              </p>
            </Prose>
          </div>
          <Figure
            src="/case-study/pl-redesign/group.png"
            alt="The cross-functional team working together in a conference room during the in-person venture sprint, with a remote teammate on screen"
            caption="Three days, in person: discovery → framework → high-fidelity prototype"
          />
        </section>

        {/* ── Outcome ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>Outcome</SectionLabel>
              <SectionHeading>From 18+ screens to four</SectionHeading>
            </div>
            <div className="flex flex-col gap-8">
              <StatRow stats={[
                { value: "18+ → 4", label: "screens collapsed into the My Team experience" },
                { value: "72 hrs", label: "from discovery to a high-fidelity prototype" },
              ]} />
              <Prose>
                <p>
                  The redesign brought a leader&apos;s entire calibration prep onto a few connected screens, with the inputs for a fair assessment side by side instead of scattered. Delivered as a high-fidelity prototype in 72 hours — what typically takes weeks of fragmented virtual work — its impact carried well past the sprint:
                </p>
                <ul>
                  <li><strong>Cross-functional alignment.</strong> The prototype immediately informed dependent features, including Self-Evaluations and Performance Reviews.</li>
                  <li><strong>Process evolution.</strong> The HR team refined the &ldquo;My Team&rdquo; sprint methodology through subsequent sprints and retrospectives.</li>
                  <li><strong>A reusable toolkit.</strong> Those learnings were codified into a finalized process other teams now run from.</li>
                </ul>
              </Prose>
            </div>
          </div>
          <TallFigure
            src="/case-study/pl-redesign/360-calibration.png"
            alt="The redesigned calibration profile: competency assessment, key results, strengths and development — complete and still editable"
            caption="The redesigned calibration profile — assembled in the flow, not a separate five-step build"
          />
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
