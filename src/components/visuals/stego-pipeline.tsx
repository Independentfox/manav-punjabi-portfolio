"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * An illustrative channel simulation — NOT the research model.
 * It shows the idea the work was about: bits hidden in an image,
 * a lossy channel corrupting some of them, and error correction
 * recovering the message anyway. The bit flips and decoding are
 * computed for real; the "neural ECC" result is the concept.
 */

const COLS = 14;
const ROWS = 8;
const CELLS = COLS * ROWS;
const MESSAGE = "hello";
const CROP_FROM_COL = 11;

type Attack = "none" | "noise" | "crop" | "jpeg";
const ATTACKS: { id: Attack; label: string }[] = [
  { id: "none", label: "Clean" },
  { id: "noise", label: "Noise" },
  { id: "crop", label: "Crop" },
  { id: "jpeg", label: "JPEG" },
];

const BITS = [...MESSAGE].flatMap((c) => c.charCodeAt(0).toString(2).padStart(8, "0").split("").map(Number));
// Scatter the payload across the image (5 is coprime with 112, so no collisions).
const PAYLOAD_CELL = BITS.map((_, k) => (k * 5 + 3) % CELLS);
const CELL_TO_BIT = new Map(PAYLOAD_CELL.map((cell, k) => [cell, k]));

function hash(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** A tiny "photo": dusk sky, a sun, a ridge line. Returns lightness 0..1. */
function cover(x: number, y: number) {
  const sky = 0.2 + (1 - y / ROWS) * 0.28;
  const d = Math.hypot(x - 9.5, y - 2.4);
  const sun = Math.max(0, 1 - d / 2.6) * 0.45;
  const ridge = 4.6 + Math.sin(x * 0.7) * 1.1 + Math.sin(x * 1.9) * 0.4;
  const ground = y > ridge ? -0.16 - (y - ridge) * 0.02 : 0;
  return Math.min(0.92, Math.max(0.06, sky + sun + ground));
}

const FLIPS: Record<Exclude<Attack, "crop">, number[]> = {
  none: [],
  noise: [4, 13, 22, 31],
  jpeg: [2, 9, 17, 26, 35],
};

function flippedBits(attack: Attack) {
  if (attack !== "crop") return new Set(FLIPS[attack]);
  // Cropped cells lose their bit entirely; a lost 1 reads back as 0.
  return new Set(
    PAYLOAD_CELL.flatMap((cell, k) => (cell % COLS >= CROP_FROM_COL && BITS[k] === 1 ? [k] : [])),
  );
}

/** Integer HSL so server and client serialize the exact same colour. */
function shade(l: number) {
  return `hsl(${Math.round(248 - l * 60)} ${Math.round(38 + l * 20)}% ${Math.round(l * 72)}%)`;
}

function decode(bits: number[]) {
  let out = "";
  for (let i = 0; i < bits.length; i += 8) {
    const code = parseInt(bits.slice(i, i + 8).join(""), 2);
    out += code >= 32 && code < 127 ? String.fromCharCode(code) : "·";
  }
  return out;
}

export function StegoPipeline() {
  const [attack, setAttack] = useState<Attack>("noise");
  const [reveal, setReveal] = useState(false);

  const flipped = useMemo(() => flippedBits(attack), [attack]);
  const received = useMemo(() => BITS.map((b, k) => (flipped.has(k) ? 1 - b : b)), [flipped]);
  const naive = decode(received);

  const cells = useMemo(
    () =>
      Array.from({ length: CELLS }, (_, i) => {
        const x = i % COLS;
        const y = Math.floor(i / COLS);
        const bit = CELL_TO_BIT.get(i);
        let l = cover(x, y) + (bit !== undefined ? BITS[bit] * 0.012 : 0);
        if (attack === "noise") l += (hash(i) - 0.5) * 0.2;
        if (attack === "jpeg") {
          const bx = x - (x % 2);
          const by = y - (y % 2);
          l = (cover(bx, by) + cover(bx + 1, by) + cover(bx, by + 1) + cover(bx + 1, by + 1)) / 4;
        }
        const cropped = attack === "crop" && x >= CROP_FROM_COL;
        return { l: Math.min(0.95, Math.max(0.04, l)), bit, cropped };
      }),
    [attack],
  );

  return (
    <div data-cursor="card" className="rounded-xl border border-line bg-ink/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="label text-muted">channel simulation</span>
        <div
          role="group"
          aria-label="Channel distortion"
          className="flex rounded-lg border border-line p-0.5"
        >
          {ATTACKS.map((a) => (
            <button
              key={a.id}
              type="button"
              aria-pressed={attack === a.id}
              onClick={() => setAttack(a.id)}
              className={cn(
                "min-h-8 rounded-md px-2.5 font-mono text-[11px] transition-colors",
                attack === a.id ? "bg-white/[0.08] text-fg" : "text-subtle hover:text-fg",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <ol
        aria-label="Pipeline"
        className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[10px] text-subtle"
      >
        {["message", "encoder", "stego image", "channel", "decoder", "recovered"].map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            {i > 0 ? <span aria-hidden>→</span> : null}
            <span
              className={cn(
                "rounded border px-1.5 py-0.5",
                s === "channel" && attack !== "none"
                  ? "border-err/50 text-err"
                  : s === "recovered"
                    ? "border-ok/40 text-ok"
                    : "border-line",
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div
            role="img"
            aria-label={`Cover image carrying ${BITS.length} hidden bits, ${attack === "none" ? "unmodified" : `after ${attack}`}`}
            className="grid gap-[2px] overflow-hidden rounded-md"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {cells.map((c, i) => (
              <span
                key={i}
                className={cn(
                  "relative aspect-square rounded-[2px] transition-[background-color] duration-500",
                  c.cropped && "border border-dashed border-white/15",
                )}
                style={{
                  backgroundColor: c.cropped ? "transparent" : shade(c.l),
                }}
              >
                {reveal && c.bit !== undefined && !c.cropped ? (
                  <span
                    className={cn(
                      "absolute inset-[30%] rounded-full",
                      BITS[c.bit] ? "bg-white" : "border border-white/80",
                    )}
                  />
                ) : null}
              </span>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={reveal}
            onClick={() => setReveal((v) => !v)}
            className="mt-2.5 font-mono text-[11px] text-subtle underline decoration-line-strong underline-offset-4 hover:text-fg"
          >
            {reveal ? "hide payload" : "reveal hidden payload"}
          </button>
        </div>

        <dl className="space-y-3 font-mono text-[11px]">
          <div>
            <dt className="text-subtle">sent · &quot;{MESSAGE}&quot;</dt>
            <dd className="mt-1 flex flex-wrap gap-x-1.5 text-muted">
              {Array.from({ length: BITS.length / 8 }, (_, byte) => (
                <span key={byte}>{BITS.slice(byte * 8, byte * 8 + 8).join("")}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-subtle">received · {flipped.size} bit errors</dt>
            <dd className="mt-1 flex flex-wrap gap-x-1.5 text-muted">
              {Array.from({ length: BITS.length / 8 }, (_, byte) => (
                <span key={byte}>
                  {received.slice(byte * 8, byte * 8 + 8).map((b, j) => (
                    <span key={j} className={flipped.has(byte * 8 + j) ? "text-err" : undefined}>
                      {b}
                    </span>
                  ))}
                </span>
              ))}
            </dd>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-line pt-3">
            <div>
              <dt className="text-subtle">no ECC</dt>
              <dd className={cn("mt-1 text-sm", flipped.size ? "text-err" : "text-fg")}>{naive}</dd>
            </div>
            <div>
              <dt className="text-subtle">with ECC</dt>
              <dd className="mt-1 text-sm text-ok">{MESSAGE} ✓</dd>
            </div>
          </div>
        </dl>
      </div>

      <p className="mt-4 font-mono text-[10px] leading-relaxed text-subtle">
        Illustrative simulation of the problem — not the research model.
      </p>
    </div>
  );
}
