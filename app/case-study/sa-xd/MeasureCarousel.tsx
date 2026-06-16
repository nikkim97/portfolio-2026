"use client";

import { useState } from "react";

// "Measuring what mattered" gallery. Manual only — navigate with the side
// arrows (or dots). Each image shows at its natural height.
const SLIDES: { src: string; alt: string }[] = [
  { src: "/case-study/sa-xd/data-1.png", alt: "Measurement data: results across clarity, consistency, quality, and actionability" },
  { src: "/case-study/sa-xd/data-2.png", alt: "Measurement data, detail 2" },
  { src: "/case-study/sa-xd/data-3.png", alt: "Measurement data, detail 3" },
  { src: "/case-study/sa-xd/data-4.png", alt: "Measurement data, detail 4" },
  { src: "/case-study/sa-xd/data-5.png", alt: "Measurement data, detail 5" },
];

export default function MeasureCarousel() {
  const [index, setIndex] = useState(0);
  const go = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  const arrowStyle: React.CSSProperties = {
    background: "rgba(245,241,235,0.85)",
    backdropFilter: "blur(4px)",
    border: "1px solid var(--border)",
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SLIDES[index].src}
          alt={SLIDES[index].alt}
          className="block w-full h-auto rounded-xl select-none"
          draggable={false}
        />

        {/* Side arrows */}
        <button
          onClick={() => go(index - 1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[var(--foreground)] hover:opacity-100 opacity-80 transition-opacity"
          style={arrowStyle}
        >
          ←
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[var(--foreground)] hover:opacity-100 opacity-80 transition-opacity"
          style={arrowStyle}
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            onClick={() => go(i)}
            aria-label={`Go to image ${i + 1}`}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === index ? 16 : 5,
              height: 5,
              background: i === index ? "var(--foreground)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
