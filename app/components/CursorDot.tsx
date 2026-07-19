"use client";

import { useEffect, useRef, useState } from "react";

// Homepage-only custom cursor: a small dot that trails the mouse and grows into
// a soft ring over interactive elements. Fine-pointer devices only (mouse /
// trackpad); touch devices keep native behavior. mix-blend-difference keeps the
// dot visible over both light and dark surfaces and over images.
export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Detect a fine pointer (mouse/trackpad) first; this triggers a re-render that
  // mounts the dot element before the setup effect below runs.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  // Once enabled (and the dot is in the DOM), hide the native cursor and wire up
  // the follow/hover behavior. Runs only after the dot element exists.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;
    document.documentElement.classList.add("cursor-hidden");

    // Position the dot directly on the pointer inside a rAF so we paint at most
    // once per frame no matter how many mousemove events fire. No easing/trail,
    // so there's no perceptible lag.
    let px = window.innerWidth / 2;
    let py = window.innerHeight / 2;
    let raf = 0;
    const paint = () => {
      raf = 0;
      dot.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`;
    };

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
      dot.style.opacity = "1";
      const target = e.target as Element | null;
      const interactive = target?.closest?.(
        "a, button, [role='tab'], [role='button'], input, label"
      );
      if (interactive) {
        dot.style.width = "36px";
        dot.style.height = "36px";
        dot.style.background = "rgba(245,239,227,0.35)";
      } else {
        dot.style.width = "12px";
        dot.style.height = "12px";
        dot.style.background = "#F5EFE3";
      }
    };
    const onLeave = () => {
      dot.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full opacity-0"
      style={{
        width: 12,
        height: 12,
        background: "#F5EFE3",
        mixBlendMode: "difference",
        transition: "width 0.22s ease, height 0.22s ease, background 0.22s ease, opacity 0.2s ease",
      }}
    />
  );
}
