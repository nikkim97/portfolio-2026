"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const FONT = { fontFamily: "var(--font-poppins), sans-serif" };

export const GLASS = {
  border: "1px solid rgba(255,255,255,0.65)",
  background: "rgba(255,255,255,0.32)",
  backdropFilter: "blur(22px)",
  WebkitBackdropFilter: "blur(22px)",
  boxShadow: "0 6px 28px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
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

export function SkillPill({ skill, delay }: { skill: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="text-[11px] px-3 py-1.5 cursor-default tracking-wide font-light"
      style={{ color: "var(--foreground)", borderRadius: "18px", ...GLASS }}
    >
      {skill}
    </motion.span>
  );
}
