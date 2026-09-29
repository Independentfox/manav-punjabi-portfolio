"use client";

import { AnimatePresence, m } from "framer-motion";
import { Command, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { mailto } from "@/content/site";
import { openPalette, useIsApple } from "@/lib/hooks";

/** Appears once the hero scrolls away; steps aside when the contact section is on screen. */
export function FloatingContact() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);
  const isApple = useIsApple();

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === contact) setContactVisible(entry.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  const visible = !heroVisible && !contactVisible;

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-4 bottom-4 z-[70] flex items-center gap-1 rounded-full border border-line-strong bg-surface/85 p-1 shadow-[0_20px_60px_-15px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:right-6 sm:bottom-6"
        >
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden h-10 items-center gap-1 rounded-full px-3 font-mono text-[11px] text-subtle transition-colors hover:bg-white/[0.06] hover:text-fg sm:flex"
          >
            {isApple ? <Command size={12} aria-hidden /> : <span>Ctrl</span>}
            <span>K</span>
          </button>
          <a
            href={mailto("Let's build something")}
            className="group flex h-10 items-center gap-2 rounded-full bg-fg pr-4 pl-3.5 text-sm font-medium text-ink transition-colors hover:bg-white"
          >
            <Mail size={15} aria-hidden />
            Let&apos;s talk
          </a>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
