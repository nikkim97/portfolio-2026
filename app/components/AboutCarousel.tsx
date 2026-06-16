"use client";

import { useRef, useState } from "react";

// "Life outside work" — all photos in a single horizontal carousel, each with
// its own one-line caption. Order is hand-set so categories interleave rather
// than clustering. To add/remove a photo, drop the file in /public/about/ and
// edit the PHOTOS array below.
type Photo = { src: string; caption: string };

const PHOTOS: Photo[] = [
  { src: "/about/active.jpg", caption: "Where I learned to trust my body and breathe." },        // you
  { src: "/about/vegan.jpg", caption: "Vegan eats at a Tokyo hole-in-the-wall." },                // food
  { src: "/about/music-2.jpg", caption: "My first solo concert — just me and Dylan." },           // scene
  { src: "/about/active-3.jpg", caption: "Hiking Acatenango, my first 13,000-foot volcanic summit." }, // you
  { src: "/about/tea.jpg", caption: "A tea ceremony in a Kyoto garden." },                        // food
  { src: "/about/culture-3.jpg", caption: "Mindfully taking in Japan's temples." },               // scene
  { src: "/about/vegan-2.jpg", caption: "More vegan adventures on the road." },                   // food
  { src: "/about/active-2.png", caption: "Eighty feet down a Costa Rican waterfall." },           // scene
  { src: "/about/tea-2.jpg", caption: "Hiding in a Manhattan tea shop with a book." },            // food
  { src: "/about/music-3.jpg", caption: "My sixth time seeing my favorite, Quinn XCII." },        // scene
  { src: "/about/vegan-4.jpg", caption: "The best vegan sushi, from two grandmothers in Kamakura." }, // food
  { src: "/about/culture-2.jpg", caption: "Wandering into the Sahara." },                         // you
];

function CarouselCard({ photo }: { photo: Photo }) {
  const [errored, setErrored] = useState(false);
  return (
    <div className="snap-start flex-none w-[244px] sm:w-[288px] flex flex-col gap-3">
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "4 / 5", background: "var(--card)", border: "1px solid var(--border)" }}
      >
        {!errored ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.src}
            alt={photo.caption}
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
      <p
        className="px-0.5"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--foreground)",
          lineHeight: 1.45,
        }}
      >
        {photo.caption}
      </p>
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

      <p
        className="text-base font-light leading-[1.9]"
        style={{ color: "#3A3530" }}
      >
        Travel is how I feed my curiosity. I&apos;m wired to ask questions, and getting out into the
        world helps me expand my perspective and continue evolving. I&apos;m happiest
        when I&apos;m growing — so I chase side quests that stretch me, like hiking volcanoes or
        surfing despite not having grown up athletic.
      </p>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none", touchAction: "pan-y" }}
      >
        {PHOTOS.map((photo) => (
          <CarouselCard key={photo.src} photo={photo} />
        ))}
      </div>
    </div>
  );
}
