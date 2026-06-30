import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { journeyNodes } from "../../components/journeyData";
import { caseStudies } from "../../components/caseStudyData";
import { FONT } from "../../components/ui";
import { IntroMetadataSection } from "../../components/caseStudyUI";
import LightboxFrame from "../../components/LightboxFrame";
import { NextProjectCard, NextProjectLink } from "../../components/ProjectNavigation";

export function generateStaticParams() {
  return journeyNodes
    .filter((n) => n.href)
    .map((n) => ({ slug: n.id }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = journeyNodes.find((n) => n.id === slug && n.href);
  if (!node) notFound();

  const cs = caseStudies.find((c) => c.slug === slug);

  // Coming-soon fallback
  if (!cs) {
    return (
      <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>
        <div className="w-full border-b border-[var(--border)] px-6 sm:px-16 h-12 flex items-center justify-between max-w-5xl mx-auto">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">← Back</Link>
          <span className="hidden text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] md:inline">{node.pills?.join(" · ")}</span>
          <NextProjectLink currentHref={`/case-study/${slug}`} />
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-6 sm:px-16 py-24 gap-8">
          <h1 className="font-semibold" style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em", lineHeight: 0.92 }}>
            {node.title ?? node.id}<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="font-light leading-relaxed max-w-lg" style={{ fontSize: "clamp(14px, 1.4vw, 18px)", color: "var(--midtone)" }}>{node.brief}</p>
          <div className="flex flex-col gap-3 mt-4" style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 20 }}>
            <p className="font-semibold" style={{ fontSize: 13, letterSpacing: "-0.01em" }}>Case study in progress</p>
            <p className="font-light leading-relaxed" style={{ fontSize: 13, color: "var(--midtone)" }}>The full write-up is on its way. Check back soon.</p>
          </div>
          <Link href="/" className="text-[11px] font-normal tracking-[0.2em] uppercase mt-4 self-start border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)] hover:text-[var(--foreground)] text-[var(--midtone)] transition-colors duration-200">
            Back to portfolio
          </Link>
        </div>
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-16">
          <NextProjectCard currentHref={`/case-study/${slug}`} />
        </div>
        <footer className="max-w-5xl mx-auto w-full px-6 sm:px-16 py-8 border-t border-[var(--border)]">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}>

      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgb(245,241,235)" }}>
        <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
          <Link href="/" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          <span className="hidden text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] md:inline">
            {cs.company} · {cs.timeline}
          </span>
          <NextProjectLink currentHref={`/case-study/${slug}`} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6 sm:px-16">

        {/* ── Hero ── */}
        <section className="pt-16 pb-12 flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[var(--accent)]">
            {cs.role}
          </p>
          <h1
            className="font-light max-w-[1100px]"
            style={{ fontSize: "clamp(32px, calc(5vw - 2px), 52px)", letterSpacing: "-0.03em", lineHeight: 1.14 }}
          >
            {cs.intro}<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <IntroMetadataSection
            role={cs.role}
            timeline={cs.timeline}
            platform={cs.platform}
            results={cs.outcomeStats}
          />
        </section>

        {/* ── Main image ── */}
        <LightboxFrame alt={cs.mainImage.alt}>
          <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
            {cs.mainImage.src && (
              <Image
                src={cs.mainImage.src}
                alt={cs.mainImage.alt}
                width={1280}
                height={720}
                className="w-full h-full object-cover"
                priority
              />
            )}
          </div>
        </LightboxFrame>

        {/* ── Problem ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--accent)]">The Problem</p>
              <h2
                className="font-light"
                style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
              >
                {cs.problem.title}
              </h2>
            </div>
            <div
              className="prose text-sm font-light"
              style={{ color: "var(--body)" }}
              dangerouslySetInnerHTML={{ __html: cs.problem.body }}
            />
          </div>
          {cs.problem.image && (
            <LightboxFrame alt={cs.problem.image.alt}>
              <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9", background: "var(--card)" }}>
                {cs.problem.image.src && (
                  <Image
                    src={cs.problem.image.src}
                    alt={cs.problem.image.alt}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </LightboxFrame>
          )}
        </section>

        {/* ── Process sections ── */}
        {cs.process.map((step, i) => (
          <section key={i} className="py-16 flex flex-col gap-10">
            <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--accent)]">
                  0{i + 1}
                </p>
                <h2
                  className="font-light"
                  style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
                >
                  {step.title}
                </h2>
              </div>
              <div
                className="prose text-sm font-light"
                style={{ color: "var(--body)" }}
                dangerouslySetInnerHTML={{ __html: step.body }}
              />
            </div>
            {step.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {step.images.map((img, j) => (
                  <LightboxFrame key={j} alt={img.alt}>
                    <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
                      {img.src && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </LightboxFrame>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* ── Outcome ── */}
        <section className="py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--accent)]">Outcome</p>
              <h2
                className="font-light"
                style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.25 }}
              >
                {cs.outcome.title}
              </h2>
            </div>
            <div
              className="prose text-sm font-light"
              style={{ color: "var(--body)" }}
              dangerouslySetInnerHTML={{ __html: cs.outcome.body }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {cs.outcome.images.map((img, i) => (
              <LightboxFrame key={i} alt={img.alt}>
                <div className="rounded-xl overflow-hidden" style={{ aspectRatio: "4/3", background: "var(--card)" }}>
                  {img.src && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </LightboxFrame>
            ))}
          </div>
        </section>

        <NextProjectCard currentHref={`/case-study/${slug}`} />

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
