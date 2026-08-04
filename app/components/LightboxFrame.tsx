"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useId, useState } from "react";

export default function LightboxFrame({
  alt = "media",
  children,
  expandable = true,
  triggerClassName = "",
  modalWidth = "min(92vw, 1180px)",
}: {
  alt?: string;
  children: ReactNode;
  expandable?: boolean;
  triggerClassName?: string;
  modalWidth?: CSSProperties["width"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!expandable) {
    return (
      <div className={`relative block w-full ${triggerClassName}`}>
        {children}
      </div>
    );
  }

  return (
    <>
      <div className={`group/lightbox relative block w-full ${triggerClassName}`}>
        {children}
        <button
          type="button"
          aria-label={`Expand ${alt}`}
          onClick={() => setIsOpen(true)}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-lg backdrop-blur transition duration-200 hover:bg-black/75 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <span aria-hidden className="text-[17px] leading-none">↗</span>
        </button>
      </div>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <p id={titleId} className="sr-only">
            Expanded view of {alt}
          </p>
          <button
            type="button"
            aria-label="Close expanded image"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur transition hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <span aria-hidden className="text-2xl leading-none">×</span>
          </button>
          <div
            className="max-h-[90vh] overflow-auto rounded-2xl"
            style={{ width: modalWidth }}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
