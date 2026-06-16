"use client";

// Drop-in animated metric. Parses a value string (e.g. "65%", "↓ 50%",
// "18+ → 4", "70,000+", "> 80%"), counts each number 0 → target when it scrolls
// into view, and slides the arrows / comparison symbols in. Non-number text
// (%, +, units) renders as-is. Returns an inline <span>, so the parent keeps its
// own font styling (tabular-nums recommended to limit width jitter).

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Token = { type: "num" | "sym" | "text"; raw: string };

const EASE = [0.22, 1, 0.36, 1] as const;

function tokenize(value: string): Token[] {
  const tokens: Token[] = [];
  const re = /(\d[\d,]*(?:\.\d+)?)|([↓↑→←↗↘><])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    if (m.index > last) tokens.push({ type: "text", raw: value.slice(last, m.index) });
    if (m[1] !== undefined) tokens.push({ type: "num", raw: m[1] });
    else if (m[2] !== undefined) tokens.push({ type: "sym", raw: m[2] });
    last = re.lastIndex;
  }
  if (last < value.length) tokens.push({ type: "text", raw: value.slice(last) });
  return tokens;
}

function AnimatedNumber({ raw, play, delay }: { raw: string; play: boolean; delay: number }) {
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const hasComma = raw.includes(",");
  const target = parseFloat(raw.replace(/,/g, ""));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!play) return;
    const controls = animate(0, target, {
      duration: 1.2,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [play, target, delay]);

  const n = play ? display : 0;
  const fixed = n.toFixed(decimals);
  const out = hasComma
    ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : fixed;
  return <span>{out}</span>;
}

// Each symbol slides in from the direction it points.
const SYM_FROM: Record<string, { x?: number; y?: number }> = {
  "↓": { y: -7 },
  "↘": { y: -7 },
  "↑": { y: 7 },
  "→": { x: -7 },
  "↗": { x: -7 },
  "←": { x: 7 },
  ">": { x: -7 },
  "<": { x: 7 },
};

function AnimatedSym({ raw, play, delay }: { raw: string; play: boolean; delay: number }) {
  const from = SYM_FROM[raw] ?? { x: -7 };
  return (
    <motion.span
      style={{ display: "inline-block" }}
      initial={{ opacity: 0, ...from }}
      animate={play ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...from }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {raw}
    </motion.span>
  );
}

export default function AnimatedStat({ value, className, style }: { value: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const tokens = tokenize(value);
  let numIdx = 0;
  return (
    <span ref={ref} className={className} style={style}>
      {tokens.map((t, i) => {
        if (t.type === "num") {
          const d = numIdx++ * 0.15;
          return <AnimatedNumber key={i} raw={t.raw} play={inView} delay={d} />;
        }
        if (t.type === "sym") {
          return <AnimatedSym key={i} raw={t.raw} play={inView} delay={0.15} />;
        }
        return <span key={i}>{t.raw}</span>;
      })}
    </span>
  );
}
