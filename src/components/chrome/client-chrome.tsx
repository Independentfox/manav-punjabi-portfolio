"use client";

import dynamic from "next/dynamic";
import { EasterEggs } from "./easter-eggs";
import { FloatingContact } from "./floating-contact";
import { RevealObserver } from "./reveal-observer";
import { Toaster } from "./toaster";

// Only needed after interaction, so it stays out of the initial bundle.
const CommandPalette = dynamic(() => import("./command-palette").then((m) => m.CommandPalette), {
  ssr: false,
});
const Cursor = dynamic(() => import("./cursor").then((m) => m.Cursor), { ssr: false });

export function ClientChrome() {
  return (
    <>
      <RevealObserver />
      <CommandPalette />
      <Cursor />
      <FloatingContact />
      <Toaster />
      <EasterEggs />
    </>
  );
}
