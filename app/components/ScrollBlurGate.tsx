"use client";

import { useEffect } from "react";

/**
 * Adds `is-scrolling` to <html> while the page is actively scrolling and removes
 * it ~140ms after scrolling stops. globals.css switches every backdrop-blur var
 * to `none` under that class, so live blur (which recomputes each frame the
 * content behind it moves) is paused during scroll and restored at rest.
 *
 * Mounted once globally. Renders nothing.
 */
export default function ScrollBlurGate() {
  useEffect(() => {
    const root = document.documentElement;
    let timer: number | undefined;

    const onScroll = () => {
      if (!timer) root.classList.add("is-scrolling");
      else window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = undefined;
        root.classList.remove("is-scrolling");
      }, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) window.clearTimeout(timer);
      root.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
