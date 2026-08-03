import Image from "next/image";

const SLIDES: { src: string; alt: string; w: number; h: number; caption: string }[] = [
  {
    src: "/case-study/sa-xd/data-2.webp",
    alt: "Measurement data, detail 2",
    w: 1461,
    h: 778,
    caption: "Measurement readout: clarity and confidence signals from participating leaders.",
  },
  {
    src: "/case-study/sa-xd/data-3.webp",
    alt: "Measurement data, detail 3",
    w: 1476,
    h: 822,
    caption: "Measurement readout: feedback quality and usefulness after the pilot.",
  },
  {
    src: "/case-study/sa-xd/data-4.webp",
    alt: "Measurement data, detail 4",
    w: 1467,
    h: 790,
    caption: "Measurement readout: how feedback supported better performance conversations.",
  },
  {
    src: "/case-study/sa-xd/data-5.webp",
    alt: "Measurement data, detail 5",
    w: 1474,
    h: 785,
    caption: "Measurement readout: themes that helped make the case for broader platform investment.",
  },
];

function Frame({ src, alt, w, h, caption }: { src: string; alt: string; w: number; h: number; caption: string }) {
  return (
    <figure>
      <div className="w-full overflow-hidden rounded-xl" style={{ background: "var(--card)" }}>
        <Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 768px) 100vw, 620px" className="block w-full h-auto rounded-xl select-none" draggable={false} />
      </div>
      <figcaption className="figure-caption">{caption}</figcaption>
    </figure>
  );
}

export default function MeasureCarousel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 items-start">
        {SLIDES.slice(0, 2).map((s) => (
          <Frame key={s.src} src={s.src} alt={s.alt} w={s.w} h={s.h} caption={s.caption} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 items-start">
        {SLIDES.slice(2, 4).map((s) => (
          <Frame key={s.src} src={s.src} alt={s.alt} w={s.w} h={s.h} caption={s.caption} />
        ))}
      </div>
    </div>
  );
}
