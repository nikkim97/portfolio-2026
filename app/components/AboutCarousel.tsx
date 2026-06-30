"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "./ui";

// "Life outside work" — a pinned, scroll-driven horizontal gallery. As the
// section scrolls, it sticks to the viewport and the photo row pans sideways
// (3 cards visible). On mobile it falls back to a native swipe row.
type Photo = { src: string; caption: string };

const PHOTOS: Photo[] = [
  { src: "/about/optimized/active.webp", caption: "Where I learned to trust my body and breathe." },
  { src: "/about/optimized/vegan.webp", caption: "Vegan eats at a Tokyo hole-in-the-wall." },
  { src: "/about/optimized/music-2.webp", caption: "My first solo concert — just me and Dylan." },
  { src: "/about/optimized/active-3.webp", caption: "Hiking Acatenango, my first 13,000-foot volcanic summit." },
  { src: "/about/optimized/tea.webp", caption: "A tea ceremony in a Kyoto garden." },
  { src: "/about/optimized/culture-3.webp", caption: "Mindfully taking in Japan's temples." },
  { src: "/about/optimized/vegan-2.webp", caption: "More vegan adventures on the road." },
  { src: "/about/optimized/active-2.webp", caption: "Eighty feet down a Costa Rican waterfall." },
  { src: "/about/optimized/tea-2.webp", caption: "Hiding in a Manhattan tea shop with a book." },
  { src: "/about/optimized/music-3.webp", caption: "My sixth time seeing my favorite, Quinn XCII." },
  { src: "/about/optimized/vegan-4.webp", caption: "The best vegan sushi, from two grandmothers in Kamakura." },
  { src: "/about/optimized/culture-2.webp", caption: "Wandering into the Sahara." },
];

const GAP = 24;
const VISIBLE = 3; // cards visible at once

function PhotoCard({ photo, width }: { photo: Photo; width?: number | string }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="flex-none flex flex-col gap-3" style={{ width }}>
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "4 / 5", background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {!errored ? (
          <Image
            src={photo.src}
            alt={photo.caption}
            fill
            sizes="(max-width: 767px) 78vw, 33vw"
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
  const [isMobile, setIsMobile] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [travel, setTravel] = useState(0);
  const travelRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
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
      // VISIBLE cards plus a GAP-sized inset on both edges fill the viewport.
      const cw = (paneW - (VISIBLE + 1) * GAP) / VISIBLE;
      const rowW = PHOTOS.length * cw + (PHOTOS.length + 1) * GAP;
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
    if (isMobile) return;
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

  // Mobile: a normal swipe row, no scroll hijacking.
  if (isMobile) {
    return (
      <div
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden -mx-1 px-1 pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {PHOTOS.map((p) => (
          <div key={p.src} className="snap-start flex-none w-[78vw]">
            <PhotoCard photo={p} width="100%" />
          </div>
        ))}
      </div>
    );
  }

  // Desktop: pin the pane and pan the row sideways with scroll. The wrapper
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
        <div ref={rowRef} className="flex" style={{ gap: GAP, paddingLeft: GAP, paddingRight: GAP, willChange: "transform" }}>
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
    <div className="flex flex-col gap-10 sm:gap-12">
      <FadeIn>
        <div className="flex flex-col gap-6">
          <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "-0.015em", lineHeight: 1.2 }}>
            When I&apos;m not building
          </p>
          <p className="text-base font-light leading-[1.9]" style={{ color: "var(--body)" }}>
            Travel is how I feed my curiosity. I&apos;m wired to ask questions, and getting out into the
            world helps me expand my perspective and continue evolving. I&apos;m happiest when I&apos;m
            growing — so I chase side quests that stretch me, like hiking volcanoes or surfing despite
            not having grown up athletic.
          </p>
        </div>
      </FadeIn>

      <PinnedGallery />
    </div>
  );
}
