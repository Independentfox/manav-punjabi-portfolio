"use client";

import { useState } from "react";
import { layers, rangeWork } from "@/content/site";
import { cn } from "@/lib/utils";

export function LayerStack() {
  const [selected, setSelected] = useState<string | null>(null);
  const work = rangeWork.find((w) => w.id === selected);

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
      <div>
        <p id="range-filter-label" className="label">
          Trace a piece of work
        </p>
        <div
          role="group"
          aria-labelledby="range-filter-label"
          className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start"
        >
          <FilterButton active={selected === null} onClick={() => setSelected(null)}>
            Everything
          </FilterButton>
          {rangeWork.map((w) => (
            <FilterButton
              key={w.id}
              active={selected === w.id}
              onClick={() => setSelected(selected === w.id ? null : w.id)}
            >
              {w.label}
            </FilterButton>
          ))}
        </div>
        <p
          aria-live="polite"
          className="mt-5 min-h-10 max-w-[260px] font-mono text-[11px] leading-relaxed text-subtle"
        >
          {work
            ? `${work.label} spans ${work.layers.length} layer${work.layers.length > 1 ? "s" : ""}.`
            : "Select a role or project to see which layers it touches."}
        </p>
      </div>

      <ol aria-label="Engineering layers, from algorithms to production" className="relative">
        {layers.map((layer, i) => {
          const items = rangeWork.filter((w) => w.layers.includes(layer.id));
          const lit = !work || work.layers.includes(layer.id);
          return (
            <li key={layer.id} className="relative">
              {i > 0 ? (
                <span
                  aria-hidden
                  className="flex h-6 items-center pl-[22px] font-mono text-[10px] text-subtle"
                >
                  ↓
                </span>
              ) : null}
              <div
                className={cn(
                  "relative grid gap-3 rounded-xl border px-4 py-4 transition-all duration-500 sm:mx-[var(--inset)] sm:grid-cols-[200px_minmax(0,1fr)] sm:items-center sm:px-5",
                  lit ? "opacity-100" : "opacity-30",
                  work && lit ? "border-accent/50 bg-accent/[0.06]" : "border-line bg-surface/50",
                )}
                style={{ ["--inset" as string]: `${(layers.length - 1 - i) * 8}px` }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p
                      className={cn(
                        "font-mono text-sm font-medium tracking-[0.14em] uppercase transition-colors",
                        work && lit ? "text-fg" : "text-muted",
                      )}
                    >
                      {layer.label}
                    </p>
                    <p className="mt-0.5 text-xs text-subtle">{layer.note}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-1.5">
                  {items.map((w) => (
                    <li key={w.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(selected === w.id ? null : w.id)}
                        className={cn(
                          "rounded-md border px-2 py-1 font-mono text-[11px] transition-colors",
                          selected === w.id
                            ? "border-cyan/60 bg-cyan/10 text-fg"
                            : "border-line bg-ink/60 text-muted hover:border-line-strong hover:text-fg",
                        )}
                      >
                        {w.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "group flex min-h-9 items-center gap-2 rounded-lg border px-3 text-sm transition-colors",
        active
          ? "border-accent/60 bg-accent/10 text-fg"
          : "border-line text-muted hover:border-line-strong hover:text-fg",
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full transition-colors", active ? "bg-accent-bright" : "bg-white/20")}
      />
      {children}
    </button>
  );
}
