"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import NMLogo from "./components/NMLogo";

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Scroll-triggered fade ────────────────────────────────────────────────────
function useFadeInOnScroll(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({
  children, delay = 0, className = "", distance = 20,
}: {
  children: React.ReactNode; delay?: number; className?: string; distance?: number;
}) {
  const { ref, visible } = useFadeInOnScroll();
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: distance }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Editorial section marker ─────────────────────────────────────────────────
function EditorialSection({ number, label }: { number: string; label: string }) {
  const { ref, visible } = useFadeInOnScroll(0.1);
  return (
    <div ref={ref} className="flex items-center gap-5">
      <motion.span
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        className="text-[11px] font-normal tabular-nums text-[var(--midtone)] shrink-0"
      >
        {number}
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={visible ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: EASE }}
        style={{ transformOrigin: "left" }}
        className="flex-1 h-px bg-[var(--border)]"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
        className="text-[11px] font-normal tracking-[0.22em] uppercase text-[var(--midtone)] shrink-0"
      >
        {label}
      </motion.span>
    </div>
  );
}

// ─── Journey data ─────────────────────────────────────────────────────────────
type NodeType = "career" | "project" | "horizon";

interface JourneyNode {
  id: string;
  period: string;
  role?: string;
  title?: string;
  brief: string;
  pill?: string;
  href?: string;
  comingSoon?: boolean;
  type: NodeType;
}

const journeyNodes: JourneyNode[] = [
  {
    id: "asc-swe",
    period: "2019",
    role: "Associate, Software Engineer",
    brief: "Email-to-pay. Learning the full stack.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "sr-swe",
    period: "2020",
    role: "Senior Associate, Software Engineer",
    brief: "Batch pipelines. Real-time APIs. Started asking why.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "sa-xd",
    period: "2022",
    role: "SA, Experience Design",
    brief: "Pivoted. HR tools for better talent decisions.",
    pill: "Capital One",
    type: "career",
  },
  {
    id: "path-360",
    period: "2023–25",
    role: "Principal Associate, Experience Design",
    title: "PATH: 360 Feedback",
    brief: "How do you make peer feedback fair at enterprise scale?",
    pill: "Capital One",
    type: "project",
  },
  {
    id: "path-people",
    period: "2025–",
    role: "Manager, Experience Design",
    title: "PATH: People Leader",
    brief: "How do you give managers the clarity to actually develop their teams?",
    pill: "Capital One",
    type: "project",
  },
  {
    id: "bloom",
    period: "2024",
    title: "Bloom",
    brief: "What if relationship patterns showed up in how you care for plants?",
    pill: "Personal Project",
    type: "horizon",
  },
  {
    id: "time-tracker",
    period: "2025 →",
    title: "Time Tracking Dashboard",
    brief: "How do you help people see where their time is actually going?",
    pill: "Personal Project",
    comingSoon: true,
    type: "horizon",
  },
];

// ─── Surfer journey wave ───────────────────────────────────────────────────────
const WAVE_PATH_D = [
  "M300,30",
  // Career nodes — compressed, quick
  "C300,110 400,130 400,200",
  "C400,280 200,300 200,380",
  "C200,460 400,480 400,560",
  // Project nodes — expanded, weighted
  "C400,700 140,810 140,950",
  "C140,1150 460,1300 460,1500",
  "C460,1700 140,1800 140,2000",
  "C140,2180 460,2270 460,2450",
].join(" ");
const SVG_W = 600;
const SVG_H = 2650;
const WAVE_ANCHORS: { x: number; y: number; side: "left" | "right" }[] = [
  { x: 400, y: 200,  side: "right" },
  { x: 200, y: 380,  side: "left"  },
  { x: 400, y: 560,  side: "right" },
  { x: 140, y: 950,  side: "left"  },
  { x: 460, y: 1500, side: "right" },
  { x: 140, y: 2000, side: "left"  },
  { x: 460, y: 2450, side: "right" },
];

function SurferJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [surfer, setSurfer] = useState({ x: 300, y: 50, angle: 90 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 5%"],
  });

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (pathLen === 0) return;
    return scrollYProgress.on("change", (v) => {
      const p = pathRef.current;
      if (!p) return;
      const len = Math.max(0, Math.min(v * pathLen, pathLen));
      const pt = p.getPointAtLength(len);
      const pt2 = p.getPointAtLength(Math.min(len + 10, pathLen));
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
      setSurfer({ x: pt.x, y: pt.y, angle });
    });
  }, [scrollYProgress, pathLen]);

  // Compute which nodes the surfer has passed (for dot activation + splash)
  const isPassed = WAVE_ANCHORS.map(a => surfer.y >= a.y);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: SVG_H }}>

      {/* Wave SVG — centered */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)", top: 0 }}
      >
        {/* Ghost path */}
        <path
          d={WAVE_PATH_D}
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        {/* Terracotta reveal */}
        <motion.path
          ref={pathRef as React.Ref<SVGPathElement>}
          d={WAVE_PATH_D}
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
        {/* Anchor dots + splash */}
        {WAVE_ANCHORS.map((a, i) => {
          const node = journeyNodes[i];
          const isCareer = node.type === "career";
          const passed = isPassed[i];
          return (
            <g key={i}>
              {/* Halo for project/horizon nodes */}
              {!isCareer && (
                <circle cx={a.x} cy={a.y} r={passed ? 10 : 8}
                  fill="var(--accent)" opacity={passed ? 0.18 : 0.1}
                  style={{ transition: "r 0.3s ease, opacity 0.3s ease" }}
                />
              )}
              {/* Core dot */}
              <circle
                cx={a.x} cy={a.y}
                r={isCareer ? 3 : 4.5}
                fill={isCareer && !passed ? "var(--background)" : "var(--accent)"}
                stroke={isCareer && !passed ? "var(--midtone)" : "none"}
                strokeWidth="1"
              />
              {/* Splash ring — mounts & animates when passed */}
              {passed && (
                <motion.circle
                  cx={a.x} cy={a.y}
                  r={isCareer ? 6 : 9}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={{ scale: 1, opacity: 0.65 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
              {passed && !isCareer && (
                <motion.circle
                  cx={a.x} cy={a.y}
                  r={isCareer ? 4 : 6}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })}
        {/* Fading tail beyond last node */}
        <path
          d="M460,2450 C460,2560 300,2620 300,2650"
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity={0.35}
        />
      </svg>

      {/* Surfer — brown girl 🏄🏾‍♀️ */}
      <div
        aria-hidden
        className="absolute z-10 pointer-events-none select-none"
        style={{
          left: `calc(50% - ${SVG_W / 2}px + ${surfer.x}px)`,
          top: surfer.y,
          transform: `translate(-50%, -50%) rotate(${surfer.angle - 90}deg)`,
          fontSize: 20,
          lineHeight: 1,
        }}
      >
        🏄🏾‍♀️
      </div>

      {/* Node cards */}
      {journeyNodes.map((node, i) => {
        const a = WAVE_ANCHORS[i];
        const isRight = a.side === "right";
        const isCareer = node.type === "career";
        const isHorizon = node.type === "horizon";
        const isClickable = !!node.href && !node.comingSoon;
        const GAP = 20;

        const posLeft = isRight
          ? `calc(50% - ${SVG_W / 2}px + ${a.x + GAP}px)`
          : undefined;
        const posRight = !isRight
          ? `calc(50% - ${SVG_W / 2}px + ${SVG_W - a.x + GAP}px)`
          : undefined;

        const cardContent = (
          <div
            className="flex flex-col gap-1"
            style={{ maxWidth: isCareer ? 160 : 210, textAlign: isRight ? "left" : "right" }}
          >
            <span
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ color: isCareer ? "var(--midtone)" : "var(--accent)" }}
            >
              {node.period}{node.pill ? ` · ${node.pill}` : ""}
            </span>
            {node.role && (
              <p
                className="font-light leading-snug"
                style={{
                  fontSize: isCareer ? 10 : 12,
                  color: isCareer ? "var(--midtone)" : "var(--foreground)",
                  letterSpacing: "-0.01em",
                }}
              >
                {node.role}
              </p>
            )}
            {node.title && (
              <p
                className="font-semibold leading-snug"
                style={{ fontSize: 13, color: "var(--foreground)", letterSpacing: "-0.01em" }}
              >
                {node.title}
              </p>
            )}
            <p
              className="font-light leading-relaxed"
              style={{ fontSize: isCareer ? 10 : 11, color: "var(--midtone)" }}
            >
              {node.brief}
            </p>
            {isHorizon && !node.comingSoon && (
              <span className="text-[9px] tracking-[0.14em] uppercase mt-1" style={{ color: "var(--accent)" }}>
                Built with Claude Code
              </span>
            )}
            {node.comingSoon && (
              <span className="text-[9px] tracking-[0.14em] uppercase mt-1 text-[var(--midtone)]">
                In the water →
              </span>
            )}
            {isClickable && (
              <span className="text-[9px] tracking-[0.14em] uppercase mt-1" style={{ color: "var(--accent)" }}>
                View Process ↗
              </span>
            )}
          </div>
        );

        return (
          <div
            key={node.id}
            className="absolute"
            style={{ top: a.y, left: posLeft, right: posRight, transform: "translateY(-50%)" }}
          >
            {isClickable && node.href
              ? <a href={node.href} className="block hover:opacity-70 transition-opacity duration-200">{cardContent}</a>
              : cardContent}
          </div>
        );
      })}

      {/* Tail label */}
      <div
        className="absolute"
        style={{ top: 2605, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
      >
        <p className="text-[9px] tracking-[0.22em] uppercase text-[var(--midtone)]">
          still riding
        </p>
      </div>
    </div>
  );
}

// ─── (WorkIndexRow placeholder — kept for reference, unused) ─────────────────
// Replaced by SurferJourney above

// ─── Skill pill ───────────────────────────────────────────────────────────────
function SkillPill({ skill, delay }: { skill: string; delay: number }) {
  const isGreen = skill === "Claude Code";
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className={[
        "text-[11px] px-3 py-1.5 cursor-default transition-colors duration-200 tracking-wide",
        isGreen
          ? "font-normal bg-[var(--green)] text-[var(--background)]"
          : "font-light text-[var(--midtone)] border border-[var(--border)] hover:border-[var(--midtone)] hover:text-[var(--foreground)]",
      ].join(" ")}
    >
      {skill}
    </motion.span>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const [navVisible, setNavVisible] = useState(false);
  useEffect(() => {
    const fn = () => setNavVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);


  const skills = [
    "Product Strategy", "Claude Code", "Interaction Design", "UX Design",
    "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
  ];

  const FONT = { fontFamily: "var(--font-poppins), sans-serif" };

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
      <section
        className="relative min-h-screen flex overflow-hidden"
        style={FONT}
      >
        {/* Left: narrow photo column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="hidden md:block relative flex-shrink-0"
          style={{ width: "clamp(180px, 22vw, 280px)" }}
        >
          {/* Page index */}
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
            style={{
              objectFit: "cover",
              objectPosition: "center 15%",
              filter: "grayscale(1) contrast(1.1) brightness(1.02)",
            }}
          />

          {/* Right-edge fade into background */}
          <div
            className="absolute inset-y-0 right-0 w-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent, var(--background))" }}
          />

          {/* Vertical label along right edge */}
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

          {/* Top row: date stamp */}
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

          {/* Center: name block */}
          <div className="flex flex-col">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              className="text-[10px] tracking-[0.22em] uppercase text-[var(--midtone)] mb-5"
            >
              Designer · Engineer · Builder
            </motion.p>

            {/* Name */}
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

            {/* Bracket tagline */}
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

          {/* Bottom: descriptor + links */}
          <div className="flex flex-col gap-5">
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

          {/* Two-column statement + copy */}
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


          {/* Skills */}
          <div className="flex flex-col gap-6">
            <FadeIn>
              <p className="text-[10px] font-normal tracking-[0.28em] uppercase text-[var(--midtone)]">
                Skills
              </p>
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
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
            © 2026 Niharika Mishra
          </p>
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">
            Built with intention.
          </p>
        </footer>
      </main>
    </>
  );
}
