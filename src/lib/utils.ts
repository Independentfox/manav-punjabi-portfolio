import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Staggers a `data-reveal` element or `.boot` element by `ms`. */
export function delay(ms: number, prop: "--delay" | "--boot" = "--delay"): CSSProperties {
  return { [prop]: `${ms}ms` } as CSSProperties;
}
