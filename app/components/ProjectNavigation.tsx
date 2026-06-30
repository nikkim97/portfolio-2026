import Link from "next/link";
import { journeyNodes, type JourneyNode } from "./journeyData";

type ProjectNode = JourneyNode & { href: string; title: string };

const projects = journeyNodes.filter(
  (node): node is ProjectNode => Boolean(node.href && node.title),
);

function getNextProject(currentHref: string) {
  const currentIndex = projects.findIndex((project) => project.href === currentHref);
  if (currentIndex === -1) return null;
  return projects[(currentIndex + 1) % projects.length];
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
  if (!nextProject) return null;

  return (
    <section className="border-t border-[var(--border)] py-10">
      <Link
        href={nextProject.href}
        className="group flex flex-col gap-4 rounded-2xl px-6 py-7 transition-colors duration-200 sm:px-8 sm:py-9"
        style={{ background: "var(--card)" }}
      >
        <p className="text-[10px] font-normal uppercase tracking-[0.22em] text-[var(--accent-text)]">
          Next project
        </p>
        <div className="flex items-end justify-between gap-6">
          <div className="flex max-w-[70ch] flex-col gap-2">
            <h2
              className="font-light"
              style={{ fontSize: "clamp(24px, 4vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
            >
              {nextProject.title}
            </h2>
            <p className="text-sm font-light leading-relaxed text-[var(--midtone)] sm:text-base">
              {nextProject.brief}
            </p>
          </div>
          <span
            aria-hidden
            className="shrink-0 text-3xl font-light text-[var(--accent-text)] transition-transform duration-200 group-hover:translate-x-1 sm:text-4xl"
          >
            →
          </span>
        </div>
      </Link>
    </section>
  );
}
