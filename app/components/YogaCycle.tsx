"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const POSES = [
  "/yoga/pose-1.png",
  "/yoga/pose-2.png",
  "/yoga/pose-3.png",
  "/yoga/pose-4.png",
  "/yoga/pose-5.png",
  "/yoga/pose-6.png",
];

const HOLD_MS = 3000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function YogaCycle({ size = 100 }: { size?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % POSES.length), HOLD_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ width: size, height: size, position: "relative", mixBlendMode: "multiply" }} aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={POSES[index]}
            alt=""
            fill
            sizes={`${size}px`}
            priority={index === 0}
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
