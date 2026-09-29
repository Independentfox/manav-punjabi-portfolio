"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { toggleBlueprint } from "@/lib/hooks";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEggs() {
  useEffect(() => {
    console.log(
      `%cMANAV.%c\n\nReading the source? That's the right instinct.\n→ ${site.email}\n→ try ⌘K, then type "sudo"`,
      "font: 700 28px/1 ui-monospace, monospace; color: #a99dff; letter-spacing: -1px",
      "font: 12px/1.6 ui-monospace, monospace; color: #a3a3b3",
    );

    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      if (progress === KONAMI.length) {
        progress = 0;
        toggleBlueprint();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
