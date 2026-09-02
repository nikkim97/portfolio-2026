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
    <CaseStudyShell context="Capital One · Nov 2025 – Feb 2026" currentHref="/case-study/people-leader-redesign">
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
            timeline="Capital One · Nov 2025 – Feb 2026"
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
          To build calibration materials, a people leader had to work across the whole system. A{" "}
          <strong>table-based &ldquo;My Team&rdquo; list</strong>{" "}was just the index: from it, they clicked
          into a feedback flow to review each associate&apos;s responses, looked through results on separate screens,
          then moved through a long profile-building flow to assemble the materials needed for one calibration
          conversation.
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
          Now, when a leader opens the <strong>My Team</strong>{" "}page, they see every stat they need for
          calibration at a glance. From there, a single associate view lets the leader review feedback, results,
          strengths, and calibration notes in one place instead of jumping between screens.
        </p>
        <p>
          The biggest interaction decision was replacing the old step-by-step profile flow with a workspace: the
          evidence stayed visible on the left, while the calibration profile opened beside it on the right. It
          made the screen denser, but it solved the real problem: leaders needed to interpret performance data
          and write their point of view at the same time.
        </p>
      </Prose>
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/360-view.webp"
        alt="The 360 associate view: dynamic tabs for feedback, results, strengths, and the calibration profile, with a sliding drawer for the full profile"
        aspect="1440/2795"
        caption="The 360 associate view: dynamic tabs and a sliding calibration drawer keep the leader in flow"
      />

      <SectionHeader index="04" label="The UI deep dive" heading="A one-screen workspace for evidence and judgment" />
      <Prose>
        <p>
          We had to make a tradeoff: a 50/50 layout meant less room for each side, but it kept the leader in the
          evaluation context. The outer tabs kept results, competency feedback, insights, calibration profile,
          and performance review sticky as the page scrolled. Inside the profile, a second set of sticky tabs let
          leaders move through the sections they needed to complete without losing their place.
        </p>
        <p>
          The drawer also carried state. A profile checklist showed where the leader was in the process of
          gathering and interpreting evidence, and the ready-for-calibration toggle stayed unavailable until the
          required inputs were complete. Once the profile was marked ready, the form locked; turning the toggle
          off unlocked it for edits.
        </p>
      </Prose>
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/workspace-50-50-locked.png"
        alt="People Leader Redesign: 50/50 workspace with performance evidence on the left and locked calibration profile drawer on the right"
        aspect="1440/4607"
        caption="The shipped workspace: performance evidence stays visible while the calibration profile opens beside it. Sticky tabs keep both surfaces navigable during a dense review session."
      />
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/profile-expanded-mode.png"
        alt="People Leader Redesign: expanded calibration profile mode with profile status checklist and strengths and development sections"
        aspect="1440/2404"
        caption="Expanded mode: when the profile needed more room, leaders could move from split-screen review into a full-screen drawer without changing the underlying task model."
      />

      <SectionHeader index="05" label="The information architecture" heading="Tabs kept leaders in context; filters made messy feedback scannable" />
      <Prose>
        <p>
          Earlier versions relied on hyperlinks, but every link pulled the leader out of the associate view. I
          helped move the core subsections into tabs so leaders could switch between results, feedback, insights,
          and profile-writing without losing the person they were evaluating.
        </p>
        <p>
          Results were standardized into a consistent hierarchy: title, description, then impact. Feedback was
          organized by competency instead of splitting strengths from opportunities, because competency was the
          common ground across every feedback source. Within each competency, filters let leaders narrow by
          feedback type, relationship type, and provider, while expandable sections handled long comments and
          empty rows stayed visible as &ldquo;No feedback available.&rdquo;
        </p>
      </Prose>
      <ProjectFigure
        variant="wide"
        src="/case-study/pl-redesign/competency-feedback-tab.png"
        alt="People Leader Redesign: competency feedback tab with filters, expandable competency sections, feedback cards, counts, and empty rows"
        aspect="1440/3248"
        caption="Competency feedback: filters let leaders narrow by feedback type, relationship, and provider, while expandable competency rows kept long feedback, summary counts, and empty states scannable."
      />

      <SectionHeader index="06" label="Outcome" heading="From 10 screens to two" />
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

      <SectionHeader index="07" label="The reflection" heading="Speed works when the problem is shared" />
      <Prose>
        <p>
          The biggest learning was that speed did not come from skipping discovery; it came from compressing the
          distance between research, product decisions, and design execution. The redesign reduced prep from{" "}
          <strong>10 screens to 2</strong>, created a <strong>76% efficiency gain</strong>{" "}for people leaders,
          and became a reusable sprint model for related PATH workflows.
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
