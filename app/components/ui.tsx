"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const FONT = { fontFamily: "var(--font-poppins), sans-serif" };

export const GLASS = {
  border: "1px solid var(--glass-border)",
  background: "var(--glass-bg)",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  boxShadow: "var(--glass-shadow)",
};

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

export function FadeIn({
  children, delay = 0, className = "", distance = 20,
}: {
  children: React.ReactNode; delay?: number; className?: string; distance?: number;
}) {
  const prefersReduced = useReducedMotion();
  const { ref, visible } = useFadeInOnScroll();
  const d = prefersReduced ? 0 : distance;
  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, y: d }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: prefersReduced ? 0 : 0.8, delay: prefersReduced ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Word-by-word mask reveal: each word slides up from below its own clip box, staggered.
export function WordStaggerLine({
  text,
  trigger = "mount",
  startDelay = 0,
  perWord = 0.06,
  duration = 0.8,
}: {
  text: string;
  trigger?: "mount" | "inView";
  startDelay?: number;
  perWord?: number;
  duration?: number;
}) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(trigger === "mount");

  useEffect(() => {
    if (trigger === "mount") return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  // Reduced motion: render the line as plain text, no per-word slide-up.
  if (prefersReduced) {
    return <span ref={wrapperRef}>{text}</span>;
  }

  return (
    <span ref={wrapperRef}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
            <motion.span
              initial={{ y: "110%" }}
              animate={visible ? { y: 0 } : { y: "110%" }}
              transition={{ duration, delay: startDelay + i * perWord, ease: EASE }}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
}

export function SkillPill({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="text-[13px] px-3.5 py-2 cursor-default tracking-wide font-normal"
      style={{
        color: "var(--foreground)",
        borderRadius: "18px",
        border: "1px solid var(--glass-border)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
      {skill}
    </motion.span>
  );
}
