import { notFound } from "next/navigation";
import Link from "next/link";
import { journeyNodes } from "../../components/journeyData";

export function generateStaticParams() {
  return journeyNodes
    .filter((n) => n.href)
    .map((n) => ({ slug: n.id }));
}

const FONT = { fontFamily: "var(--font-poppins), sans-serif" };

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = journeyNodes.find((n) => n.id === slug && n.href);
  if (!node) notFound();

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}
    >
      {/* Top bar */}
      <div className="w-full border-b border-[var(--border)] px-8 sm:px-16 h-12 flex items-center justify-between max-w-5xl mx-auto w-full">
        <Link
          href="/"
          className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200"
        >
          ← Back
        </Link>
        <span className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)]">
          {node.pill}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-8 sm:px-16 py-24 gap-8">

        <div className="flex flex-col gap-2">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--midtone)]">
            {node.period}{node.role ? ` · ${node.role}` : ""}
          </p>
          <h1
            className="font-semibold"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em", lineHeight: 0.92 }}
          >
            {node.title ?? node.id}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </div>

        <p
          className="font-light leading-relaxed max-w-lg"
          style={{ fontSize: "clamp(14px, 1.4vw, 18px)", color: "var(--midtone)" }}
        >
          {node.brief}
        </p>

        {/* Coming soon block */}
        <div
          className="flex flex-col gap-3 mt-4"
          style={{
            borderLeft: "2px solid var(--accent)",
            paddingLeft: 20,
          }}
        >
          <p
            className="font-semibold"
            style={{ fontSize: 13, letterSpacing: "-0.01em" }}
          >
            Case study in progress
          </p>
          <p
            className="font-light leading-relaxed"
            style={{ fontSize: 13, color: "var(--midtone)" }}
          >
            The full write-up is on its way — check back soon.
          </p>
        </div>

        <Link
          href="/"
          className="text-[11px] font-normal tracking-[0.2em] uppercase mt-4 self-start border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] hover:text-[var(--foreground)] text-[var(--midtone)] transition-colors duration-200"
        >
          Back to portfolio
        </Link>
      </div>

      <footer
        className="max-w-5xl mx-auto w-full px-8 sm:px-16 py-8 border-t border-[var(--border)]"
      >
        <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
          © 2026 Niharika Mishra
        </p>
      </footer>
    </main>
  );
}
