"use client";

import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SurferJourney from "./components/SurferJourney";
import { EASE, FadeIn, FONT, SkillPill } from "./components/ui";

const skills = [
  "Product Strategy", "Claude Code", "Interaction Design", "UX Design",
  "Design Systems", "Prototyping & Wireframing", "Figma", "UX Research", "AWS", "Python",
];

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      t += 0.004;
      for (let w = 0; w < 6; w++) {
        const phase = (w / 6) * Math.PI * 2;
        const yBase = height * (0.25 + w * 0.1);
        const amp = 30 + w * 10;
        const freq = 0.004 - w * 0.0003;
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= width; x += 4) {
          const y = yBase + Math.sin(x * freq + t + phase) * amp + Math.sin(x * freq * 1.7 + t * 0.6 + phase) * (amp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w % 2 === 0 ? `rgba(228,210,80,${0.2 - w * 0.02})` : `rgba(193,123,90,${0.13 - w * 0.01})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden />;
}

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
      <motion.div style={{ scaleX, transformOrigin: "left" }} className="fixed top-0 left-0 right-0 h-px bg-[var(--foreground)] z-50 pointer-events-none" />
      <AnimatePresence>
        {navVisible && (
          <motion.nav initial={{ y: -48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -48, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)]" style={{ backgroundColor: "rgba(250,248,245,0.92)", backdropFilter: "blur(12px)", ...FONT }}>
            <div className="max-w-5xl mx-auto px-6 sm:px-16 h-12 flex items-center justify-between">
              <a href="#" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">NM</a>
              <div className="flex items-center gap-6 sm:gap-8">
                {[{ label: "Work", href: "#work" }, { label: "About", href: "#about" }, { label: "Contact", href: "#contact" }].map(({ label, href }) => (
                  <a key={label} href={href} className="hidden sm:block text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">{label}</a>
                ))}
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-[11px] font-normal tracking-[0.15em] uppercase text-[var(--background)] bg-[var(--foreground)] px-4 py-1.5 hover:bg-[var(--accent)] transition-colors duration-200">Résumé</a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <div aria-hidden className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "110vh", left: "2%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(228,210,80,0.28) 0%, transparent 68%)", filter: "blur(16px)" }} />
        <div style={{ position: "absolute", top: "180vh", right: "0%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(193,123,90,0.14) 0%, transparent 70%)", filter: "blur(20px)" }} />
      </div>
      <motion.div initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: 0.85, delay: 0.1, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[100] pointer-events-none" style={{ background: "var(--background)" }} />

      {/* ── HERO: Animated Canvas ── */}
      <section className="relative min-h-[100dvh] flex flex-col justify-between px-6 sm:px-16 py-10 overflow-hidden" style={{ ...FONT, zIndex: 1 }}>
        <WaveCanvas />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7, ease: EASE }} className="relative z-10 flex items-center justify-between">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[var(--midtone)]">Niharika Mishra · Experience Design · Capital One</p>
          <div className="flex items-center gap-6">
            {[{ label: "Work", href: "#work" }, { label: "About", href: "#about" }, { label: "Résumé ↗", href: "/resume.pdf", external: true }].map(({ label, href, external }) => (
              <a key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hidden sm:block text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200">{label}</a>
            ))}
          </div>
        </motion.div>

        <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
          {["I choose problems", "that matter to people."].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.p initial={{ y: "106%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.9 + i * 0.1, ease: EASE }} className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(32px, 5vw, 68px)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {line}{i === 1 && <span style={{ color: "var(--accent)" }}>.</span>}
              </motion.p>
            </div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.4, ease: EASE }} className="relative z-10 flex justify-end">
          <div className="flex flex-col items-end" style={{ lineHeight: 1 }}>
            <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em", color: "var(--foreground)" }}>{String(new Date().getMonth() + 1).padStart(2, "0")}</p>
            <p className="font-semibold tabular-nums" style={{ fontSize: "clamp(20px, 2.5vw, 30px)", letterSpacing: "-0.02em", color: "var(--foreground)" }}>{String(new Date().getDate()).padStart(2, "0")}<span style={{ color: "var(--accent)" }}>.</span></p>
          </div>
        </motion.div>
      </section>

      <main className="relative flex flex-col w-full max-w-5xl mx-auto px-8 sm:px-16" style={{ ...FONT, zIndex: 1 }}>
        <section id="work" className="py-12 sm:py-16 flex flex-col gap-16">
          <FadeIn><p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>Every project started with a human question.</p></FadeIn>
          <SurferJourney />
        </section>
        <section id="about" className="py-12 sm:py-16 flex flex-col gap-20">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <FadeIn><p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>The choices weren't accidental.</p></FadeIn>
            <div className="flex flex-col gap-5 text-sm font-light leading-[1.9]" style={{ color: "#3A3530" }}>
              {["My foundation as an engineer was fueled by a lifelong curiosity to understand how things work. Moving into design felt natural; I wanted to get closer to the why behind how people think, struggle, and make decisions.", "I'm drawn to messy, human problems. The kind where the problem statement is still being written. That's what pulled me into HR tech at Capital One, where I spent years rethinking how performance management could actually serve people, not just process them.", "Now I build too. Vibe coding has unlocked something for me: I can move from insight to working product faster than ever, and my engineering background means I'm not guessing at what's possible. I think in systems, design for humans, and build to ship.", "Design and engineering are how I build good for the world. I'm looking for teams where that combo and that drive actually matter."].map((p, i) => (
                <FadeIn key={i} delay={i * 0.08} distance={12}><p>{p}</p></FadeIn>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <FadeIn><p className="text-[10px] font-normal tracking-[0.28em] uppercase text-[var(--midtone)]">Skills</p></FadeIn>
            <div className="flex flex-wrap gap-2">{skills.map((s, i) => <SkillPill key={s} skill={s} delay={i * 0.04} />)}</div>
          </div>
        </section>
        <section id="contact" className="py-12 sm:py-16 flex flex-col gap-16">
          <div className="flex flex-col gap-12">
            <FadeIn><p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2vw, 24px)", letterSpacing: "-0.01em" }}>If the problem matters to people, I want in.</p></FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-8">
                {[{ label: "Email", href: "mailto:niharika@example.com" }, { label: "LinkedIn", href: "https://linkedin.com/in/niharikamishra", external: true }, { label: "GitHub", href: "https://github.com/niharikamishra", external: true }, { label: "Résumé", href: "/resume.pdf", external: true }].map(({ label, href, external }) => (
                  <a key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-[11px] font-normal tracking-[0.2em] uppercase text-[var(--midtone)] hover:text-[var(--foreground)] transition-colors duration-200 border-b border-[var(--border)] pb-0.5 hover:border-[var(--foreground)]">{label}</a>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
        <footer className="py-10 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">© 2026 Niharika Mishra</p>
          <p className="text-[10px] font-light text-[var(--midtone)] tracking-wide">Built with intention. Built with <span style={{ color: "var(--accent)" }}>Claude Code</span>.</p>
        </footer>
      </main>
    </>
  );
}
