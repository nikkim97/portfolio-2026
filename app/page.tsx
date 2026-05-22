"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SurferJourney from "./components/SurferJourney";
import { EASE, FadeIn, FONT, SkillPill, WordStaggerLine } from "./components/ui";

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

  // Terracotta warm counterpoint — emerges as Work begins, quiet during the pinned scenes.
  const blobTerraY = useTransform(scrollYProgress, [0, 1], ["0vh", "-20vh"]);
  const blobTerraX = useTransform(scrollYProgress, [0, 1], ["0vw", "20vw"]);
  const blobTerraOpacity = useTransform(scrollYProgress, [0.63, 0.72, 0.88, 1], [0, 0.20, 0.16, 0.08]);

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

      {/* ── Page-level background blobs ── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Hero — yellow orb top-right */}
        <div style={{
          position: "absolute", top: "-5vh", right: "5%",
          width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(228,210,80,0.36) 0%, transparent 68%)",
          filter: "blur(14px)",
        }} />
        {/* Terracotta warm counterpoint — emerges in Work */}
        <motion.div
          style={{
            position: "absolute", top: "45vh", right: "22%",
            width: 380, height: 380, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(193,123,90,1) 0%, transparent 70%)",
            filter: "blur(18px)",
            x: blobTerraX, y: blobTerraY, opacity: blobTerraOpacity,
          }}
        />
      </div>

      {/* ── Curtain ── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ background: "var(--background)" }}
      />

      {/* ── HERO ── pinned scene 1; chains into the pinned interstitial below ── */}
      <section className="relative h-[140vh]" style={{ ...FONT, zIndex: 1 }}>
        <div className="sticky top-0 h-screen flex overflow-hidden">
          <div className="flex-1 flex flex-col justify-between w-full max-w-5xl mx-auto px-8 sm:px-16 py-10 md:py-12 min-w-0">

            {/* Top row: date + nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
              className="flex items-start justify-between"
            >
              <div className="flex flex-col items-start" style={{ lineHeight: 1 }}>
                <p className="font-semibold tabular-nums text-[var(--foreground)]" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}>
                  {String(new Date().getMonth() + 1).padStart(2, "0")}
                </p>
                <p className="font-semibold tabular-nums text-[var(--foreground)]" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em" }}>
                  {String(new Date().getDate()).padStart(2, "0")}<span style={{ color: "var(--accent)" }}>.</span>
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-8">
                {NAV_ITEMS.map(item => (
                  <NavLink key={item.label} item={item} active={!!item.section && item.section === activeSection} />
                ))}
              </div>
              <Hamburger open={mobileMenuOpen} onClick={() => setMobileMenuOpen(o => !o)} />
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
                <p
                  className="font-light text-[var(--foreground)]"
                  style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
                >
                  <WordStaggerLine text="still working on a creative intro," startDelay={1.15} perWord={0.07} duration={0.9} />
                </p>
                <p
                  className="font-light text-[var(--foreground)]"
                  style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
                >
                  <WordStaggerLine text="but let me take you on my journey as a builder in the meantime" startDelay={1.57} perWord={0.07} duration={0.9} />
                </p>
              </div>
            </div>

            {/* Spacer to preserve justify-between layout */}
            <div />
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="relative flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-16" style={{ ...FONT, zIndex: 1 }}>

        {/* ── 01 WORK ── */}
        <section id="work" className="pt-10 sm:pt-14 pb-12 sm:pb-16 flex flex-col relative z-10">
          <SurferJourney />
        </section>

        {/* ── 02 ABOUT ── */}
        <section id="about" className="py-12 sm:py-16 flex flex-col gap-20">


          <div className="flex flex-col gap-10 md:gap-12">
            <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
              <WordStaggerLine text="So, what keeps me going?" trigger="inView" perWord={0.07} duration={0.9} />
            </p>
            <div className="flex flex-col gap-5 text-base font-light leading-[1.9]" style={{ color: "#3A3530" }}>
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
            <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(22px, 2.8vw, 36px)", letterSpacing: "-0.015em", lineHeight: 1.25 }}>
              <WordStaggerLine text="Ownership, impact and things that last — if that's what you're building, let's talk." trigger="inView" perWord={0.06} duration={0.9} />
            </p>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-8">
                {[
                  { label: "Email", href: "mailto:niharika@example.com" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikkim97/", external: true },
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
        </footer>
      </main>
    </>
  );
}
