"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

export default function LightboxFrame({
  alt,
  children,
  triggerClassName = "",
  modalWidth = "min(96vw, 1400px)",
}: {
  alt: string;
  children: ReactNode;
  triggerClassName?: string;
  modalWidth?: CSSProperties["width"];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left ${triggerClassName}`}
        onClick={() => setOpen(true)}
        aria-label={`Expand ${alt}`}
      >
        {children}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} expanded view`}
          onClick={() => setOpen(false)}
        >
          <div className="relative flex max-h-[92vh] flex-col gap-3" onClick={(event) => event.stopPropagation()}>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
              >
                Close
              </button>
            </div>

            <div
              className="max-h-[84vh] overflow-auto rounded-2xl"
              style={{ width: modalWidth }}
            >
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
