import Link from "next/link";
import { journeyNodes, type JourneyNode } from "./journeyData";

type ProjectNode = JourneyNode & { href: string; title: string };

const projects = journeyNodes.filter(
  (node): node is ProjectNode => Boolean(node.href && node.title),
);

const bridgeCopyByHref: Record<string, string> = {
  "/case-study/visn": "That early hardware work taught me to design through uncertainty. The next chapter moved into enterprise systems, where trust had to scale.",
  "/case-study/sa-xd": "That pilot proved better feedback could change the conversation. PATH asked the bigger question: how do you scale that trust across the enterprise?",
  "/case-study/path-360": "Once the platform existed, the next challenge was flow: helping leaders prepare for high-stakes conversations without stitching context together themselves.",
  "/case-study/people-leader-redesign": "After designing for internal decision-making, Discover shifted the stakes outward: a customer-facing migration where clarity had to earn trust immediately.",
  "/case-study/discover-integration": "Those enterprise constraints made me hungry to build faster, smaller, and closer to the idea itself.",
  "/case-study/bloom": "Bloom proved I could move from a personal insight to a working product quickly. Time Tracker pushed that same speed into a more structured tool.",
  "/case-study/time-tracker": "That builder energy loops back to where I started: designing systems that make invisible needs easier to navigate.",
};

function getNextProject(currentHref: string) {
  const currentIndex = projects.findIndex((project) => project.href === currentHref);
  if (currentIndex === -1) return null;
  return projects[(currentIndex + 1) % projects.length];
}

function getPrevProject(currentHref: string) {
  const currentIndex = projects.findIndex((project) => project.href === currentHref);
  if (currentIndex === -1) return null;
  return projects[(currentIndex - 1 + projects.length) % projects.length];
}

export function NextProjectLink({ currentHref }: { currentHref: string }) {
  const nextProject = getNextProject(currentHref);
  if (!nextProject) return null;

  return (
    <Link
      href={nextProject.href}
      aria-label={`Next project: ${nextProject.title}`}
      className="shrink-0 text-[11px] font-normal uppercase tracking-[0.15em] text-[var(--midtone)] transition-colors duration-200 hover:text-[var(--foreground)]"
    >
      Next project <span aria-hidden>→</span>
    </Link>
  );
}

export function NextProjectCard({ currentHref }: { currentHref: string }) {
  const nextProject = getNextProject(currentHref);
  const prevProject = getPrevProject(currentHref);
  if (!nextProject && !prevProject) return null;
  const bridgeCopy = bridgeCopyByHref[currentHref];

  const cardClass =
    "group flex h-full flex-col gap-2 rounded-2xl px-6 py-7 transition-colors duration-200 sm:px-8 sm:py-9";
  const labelClass =
    "flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--accent-text)]";
  const titleStyle = { fontSize: "clamp(20px, 3vw, 32px)", letterSpacing: "-0.03em", lineHeight: 1.1 } as const;

  return (
    <section className="border-t border-[var(--border)] py-10 flex flex-col gap-6">
      {bridgeCopy ? (
        <p className="max-w-[68ch] text-sm font-light leading-relaxed text-[var(--body)] sm:text-base">
          {bridgeCopy}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Previous project */}
        {prevProject ? (
          <Link href={prevProject.href} className={cardClass} style={{ background: "var(--card)" }}>
            <p className={labelClass}>
              <span aria-hidden className="text-base transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Previous project
            </p>
            <h2 className="font-light" style={titleStyle}>{prevProject.title}</h2>
            <p className="text-sm font-light leading-relaxed text-[var(--midtone)]">{prevProject.brief}</p>
          </Link>
        ) : <div className="hidden sm:block" />}

        {/* Next project */}
        {nextProject ? (
          <Link href={nextProject.href} className={`${cardClass} sm:items-end sm:text-right`} style={{ background: "var(--card)" }}>
            <p className={labelClass}>
              Next project
              <span aria-hidden className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
            </p>
            <h2 className="font-light" style={titleStyle}>{nextProject.title}</h2>
            <p className="text-sm font-light leading-relaxed text-[var(--midtone)]">{nextProject.brief}</p>
          </Link>
        ) : <div className="hidden sm:block" />}
      </div>
    </section>
  );
}
