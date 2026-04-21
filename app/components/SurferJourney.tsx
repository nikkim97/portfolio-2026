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
              {node.pill && (
                <span
                  className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                  style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent", opacity: hasCard ? 1 : 0.7 }}
                >
                  {node.pill}
                </span>
              )}
            </div>
            {node.role && (
              <p className="font-semibold leading-snug" style={{ fontSize: 12, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
                {node.role}
              </p>
            )}
            {node.title && (
              <p className="font-semibold leading-snug" style={{ fontSize: 14, color: "var(--foreground)", letterSpacing: "-0.015em" }}>
                {node.title}
              </p>
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

const CARD_W = 210;
const CARD_H = 185;
const ZONE = 25;

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

  const [flippedSet, setFlippedSet] = useState<Set<number>>(new Set());
  const inZoneRef = useRef<boolean[]>(journeyNodes.map(() => false));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "end 100%"],
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
      const pt2 = p.getPointAtLength(Math.min(len + 10, pathLen));
      const angle = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * (180 / Math.PI);
      const displayAngle = v > 0.98 ? 180 : angle;
      s.style.left = `calc(50% - ${SVG_W / 2}px + ${pt.x}px)`;
      s.style.top = `${pt.y}px`;
      s.style.transform = `translate(-50%, -50%) rotate(${displayAngle - 90}deg)`;

      const newY = pt.y;
      WAVE_ANCHORS.forEach((anchor, i) => {
        if (journeyNodes[i].type === "career") return;
        const inZone = Math.abs(newY - anchor.y) <= ZONE;
        if (inZone && !inZoneRef.current[i]) {
          setFlippedSet(prev => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });
        }
        inZoneRef.current[i] = inZone;
      });

      setSurferY(newY);
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
                  {node.pill && (
                    <span
                      className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                      style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent", opacity: 0.7 }}
                    >
                      {node.pill}
                    </span>
                  )}
                </div>
                {node.role && (
                  <p className="font-semibold leading-snug" style={{ fontSize: 11, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
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

        // Project / horizon nodes — flip card
        const isActionable = !!node.href && !node.comingSoon;
        const isFlipped = flippedSet.has(i);
        const CardLink = isActionable ? "a" : "div";
        const cardStyle: React.CSSProperties = {
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          padding: "14px 16px",
          ...GLASS,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          overflow: "hidden",
        };

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
            }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ perspective: 900, width: CARD_W, height: CARD_H }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: EASE }}
                style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
              >
                {/* Front face — visual + title + pill */}
                <div style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                  <span style={{ fontSize: 44, lineHeight: 1 }}>{node.visual}</span>
                  <p className="font-semibold" style={{ fontSize: 13, color: "var(--foreground)", letterSpacing: "-0.015em", textAlign: "center", lineHeight: 1.3 }}>
                    {node.title}
                  </p>
                  {node.pill && (
                    <span
                      className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                      style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent" }}
                    >
                      {node.pill}
                    </span>
                  )}
                </div>

                {/* Back face — details */}
                <div style={{ ...cardStyle, transform: "rotateY(180deg)", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--midtone)" }}>
                      {node.period}
                    </span>
                    {node.pill && (
                      <span
                        className="text-[9px] tracking-[0.12em] uppercase px-1.5 py-0.5 border"
                        style={{ color: "var(--midtone)", borderColor: "var(--border)", background: "transparent" }}
                      >
                        {node.pill}
                      </span>
                    )}
                  </div>
                  {node.role && (
                    <p className="font-semibold leading-snug" style={{ fontSize: 10, color: "var(--foreground)", letterSpacing: "-0.01em" }}>
                      {node.role}
                    </p>
                  )}
                  <p className="font-light leading-relaxed" style={{ fontSize: 10, color: "var(--midtone)", flex: 1 }}>
                    {node.brief}
                  </p>
                  {node.comingSoon ? (
                    <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: "var(--midtone)" }}>Coming Soon</span>
                  ) : isHorizon ? (
                    <span className="text-[9px] tracking-[0.14em] uppercase" style={{ color: "var(--midtone)" }}>Built with Claude Code</span>
                  ) : (
                    <span className="text-[9px] tracking-[0.14em] uppercase opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--foreground)" }}>
                      View case study ↗
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </CardLink>
        );
      })}

      {/* Tail label */}
      <div
        className="absolute"
        style={{ top: 1375, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
      >
        <p className="text-[9px] tracking-[0.22em] uppercase text-[var(--midtone)]">
          still riding
        </p>
      </div>
    </div>
  );
}
