import LightboxFrame from "../../components/LightboxFrame";

// "Measuring what mattered" gallery. The first image sits full-width in its
// own row; the remaining images share a second row.
const SLIDES: { src: string; alt: string }[] = [
  { src: "/case-study/sa-xd/data-1.png", alt: "Measurement data: results across clarity, consistency, quality, and actionability" },
  { src: "/case-study/sa-xd/data-2.png", alt: "Measurement data, detail 2" },
  { src: "/case-study/sa-xd/data-3.png", alt: "Measurement data, detail 3" },
  { src: "/case-study/sa-xd/data-4.png", alt: "Measurement data, detail 4" },
  { src: "/case-study/sa-xd/data-5.png", alt: "Measurement data, detail 5" },
];

function Frame({ src, alt }: { src: string; alt: string }) {
  return (
    <LightboxFrame alt={alt}>
      <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto rounded-xl select-none" draggable={false} />
      </div>
    </LightboxFrame>
  );
}

export default function MeasureCarousel() {
  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: one picture */}
      <Frame src={SLIDES[0].src} alt={SLIDES[0].alt} />

      {/* Row 2: two pictures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {SLIDES.slice(1, 3).map((s) => (
          <Frame key={s.src} src={s.src} alt={s.alt} />
        ))}
      </div>

      {/* Row 3: the other two pictures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {SLIDES.slice(3, 5).map((s) => (
          <Frame key={s.src} src={s.src} alt={s.alt} />
        ))}
      </div>
    </div>
  );
}
