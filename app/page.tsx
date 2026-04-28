"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import SurferJourney from "./components/SurferJourney";
import YogaCycle from "./components/YogaCycle";
import { EASE, FadeIn, FONT, SkillPill } from "./components/ui";

const skills = [
  "Product Strategy", "Claude Code", "Interaction Design", "UX Design",
  "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
];

type NavItem = { label: string; href: string; section?: string; external?: boolean };
const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work", section: "work" },
  { label: "About", href: "#about", section: "about" },
  { label: "Résumé ↗", href: "/resume.pdf", external: true },
];

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative text-[11px] font-normal tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--foreground)] ${active ? "text-[var(--foreground)]" : "text-[var(--midtone)]"}`}
    >
      {item.label}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 -bottom-1 h-px bg-current transition-[width] duration-300 ease-out ${active ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </a>
  );
}

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="sm:hidden relative w-6 h-6 flex flex-col items-center justify-center gap-1.5"
    >
      <span
        className="block h-px w-5 bg-[var(--foreground)] transition-transform duration-300"
        style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
      />
      <span
        className="block h-px w-5 bg-[var(--foreground)] transition-transform duration-300"
        style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
      />
    </button>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.7);
      const center = window.innerHeight / 2;
      let active: string | null = null;
      for (const id of ["work", "about"]) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= center && rect.bottom >= center) {
          active = id;
          break;
        }
      }
      setActiveSection(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

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
            <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-end">
              <div className="hidden sm:flex items-center gap-8">
                {NAV_ITEMS.map(item => (
                  <NavLink key={item.label} item={item} active={!!item.section && item.section === activeSection} />
                ))}
              </div>
              <Hamburger open={mobileMenuOpen} onClick={() => setMobileMenuOpen(o => !o)} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-10"
            style={{ background: "var(--background)", ...FONT }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base tracking-[0.2em] uppercase transition-colors duration-200 ${item.section && item.section === activeSection ? "text-[var(--foreground)]" : "text-[var(--midtone)]"}`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
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
      <section className="relative min-h-[100dvh] flex overflow-hidden" style={{ ...FONT, zIndex: 1 }}>

        {/* Left: narrow photo column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
          className="hidden md:block relative flex-shrink-0"
          style={{ width: "clamp(180px, 22vw, 280px)" }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            className="absolute top-8 left-5 z-20 text-[10px] tabular-nums tracking-[0.18em] text-white/40 select-none"
          >
            001
          </motion.span>

          <Image
            src="/nikki.jpg"
            alt="Niharika Mishra"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 280px"
            style={{ objectFit: "cover", objectPosition: "center 15%", filter: "grayscale(1) contrast(1.1) brightness(1.02)" }}
          />

          <div
            className="absolute inset-y-0 right-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, var(--background))" }}
          />

        </motion.div>

        {/* Right: editorial text */}
        <div className="flex-1 flex flex-col justify-between px-6 md:px-14 py-10 md:py-12 min-w-0">

          {/* Top row: nav + date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="flex items-start justify-between"
          >
            <div className="hidden sm:flex items-center gap-8">
              {NAV_ITEMS.map(item => (
                <NavLink key={item.label} item={item} active={!!item.section && item.section === activeSection} />
              ))}
            </div>
            <Hamburger open={mobileMenuOpen} onClick={() => setMobileMenuOpen(o => !o)} />
            <YogaCycle size={100} />
          </motion.div>

          {/* Name block */}
          <div className="flex flex-col">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05, ease: EASE }}
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--midtone)] mb-5"
            >
              Niharika Mishra · Experience Design · Capital One
            </motion.p>

            <div className="flex flex-col">
              {["I choose problems", "that matter to people."].map((line, i) => (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.p
                    initial={{ y: "106%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 1.15 + i * 0.1, ease: EASE }}
                    className="font-light text-[var(--foreground)]"
                    style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
                  >
                    {line}{i === 1 && <span style={{ color: "var(--accent)" }}></span>}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>

          {/* Spacer to preserve justify-between layout */}
          <div />
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="relative flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-16" style={{ ...FONT, zIndex: 1 }}>

        {/* ── 01 WORK ── */}
        <section id="work" className="-mt-[10vh] pt-16 sm:pt-24 pb-16 sm:pb-24 flex flex-col relative z-10">
          <SurferJourney />
        </section>

        {/* ── 02 ABOUT ── */}
        <section id="about" className="py-12 sm:py-16 flex flex-col gap-20">


          <div className="flex flex-col gap-10 md:gap-12">
            <FadeIn>
              <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>
                The choices weren't accidental.
              </p>
            </FadeIn>
            <div className="flex flex-col gap-5 text-sm font-light leading-[1.9]" style={{ color: "#3A3530" }}>
              {[
                "My foundation as an engineer was fueled by a lifelong curiosity to understand how things work. Moving into design felt natural — I wanted to get closer to the why behind how people think, struggle, and make decisions. I think in systems, design for humans, and build to ship.",
                "Vibe coding has unlocked something for me: I can move from insight to working product faster than ever, and my engineering background means I'm not guessing at what's possible. Design and engineering are how I build good for the world. I'm looking for teams where that combo and that drive actually matter.",
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
