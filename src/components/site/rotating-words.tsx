"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function RotatingWords({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="relative inline-flex overflow-hidden pr-1 align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={words[index]}
            initial={{ y: "90%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-90%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block font-serif text-[1.12em] leading-[1.15] whitespace-nowrap text-link italic"
          >
            {words[index]}
          </m.span>
        </AnimatePresence>
      </span>
    </>
  );
}
