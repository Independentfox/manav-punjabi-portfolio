"use client";

import { openPalette, useIsApple } from "@/lib/hooks";

export function PaletteHint() {
  const isApple = useIsApple();
  return (
    <button
      type="button"
      onClick={openPalette}
      className="rounded border border-line px-1.5 py-0.5 text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {isApple ? "⌘" : "Ctrl "}K
    </button>
  );
}
