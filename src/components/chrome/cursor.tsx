"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks";

const INTERACTIVE = "a, button, [role='button'], summary, input, label, select, textarea";

/**
 * A quiet trailing ring for mouse users. The native cursor stays visible;
 * the ring only adds context (links grow it, case-study cards fill it).
 */
export function Cursor() {
  const enabled = useMediaQuery(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  );
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const el = ring.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      el.removeAttribute("data-hidden");
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const card = target?.closest("[data-cursor]");
      if (card) el.dataset.state = card.getAttribute("data-cursor") ?? "card";
      else if (target?.closest(INTERACTIVE)) el.dataset.state = "link";
      else delete el.dataset.state;
    };

    const onLeave = () => el.setAttribute("data-hidden", "");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ring} aria-hidden className="cursor-ring" data-hidden="" />;
}
