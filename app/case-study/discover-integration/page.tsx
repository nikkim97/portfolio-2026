import CaseStudyShell from "../../components/CaseStudyShell";
import {
  ArticleHero,
  ArticleMeta,
  Prose,
  PullQuote,
  Screenshot,
  SectionHeader,
} from "../../components/caseStudyUI";
import { caseStudyMetadata } from "../../lib/siteMetadata";

export const metadata = caseStudyMetadata({
  title: "Discover Integration Experience",
  description:
    "Onboarding flows that helped Discover banking customers become Capital One customers, turning a complex migration into a clear, familiar experience.",
  slug: "discover-integration",
});

function MobileShots({
  shots,
  cols = 3,
  preserveGrid = false,
}: {
  shots: { src?: string; label: string; caption?: string; aspect?: string; priority?: boolean }[];
  cols?: 3 | 4;
  preserveGrid?: boolean;
}) {
  const colClass = cols === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3";
  return (
    <div className={`col-wide grid ${preserveGrid ? colClass : "grid-cols-1"} gap-4 sm:gap-5 items-start`}>
      {shots.map((shot) => (
        <Screenshot
          key={shot.label}
          src={shot.src}
          aspect={shot.aspect ?? "390 / 844"}
          priority={shot.priority}
          label={shot.label}
          caption={shot.caption}
        />
      ))}
    </div>
  );
}

export default function DiscoverIntegrationCaseStudy() {
  return (
    <CaseStudyShell context="Capital One · Jan 2026 – Present" currentHref="/case-study/discover-integration">
      <ArticleHero
        eyebrow="Manager, Experience Design · Capital One"
        title={
          <>
            Discover banking customers needed to move to Capital One without feeling disrupted. I designed
            onboarding flows that simplified an overly complex migration strategy
            <span style={{ color: "var(--accent)" }}>.</span>
          </>
        }
        meta={
          <ArticleMeta
            role="Design & Strategy Lead"
            timeline="Capital One · Jan 2026 – Present"
            platform="Native (iOS, Android), Web, Mobile Web"
            resultsLabel="Targets"
            results={[
              { value: "↑ 89%", label: "customer volume retained" },
              { value: "99%", label: "escalations contained to digital" },
            ]}
          />
        }
      />

      <MobileShots
        cols={4}
        preserveGrid
        shots={[
          { src: "/case-study/manager/welcome3.webp", aspect: "806 / 1724", priority: true, label: "Welcome animation: starts on the Discover card the customer knows", caption: "Starts on what they know" },
          { src: "/case-study/manager/welcome4.webp", aspect: "806 / 1724", priority: true, label: "Welcome animation: the Discover and Capital One cards mid-morph", caption: "The cards morph" },
          { src: "/case-study/manager/welcome1.webp", aspect: "806 / 1724", priority: true, label: "Welcome animation: resolves on the Capital One card", caption: "Now Capital One" },
          { src: "/case-study/manager/welcome2.webp", aspect: "806 / 1724", priority: true, label: "Welcome animation: the welcome message that lands the moment", caption: "We're happy you're here" },
        ]}
      />

      <SectionHeader index="01" label="The insight" heading="We treated every customer as a “spender”" />
      <Prose>
        <p>
          After reviewing our customer segments by product type and demographics, we framed every incoming
          customer through two behavioral lenses: <strong>savers</strong> and <strong>spenders</strong>. Since
          that was the relationship they already understood, and the one they would be bringing to Capital One,
          it was the one we had to build from. For the first wave of customers, we focused on spenders and
          triangulated behavioral transaction data (how Discover customers actually used their cards) with
          customer research before we built on it.
        </p>
        <p>
          It sounds small, but the framing did real work. It gave a cross-functional team one shared mental model
          of who we were designing for, and it set the job-to-be-done: meet people where they are, spending, and
          create a clear, low-friction path toward the rest of what a bank can do for them.
        </p>
      </Prose>
      <PullQuote>
        &ldquo;They&apos;re not new customers. They&apos;re spenders we already have, and the design job is to show them
        what else is here.&rdquo;
      </PullQuote>
      <div className="col-wide grid grid-cols-1 items-start gap-5">
        <Screenshot
          src="/case-study/manager/plan2.JPG"
          aspect="4 / 3"
          label="Planning the spender experience, artifact one"
          caption="Planning artifact: mapping migration moments around the spender mental model."
        />
        <Screenshot
          src="/case-study/manager/plan3.JPG"
          aspect="1599 / 872"
          label="Planning the spender experience, artifact two"
          caption="Planning artifact: narrowing the first experience around clarity, continuity, and setup."
        />
      </div>

      <SectionHeader index="02" label="The first experience" heading="The First Time Experience" />
      <Prose>
        <p>
          The Capital One app already had established L1 and L2 experiences through EASE, and we couldn&apos;t
          alter those surfaces much. So we focused on the First Time Experience: the first thing a Discover
          customer would see, a welcome animation followed by a single screen that lays out everything changing
          for them, <em>at a glance</em>. It orients before it asks for anything: <em>you&apos;re in the right place,
          here&apos;s what just happened, here&apos;s what&apos;s yours.</em>
        </p>
        <p>
          The animation does the emotional work, marking the moment as a welcome rather than a disruption. The
          glance screen does the cognitive work, answering &ldquo;what changed?&rdquo; in one place. To preserve that
          continuity into the landing page, we reused familiar language and a wrench icon in the mudflap, clearly
          signaling which accounts still needed setup to keep customers&apos; existing routines intact.
        </p>
      </Prose>
      <MobileShots
        shots={[
          { src: "/case-study/manager/welcome4.webp", aspect: "806 / 1724", label: "FTX: the welcome animation, mid-transition from Discover to Capital One", caption: "The welcome animation: Discover becoming Capital One" },
          { src: "/case-study/manager/ftux.webp", aspect: "403 / 862", label: "FTX: your accounts from Discover, at a glance", caption: "Everything that changed, in one screen" },
          { src: "/case-study/manager/checking-l1.webp", aspect: "403 / 955", label: "FTX: hand-off into the home screen, with what still needs setup flagged", caption: "Into the app: with what's left to set up flagged" },
        ]}
      />

      <SectionHeader index="03" label="The setup" heading="L2: setup and wayfinding" />
      <Prose>
        <p>
          The second layer (L2) is where intent turns into action: a checklist of the things that actually make
          Capital One someone&apos;s primary bank: <strong>setting up direct deposit, moving autopay and recurring
          payments, and activating the new card</strong>. Each completed step is both a setup task and a small
          proof that the switch was worth making.
        </p>
        <p>
          These aren&apos;t arbitrary tasks. Direct deposit and recurring payments are the stickiest behaviors a
          bank can earn, so we sequenced the checklist around the actions with the greatest retention payoff.
          &ldquo;What&apos;s different about my account?&rdquo; gave customers the account-level details that were too
          specific for FTUX, while the recurring wrench icon acted as wayfinding, showing exactly where setup was
          still required.
        </p>
        <p>
          The wrench icon and supporting content took most of our deliberate design decisioning. That pairing was
          what convinced senior stakeholders that customers would have enough confidence to understand what
          needed fixing, complete the right setup steps, and move through the transition smoothly. It also became
          a call-deflection strategy: every screen that explained itself prevented an avoidable call to a
          front-line associate.
        </p>
      </Prose>
      <MobileShots
        shots={[
          { src: "/case-study/manager/checklist-debit.webp", aspect: "403 / 1474", label: "L2: finish setting up, with the new card delivery tracker and activation", caption: "Momentum + payoff: card tracker and activation" },
          { src: "/case-study/manager/l2-account-summary.webp", aspect: "403 / 862", label: "L2: what's different and what's the same about this account", caption: "Each step explains what changed, and what didn't" },
          { src: "/case-study/manager/mma-checklist-default.webp", aspect: "403 / 1217", label: "L2: the setup checklist for a converted savings account", caption: "The checklist: what it takes to make us your primary bank" },
        ]}
      />

      <SectionHeader index="04" label="The constraints" heading="Designing inside the lines, and selling the why" />
      <Prose>
        <p>
          The biggest constraint wasn&apos;t the brief, it was the canvas. This lives inside the full Capital One
          app, which doesn&apos;t allow for many custom components, so the <strong>wayfinding</strong> system had
          to be built almost entirely from the existing toolkit, restructured and recomposed to do a new job. The
          creativity was in working <em>within</em>{" "}the system, not around it.
        </p>
        <p>
          Layered on top: compliance requirements shaped the language, a hard brand-migration cutover meant
          narrow windows, and there&apos;s no second chance: you can&apos;t re-onboard someone, so the first impression
          had to land the first time.
        </p>
        <p>
          And the hardest constraint wasn&apos;t on the screen at all: getting a layer of pure clarity prioritized
          meant making the case for it to senior leadership.
        </p>
      </Prose>

      <SectionHeader index="05" label="The outcome" heading="Measured on retention" />
      <Prose>
        <p>
          Success will be measured on two things: the <strong>customer volume retained</strong>{" "}through the
          switch and <strong>how few calls</strong>{" "}the change drives to front-line associates. The
          experience is scheduled to launch and enter testing in late 2026, so results are still to come.
          I&apos;ll update this case study as retention and call-volume data become available.
        </p>
      </Prose>
    </CaseStudyShell>
  );
}
