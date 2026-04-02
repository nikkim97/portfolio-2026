"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import NMLogo from "./components/NMLogo";
import SurferJourney from "./components/SurferJourney";
import { EASE, FadeIn, EditorialSection, SkillPill } from "./components/ui";

const FONT = { fontFamily: "var(--font-poppins), sans-serif" };

const skills = [
  "Product Strategy", "Claude Code", "Interaction Design", "UX Design",
  "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [navVisible, setNavVisible] = useState(false);
  useEffect(() => {
    const fn = () => setNavVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-px bg-[var(--foreground)] z-50 pointer-events-none"
      />

      {/* Sticky nav */}
      <AnimatePresence>
        {navVisible && (
          <motion.nav
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)]"
            style={{ backgroundColor: "rgba(250,248,245,0.92)", backdropFilter: "blur(12px)", ...FONT }}
          >
            <div className="max-w-5xl mx-auto px-8 sm:px-16 h-12 flex items-center justify-between">
              <a href="#"><NMLogo size={28} /></a>
              <div className="flex items-center gap-8">
                {[
                  { label: "Work", href: "#work" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
                    {label}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--background)] bg-[var(--foreground)] px-4 py-1.5 hover:bg-[var(--accent)] transition-colors duration-200"
                >
                  Résumé
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex overflow-hidden" style={FONT}>

        {/* Left: narrow photo column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="hidden md:block relative flex-shrink-0"
          style={{ width: "clamp(180px, 22vw, 280px)" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
            className="absolute top-8 left-5 z-20 text-[10px] tabular-nums tracking-[0.18em] text-white/40 select-none"
          >
            001
          </motion.span>

          <Image
            src="/nikki.jpg"
            alt="Niharika Mishra"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 15%", filter: "grayscale(1) contrast(1.1) brightness(1.02)" }}
          />

          <div
            className="absolute inset-y-0 right-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, var(--background))" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
            className="absolute bottom-14 right-3 z-20 text-[9px] tracking-[0.22em] uppercase text-[var(--midtone)] select-none pointer-events-none"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}
          >
            Experience Design · Capital One
          </motion.p>
        </motion.div>

        {/* Right: editorial text */}
        <div className="flex-1 flex flex-col justify-between px-10 md:px-14 py-10 md:py-12 min-w-0">

          {/* Date stamp */}
          <div className="flex justify-end items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="text-right"
              style={{ lineHeight: 0.88 }}
            >
              {(() => {
                const now = new Date();
                const mm = String(now.getMonth() + 1).padStart(2, "0");
                const dd = String(now.getDate()).padStart(2, "0");
                return (
                  <>
                    <p className="font-semibold tabular-nums text-[var(--foreground)]" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}>{mm}</p>
                    <p className="font-semibold tabular-nums text-[var(--foreground)]" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}>{dd}.</p>
                  </>
                );
              })()}
            </motion.div>
          </div>

          {/* Name block */}
          <div className="flex flex-col">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--midtone)] mb-5"
            >
              Designer · Engineer · Builder
            </motion.p>

            <div style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "106%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.72, ease: EASE }}
                className="font-semibold text-[var(--foreground)]"
                style={{ fontSize: "clamp(56px, 8.5vw, 118px)", letterSpacing: "-0.03em", lineHeight: 0.88 }}
              >
                Niharika<span style={{ color: "var(--accent)" }}>.</span>
              </motion.h1>
            </div>

            {/* Mirror reflection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.15, ease: EASE }}
              aria-hidden
              style={{
                transform: "scaleY(-1)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.13) 0%, transparent 60%)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.13) 0%, transparent 60%)",
                userSelect: "none",
                pointerEvents: "none",
                marginTop: 2,
              }}
            >
              <span
                className="font-semibold text-[var(--foreground)] block"
                style={{ fontSize: "clamp(56px, 8.5vw, 118px)", letterSpacing: "-0.03em", lineHeight: 0.88 }}
              >
                Mishra<span style={{ color: "var(--accent)" }}>.</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
              className="font-light text-[var(--foreground)] mt-5"
              style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}
            >
              I choose problems that matter to people.
            </motion.p>
          </div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            className="flex flex-wrap items-center gap-8"
          >
            {[
              { label: "Work", href: "#work" },
              { label: "About", href: "#about" },
              { label: "Résumé ↗", href: "/resume.pdf", external: true },
            ].map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-16" style={FONT}>

        {/* ── 01 WORK ── */}
        <section id="work" className="py-28 sm:py-36 flex flex-col gap-16">
          <EditorialSection number="01" label="Work" />
          <FadeIn>
            <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>
              Every project started with a human question.
            </p>
          </FadeIn>
          <SurferJourney />
        </section>

        {/* ── 02 ABOUT ── */}
        <section id="about" className="py-28 sm:py-36 flex flex-col gap-20">
          <EditorialSection number="02" label="About" />

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <FadeIn>
              <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>
                The choices weren't accidental.
              </p>
            </FadeIn>
            <div className="flex flex-col gap-5 text-sm font-light text-[var(--midtone)] leading-[1.9]">
              {[
                "My foundation as an engineer was fueled by a lifelong curiosity to understand how things work. Moving into design felt natural — I wanted to get closer to the why behind how people think, struggle, and make decisions.",
                "I'm drawn to messy, human problems. The kind where the problem statement is still being written. That's what pulled me into HR tech at Capital One, where I spent years rethinking how performance management could actually serve people — not just process them.",
                "Now I build too. Vibe coding has unlocked something for me: I can move from insight to working product faster than ever, and my engineering background means I'm not guessing at what's possible. I think in systems, design for humans, and build to ship.",
                "Design and engineering are how I build good for the world. I'm looking for teams where that combo — and that drive — actually matters.",
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 0.08} distance={12}>
                  <p>{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <FadeIn>
              <p className="text-[10px] font-normal tracking-[0.28em] uppercase text-[var(--midtone)]">Skills</p>
            </FadeIn>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => <SkillPill key={s} skill={s} delay={i * 0.04} />)}
            </div>
          </div>
        </section>

        {/* ── 03 CONTACT ── */}
        <section id="contact" className="py-28 sm:py-36 flex flex-col gap-16">
          <EditorialSection number="03" label="Contact" />

          <div className="flex flex-col gap-12">
            <FadeIn>
              <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>
                If the problem matters to people, I want in.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-8">
                {[
                  { label: "Email", href: "mailto:niharika@example.com" },
                  { label: "LinkedIn", href: "https://linkedin.com/in/niharikamishra", external: true },
                  { label: "GitHub", href: "https://github.com/niharikamishra", external: true },
                  { label: "Résumé", href: "/resume.pdf", external: true },
                ].map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200 border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-10 border-t border-[var(--border)] flex items-center justify-between">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Built with intention.</p>
        </footer>
      </main>
    </>
  );
}
