import CaseStudyShell from "../../components/CaseStudyShell";
import {
  ArticleHero,
  ArticleMeta,
  Figure,
  Prose,
  PullQuote,
  SectionHeader,
} from "../../components/caseStudyUI";
import { caseStudyMetadata } from "../../lib/siteMetadata";

export const metadata = caseStudyMetadata({
  title: "People Leader Redesign",
  description:
    "Collapsing a 10-screen calibration prep flow into two connected screens with every input a people leader needs.",
  slug: "people-leader-redesign",
});

function ProjectFigure(props: Parameters<typeof Figure>[0]) {
  return <Figure expandable={false} {...props} />;
}

function ExpandableProjectFigure(props: Parameters<typeof Figure>[0]) {
  return <Figure expandable {...props} />;
}

export default function PeopleLeaderRedesignCaseStudy() {
  return (
    <CaseStudyShell context="Capital One · 2025 – 2026" currentHref="/case-study/people-leader-redesign">
      <ArticleHero
        eyebrow="Manager, Experience Design · PATH"
        title={
          <>
            Preparing for a single calibration meant moving through 10 screens. I helped collapse the work into
            two connected screens with every input a leader needs<span style={{ color: "var(--accent)" }}>.</span>
          </>
        }
        meta={
          <ArticleMeta
            role="Design Lead for team of 4"
            timeline="Capital One · Nov 2025 - Feb 2026"
            platform="Enterprise web"
            results={[
              { value: "10 → 2", label: "screens collapsed into the My Team experience" },
              { value: "76%", label: "efficiency increase for PLs" },
            ]}
          />
        }
      />

      <SectionHeader index="01" label="The problem" heading="10 screens to prepare for one conversation" />
      <Prose>
        <p>
          Our design team ran a three-day, in-person discovery sprint with one goal: a high-fidelity prototype
          by day four. Two product partners kept the work anchored in real needs while another designer and I
          shaped the framework. I then led a team of four designers in translating that framework into an
          interactive prototype.
        </p>
        <p>
          To build calibration materials, a people leader had to work across the whole system. A <strong>table-based &ldquo;My Team&rdquo; list</strong> was just the index: from it, they clicked into a feedback flow to review each associate&apos;s responses, looked through results on separate screens, then moved through a distinct <strong>ten-step flow (Overview, Key results, Strengths, Opportunities, Preview)</strong> to assemble every calibration profile.
        </p>
        <p>
          All told, <strong>10 screens for a single conversation.</strong> Information was split across all of
          them, so leaders had to hold the synthesis in their heads: high cognitive load, endless clicking, and
          judgment formed from scattered context.
        </p>
      </Prose>
      <ExpandableProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/from-10-screens-to-2.webp"
        alt="Diagram: collapsing the 10-screen calibration prep flow down to two connected screens"
        aspect="2400/1111"
        caption="From 10 screens to 2: the calibration prep flow, before and after"
      />
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/old-myteam-table.webp"
        alt="The old table-based My Team: a row per associate, with feedback, results, and the calibration profile each behind a separate link"
        aspect="1440/1137"
        caption="Before: the table-based 'My Team,' a row per person, every input behind its own link"
      />
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/old-1.webp"
        alt="Legacy calibration profile workflow, screen one"
        aspect="1441/2465"
        caption="Before: calibration profile setup lived inside a long, step-by-step workflow."
      />
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/old-2.webp"
        alt="Legacy calibration profile workflow, screen two"
        aspect="1761/4000"
        caption="Before: leaders had to move through separate profile screens to assemble the full picture."
      />

      <SectionHeader index="02" label="The insight" heading="Leaders assess people, not rows in a table" />
      <Prose>
        <p>
          The sprint surfaced the core friction: the legacy design fundamentally clashed with the People Leader
          mental model. The old system relied on <strong>table-based navigation</strong>, but research showed
          that leaders don&apos;t evaluate a spreadsheet of people: they assess each associate <em>holistically</em>, one person at a time.
        </p>
        <p>
          That reframed the whole problem. If the experience mirrored how leaders actually think, pulling
          self-evaluation, peer feedback, and their own perspective into one place per person, the workflow would
          feel intuitive, and calibration would get more objective as a result.
        </p>
      </Prose>
      <PullQuote>
        Aligning the experience with a leader&apos;s mental model of holistic assessment creates an intuitive
        workflow, and enables more objective calibration sessions.
      </PullQuote>
      <ExpandableProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/tab0.webp"
        alt="Redesigned My Team view: a leader's direct reports as cards, each showing feedback received, approvals, results, and calibration profile status"
        aspect="1440/1129"
        caption="The redesigned 'My Team' page: every stat a leader needs for calibration, in one place"
      />

      <SectionHeader index="03" label="The solution" heading="Two screens, everything side by side" />
      <Prose>
        <p>
          Now, when a leader opens the <strong>My Team</strong> page, they see every stat they need for
          calibration at a glance. From there, a single associate view puts feedback, results, strengths, and the
          calibration profile <strong>side by side</strong>: dynamic tabs and sliding drawers keep the leader in flow instead of hopping across screens.
        </p>
        <p>
          The work also produced reusable UI patterns now standardized across the PATH ecosystem, plus a rigorous
          accessibility review for the enterprise release. This made their workflow much more straightforward.
        </p>
      </Prose>
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/360-view.webp"
        alt="The 360 associate view: dynamic tabs for feedback, results, strengths, and the calibration profile, with a sliding drawer for the full profile"
        aspect="1440/2795"
        caption="The 360 associate view: dynamic tabs and a sliding calibration drawer keep the leader in flow"
      />

      <SectionHeader index="04" label="Outcome" heading="From 10 screens to two" />
      <Prose>
        <p>
          The redesign brought a leader&apos;s entire calibration prep onto a few connected screens, with the
          inputs for a fair assessment side by side instead of scattered. Delivered as a high-fidelity prototype
          in 72 hours (what typically takes weeks of fragmented virtual work), its impact carried well past the
          sprint:
        </p>
        <div className="numbered-note-list" role="list">
          <div className="numbered-note" role="listitem">
            <span className="numbered-note-index" aria-hidden>1</span>
            <span>
              <strong className="font-bold text-[var(--foreground)]">Cross-functional alignment.</strong>{" "}
              The
              prototype immediately informed dependent features, including Self-Evaluations and Performance
              Reviews.
            </span>
          </div>
          <div className="numbered-note" role="listitem">
            <span className="numbered-note-index" aria-hidden>2</span>
            <span>
              <strong className="font-bold text-[var(--foreground)]">Process evolution.</strong>{" "}
              The HR team
              refined the &ldquo;My Team&rdquo; sprint methodology through subsequent sprints and retrospectives.
            </span>
          </div>
          <div className="numbered-note" role="listitem">
            <span className="numbered-note-index" aria-hidden>3</span>
            <span>
              <strong className="font-bold text-[var(--foreground)]">A reusable toolkit.</strong>{" "}
              Those learnings
              were codified into a finalized process other teams now run from.
            </span>
          </div>
        </div>
      </Prose>
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/group.webp"
        alt="The cross-functional team working together in a conference room during the in-person venture sprint, with a remote teammate on screen"
        aspect="1500/1234"
        caption="Three days, in person: discovery → framework → high-fidelity prototype"
      />

      <SectionHeader index="05" label="The reflection" heading="Speed works when the problem is shared" />
      <Prose>
        <p>
          The biggest learning was that speed did not come from skipping discovery; it came from compressing the
          distance between research, product decisions, and design execution. Having product partners, designers,
          and stakeholders in the same room made the tradeoffs visible early, so the team could make decisions
          with shared context instead of revisiting them later.
        </p>
        <p>
          It also reinforced what makes redesign work stick: not just a cleaner interface, but a better mental
          model. Once we framed the experience around how leaders actually assess people, the path from ten
          screens to two became much easier to defend.
        </p>
      </Prose>
    </CaseStudyShell>
  );
}
