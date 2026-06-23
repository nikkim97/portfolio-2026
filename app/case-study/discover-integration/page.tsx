import Link from "next/link";
import { FONT } from "../../components/ui";
import { IntroMetadataSection, SectionLabel, SectionHeading, Screenshot, Prose, PullQuote } from "../../components/caseStudyUI";
import { NextProjectCard, NextProjectLink } from "../../components/ProjectNavigation";

// A row of native mobile screens. Each shot carries its own aspect ratio since
// the source captures range from full device frames to cropped bottom sheets.
function MobileShots({ shots, cols = 3 }: { shots: { src?: string; label: string; caption?: string; aspect?: string; priority?: boolean }[]; cols?: 3 | 4 }) {
  const colClass = cols === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3";
  return (
    <div className={`grid ${colClass} gap-4 sm:gap-5 items-start`}>
      {shots.map((s, i) => (
        <Screenshot key={i} src={s.src} aspect={s.aspect ?? "390 / 844"} priority={s.priority} label={s.label} caption={s.caption} />
      ))}
    </div>
  );
}

export default function DiscoverIntegrationCaseStudy() {
  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* Top bar */}
      <div
        className="sticky top-0 z-40 border-b border-[var(--border)]"
        style={{ backgroundColor: "rgba(245,241,235,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-[1260px] mx-auto px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          <span className="hidden text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] md:inline">
            Capital One · Jan 2026 – Present
          </span>
          <NextProjectLink currentHref="/case-study/discover-integration" />
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto w-full px-6 sm:px-10">

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--accent)]">
            Manager, Experience Design · Capital One
          </p>
          <h1
            className="font-light max-w-[1100px]"
            style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}
          >
            Discover banking customers needed to become Capital One customers without feeling disrupted. I designed onboarding flows that turned a complex migration strategy into a clear, familiar customer experience<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <IntroMetadataSection
            role="Design & Strategy Lead"
            timeline="Jan 2026 – Present"
            platform="Native (iOS, Android), Web, Mobile Web"
            results={[
              { value: "↑ 89%", label: "customer volume retained" },
              { value: "↓ 35%", label: "calls to front-line associates" },
            ]}
          />
        </section>

        {/* ── Hero image: the welcome animation, frame by frame ── */}
        <MobileShots cols={4} shots={[
          { src: "/case-study/manager/welcome3.png", aspect: "806 / 1724", priority: true, label: "Welcome animation: starts on the Discover card the customer knows", caption: "Starts on what they know" },
          { src: "/case-study/manager/welcome4.png", aspect: "806 / 1724", priority: true, label: "Welcome animation: the Discover and Capital One cards mid-morph", caption: "The cards morph" },
          { src: "/case-study/manager/welcome1.png", aspect: "806 / 1724", priority: true, label: "Welcome animation: resolves on the Capital One card", caption: "Now Capital One" },
          { src: "/case-study/manager/welcome2.png", aspect: "806 / 1724", priority: true, label: "Welcome animation: the welcome message that lands the moment", caption: "We're happy you're here" },
        ]} />

        {/* ── The problem ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The problem</SectionLabel>
              <SectionHeading>Converting people who spend into people who bank</SectionHeading>
            </div>
            <div className="flex flex-col gap-8">
              <Prose>
                <p>
                  We focused on &ldquo;spenders&rdquo;: customers who primarily used a Discover debit card, sometimes alongside multiple debit or credit cards. Beneath that simple behavior were complex migration paths. Most customers had one checking and one savings account; others held Discover money market accounts, a product Capital One did not offer. The challenge was creating one clear transition that handled each variation without disrupting familiar habits—or losing customers whose accounts had no direct equivalent.
                </p>
              </Prose>
            </div>
          </div>
        </section>

        {/* ── The insight ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The insight</SectionLabel>
              <SectionHeading>We treated every customer as a &ldquo;spender&rdquo;</SectionHeading>
            </div>
            <Prose>
              <p>
                Instead of segmenting by product or demographics, we framed every incoming customer through one behavioral lens: they&apos;re <strong>spenders</strong>. That&apos;s the relationship they already understood, and the one we had to build from. The lens was earned, not assumed: we triangulated behavioral transaction data (how Discover customers actually used their cards) with customer research before we built on it.
              </p>
              <p>
                It sounds small, but the framing did real work. It gave a cross-functional team one shared mental model of who we were designing for, and it set the job-to-be-done: meet people where they are, spending, and create a clear, low-friction path toward the rest of what a bank can do for them.
              </p>
            </Prose>
          </div>
          <PullQuote>
            &ldquo;They&apos;re not new customers. They&apos;re spenders we already have, and the design job is to show them what else is here.&rdquo;
          </PullQuote>
          <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2">
            <Screenshot
              src="/case-study/manager/plan1.JPG"
              aspect="3 / 4"
              label="Planning the spender experience, artifact one"
            />
            <Screenshot
              src="/case-study/manager/plan2.JPG"
              aspect="4 / 3"
              label="Planning the spender experience, artifact two"
            />
            <div className="sm:col-span-2">
              <Screenshot
                src="/case-study/manager/plan3.JPG"
                aspect="4 / 3"
                label="Planning the spender experience, artifact three"
              />
            </div>
          </div>
        </section>

        {/* ── Experience layer 1 ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The experience · 01</SectionLabel>
              <SectionHeading>The First Time Experience</SectionHeading>
            </div>
            <Prose>
              <p>
                The first thing a Discover customer sees is the First Time Experience: a welcome animation, followed by a single screen that lays out everything changing for them, <em>at a glance</em>. It orients before it asks for anything: <em>you&apos;re in the right place, here&apos;s what just happened, here&apos;s what&apos;s yours.</em>
              </p>
              <p>
                The animation does the emotional work, marking the moment as a welcome rather than a disruption. The glance screen does the cognitive work, answering &ldquo;what changed?&rdquo; in one place. To preserve that continuity into the landing page, we reused familiar language and a wrench icon in the mudflap, clearly signaling which accounts still needed setup to keep customers&apos; existing routines intact.
              </p>
            </Prose>
          </div>
          <MobileShots shots={[
            { src: "/case-study/manager/welcome4.png", aspect: "806 / 1724", label: "FTX: the welcome animation, mid-transition from Discover to Capital One", caption: "The welcome animation: Discover becoming Capital One" },
            { src: "/case-study/manager/ftux.png", aspect: "403 / 862", label: "FTX: your accounts from Discover, at a glance", caption: "Everything that changed, in one screen" },
            { src: "/case-study/manager/checking-l1.png", aspect: "403 / 955", label: "FTX: hand-off into the home screen, with what still needs setup flagged", caption: "Into the app: with what's left to set up flagged" },
          ]} />
        </section>

        {/* ── Experience layer 2 ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The experience · 02</SectionLabel>
              <SectionHeading>L2: setup and wayfinding</SectionHeading>
            </div>
            <Prose>
              <p>
                The second layer (L2) is where intent turns into action: a checklist of the things that actually make Capital One someone&apos;s primary bank: <strong>setting up direct deposit, moving autopay and recurring payments, and activating the new card</strong>. Each completed step is both a setup task and a small proof that the switch was worth making.
              </p>
              <p>
                These aren&apos;t arbitrary tasks. Direct deposit and recurring payments are the stickiest behaviors a bank can earn, so we sequenced the checklist around the actions with the greatest retention payoff. &ldquo;What&apos;s different about my account?&rdquo; gave customers the account-level details that were too specific for FTUX, while the recurring wrench icon acted as wayfinding—showing exactly where setup was still required.
              </p>
              <p>
                Across FTUX and L2, consistent icons and supporting text answered the customer&apos;s running questions: &ldquo;what changed, where am I, and what do I do next?&rdquo; That clarity was also a call-deflection strategy—every screen that explained itself prevented an avoidable call to a front-line associate.
              </p>
            </Prose>
          </div>
          <MobileShots shots={[
            { src: "/case-study/manager/mma-checklist-default.png", aspect: "403 / 1217", label: "L2: the setup checklist for a converted savings account", caption: "The checklist: what it takes to make us your primary bank" },
            { src: "/case-study/manager/l2-account-summary.png", aspect: "403 / 862", label: "L2: what's different and what's the same about this account", caption: "Each step explains what changed, and what didn't" },
            { src: "/case-study/manager/checklist-debit.png", aspect: "403 / 1474", label: "L2: finish setting up, with the new card delivery tracker and activation", caption: "Momentum + payoff: card tracker and activation" },
          ]} />
        </section>

        {/* ── The hard part ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>The hard part</SectionLabel>
              <SectionHeading>Designing inside the lines, and selling the why</SectionHeading>
            </div>
            <Prose>
              <p>
                The biggest constraint wasn&apos;t the brief, it was the canvas. This lives inside the full Capital One app, which doesn&apos;t allow for many custom components, so the wayfinding system had to be built almost entirely from the existing toolkit, restructured and recomposed to do a new job. The creativity was in working <em>within</em> the system, not around it.
              </p>
              <p>
                Layered on top: compliance requirements shaped the language, a hard brand-migration cutover meant narrow windows, and there&apos;s no second chance: you can&apos;t re-onboard someone, so the first impression had to land the first time.
              </p>
              <p>
                The work that mattered most wasn&apos;t pixels, it was making the case to senior leadership that this layer of clarity deserved to be prioritized, and translating &ldquo;help people understand what changed&rdquo; into the terms leadership measures: retained volume, and fewer calls to front-line associates.
              </p>
            </Prose>
          </div>
        </section>

        {/* ── Outcome ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <SectionLabel>Outcome</SectionLabel>
              <SectionHeading>Measured on retention</SectionHeading>
            </div>
            <Prose>
              <p>
                Success will be measured on two things: the <strong>customer volume retained</strong> through the switch and <strong>how few calls</strong> the change drives to front-line associates. The experience is scheduled to launch and enter testing in late 2026, so results are still to come. I&apos;ll update this case study as retention and call-volume data become available.
              </p>
            </Prose>
          </div>
        </section>

        <NextProjectCard currentHref="/case-study/discover-integration" />

        {/* ── Footer ── */}
        <footer className="py-10 flex flex-wrap items-center justify-between gap-2">
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
