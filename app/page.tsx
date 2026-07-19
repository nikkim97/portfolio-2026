"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import SurferJourney from "./components/SurferJourney";
import AboutCarousel from "./components/AboutCarousel";
import DesignPrinciples from "./components/DesignPrinciples";
import CursorDot from "./components/CursorDot";
import { EASE, FadeIn, FONT, SkillPill, WordStaggerLine } from "./components/ui";

const skills = [
  "Product Strategy", "Claude Code", "Interaction Design", "UX Design",
  "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
];

type NavItem = { label: string; href: string; section?: string; external?: boolean; cta?: boolean };
const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work", section: "work" },
  { label: "About", href: "#about", section: "about" },
  { label: "Résumé ↗", href: "/resume.pdf", external: true },
  { label: "Let's talk", href: "mailto:niharikamishr@gmail.com", cta: true },
];

function NavLink({ item, active, onClick }: { item: NavItem; active: boolean; onClick?: () => void }) {
  if (item.cta) {
    return (
      <a
        href={item.href}
        onClick={onClick}
        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="rounded-full px-4 py-1.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-opacity duration-200 hover:opacity-85"
        style={{ background: "var(--foreground)", color: "var(--background)" }}
      >
        {item.label}
      </a>
    );
  }
  return (
    <a
      href={item.href}
      onClick={onClick}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative text-[11px] font-normal tracking-[0.2em] uppercase transition-colors duration-200 hover:text-[var(--foreground)] ${active ? "text-[var(--foreground)]" : "text-[var(--midtone)]"}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 scale-[0.35] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
        style={{ width: 132, height: 132, background: "var(--border)", filter: "blur(7px)" }}
      />
      <span className="relative z-10">{item.label}</span>
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
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Terracotta warm counterpoint: emerges as Work begins, quiet during the pinned scenes.
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
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [mobileMenuOpen]);

  return (
    <div>
      <CursorDot />
      {/* Homepage-only cream paper background: flat antique-white + subtle grain.
          The --background override above re-tints every var(--background) usage
          (hero fade, curtain, mobile menu) to cream so nothing seams. */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundColor: "var(--background)",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)' opacity='0.13'/%3E%3C/svg%3E\")",
        }}
      />
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
            className="fixed top-0 left-0 right-0 z-40"
            style={{
              backgroundColor: "var(--nav-bg)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              // Fade the bottom edge instead of a hard border, so the blurred bar
              // blends smoothly into the content below.
              maskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent 100%)",
              ...FONT,
            }}
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
            onClick={() => setMobileMenuOpen(false)}
          >
            {/* Close (X) — lives inside the overlay so it sits above it and is tappable */}
            <div className="absolute top-0 right-0 max-w-5xl w-full mx-auto px-8 py-10 flex justify-end">
              <Hamburger open onClick={() => setMobileMenuOpen(false)} />
            </div>
            {NAV_ITEMS.map(item => (
              item.cta ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full px-7 py-3 text-base font-medium tracking-[0.2em] uppercase transition-opacity duration-200 hover:opacity-85"
                  style={{ background: "var(--foreground)", color: "var(--background)" }}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base tracking-[0.2em] uppercase transition-colors duration-200 ${item.section && item.section === activeSection ? "text-[var(--foreground)]" : "text-[var(--midtone)]"}`}
                >
                  {item.label}
                </a>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page-level background blobs ── */}
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Terracotta warm counterpoint: emerges in Work */}
        <motion.div
          style={{
            position: "absolute", top: "45vh", right: "22%",
            width: 380, height: 380, borderRadius: "50%",
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            filter: "blur(18px)",
            x: prefersReduced ? 0 : blobTerraX,
            y: prefersReduced ? 0 : blobTerraY,
            opacity: prefersReduced ? 0.12 : blobTerraOpacity,
          }}
        />
      </div>

      {/* ── Curtain ── */}
      <motion.div
        initial={{ y: prefersReduced ? "-100%" : 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: prefersReduced ? 0 : 0.85, delay: prefersReduced ? 0 : 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{ background: "var(--background)" }}
      />

      {/* ── HERO ── pinned scene 1; chains into the pinned interstitial below ── */}
      <section className="relative h-[140vh]" style={{ ...FONT, zIndex: 1 }}>
        <div className="sticky top-0 h-screen flex overflow-hidden">
          {/* Full-width editorial surf backdrop: muted + warm, with a paper-grain overlay */}
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <Image
              src="/nikki-3.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{
                filter: "grayscale(0.7) saturate(0.9) contrast(1.06) brightness(1.0)",
                opacity: 0.55,
                objectPosition: "center",
                transform: "scale(1.15) translate(20%, 6%)",
                transformOrigin: "center",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 28%)",
              }}
            />
            {/* Warm paper wash to settle the photo into the page palette */}
            <div className="absolute inset-0" style={{ background: "var(--background)", opacity: 0.4 }} />
            {/* Soft top/bottom fade so the nav and name stay legible */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, var(--background) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 55%, var(--background) 90%)" }}
            />
            {/* Paper grain */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
                opacity: 0.3,
                mixBlendMode: "multiply",
              }}
            />
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-5xl mx-auto px-8 sm:px-16 py-10 md:py-12 min-w-0">

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
                className="text-[10px] tracking-[0.22em] uppercase text-[var(--foreground)] mb-5"
              >
                Niharika Mishra · Design Leader at Capital One
              </motion.p>

              <div className="flex flex-col">
                <h1
                  className="font-light text-[var(--foreground)]"
                  style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
                >
                  <WordStaggerLine text="Hi, I'm Nikki" startDelay={1.15} perWord={0.07} duration={0.9} />
                  <span style={{ color: "var(--accent)" }}>.</span>
                </h1>
                <p
                  className="font-light"
                  style={{ fontSize: "clamp(18px, 2.4vw, 28px)", letterSpacing: "-0.01em", lineHeight: 1.45, color: "var(--foreground)", marginTop: 20, textWrap: "balance" }}
                >
                  <WordStaggerLine text={"I make complex things feel human. Let me take you on my journey so far."} startDelay={1.6} perWord={0.05} duration={0.9} />
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
            <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "-0.015em", lineHeight: 1.2 }}>
              <WordStaggerLine text="So, what keeps me going?" trigger="inView" perWord={0.07} duration={0.9} />
            </p>
            <div className="flex flex-col gap-5 text-base font-normal leading-[1.9]" style={{ color: "var(--body)" }}>
              {[
                "I became an engineer because I've always wanted to know how things work. Moving into design felt natural: I wanted to get closer to the why behind how people think, struggle, and make decisions. I think in systems, design for humans, and build to ship.",
                "Vibe coding lets me move from insight to working product faster than ever, and my engineering roots mean I'm not guessing at what's possible. That combination is why I still love building.",
                "Travel keeps me curious, and so does being a little out of my depth. I surf despite not growing up athletic, and I've hiked volcanoes for the same reason: I'm happiest when something is stretching me.",
              ].map((p, i) => (
                <FadeIn key={i} delay={i * 0.08} distance={12}>
                  <p>{p}</p>
                </FadeIn>
              ))}
            </div>
          </div>

          <DesignPrinciples />

          <AboutCarousel />

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
              <WordStaggerLine text="If you're building for impact and appreciate ownership, let's talk." trigger="inView" perWord={0.06} duration={0.9} />
            </p>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-x-12 gap-y-8">
                {[
                  { label: "Email", href: "mailto:niharikamishr@gmail.com" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/nikkim97/", external: true },
                  { label: "GitHub", href: "https://github.com/nikkim97", external: true },
                  { label: "Substack", href: "https://substack.com/@nikkim97", external: true },
                  { label: "Résumé", href: "/resume.pdf", external: true },
                ].map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative inline-flex items-center gap-1.5 text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 scale-[0.35] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
                      style={{ width: 132, height: 132, background: "var(--border)", filter: "blur(7px)" }}
                    />
                    <span className="relative z-10">{label}</span>
                    <span aria-hidden className="relative z-10 leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
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
    </div>
  );
}
