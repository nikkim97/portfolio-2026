"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./ui";
import { journeyNodes, WAVE_PATH_D, SVG_W, SVG_H, WAVE_ANCHORS } from "./journeyData";

export default function SurferJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const surferRef = useRef<HTMLDivElement>(null);
  const [surferY, setSurferY] = useState(50); // only for isPassed dot activation

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 100%"],
  });

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (pathLen === 0) return;
    // Initialise dash so line is fully hidden before scroll starts
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

      // Draw line — same frame, raw DOM, no framer-motion batching
      d.style.strokeDashoffset = `${pathLen - len}`;

      // Move surfer
      const pt = p.getPointAtLength(len);
      const pt2 = p.getPointAtLength(Math.min(len + 10, pathLen));
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
      const displayAngle = v > 0.98 ? 180 : angle;
      s.style.left = `calc(50% - ${SVG_W / 2}px + ${pt.x}px)`;
      s.style.top = `${pt.y}px`;
      s.style.transform = `translate(-50%, -50%) rotate(${displayAngle - 90}deg)`;
      setSurferY(pt.y);
    });
  }, [scrollYProgress, pathLen]);

  const isPassed = WAVE_ANCHORS.map(a => surferY >= a.y);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: SVG_H }}>

      {/* Wave SVG */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width={SVG_W}
        height={SVG_H}
        aria-hidden
        className="absolute pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)", top: 0 }}
      >
        {/* Ghost path — also used for surfer position calculations */}
        <path
          ref={pathRef as React.Ref<SVGPathElement>}
          d={WAVE_PATH_D} stroke="var(--border)" strokeWidth="1" fill="none" strokeLinecap="round"
        />

        {/* Terracotta reveal — raw DOM updates for frame-perfect sync with surfer */}
        <path
          ref={drawPathRef}
          d={WAVE_PATH_D}
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Anchor dots + splash */}
        {WAVE_ANCHORS.map((a, i) => {
          const node = journeyNodes[i];
          const isCareer = node.type === "career";
          const passed = isPassed[i];
          return (
            <g key={i}>
              {!isCareer && (
                <circle cx={a.x} cy={a.y} r={passed ? 10 : 8}
                  fill="var(--accent)" opacity={passed ? 0.18 : 0.1}
                  style={{ transition: "r 0.3s ease, opacity 0.3s ease" }}
                />
              )}
              <circle
                cx={a.x} cy={a.y}
                r={isCareer ? 3 : 4.5}
                fill={isCareer && !passed ? "var(--background)" : "var(--accent)"}
                stroke={isCareer && !passed ? "var(--midtone)" : "none"}
                strokeWidth="1"
              />
              {passed && (
                <motion.circle
                  cx={a.x} cy={a.y} r={isCareer ? 6 : 9}
                  fill="none" stroke="var(--accent)" strokeWidth="1"
                  style={{ originX: 0.5, originY: 0.5 }}
                  initial={{ scale: 1, opacity: 0.65 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              )}
              {passed && (
                <motion.circle
                  cx={a.x} cy={a.y} r={isCareer ? 4 : 6}
                  fill="none" stroke="var(--accent)" strokeWidth="0.8"
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

        const posLeft = isRight ? `calc(50% - ${SVG_W / 2}px + ${a.x + GAP}px)` : undefined;
        const posRight = !isRight ? `calc(50% - ${SVG_W / 2}px + ${SVG_W - a.x + GAP}px)` : undefined;

        const isActionable = !isCareer && !node.comingSoon;

        const Wrapper = isActionable ? "a" : "div";

        return (
          <Wrapper
            key={node.id}
            {...(isActionable ? { href: node.href } : {})}
            className="absolute group"
            style={{
              top: a.y, left: posLeft, right: posRight,
              transform: "translateY(-50%)",
              cursor: isActionable ? "pointer" : "default",
              textDecoration: "none",
            }}
          >
            <div
              className="flex flex-col gap-1 transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
              style={{
                maxWidth: isCareer ? 160 : 210,
                textAlign: isRight ? "left" : "right",
                ...(isCareer ? {} : {
                  padding: "12px 16px",
                  borderRadius: "18px",
                  border: "1px solid rgba(255,255,255,0.65)",
                  background: "rgba(255,255,255,0.32)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                  boxShadow: "0 6px 28px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.75)",
                }),
              }}
            >
              <div className={`flex items-center gap-1.5 ${isRight ? "" : "justify-end"}`}>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: isCareer ? "var(--midtone)" : "var(--accent)" }}
                >
                  {node.period}
                </span>
                {node.pill && (
                  <span
                    className="text-[8px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                    style={{
                      color: isCareer ? "var(--midtone)" : "var(--accent)",
                      borderColor: isCareer ? "var(--border)" : "var(--accent)",
                      opacity: isCareer ? 0.7 : 1,
                    }}
                  >
                    {node.pill}
                  </span>
                )}
              </div>
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
                  Coming Soon
                </span>
              )}
              {isActionable && (
                <span
                  className="text-[9px] tracking-[0.14em] uppercase mt-1 opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--accent)" }}
                >
                  View case study ↗
                </span>
              )}
            </div>
          </Wrapper>
        );
      })}

      {/* Tail label */}
      <div
        className="absolute"
        style={{ top: 1225, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
      >
        <p className="text-[9px] tracking-[0.22em] uppercase text-[var(--midtone)]">
          still riding
        </p>
      </div>
    </div>
  );
}
