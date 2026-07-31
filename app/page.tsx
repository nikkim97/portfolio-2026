"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SurferJourney from "./components/SurferJourney";
import AboutCarousel from "./components/AboutCarousel";
import DesignPrinciples from "./components/DesignPrinciples";
import { EASE, FadeIn, FONT, SkillPill, WordStaggerLine } from "./components/ui";

const skills = [
  "Product Strategy", "Vibe Coding", "Interaction Design", "UX Design",
  "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
];

type NavItem = { label: string; href: string; section?: string; external?: boolean; cta?: boolean; icon?: "wave" };
const NAV_ITEMS: NavItem[] = [
  { label: "Hi", href: "#intro", section: "intro", icon: "wave" },
  { label: "Work", href: "#work", section: "work" },
  { label: "About", href: "#about", section: "about" },
  { label: "Let's talk", href: "#contact", section: "contact" },
];

function WaveGlyph({ active, waveKey }: { active: boolean; waveKey: number }) {
  return (
    <motion.svg
      key={`${active ? "wave-active" : "wave-idle"}-${waveKey}`}
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.4"
      initial={{ rotate: 0 }}
      animate={active ? { rotate: [0, 16, -10, 14, -6, 0] } : { rotate: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformOrigin: "70% 80%" }}
    >
      <path d="M7.4 11.2 5.7 7.1a1.2 1.2 0 0 1 2.2-.9l1.5 3.5" />
      <path d="M9.4 9.7 7.2 4.4a1.2 1.2 0 0 1 2.2-.9l2.1 5" />
      <path d="M11.5 8.5 10 4.8a1.2 1.2 0 0 1 2.2-.9l1.8 4.3" />
      <path d="M14 8.2 13 5.9a1.1 1.1 0 0 1 2-.8l2.4 5.8" />
      <path d="M7.4 11.2 6.8 9.7a1.3 1.3 0 0 0-2.4 1l2.1 5c1.4 3.4 4.6 4.8 7.8 3.5 3.4-1.4 4.8-4.7 3.4-8.1" />
      <path d="M18.9 4.1c1.1.7 1.8 1.7 2.1 3" />
      <path d="M4 4.6c-.9 1-1.3 2.1-1.2 3.4" />
    </motion.svg>
  );
}

function RailNav({ activeSection, introWaveKey }: { activeSection: string | null; introWaveKey: number }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 sm:bottom-auto sm:left-7 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
      style={FONT}
    >
      <div
        className="flex items-center gap-3 border border-[rgba(237,231,218,0.08)] bg-[var(--nav-bg)] px-3 py-2 backdrop-blur-md sm:flex-col sm:items-center sm:gap-10 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none"
      >
        {NAV_ITEMS.map((item, index) => {
          const active = !!item.section && item.section === activeSection;
          return (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex items-center gap-1.5 text-[9px] font-normal uppercase tracking-[0.16em] transition-colors duration-200 sm:flex-col sm:gap-3 sm:text-[10px] ${
                active ? "text-[var(--foreground)]" : item.cta ? "text-[var(--foreground)]" : "text-[var(--midtone)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className="hidden sm:inline [writing-mode:vertical-rl]">{item.icon === "wave" ? <WaveGlyph active={active} waveKey={introWaveKey} /> : item.label}</span>
              <span className="sm:hidden">{item.icon === "wave" ? <WaveGlyph active={active} waveKey={introWaveKey} /> : item.label.replace("Let's talk", "Talk")}</span>
              <span
                aria-hidden
                className={`hidden w-px transition-all duration-300 sm:block ${active ? "h-8 bg-[var(--foreground)]" : "h-4 bg-[var(--border)] group-hover:h-8 group-hover:bg-[var(--foreground)]"}`}
              />
            </a>
          );
        })}
      </div>
    </nav>
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


  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [introWaveKey, setIntroWaveKey] = useState(0);
  const initialIntroWavePlayed = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      let active: string | null = "intro";
      for (const id of ["intro", "work", "about", "contact"]) {
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
    if (activeSection !== "intro") return;
    if (!initialIntroWavePlayed.current) {
      initialIntroWavePlayed.current = true;
      const timeout = window.setTimeout(() => setIntroWaveKey(key => key + 1), 950);
      return () => window.clearTimeout(timeout);
    }
    setIntroWaveKey(key => key + 1);
  }, [activeSection]);

  return (
    <div>
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

      {/* Rail nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.85, ease: EASE }}
      >
        <RailNav activeSection={activeSection} introWaveKey={introWaveKey} />
      </motion.div>

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
      <section id="intro" className="relative h-[140vh]" style={{ ...FONT, zIndex: 1 }}>
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
                  { label: "Résumé", href: "/nikki-resume1.pdf", external: true },
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
                    <span aria-hidden className="relative z-10 leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗︎</span>
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
