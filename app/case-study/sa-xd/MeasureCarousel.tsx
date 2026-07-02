import Image from "next/image";

const SLIDES: { src: string; alt: string; w: number; h: number }[] = [
  { src: "/case-study/sa-xd/data-2.png", alt: "Measurement data, detail 2", w: 1461, h: 778 },
  { src: "/case-study/sa-xd/data-3.png", alt: "Measurement data, detail 3", w: 1476, h: 822 },
  { src: "/case-study/sa-xd/data-4.png", alt: "Measurement data, detail 4", w: 1467, h: 790 },
  { src: "/case-study/sa-xd/data-5.png", alt: "Measurement data, detail 5", w: 1474, h: 785 },
];

function Frame({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  return (
    <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
      <Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 768px) 100vw, 620px" className="block w-full h-auto rounded-xl select-none" draggable={false} />
    </div>
  );
}

export default function MeasureCarousel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {SLIDES.slice(0, 2).map((s) => (
          <Frame key={s.src} src={s.src} alt={s.alt} w={s.w} h={s.h} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        {SLIDES.slice(2, 4).map((s) => (
          <Frame key={s.src} src={s.src} alt={s.alt} w={s.w} h={s.h} />
        ))}
      </div>
    </div>
  );
}
