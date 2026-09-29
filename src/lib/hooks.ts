import { useSyncExternalStore } from "react";

/** Subscribes to a media query without a setState-in-effect round trip. */
export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

const noopSubscribe = () => () => {};

/** True on Apple platforms, where the palette shortcut reads ⌘K instead of Ctrl K. */
export function useIsApple() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),
    () => true,
  );
}

/** Wall-clock time in a given timezone, ticking once per second. */
export function useClock(timeZone: string) {
  return useSyncExternalStore(
    (onTick) => {
      const id = window.setInterval(onTick, 1000);
      return () => window.clearInterval(id);
    },
    () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date()),
    () => "--:--",
  );
}

/* ------------------------------------------------------------------ */
/* Tiny event bus so server-rendered buttons can drive client chrome.  */
/* ------------------------------------------------------------------ */

export const PALETTE_EVENT = "manav:palette";
export const TOAST_EVENT = "manav:toast";

export function openPalette() {
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT));
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
  // Move focus for keyboard and screen-reader users without a second jump.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function toggleBlueprint() {
  const root = document.documentElement;
  const on = !root.hasAttribute("data-blueprint");
  root.toggleAttribute("data-blueprint", on);
  toast(on ? "Blueprint mode on — every box, outlined." : "Blueprint mode off.");
}
