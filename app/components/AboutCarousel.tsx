"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FadeIn } from "./ui";

// Correct the layout before paint on the client, but fall back to useEffect on
// the server (React warns that useLayoutEffect is a no-op during SSR).
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// "Life outside work" — a pinned, scroll-driven horizontal gallery. As the
// section scrolls, it sticks to the viewport and the photo row pans sideways
// (3 cards visible). On mobile it falls back to a native swipe row.
type Photo = { src: string; caption: string };

const PHOTOS: Photo[] = [
  { src: "/about/optimized/active.webp", caption: "Where I learned to trust my body and breathe." },
  { src: "/about/optimized/vegan.webp", caption: "Vegan eats in Tokyo." },
  { src: "/about/optimized/music-2.webp", caption: "My first solo concert — just me and Dylan." },
  { src: "/about/optimized/active-3.webp", caption: "Hiking Acatenango, my first 13,000-foot volcanic summit." },
  { src: "/about/optimized/tea.webp", caption: "A tea ceremony in a Kyoto garden." },
  { src: "/about/optimized/culture-3.webp", caption: "Taking in Japan's temples." },
  { src: "/about/optimized/vegan-2.webp", caption: "Freshly made empanadas in Antigua." },
  { src: "/about/optimized/active-2.webp", caption: "Eighty feet down a Costa Rican waterfall." },
  { src: "/about/optimized/tea-2.webp", caption: "Hiding in a Manhattan tea shop with a book." },
  { src: "/about/optimized/music-3.webp", caption: "My sixth time seeing my favorite, Quinn XCII." },
  { src: "/about/optimized/vegan-4.webp", caption: "The best vegan sushi, from two grandmothers in Kamakura." },
  { src: "/about/optimized/culture-2.webp", caption: "Wandering into the Sahara." },
];

const GAP = 24;
const MOBILE_GAP = 16;
const MOBILE_CARD_WIDTH_RATIO = 0.78;
const VISIBLE = 3; // cards visible at once

function PhotoCard({ photo, width }: { photo: Photo; width?: number | string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="flex-none flex flex-col gap-3" style={{ width }}>
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        // Fixed 4:5 aspect. The card's *width* is capped in the measure effect so
        // this height always fits the viewport — cards size down, never clip/crop.
        style={{ aspectRatio: "4 / 5", background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {!errored ? (
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            sizes="(max-width: 1279px) 78vw, 33vw"
            draggable={false}
            onError={() => setErrored(true)}
            className="object-cover select-none"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5" style={{ color: "var(--midtone)" }}>
            <span style={{ fontSize: 22, opacity: 0.35 }}>◎</span>
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ opacity: 0.55 }}>Add photo</span>
          </div>
        )}
        {/* Film grain over the photo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='photoNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23photoNoise)' opacity='0.6'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
            opacity: 0.15,
            mixBlendMode: "overlay",
          }}
        />
      </div>
      <p
        className="px-0.5"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: 14, color: "var(--foreground)", lineHeight: 1.45 }}
      >
        {photo.caption}
      </p>
    </div>
  );
}

function PinnedGallery() {
  // Default to the mobile (swipe) layout — the safe layout to render before the
  // width is known. Corrected to the 3-card desktop pan pre-paint on wide screens.
  const [isMobile, setIsMobile] = useState(true);
  const outerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [travel, setTravel] = useState(0);
  const travelRef = useRef(0);
  const gap = isMobile ? MOBILE_GAP : GAP;

  useIsomorphicLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1280);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Size the cards (3 visible) and compute how far the row must travel.
  useEffect(() => {
    const measure = () => {
      const pane = paneRef.current;
      if (!pane) return;
      const paneW = pane.clientWidth;
      // Desktop: 3 visible cards. Mobile: one large card peeking into the next.
      const baseW = isMobile ? paneW * MOBILE_CARD_WIDTH_RATIO : (paneW - (VISIBLE + 1) * GAP) / VISIBLE;
      // Cap the width so the 4:5 height fits the viewport (height = width × 1.25).
      // On wide/short screens the whole card sizes down, preserving aspect — no clip.
      // The 120px reserves room for the caption + a little vertical breathing.
      const cw = Math.min(baseW, (window.innerHeight - 120) * 0.8);
      const activeGap = isMobile ? MOBILE_GAP : GAP;
      const rowW = PHOTOS.length * cw + (PHOTOS.length + 1) * activeGap;
      const t = Math.max(0, rowW - paneW);
      setCardW(cw);
      setTravel(t);
      travelRef.current = t;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  // Drive the horizontal pan off the section's scroll position (manual, to match
  // the rest of the site — framer's useScroll mis-tracks under body overflow-x).
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const outer = outerRef.current;
      const row = rowRef.current;
      if (!outer || !row) return;
      const rect = outer.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const p = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;
      row.style.transform = `translate3d(${-travelRef.current * p}px, 0, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile, travel]);

  // Pin the pane and pan the row sideways with vertical scroll. The wrapper
  // breaks out of the centered content column to span the full viewport width.
  return (
    <div
      ref={outerRef}
      style={{ position: "relative", height: `calc(100vh + ${travel}px)`, marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div
        ref={paneRef}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}
      >
        <div ref={rowRef} className="flex" style={{ gap, paddingLeft: gap, paddingRight: gap, willChange: "transform" }}>
          {PHOTOS.map((p) => (
            <PhotoCard key={p.src} photo={p} width={cardW || undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutCarousel() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <FadeIn>
        <p className="text-[10px] font-normal tracking-[0.28em] uppercase text-[var(--midtone)]">
          when I&apos;m not building —
        </p>
      </FadeIn>

      <PinnedGallery />
    </div>
  );
}
