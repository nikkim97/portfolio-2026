"use client";

import { useRef, useState } from "react";

// "Life outside work" carousel. Each item points at an image path under
// /public/about/. Until that file exists the card shows a minimal placeholder
// box, so dropping in a real photo (matching the `src` filename) is all it takes
// to replace it later.
type Item = { src: string; caption: string; note: string };

const ITEMS: Item[] = [
  { src: "/about/surfing.jpg", caption: "Surfing", note: "Catching the next set" },
  { src: "/about/travel.jpg", caption: "Travel", note: "Always somewhere new" },
  { src: "/about/kitchen.jpg", caption: "In the kitchen", note: "Cooking for my people" },
  { src: "/about/reading.jpg", caption: "Reading", note: "Systems, design, sci-fi" },
  { src: "/about/outdoors.jpg", caption: "Outdoors", note: "Trading screens for trails" },
  { src: "/about/music.jpg", caption: "Music", note: "Always on in the background" },
];

function CarouselCard({ item }: { item: Item }) {
  const [errored, setErrored] = useState(!item.src);
  return (
    <div className="snap-start flex-none w-[244px] sm:w-[288px] flex flex-col gap-3">
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "4 / 5", background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {!errored ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.caption}
            draggable={false}
            onError={() => setErrored(true)}
            className="w-full h-full object-cover select-none"
            style={{ display: "block" }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5" style={{ color: "var(--midtone)" }}>
            <span style={{ fontSize: 22, opacity: 0.35 }}>◎</span>
            <span className="text-[9px] tracking-[0.2em] uppercase" style={{ opacity: 0.55 }}>Add photo</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: 16, color: "var(--foreground)", lineHeight: 1.3 }}>
          {item.caption}
        </p>
        <p className="text-[9px] tracking-[0.18em] uppercase" style={{ color: "var(--midtone)" }}>
          {item.note}
        </p>
      </div>
    </div>
  );
}

export default function AboutCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const step = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = () => { drag.current.down = false; };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-normal tracking-[0.28em] uppercase text-[var(--midtone)]">Life outside work</p>
          <p className="font-light text-[var(--foreground)]" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", letterSpacing: "-0.015em", lineHeight: 1.2 }}>
            When I&apos;m not building<span style={{ color: "var(--accent)" }}>.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            aria-label="Previous"
            onClick={() => step(-1)}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-[var(--midtone)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors duration-200"
            style={{ borderColor: "var(--border)" }}
          >
            ←
          </button>
          <button
            aria-label="Next"
            onClick={() => step(1)}
            className="w-9 h-9 rounded-full border flex items-center justify-center text-[var(--midtone)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors duration-200"
            style={{ borderColor: "var(--border)" }}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none", touchAction: "pan-y" }}
      >
        {ITEMS.map((item) => (
          <CarouselCard key={item.src} item={item} />
        ))}
      </div>
    </div>
  );
}
