"use client";

import { useState } from "react";
import { toolchain } from "@/content/site";
import { cn } from "@/lib/utils";

type Active = { group: string; name: string } | null;

function layout(count: number, seed: number) {
  // Nodes on a gently perturbed ellipse around the group's centre star.
  return Array.from({ length: count }, (_, i) => {
    const angle = ((i / count) * 360 - 90 + seed * 17) * (Math.PI / 180);
    const wobble = i % 2 ? 0.86 : 1;
    return {
      x: 50 + Math.cos(angle) * 31 * wobble,
      y: 50 + Math.sin(angle) * 34 * wobble,
    };
  });
}

export function Constellation() {
  const [active, setActive] = useState<Active>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {toolchain.map((cluster, ci) => {
        const pts = layout(cluster.tools.length, ci);
        const current =
          active?.group === cluster.group ? cluster.tools.find((t) => t.name === active.name) : null;
        return (
          <section
            key={cluster.group}
            aria-label={cluster.group}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface/40"
            onMouseLeave={() => setActive(null)}
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="label text-accent-bright">{cluster.group}</h3>
              <span className="font-mono text-[10px] text-subtle">{cluster.tools.length} nodes</span>
            </div>

            <div className="relative h-[280px] sm:h-[300px]">
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 size-full"
              >
                {pts.map((p, i) => {
                  const next = pts[(i + 1) % pts.length];
                  const on = current?.name === cluster.tools[i].name;
                  return (
                    <g key={i}>
                      <line
                        x1={50}
                        y1={50}
                        x2={p.x}
                        y2={p.y}
                        stroke={on ? "rgb(169 157 255 / 0.9)" : "rgb(255 255 255 / 0.09)"}
                        vectorEffect="non-scaling-stroke"
                        className="transition-[stroke] duration-300"
                      />
                      <line
                        x1={p.x}
                        y1={p.y}
                        x2={next.x}
                        y2={next.y}
                        stroke="rgb(255 255 255 / 0.05)"
                        strokeDasharray="2 3"
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Centre star */}
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-bright shadow-[0_0_24px_6px_rgb(139_123_255/0.45)]"
              />

              <ul>
                {cluster.tools.map((tool, i) => {
                  const on = current?.name === tool.name;
                  return (
                    <li
                      key={tool.name}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${pts[i].x}%`, top: `${pts[i].y}%` }}
                    >
                      <button
                        type="button"
                        aria-describedby={on ? `used-${ci}` : undefined}
                        onMouseEnter={() => setActive({ group: cluster.group, name: tool.name })}
                        onFocus={() => setActive({ group: cluster.group, name: tool.name })}
                        onBlur={() => setActive(null)}
                        onClick={() => setActive({ group: cluster.group, name: tool.name })}
                        className={cn(
                          "flex max-w-[112px] items-center gap-1.5 rounded-md border px-2 py-1 text-center text-[12px] leading-tight transition-all duration-300 sm:max-w-none sm:text-[13px] sm:whitespace-nowrap",
                          on
                            ? "border-accent/70 bg-accent/15 text-fg shadow-[0_0_20px_-4px_rgb(139_123_255/0.6)]"
                            : "border-line bg-ink/80 text-muted hover:text-fg",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn("size-1 shrink-0 rounded-full", on ? "bg-cyan" : "bg-white/40")}
                        />
                        {tool.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p
              id={`used-${ci}`}
              aria-live="polite"
              className="min-h-11 border-t border-line px-5 py-3 font-mono text-[11px] text-subtle"
            >
              {current ? (
                <>
                  <span className="text-accent-bright">{current.name}</span> → {current.usedIn}
                </>
              ) : (
                "hover or tap a node to see where it was used"
              )}
            </p>
          </section>
        );
      })}
    </div>
  );
}
