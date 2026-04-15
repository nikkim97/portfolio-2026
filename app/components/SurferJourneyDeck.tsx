"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { journeyNodes, JourneyNode } from "./journeyData";
import { EASE, FONT } from "./ui";

const deckNodes = journeyNodes.filter(n => n.type !== "career");

const CARD_W = 260;
const CARD_H = 360;
const X_OFFSET = 175;
const DARK_BG = "#0F0D0B";
const ACCENT = "#C17B5A";
const TEXT = "#F5F1EB";

const CATEGORIES = [
  { label: "Hardware Projects",     ids: ["visn"] },
  { label: "Enterprise Solutions",  ids: ["sa-xd", "path-360", "path-people"] },
  { label: "Vibe Coded",            ids: ["bloom", "time-tracker"] },
];

// ── Individual card ──────────────────────────────────────────────────────────

interface CardProps {
  node: JourneyNode;
  index: number;
  activeFloat: MotionValue<number>;
  activeIndex: number;
}

function DeckCard({ node, index, activeFloat, activeIndex }: CardProps) {
  const x       = useTransform(activeFloat, v => (index - v) * X_OFFSET);
  const scale   = useTransform(activeFloat, v => Math.max(0, 1 - Math.abs(index - v) * 0.15));
  const opacity = useTransform(activeFloat, v => Math.max(0, 1 - Math.abs(index - v) * 0.42));
  const rotateY = useTransform(activeFloat, v => (index - v) * 18);

  const zIndex = 10 - Math.abs(index - activeIndex);
  const isActionable = !!node.href && !node.comingSoon;

  return (
    <motion.a
      href={isActionable ? node.href : undefined}
      style={{
        x, scale, rotateY, opacity, zIndex,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 20,
        overflow: "hidden",
        cursor: isActionable ? "pointer" : "default",
        textDecoration: "none",
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <div style={{ height: "60%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, background: "rgba(255,255,255,0.03)" }}>
        {node.visual}
      </div>
      <div style={{ height: "40%", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 5, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: ACCENT }}>
            {node.period}
          </span>
          {node.pill && (
            <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 6px", border: "1px solid rgba(193,123,90,0.3)", color: ACCENT, background: "rgba(193,123,90,0.08)" }}>
              {node.pill}
            </span>
          )}
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: TEXT, letterSpacing: "-0.015em", lineHeight: 1.25 }}>
          {node.title}
        </p>
        {node.role && (
          <p style={{ fontSize: 10, fontWeight: 300, color: "rgba(245,241,235,0.45)", lineHeight: 1.4 }}>
            {node.role}
          </p>
        )}
        <div style={{ marginTop: "auto" }}>
          {node.comingSoon ? (
            <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,241,235,0.3)" }}>Coming Soon</span>
          ) : node.type === "horizon" ? (
            <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>Built with Claude Code</span>
          ) : (
            <span style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>View case study ↗</span>
          )}
        </div>
      </div>
    </motion.a>
  );
}

// ── Progress dot ─────────────────────────────────────────────────────────────

function Dot({ index, activeFloat }: { index: number; activeFloat: MotionValue<number> }) {
  const width      = useTransform(activeFloat, v => Math.abs(index - v) < 0.5 ? 20 : 5);
  const background = useTransform(activeFloat, v => Math.abs(index - v) < 0.5 ? ACCENT : "rgba(245,241,235,0.2)");
  return <motion.div style={{ width, height: 5, borderRadius: 3, background }} />;
}

// ── Main component ───────────────────────────────────────────────────────────

export default function SurferJourneyDeck() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex]       = useState(0);
  const [selectedCat, setSelectedCat]       = useState<string | null>(null);
  const filteredLengthRef                   = useRef(deckNodes.length);

  const filteredNodes = selectedCat
    ? deckNodes.filter(n => CATEGORIES.find(c => c.label === selectedCat)?.ids.includes(n.id))
    : deckNodes;

  filteredLengthRef.current = filteredNodes.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeFloat = useTransform(scrollYProgress, v =>
    v * Math.max(0, filteredLengthRef.current - 1)
  );

  useMotionValueEvent(activeFloat, "change", v => setActiveIndex(Math.round(v)));

  const selectCategory = (label: string) => {
    setSelectedCat(prev => prev === label ? null : label);
    setActiveIndex(0);
  };

  return (
    <div ref={containerRef} style={{ height: `${filteredNodes.length * 700}px`, ...FONT }}>
      <div
        className="sticky top-0 flex flex-col overflow-hidden"
        style={{ height: "100vh", background: DARK_BG }}
      >
        {/* Warm vignette */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(193,123,90,0.08) 0%, transparent 70%)" }} />

        {/* Header */}
        <div className="flex-shrink-0 pt-10 pb-5 text-center relative z-10">
          <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,241,235,0.25)", marginBottom: 8 }}>
            The Journey
          </p>
          <p style={{ fontSize: "clamp(15px, 1.5vw, 20px)", fontWeight: 300, color: TEXT, letterSpacing: "-0.01em", opacity: 0.7 }}>
            Every project started with a human question.
          </p>
        </div>

        {/* Category nav */}
        <div className="flex-shrink-0 flex justify-center gap-2 pb-6 relative z-10">
          {CATEGORIES.map(({ label }) => {
            const active = selectedCat === label;
            return (
              <motion.button
                key={label}
                onClick={() => selectCategory(label)}
                animate={{
                  background: active ? "rgba(193,123,90,0.2)" : "rgba(255,255,255,0.06)",
                  borderColor: active ? "rgba(193,123,90,0.5)" : "rgba(255,255,255,0.1)",
                  color: active ? ACCENT : "rgba(245,241,235,0.45)",
                }}
                transition={{ duration: 0.2, ease: EASE }}
                style={{
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: 999,
                  border: "1px solid",
                  cursor: "pointer",
                }}
              >
                {label}
              </motion.button>
            );
          })}
        </div>

        {/* Card deck */}
        <div className="flex-1 relative z-10" style={{ perspective: 1200 }}>
          {filteredNodes.map((node, i) => (
            <DeckCard
              key={node.id}
              node={node}
              index={i}
              activeFloat={activeFloat}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* Counter + dots */}
        <div className="flex-shrink-0 pb-10 flex flex-col items-center gap-3 relative z-10">
          <p style={{ fontSize: 9, letterSpacing: "0.18em", color: "rgba(245,241,235,0.2)" }}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(filteredNodes.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2 items-center">
            {filteredNodes.map((_, i) => (
              <Dot key={i} index={i} activeFloat={activeFloat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
