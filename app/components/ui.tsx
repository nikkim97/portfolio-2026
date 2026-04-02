"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function useFadeInOnScroll(threshold = 0.1) {
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

export function FadeIn({
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

export function EditorialSection({ number, label }: { number: string; label: string }) {
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

export function SkillPill({ skill, delay }: { skill: string; delay: number }) {
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
