"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { FONT } from "./ui";
import { NextProjectCard, NextProjectLink } from "./ProjectNavigation";

export default function CaseStudyShell({
  context,
  currentHref,
  children,
}: {
  context?: string;
  currentHref: string;
  children: ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const maskStyle = {
    maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ background: "var(--background)", color: "var(--foreground)", ...FONT }}
    >
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
        style={{ scaleX, background: "var(--accent)" }}
      />

      <div className="sticky top-0 z-40" style={{ backgroundColor: "var(--card)", ...maskStyle }}>
        <div className="mx-auto w-full max-w-[62rem] px-6 sm:px-10 h-12 flex items-center justify-between">
          <Link href="/" className="mono-label hover:text-[var(--foreground)] transition-colors duration-200">
            ← Back
          </Link>
          {context && <span className="mono-label hidden md:inline">{context}</span>}
          <NextProjectLink currentHref={currentHref} />
        </div>
      </div>

      <article className="article-grid w-full">{children}</article>

      <div className="mx-auto w-full max-w-[62rem] px-6 sm:px-10">
        <NextProjectCard currentHref={currentHref} showBridgeCopy={false} />
        <footer className="py-10 flex flex-wrap items-center justify-between gap-2">
          <span className="mono-label">© 2026 Niharika Mishra</span>
          <Link
            href="/"
            className="mono-label border-b border-[var(--border)] pb-0.5 hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors duration-200"
          >
            ← Back to portfolio
          </Link>
        </footer>
      </div>
    </main>
  );
}
