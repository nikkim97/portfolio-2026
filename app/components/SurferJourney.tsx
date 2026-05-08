"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, GLASS } from "./ui";
import { journeyNodes, WAVE_PATH_D, SVG_W, SVG_H, WAVE_ANCHORS } from "./journeyData";

function MobileCardSwitcher() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStartX = useRef(0);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const node = journeyNodes[index];
  const isCareer = node.type === "career";
  const hasCard = !isCareer;
  const isActionable = !!node.href && !node.comingSoon;
  const Wrapper = isActionable ? "a" : "div";

  return (
    <div className="flex flex-col gap-5">
      <div
        className="relative overflow-hidden"
        style={{ minHeight: 160 }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (dx > 40 && index < journeyNodes.length - 1) go(index + 1);
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
            className="flex flex-col gap-2"
            style={{
              textDecoration: "none",
              ...(hasCard ? {
                padding: "16px 20px",
                borderRadius: "18px",
                ...GLASS,
              } : {
                paddingLeft: 16,
                borderLeft: "2px solid var(--border)",
              }),
            }}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--midtone)", opacity: hasCard ? 1 : 0.7 }}>
                {node.period}
              </span>
              {node.pills?.map((p) => (
                <span
                  key={p}
                  className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                  style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent", opacity: hasCard ? 1 : 0.7 }}
                >
                  {p}
                </span>
              ))}
            </div>
            {node.title && (
              <p
                className="leading-snug"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "italic",
                  fontSize: 16,
                  color: "var(--foreground)",
                  letterSpacing: 0,
                }}
              >
                {node.title}
              </p>
            )}
            {node.role && (
              node.title ? (
                <p className="font-semibold leading-snug" style={{ fontSize: 12, color: "var(--foreground)", letterSpacing: "-0.005em" }}>
                  {node.role}
                </p>
              ) : (
                <p className="font-semibold leading-snug" style={{ fontSize: 12, color: "var(--foreground)", letterSpacing: "-0.015em" }}>
                  {node.role}
                </p>
              )
            )}
            <p className="font-light leading-relaxed" style={{ fontSize: 12, color: "var(--midtone)" }}>
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
          {journeyNodes.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
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
          disabled={index === journeyNodes.length - 1}
          className="text-[11px] tracking-[0.15em] uppercase transition-opacity duration-200"
          style={{ color: "var(--midtone)", opacity: index === journeyNodes.length - 1 ? 0.25 : 1 }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

const CARD_W = 268;

export default function SurferJourney() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const surferRef = useRef<HTMLDivElement>(null);
  const [surferY, setSurferY] = useState(50);
  const everPassedRef = useRef<Set<number>>(new Set());

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (pathLen === 0) return;
    if (drawPathRef.current) {
      drawPathRef.current.style.strokeDasharray = `${pathLen}`;
      drawPathRef.current.style.strokeDashoffset = `${pathLen}`;
    }
    return scrollYProgress.on("change", (v) => {
      const p = pathRef.current;
      const d = drawPathRef.current;
      const s = surferRef.current;
      if (!p || !d || !s) return;
      const len = Math.max(0, Math.min(v * pathLen, pathLen));

      d.style.strokeDashoffset = `${pathLen - len}`;

      const pt = p.getPointAtLength(len);
      const eps = 5;
      const ptA = p.getPointAtLength(Math.min(len + eps, pathLen));
      const ptB = p.getPointAtLength(Math.max(len - eps, 0));
      const angle = Math.atan2(ptA.y - ptB.y, ptA.x - ptB.x) * (180 / Math.PI);
      s.style.left = `calc(50% - ${SVG_W / 2}px + ${pt.x}px)`;
      s.style.top = `${pt.y}px`;
      s.style.transform = `translate(-50%, -50%) rotate(${angle - 90}deg)`;

      WAVE_ANCHORS.forEach((anchor, idx) => {
        if (pt.y >= anchor.y) everPassedRef.current.add(idx);
      });

      setSurferY(pt.y);
    });
  }, [scrollYProgress, pathLen]);

  const isPassed = WAVE_ANCHORS.map(a => surferY >= a.y);

  if (isMobile) return <MobileCardSwitcher />;

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
          d={WAVE_PATH_D} stroke="var(--border)" strokeWidth="1" fill="none" strokeLinecap="round"
        />
        <path
          ref={drawPathRef}
          d={WAVE_PATH_D}
          stroke="var(--foreground)"
          strokeWidth="1.5"
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
              {passed && (
                <motion.circle
                  cx={a.x} cy={a.y} r={isCareer ? 6 : 9}
                  fill="none" stroke="var(--foreground)" strokeWidth="1"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={{ scale: 1, opacity: 0.65 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
              {passed && (
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
          left: `calc(50% - ${SVG_W / 2}px + 300px)`,
          top: 20,
          transform: "translate(-50%, -50%) rotate(0deg)",
          fontSize: 28,
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
        const everPassed = everPassedRef.current.has(i);
        const inZone = Math.abs(surferY - a.y) <= 70;
        const GAP = 20;

        const posLeft = isRight ? `calc(50% - ${SVG_W / 2}px + ${a.x + GAP}px)` : undefined;
        const posRight = !isRight ? `calc(50% - ${SVG_W / 2}px + ${SVG_W - a.x + GAP}px)` : undefined;

        // Career nodes — simple left-border text style
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
                  borderLeft: isRight ? "2px solid var(--border)" : "none",
                  borderRight: !isRight ? "2px solid var(--border)" : "none",
                }}
              >
                <div className={`flex items-center gap-1.5 ${isRight ? "" : "justify-end"}`}>
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--midtone)", opacity: 0.7 }}>
                    {node.period}
                  </span>
                  {node.pills?.map((p) => (
                    <span
                      key={p}
                      className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                      style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent", opacity: 0.7 }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                {node.role && (
                  <p className="font-semibold leading-snug" style={{ fontSize: 12, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
                    {node.role}
                  </p>
                )}
                <p className="font-light leading-relaxed" style={{ fontSize: 11, color: "var(--midtone)" }}>
                  {node.brief}
                </p>
              </div>
            </div>
          );
        }

        // Project / horizon nodes — editorial two-section card
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
              animate={{ opacity: everPassed ? 1 : 0.5, scale: inZone ? 1.05 : 1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{
                width: "100%",
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "var(--background)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top section — image placeholder */}
              <div style={{ background: "#C9C2B6", minHeight: 130 }} />

              {/* Bottom section — content */}
              <div
                style={{
                  padding: "14px 18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: "var(--background)",
                }}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--midtone)" }}>
                    {node.period}
                  </span>
                  {node.pills?.map((p) => (
                    <span
                      key={p}
                      className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                      style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent" }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
                {node.title && (
                  <p style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "var(--foreground)",
                    letterSpacing: 0,
                    lineHeight: 1.25,
                  }}>
                    {node.title}
                  </p>
                )}
                {node.role && (
                  <p className="font-semibold leading-snug" style={{ fontSize: 12, color: "var(--foreground)", letterSpacing: "-0.005em" }}>
                    {node.role}
                  </p>
                )}
                <p style={{ fontSize: 11, color: "var(--midtone)", lineHeight: 1.55, fontWeight: 300, marginTop: 2 }}>
                  {node.brief}
                </p>
                {node.comingSoon ? (
                  <span className="mt-1" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--midtone)" }}>
                    Coming Soon
                  </span>
                ) : isActionable ? (
                  <span className="mt-1" style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--midtone)" }}>
                    View Case Study ↗
                  </span>
                ) : null}
              </div>
            </motion.div>
          </CardLink>
        );
      })}

      {/* Tail label */}
      <div
        className="absolute"
        style={{ top: 1545, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
      >
        <p className="text-[9px] tracking-[0.22em] uppercase text-[var(--midtone)]">
          still riding
        </p>
      </div>
    </div>
  );
}
