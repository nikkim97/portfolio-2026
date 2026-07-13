"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EASE, GLASS } from "./ui";
import { journeyNodes, WAVE_PATH_D, SVG_W, SVG_H, WAVE_ANCHORS } from "./journeyData";

const mobileJourneyNodes = journeyNodes.filter((node) => node.type !== "career");

function MobileCardSwitcher() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const node = mobileJourneyNodes[index];
  const hasCard = true;
  const isActionable = !!node.href && !node.comingSoon;
  const Wrapper = isActionable ? "a" : "div";

  return (
    <div className="flex flex-col gap-5">
      <div
        className="relative overflow-hidden"
        style={{ minHeight: hasCard ? 580 : 170 }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (dx > 40 && index < mobileJourneyNodes.length - 1) go(index + 1);
          if (dx < -40 && index > 0) go(index - 1);
        }}
      >
        <motion.div
          key={node.id}
          initial={{ x: dir * 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: dir * -40, opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <Wrapper
            {...(isActionable ? { href: node.href } : {})}
            className="flex flex-col gap-2 overflow-hidden"
            style={{
              textDecoration: "none",
              ...(hasCard ? {
                padding: 0,
                borderRadius: "12px",
                ...GLASS,
              } : {
                paddingLeft: 16,
                borderLeft: "2px solid var(--accent)",
              }),
            }}
          >
            {hasCard && (
              <div
                style={{
                  height: 340,
                  background: "linear-gradient(135deg, #CFC7B7 0%, #BEB39E 100%)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {node.image && (
                  <Image
                    src={node.image.src}
                    alt={node.image.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 500px"
                    style={{
                      objectFit: node.image.fit ?? "cover",
                      // Mobile: anchor to the top of each screenshot (crop from the
                      // bottom) rather than the middle, so headers/titles stay visible.
                      objectPosition: "center top",
                      transform: node.image.scale ? `scale(${node.image.scale})` : undefined,
                      filter: "saturate(0.95) contrast(1.02)",
                    }}
                  />
                )}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 -34px 54px rgba(36,33,23,0.12)",
                  }}
                />
              </div>
            )}
            <div className="flex flex-col gap-2" style={{ padding: hasCard ? "16px 20px 18px" : 0 }}>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--midtone)", opacity: hasCard ? 1 : 0.9 }}>
                {node.period}
              </span>
              {node.pills?.map((p) => (
                <span
                  key={p}
                  className="text-[10px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                  style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "rgba(255,255,255,0.22)", opacity: hasCard ? 1 : 0.9 }}
                >
                  {p}
                </span>
              ))}
            </div>
            {(node.role || node.title) && (
              <p
                className="font-semibold leading-snug"
                style={{
                  fontSize: 13,
                  color: "var(--foreground)",
                  letterSpacing: "-0.01em",
                }}
              >
                {node.role ?? node.title}
              </p>
            )}
            {node.role && node.title && (
              <p
                className="leading-snug"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "var(--foreground)",
                  letterSpacing: 0,
                }}
              >
                {node.title}
              </p>
            )}
            <p className="leading-relaxed" style={{ fontSize: 13, color: "#3A352B", fontWeight: 400 }}>
              {node.brief}
            </p>
            {node.type === "horizon" && !node.comingSoon && (
              <span className="text-[9px] tracking-[0.14em] uppercase mt-1" style={{ color: "var(--midtone)" }}>Built with Claude Code</span>
            )}
            {node.comingSoon && (
              <span className="text-[9px] tracking-[0.14em] uppercase mt-1 text-[var(--midtone)]">Coming Soon</span>
            )}
            {isActionable && !node.comingSoon && (
              <span className="text-[9px] tracking-[0.14em] uppercase mt-1" style={{ color: "var(--foreground)" }}>View case study ↗</span>
            )}
            </div>
          </Wrapper>
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="text-[11px] tracking-[0.15em] uppercase transition-opacity duration-200"
          style={{ color: "var(--midtone)", opacity: index === 0 ? 0.25 : 1 }}
        >
          ← Prev
        </button>
        <div className="flex items-center gap-1.5">
          {mobileJourneyNodes.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to project ${i + 1} of ${mobileJourneyNodes.length}`}
              aria-current={i === index ? "true" : undefined}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === index ? 16 : 5,
                height: 5,
                background: i === index ? "var(--foreground)" : "var(--border)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(index + 1)}
          disabled={index === mobileJourneyNodes.length - 1}
          className="text-[11px] tracking-[0.15em] uppercase transition-opacity duration-200"
          style={{ color: "var(--midtone)", opacity: index === mobileJourneyNodes.length - 1 ? 0.25 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

const CARD_W = 320;
// Uniform image-band height for all project/horizon cards (image or placeholder).
const CARD_IMG_H = 280;

export default function SurferJourney() {
  const prefersReduced = useReducedMotion();
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 1240);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const surferRef = useRef<HTMLDivElement>(null);
  const everPassedRef = useRef<Set<number>>(new Set());
  // Re-render only when these change — never per scroll frame. Both are keyed off
  // the surfer's monotonic progress (`best.len`), so they don't flicker in loops.
  const [passed, setPassed] = useState<boolean[]>(() => WAVE_ANCHORS.map(() => false));
  const [activeIdx, setActiveIdx] = useState(-1);
  const passedCountRef = useRef(0);
  const lastActiveRef = useRef(-1);
  // Sampled points along the path. `screenY` is a strictly-increasing version of
  // the path's y: loops (which curl back upward) are flattened into a small ramp
  // so one scroll position maps to exactly one point — no branch flipping.
  const samplesRef = useRef<{ len: number; x: number; y: number; screenY: number }[]>([]);
  // Path length at which each node's anchor sits, so we can tell which card the
  // surfer is currently riding by (monotonic, unlike raw y).
  const anchorLenRef = useRef<number[]>([]);

  // Sample the path once it's measurable.
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const total = p.getTotalLength();
    setPathLen(total);
    const N = 900;
    // Minimum monotonic rise per sample. Big enough to keep loops single-valued,
    // small enough that straight runs still track the real y closely.
    const MIN_STEP = 0.6;
    const arr: { len: number; x: number; y: number; screenY: number }[] = [];
    let prevScreenY = -Infinity;
    for (let i = 0; i <= N; i++) {
      const len = (total * i) / N;
      const pt = p.getPointAtLength(len);
      const screenY = Math.max(prevScreenY + MIN_STEP, pt.y);
      prevScreenY = screenY;
      arr.push({ len, x: pt.x, y: pt.y, screenY });
    }
    samplesRef.current = arr;
    // Map each anchor to the path length nearest it.
    anchorLenRef.current = WAVE_ANCHORS.map((a) => {
      let bestLen = 0;
      let bestCost = Infinity;
      for (const s of arr) {
        const c = (s.x - a.x) ** 2 + (s.y - a.y) ** 2;
        if (c < bestCost) { bestCost = c; bestLen = s.len; }
      }
      return bestLen;
    });
  }, []);

  useEffect(() => {
    if (pathLen === 0) return;
    const d = drawPathRef.current;
    if (d) {
      d.style.strokeDasharray = `${pathLen}`;
      d.style.strokeDashoffset = `${pathLen}`;
    }

    let raf = 0;
    const render = () => {
      raf = 0;
      const container = containerRef.current;
      const p = pathRef.current;
      const samples = samplesRef.current;
      if (!container || !p || !d || samples.length === 0) return;

      const rect = container.getBoundingClientRect();
      // The surfer rides whichever path point is currently at the viewport's
      // vertical center. Container height === SVG height, so container-local Y
      // maps 1:1 to the path's Y. This keeps the surfer in tune with the scroll
      // instead of racing ahead.
      const focusY = window.innerHeight * 0.5 - rect.top;

      // `screenY` is strictly increasing, so this maps the focus line to exactly
      // one point on the path — smooth through loops, no branch flipping.
      let best = samples[0];
      let bestCost = Infinity;
      for (const sg of samples) {
        const cost = Math.abs(sg.screenY - focusY);
        if (cost < bestCost) { bestCost = cost; best = sg; }
      }

      d.style.strokeDashoffset = `${pathLen - best.len}`;

      const s = surferRef.current;
      if (s) {
        const eps = 5;
        const ptA = p.getPointAtLength(Math.min(best.len + eps, pathLen));
        const ptB = p.getPointAtLength(Math.max(best.len - eps, 0));
        const dx = ptA.x - ptB.x;
        const dy = ptA.y - ptB.y;
        // Tilt to the path's slope but never flip upside down: mirror
        // horizontally for leftward travel and keep the tilt within ±90°.
        const flipX = dx < 0 ? -1 : 1;
        const tilt = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);
        s.style.left = `calc(50% - ${SVG_W / 2}px + ${best.x}px)`;
        s.style.top = `${best.y}px`;
        s.style.transform = `translate(-50%, -50%) scaleX(${flipX}) rotate(${tilt}deg)`;
      }

      // Passed set only grows (monotonic) — once the surfer reaches an anchor's
      // length it stays passed, even when a loop curls back up.
      anchorLenRef.current.forEach((aLen, idx) => {
        if (best.len >= aLen) everPassedRef.current.add(idx);
      });
      if (everPassedRef.current.size !== passedCountRef.current) {
        passedCountRef.current = everPassedRef.current.size;
        setPassed(WAVE_ANCHORS.map((_, idx) => everPassedRef.current.has(idx)));
      }

      // Card the surfer is currently riding by (within a small length window).
      let nearIdx = -1;
      let nearCost = Infinity;
      anchorLenRef.current.forEach((aLen, idx) => {
        const c = Math.abs(best.len - aLen);
        if (c < nearCost) { nearCost = c; nearIdx = idx; }
      });
      if (nearCost > 80) nearIdx = -1;
      if (nearIdx !== lastActiveRef.current) {
        lastActiveRef.current = nearIdx;
        setActiveIdx(nearIdx);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathLen]);

  const isPassed = passed;

  if (isCompact) return <MobileCardSwitcher />;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: SVG_H }}>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)", top: 0 }}
      >
        <path
          ref={pathRef as React.Ref<SVGPathElement>}
          d={WAVE_PATH_D} stroke="var(--border)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.72"
        />
        <path
          ref={drawPathRef}
          d={WAVE_PATH_D}
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {WAVE_ANCHORS.map((a, i) => {
          const node = journeyNodes[i];
          const isCareer = node.type === "career";
          const passed = isPassed[i];
          return (
            <g key={i}>
              {!isCareer && (
                <circle cx={a.x} cy={a.y} r={passed ? 10 : 8}
                  fill="var(--foreground)" opacity={passed ? 0.18 : 0.1}
                  style={{ transition: "r 0.3s ease, opacity 0.3s ease" }}
                />
              )}
              <circle
                cx={a.x} cy={a.y}
                r={isCareer ? 3 : 4.5}
                fill={isCareer && !passed ? "var(--background)" : "var(--foreground)"}
                stroke={isCareer && !passed ? "var(--midtone)" : "none"}
                strokeWidth="1"
              />
              {passed && !prefersReduced && (
                <motion.circle
                  cx={a.x} cy={a.y} r={isCareer ? 6 : 9}
                  fill="none" stroke="var(--foreground)" strokeWidth="1"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={{ scale: 1, opacity: 0.65 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
              {passed && !prefersReduced && (
                <motion.circle
                  cx={a.x} cy={a.y} r={isCareer ? 4 : 6}
                  fill="none" stroke="var(--foreground)" strokeWidth="0.8"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 5, opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Surfer */}
      <div
        ref={surferRef}
        aria-hidden
        className="absolute z-10 pointer-events-none select-none"
        style={{
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
          fontSize: 28,
          lineHeight: 1,
          visibility: pathLen === 0 ? "hidden" : "visible",
        }}
      >
        🏄🏾‍♀️
      </div>

      {/* Node cards */}
      {journeyNodes.map((node, i) => {
        const a = WAVE_ANCHORS[i];
        const isRight = a.side === "right";
        const isCareer = node.type === "career";
        const inZone = activeIdx === i;
        const GAP = 20;

        const posLeft = isRight ? `calc(50% - ${SVG_W / 2}px + ${a.x + GAP}px)` : undefined;
        const posRight = !isRight ? `calc(50% - ${SVG_W / 2}px + ${SVG_W - a.x + GAP}px)` : undefined;

        // Career nodes: simple left-border text style
        if (isCareer) {
          return (
            <div
              key={node.id}
              className="absolute"
              style={{ top: a.y, left: posLeft, right: posRight, transform: "translateY(-50%)" }}
            >
              <div
                style={{
                  maxWidth: 180,
                  textAlign: isRight ? "left" : "right",
                  paddingLeft: isRight ? 12 : 0,
                  paddingRight: isRight ? 0 : 12,
                  borderLeft: isRight ? "2px solid var(--accent)" : "none",
                  borderRight: !isRight ? "2px solid var(--accent)" : "none",
                }}
              >
                <div className={`flex items-center gap-1.5 ${isRight ? "" : "justify-end"}`}>
                  <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--midtone)", opacity: 0.9 }}>
                    {node.period}
                  </span>
                  {node.pills?.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                      style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "rgba(255,255,255,0.2)", opacity: 0.9 }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                {node.role && (
                  <p className="font-semibold leading-snug" style={{ fontSize: 14, color: "var(--foreground)", letterSpacing: "-0.01em", marginTop: 4 }}>
                    {node.role}
                  </p>
                )}
                <p className="leading-relaxed" style={{ fontSize: 13, color: "#3A352B", fontWeight: 400, marginTop: 5 }}>
                  {node.brief}
                </p>
              </div>
            </div>
          );
        }

        // Project / horizon nodes: editorial two-section card
        const isActionable = !!node.href && !node.comingSoon;
        const CardLink = isActionable ? "a" : "div";

        return (
          <CardLink
            key={node.id}
            {...(isActionable ? { href: node.href } : {})}
            className="absolute group"
            style={{
              top: a.y, left: posLeft, right: posRight,
              transform: "translateY(-50%)",
              textDecoration: "none",
              cursor: isActionable ? "pointer" : "default",
              width: CARD_W,
              position: "absolute",
            }}
          >
            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: inZone ? 1.055 : 1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                width: "100%",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...GLASS,
                border: inZone ? "1px solid rgba(155,101,57,0.58)" : GLASS.border,
                boxShadow: inZone
                  ? "0 18px 48px rgba(36,33,23,0.18), 0 0 0 6px rgba(155,101,57,0.09), inset 0 1px 0 rgba(255,255,255,0.86)"
                  : GLASS.boxShadow,
              }}
            >
              {/* Top section: image or placeholder */}
              <div
                style={{
                  background: "linear-gradient(135deg, #CFC7B7 0%, #BEB39E 100%)",
                  minHeight: CARD_IMG_H,
                  height: CARD_IMG_H,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {node.image && (
                  <Image
                    src={node.image.src}
                    alt={node.image.alt}
                    fill
                    sizes="320px"
                    style={{
                      objectFit: node.image.fit ?? "cover",
                      objectPosition: node.image.position ?? "center",
                      transform: node.image.scale ? `scale(${node.image.scale})` : undefined,
                      filter: inZone ? "saturate(1.04) contrast(1.03)" : "saturate(0.9) contrast(0.98)",
                      transition: "filter 0.4s ease",
                    }}
                  />
                )}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    boxShadow: "inset 0 -36px 56px rgba(36,33,23,0.12)",
                    opacity: inZone ? 0.65 : 0.35,
                    transition: "opacity 0.4s ease",
                  }}
                />
              </div>

              {/* Bottom section: content */}
              <div
                style={{
                  padding: "14px 18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 9,
                }}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--midtone)" }}>
                    {node.period}
                  </span>
                  {node.pills?.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                      style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "rgba(255,255,255,0.24)" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                {(node.role || node.title) && (
                  <p className="font-semibold leading-snug" style={{
                    fontSize: 13,
                    color: "var(--foreground)",
                    letterSpacing: "-0.01em",
                  }}>
                    {node.role ?? node.title}
                  </p>
                )}
                {node.role && node.title && (
                  <p style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontSize: 18,
                    color: "var(--foreground)",
                    letterSpacing: 0,
                    lineHeight: 1.35,
                  }}>
                    {node.title}
                  </p>
                )}
                <p style={{ fontSize: 13, color: "#3A352B", lineHeight: 1.55, fontWeight: 400, marginTop: 2 }}>
                  {node.brief}
                </p>
                {node.comingSoon ? (
                  <span className="mt-1" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--midtone)" }}>
                    Coming Soon
                  </span>
                ) : isActionable ? (
                  <span className="mt-1 transition-colors duration-200 group-hover:text-[var(--foreground)]" style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: inZone ? "var(--foreground)" : "var(--midtone)" }}>
                    View Case Study ↗
                  </span>
                ) : null}
              </div>
            </motion.div>
          </CardLink>
        );
      })}

    </div>
  );
}
