"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "./ui";
import { journeyNodes, WAVE_PATH_D, SVG_W, SVG_H, WAVE_ANCHORS } from "./journeyData";

export default function SurferJourney() {
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

  const isPassed = WAVE_ANCHORS.map(a => surfer.y >= a.y);

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
        {/* Ghost path */}
        <path d={WAVE_PATH_D} stroke="var(--border)" strokeWidth="1" fill="none" strokeLinecap="round" />

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
              {passed && !isCareer && (
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

        {/* Fading tail */}
        <path
          d="M460,2450 C460,2560 300,2620 300,2650"
          stroke="var(--border)" strokeWidth="1" fill="none"
          strokeLinecap="round" opacity={0.35}
        />
      </svg>

      {/* Surfer */}
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

        const posLeft = isRight ? `calc(50% - ${SVG_W / 2}px + ${a.x + GAP}px)` : undefined;
        const posRight = !isRight ? `calc(50% - ${SVG_W / 2}px + ${SVG_W - a.x + GAP}px)` : undefined;

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
