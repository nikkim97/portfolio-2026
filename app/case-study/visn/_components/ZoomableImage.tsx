"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  sizes: string;
  fit?: "cover" | "contain";
  priority?: boolean;
  background?: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const STEP = 0.25;

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  sizes,
  fit = "cover",
  priority = false,
  background,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, Number((z + STEP).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, Number((z - STEP).toFixed(2))));
  const resetZoom = () => setZoom(1);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-") zoomOut();
      if (event.key === "0") resetZoom();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const scaledWidth = Math.round(width * zoom);
  const scaledHeight = Math.round(height * zoom);

  return (
    <>
      <button
        type="button"
        className="w-full overflow-hidden rounded-xl relative cursor-zoom-in text-left"
        style={{ aspectRatio, background }}
        onClick={() => {
          setZoom(1);
          setOpen(true);
        }}
        aria-label={`Open ${alt} in zoom viewer`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={fit === "contain" ? "object-contain" : "object-cover"}
          sizes={sizes}
          priority={priority}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} zoom viewer`}
        >
          <div className="relative flex flex-col gap-3" onClick={(event) => event.stopPropagation()}>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={zoomOut} className="px-3 py-1.5 rounded-md text-xs bg-white/10 text-white border border-white/20 hover:bg-white/20">-</button>
              <button type="button" onClick={zoomIn} className="px-3 py-1.5 rounded-md text-xs bg-white/10 text-white border border-white/20 hover:bg-white/20">+</button>
              <button type="button" onClick={resetZoom} className="px-3 py-1.5 rounded-md text-xs bg-white/10 text-white border border-white/20 hover:bg-white/20">Reset</button>
              <button type="button" onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-md text-xs bg-white/10 text-white border border-white/20 hover:bg-white/20">Close</button>
            </div>

            <div className="w-[min(94vw,1200px)] max-h-[84vh] overflow-auto rounded-xl bg-[#111]">
              <div className="flex justify-center p-4 min-w-full">
                <Image
                  src={src}
                  alt={alt}
                  width={scaledWidth}
                  height={scaledHeight}
                  className="h-auto w-auto max-w-none select-none"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
