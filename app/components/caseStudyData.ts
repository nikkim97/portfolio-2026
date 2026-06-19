const v = (name: string) => `/vpr/${name}.png`;

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  company: string;
  platform: string;
  intro: string;
  mainImage: { src: string; alt: string };
  problem: { title: string; body: string; image?: { src: string; alt: string } };
  process: Array<{ title: string; body: string; images: { src: string; alt: string }[] }>;
  outcome: { title: string; body: string; images: { src: string; alt: string }[] };
  outcomeStats?: { value: string; label: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "sa-xd",
    title: "Defining the PM Roadmap: From Offline Pilots to Platform MVP",
    role: "Design & Research Lead, PM Pilots",
    timeline: "Oct 2023 – Jun 2024",
    company: "Capital One",
    platform: "Web platform",
    intro: `The performance management system at Capital One was broken in a specific way: leaders and associates both had low trust in 360 feedback results. Not because the intention was wrong, but because the experience was. Templates were too generic, feedback was too positive to be useful, and the whole thing was disconnected from how performance was actually evaluated. Before we built anything, we needed to understand why.`,
    mainImage: { src: v("sa-xd-hero"), alt: "Performance Management Pilots" },
    problem: {
      title: "Low trust in a system that was supposed to help people grow",
      body: `<p>360 feedback was poorly connected to the broader performance flow. Feedback templates varied wildly across teams. Responses skewed positive, not because everyone was performing exceptionally, but because the system gave people no reason to be specific or honest.</p>
<p>People leaders lacked confidence in the feedback they received. Associates didn't know how it would be used. The result was a process that consumed time and produced noise.</p>
<p>My job was to improve the quality and actionability of 360 feedback during the performance cycle, and to provide validated, evidence-based insights that could de-risk and define the foundation for a product roadmap.</p>`,
      image: { src: v("sa-xd-problem"), alt: "Experience map showing where 360 feedback broke down" },
    },
    process: [
      {
        title: "Discovering where the system was actually breaking down",
        body: `<p>We started by mapping the full experience, from how feedback was requested, through calibration sessions, all the way to performance review conversations. That map made the gaps visible in a way that was hard to argue with.</p>
<p>The core insight: the 360 feedback experience wasn't designed around how people leaders actually used feedback. It was designed around collection. So the data came in, but it didn't land anywhere useful.</p>
<ul>
  <li>Templates were too varied and too generic to produce comparable data</li>
  <li>Feedback skewed overwhelmingly positive, making it hard to act on</li>
  <li>There was no connection between what associates received and what managers discussed in calibrations</li>
</ul>
<p>This framed our design question: <em>How do we design a 360-degree feedback experience that ensures high-quality, actionable insights for people leaders to use during performance assessments?</em></p>`,
        images: [
          { src: v("sa-xd-context"), alt: "Business context and current 360 feedback experience" },
          { src: v("sa-xd-principles"), alt: "Three foundation principles: quant & qual, psychological safety, comparative context" },
        ],
      },
      {
        title: "Building on three foundation principles",
        body: `<p>Rather than jump to solutions, we used research to define the principles the system had to be built on. These shaped every design decision that followed.</p>
<ul>
  <li><strong>Quant & qual data together.</strong> Standardized, competency-based ratings paired with required qualitative comments. Ratings without context were too easy to dismiss. Context without structure was too hard to compare.</li>
  <li><strong>Psychological safety through anonymity.</strong> Complete anonymity consistently produced more candid, constructive responses. Without it, people optimized for relationships, not honesty.</li>
  <li><strong>Comparative context to reduce bias.</strong> A comparative scale, "compared to peers", reduced subjective ratings and gave calibration conversations something concrete to anchor to.</li>
</ul>
<p>We partnered with PwC to build the feedback system on these foundations, grounding every question in Capital One's competency framework and making the entire process anonymous by design.</p>`,
        images: [
          { src: v("sa-xd-design-1"), alt: "Key experience decisions: feedback form built with PwC" },
          { src: v("sa-xd-design-2"), alt: "Calibration template with peer comparison and written feedback" },
        ],
      },
      {
        title: "Connecting feedback to the calibration template",
        body: `<p>The key design decision was making 360 feedback a first-class input in calibration, not an afterthought attached at the end. We redesigned the calibration one-pager to surface feedback directly alongside performance data, with a peer comparison graph that showed ratings relative to the cohort.</p>
<p>Written feedback was structured to surface strengths and development opportunities side by side, giving managers something they could actually reference mid-conversation instead of hunting through a separate document.</p>
<p>We measured impact by triangulating three data sources: raw system data, live calibration observations, and milestone surveys, tracking clarity, consistency, quality, and actionability throughout the pilot.</p>`,
        images: [
          { src: v("sa-xd-measure"), alt: "Measuring what mattered: data triangulation in Lucid" },
          { src: v("sa-xd-impact"), alt: "Impact results: 65% clarity, 58% quality, 52% actionability" },
        ],
      },
    ],
    outcome: {
      title: "The pilot made the case",
      body: `<p>The results were strong enough to convince our partners to use 360-feedback as the foundation for the new enterprise performance platform, PATH.</p>
<ul>
  <li><strong>65%</strong> improvement in clarity & consistency of feedback received</li>
  <li><strong>58%</strong> improvement in feedback quality: anonymity made a measurable difference</li>
  <li><strong>52%</strong> improvement in actionability: feedback was more actively used during live calibrations</li>
  <li><strong>58%</strong> of pilot associates reported having clarity on their development opportunities</li>
  <li>Feedback was <strong>73% more leveraged</strong> in the overall performance management process</li>
</ul>
<p>What I learned: this was my first major lead effort, and it shaped how I think about product and strategy design. Cross-functional alignment, pulled in early, creates shared ownership that carries a project through. And measurement isn't a post-launch activity. It's how you earn the next phase.</p>`,
      images: [
        { src: v("sa-xd-outcome-1"), alt: "Impact: 58% of associates had clarity on development, 73% more feedback leverage" },
        { src: v("sa-xd-impact"), alt: "65% clarity & consistency, 58% quality, 52% actionability" },
        { src: v("sa-xd-design-2"), alt: "Final calibration template design" },
        { src: v("sa-xd-outcome-2"), alt: "Growth as a designer: strategic foundations, cross-functional leadership, evidence-driven design" },
      ],
    },
    outcomeStats: [
      { value: "↑ 65%", label: "improvement in clarity & consistency of feedback received" },
      { value: "↑ 58%", label: "improvement in feedback quality" },
      { value: "↑ 52%", label: "improvement in actionability during live calibrations" },
    ],
  },

  {
    slug: "path-360",
    title: "PATH: Calibrations Ecosystem",
    role: "Design Lead, PATH",
    timeline: "Feb – Aug 2025",
    company: "Capital One",
    platform: "Enterprise web · PATH performance platform",
    intro: `Calibrations is one of the most painful, inconsistent parts of performance management. Every org had their own tools, structures, and norms, which meant wide variability in how ratings were discussed, and how much people trusted the outcomes. I led design for PATH's calibrations ecosystem: a platform that needed to serve three distinct personas across the full calibration lifecycle, and scale to 20,000+ leaders.`,
    mainImage: { src: v("path-hero"), alt: "PATH Calibrations Ecosystem: distribution view" },
    problem: {
      title: "A process that was inconsistent by design",
      body: `<p>There was no standard. Each org ran calibrations their own way: different tools, different norms, different structures. The result was wide variability in how ratings were discussed, and low confidence in what came out the other side.</p>
<p>Our success metrics were specific: <strong>70% of people leaders satisfied with the overall PM experience</strong>, and <strong>>70% of PLs confident in the final ratings of their peers' direct reports</strong>.</p>
<p>The design question we kept coming back to: <em>How can we design a live calibration experience that is facilitator-driven, delivers a faster, clearer process, and fosters trust and organizational confidence at scale?</em></p>`,
      image: { src: v("path-title"), alt: "PATH: Calibrations Ecosystem" },
    },
    process: [
      {
        title: "Mapping three personas, one system",
        body: `<p>Calibrations don't have one user: they have three with very different jobs to do, and the system had to serve all of them without creating friction between them.</p>
<ul>
  <li><strong>People Leaders</strong> needed a single, consistent place to access calibration profiles and prepare, without hunting across tools.</li>
  <li><strong>PM Champs & HRBPs</strong> needed flexible tools to edit, regroup, and manage session details as org nuances required, with enough control to handle the variability that actually exists.</li>
  <li><strong>Facilitators</strong> needed to see performance ratings and manage distribution outcomes in real time, with clear, predictable permissions that didn't require guesswork mid-session.</li>
</ul>
<p>We scoped the work across three phases: prep for calibration, live calibration, and post-calibration. The 2025 scope focused on the first two: getting the prep and live experience right before extending further.</p>`,
        images: [
          { src: v("path-personas"), alt: "Three personas: People Leaders, PM Champs/HRBPs, Facilitators" },
          { src: v("path-jtbd"), alt: "Jobs to be done across prep, live calibration, and post-calibration" },
        ],
      },
      {
        title: "Cross-functional discovery, then fast iteration",
        body: `<p>We ran cross-functional brainstorm sessions with engineering, product, operations, and communications, whiteboarding the system end to end before touching design tools. This wasn't just process; it was how we built alignment on a problem that had stakeholder fingerprints all over it.</p>
<p>For session management, PM Champs needed auto-grouping by job family and level, editing and regrouping capabilities, and the ability to schedule sessions with the right people. We prototyped and tested quickly, running sessions against live performance cycles wherever possible.</p>
<p>For live calibrations, the design had to hold up under real pressure: a room of leaders, a facilitator running the session, and decisions being made in real time. One consolidated view, standardized structure, separate permissions for each persona.</p>`,
        images: [
          { src: v("path-brainstorm"), alt: "Cross-functional whiteboard sessions" },
          { src: v("path-sessions"), alt: "Managing sessions: auto-grouping, editing, scheduling for PM Champs" },
        ],
      },
      {
        title: "Designing the live calibration experience",
        body: `<p>The live calibration view was the hardest design problem: it had to work for both facilitators running the session and people leaders participating in it, with different data visible to each, in the same room, at the same time.</p>
<p>We designed around three principles: one consolidated place for all live calibration data, a standardized structure that held across all sessions regardless of org, and separate, predictable permissions that each persona could rely on without asking.</p>
<p>We validated against real calibration sessions, observing how facilitators actually ran the room and where the current tools created friction or confusion.</p>`,
        images: [
          { src: v("path-live"), alt: "Live calibration view: consolidated data, standardized structure" },
          { src: v("path-design"), alt: "Live calibration design files: facilitator and people leader views" },
        ],
      },
    ],
    outcome: {
      title: "Early signal, and 20,000+ leaders next",
      body: `<p>Early feedback from facilitators and people leaders was immediate and specific, the kind that tells you something real landed.</p>
<blockquote>"Having everything in one place and how easy to use in session." "Setting up the sessions was so quick, easy and efficient." "Such a great experience for me as the facilitator and the attending PLs."</blockquote>
<p><strong>20,000+ people leaders</strong> will have access to calibrations in PATH in MY '26.</p>
<p>What this project taught me: orchestrating a system this complex required learning where delegation was actually the right tool, and where I needed to stay close. Stakeholder sequencing, deciding what to align on and when, became as important as the design itself. This work set me up to own PATH as a platform, not just a feature.</p>`,
      images: [
        { src: v("path-feedback"), alt: "Early feedback: facilitators raving about having everything in one place" },
        { src: v("path-scale"), alt: "20,000+ leaders will have access to calibrations in PATH MY '26" },
        { src: v("path-live"), alt: "Live calibration experience" },
        { src: v("path-growth"), alt: "Growth as a leader: orchestrating work, intentional alignment, stakeholder management" },
      ],
    },
    outcomeStats: [
      { value: "↑ 70%", label: "PLs satisfied with the PM experience" },
      { value: "↑ >70%", label: "PLs confident in final ratings" },
    ],
  },
];
