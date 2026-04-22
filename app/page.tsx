"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import SurferJourney from "./components/SurferJourney";
import { EASE, FadeIn, FONT, SkillPill } from "./components/ui";

const skills = [
  "Product Strategy", "Claude Code", "Interaction Design", "UX Design",
  "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
];

export default function Home() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [navVisible, setNavVisible] = useState(false);
  const [viewportH, setViewportH] = useState(900);
  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.7);
    const onResize = () => setViewportH(window.innerHeight);
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const parallaxY = useTransform(
    scrollY,
    [0, viewportH],
    prefersReducedMotion ? [0, 0] : [0, viewportH * 0.15]
  );

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
            <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
              <a href="#" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">NM</a>
              <div className="flex items-center gap-6 sm:gap-8">
                {[
                  { label: "Work", href: "#work" },
                  { label: "About", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="hidden sm:block text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">
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

      {/* ── Page-level background blobs (fixed so they persist across all sections) ── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Hero — yellow orb top-right */}
        <div style={{
          position: "absolute", top: "-5vh", right: "5%",
          width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(228,210,80,0.36) 0%, transparent 68%)",
          filter: "blur(14px)",
        }} />
        {/* Hero — terracotta mid */}
        <div style={{
          position: "absolute", top: "45vh", right: "22%",
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,123,90,0.16) 0%, transparent 70%)",
          filter: "blur(18px)",
        }} />
        {/* Work section — yellow orb left */}
        <div style={{
          position: "absolute", top: "110vh", left: "2%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(228,210,80,0.28) 0%, transparent 68%)",
          filter: "blur(16px)",
        }} />
        {/* Work section — terracotta right */}
        <div style={{
          position: "absolute", top: "180vh", right: "0%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(193,123,90,0.14) 0%, transparent 70%)",
          filter: "blur(20px)",
        }} />
      </div>

      {/* ── Curtain ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ background: "var(--background)" }}
      />

      {/* ── HERO ── */}
      <section className="relative min-h-[85dvh] overflow-hidden" style={{ ...FONT, zIndex: 1, backgroundColor: "var(--background)" }}>

        {/* Full-bleed photo with parallax + bottom fade-out */}
        <motion.div
          style={{
            y: parallaxY,
            position: "absolute",
            top: "-15vh",
            left: 0,
            right: 0,
            height: "calc(100% + 15vh)",
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            }}
          >
            <Image
              src="/nikki.jpg"
              alt="Niharika Mishra"
              fill
              priority
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "center 40%",
                filter: "grayscale(1) contrast(1.1) brightness(1.02)",
              }}
            />
          </div>
        </motion.div>

        {/* Dark gradient overlay for copy legibility — fades back out at the very bottom to meet page bg */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 85%, transparent 100%)",
          }}
        />

        {/* Copy container */}
        <div
          className="relative flex flex-col justify-between min-h-[85dvh] px-6 md:px-14 py-10 md:py-12"
          style={{ zIndex: 2 }}
        >

          {/* Top row: nav + date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="flex items-start justify-between"
          >
            <div className="flex items-center gap-6 sm:gap-8">
              {[
                { label: "Work", href: "#work" },
                { label: "About", href: "#about" },
                { label: "Résumé ↗", href: "/resume.pdf", external: true },
              ].map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[11px] font-normal tracking-[0.2em] uppercase transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(245,241,235,0.75)" }}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex flex-col items-end" style={{ lineHeight: 1 }}>
              <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em", color: "var(--background)" }}>
                {String(new Date().getMonth() + 1).padStart(2, "0")}
              </p>
              <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em", color: "var(--background)" }}>
                {String(new Date().getDate()).padStart(2, "0")}<span style={{ color: "var(--accent)" }}>.</span>
              </p>
            </div>
          </motion.div>

          {/* Bottom: eyebrow + main copy */}
          <div className="flex flex-col max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
              className="text-[10px] tracking-[0.22em] uppercase mb-5"
              style={{ color: "rgba(245,241,235,0.7)" }}
            >
              Niharika Mishra · Experience Design · Capital One
            </motion.p>

            <div className="flex flex-col">
              {[
                "I pay close attention, and I trust what I notice.",
                "That's how I've found my way to the work that mattered most.",
              ].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.p
                    initial={{ y: "106%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 1.15 + i * 0.1, ease: EASE }}
                    className="font-light"
                    style={{
                      fontSize: "clamp(22px, 3.2vw, 40px)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                      color: "var(--background)",
                    }}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="relative flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-16" style={{ ...FONT, zIndex: 1 }}>

        {/* ── 01 WORK ── */}
        <section id="work" className="-mt-[15vh] pt-16 sm:pt-24 pb-16 sm:pb-24 flex flex-col relative z-10">
          <SurferJourney />
        </section>

        {/* ── 02 ABOUT ── */}
        <section id="about" className="py-12 sm:py-16 flex flex-col gap-20">


          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <FadeIn>
              <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>
                The choices weren't accidental.
              </p>
            </FadeIn>
            <div className="flex flex-col gap-5 text-sm font-light leading-[1.9]" style={{ color: "#3A3530" }}>
              {[
                "My foundation as an engineer was fueled by a lifelong curiosity to understand how things work. Moving into design felt natural; I wanted to get closer to the why behind how people think, struggle, and make decisions.",
                "I'm drawn to messy, human problems. The kind where the problem statement is still being written. That's what pulled me into HR tech at Capital One, where I spent years rethinking how performance management could actually serve people, not just process them.",
                "Now I build too. Vibe coding has unlocked something for me: I can move from insight to working product faster than ever, and my engineering background means I'm not guessing at what's possible. I think in systems, design for humans, and build to ship.",
                "Design and engineering are how I build good for the world. I'm looking for teams where that combo and that drive actually matter.",
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
        <section id="contact" className="py-12 sm:py-16 flex flex-col gap-16">


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
        <footer className="py-10 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Built with intention. Built with <span style={{ color: "var(--accent)" }}>Claude Code</span>.</p>
        </footer>
      </main>
    </>
  );
}
