"use client";

import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { glance, type ArchNode } from "@/content/site";
import { cn } from "@/lib/utils";

function Connector() {
  return (
    <span aria-hidden className="flex h-7 justify-center">
      <svg width="12" height="28" viewBox="0 0 12 28" className="overflow-visible">
        <line x1="6" y1="0" x2="6" y2="22" stroke="rgb(255 255 255 / 0.1)" />
        <line x1="6" y1="0" x2="6" y2="22" stroke="rgb(139 123 255 / 0.8)" className="flow" />
        <path d="M2.5 20 L6 25 L9.5 20" fill="none" stroke="rgb(169 157 255 / 0.7)" />
      </svg>
    </span>
  );
}

function Split({ a, b, note }: { a: string; b: string; note: string }) {
  return (
    <span className="mt-3 block">
      <span className="grid grid-cols-2 gap-2">
        {[a, b].map((x) => (
          <span
            key={x}
            className="block rounded-md border border-line bg-ink/60 px-2.5 py-2 text-center font-mono text-[11px] text-muted"
          >
            {x}
          </span>
        ))}
      </span>
      <span className="mt-2 block text-center font-mono text-[10px] text-subtle">{note}</span>
    </span>
  );
}

function NodeBody({ node, index }: { node: ArchNode; index: number }) {
  return (
    <>
      <span className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-subtle">{String(index + 1).padStart(2, "0")}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium text-fg">{node.label}</span>
          <span className="block font-mono text-[11px] text-subtle">{node.sub}</span>
        </span>
        <Plus
          size={14}
          aria-hidden
          className="shrink-0 text-subtle transition-transform duration-300 group-aria-expanded:rotate-45 group-aria-expanded:text-accent-bright"
        />
      </span>
      {node.id === "towers" ? (
        <Split a="user tower" b="content tower" note="↘ shared embedding space ↙" />
      ) : null}
      {node.id === "serving" ? <Split a="Redis" b="AlloyDB" note="request-time retrieval" /> : null}
    </>
  );
}

export function GlanceArchitecture() {
  const [open, setOpen] = useState<string | null>("towers");

  return (
    <div
      data-cursor="card"
      className="relative rounded-xl border border-line bg-ink/70 p-4 sm:p-6"
      aria-label="Recommendation pipeline architecture"
      role="group"
    >
      <div className="flex items-center justify-between">
        <span className="label text-muted">architecture · simplified</span>
        <span className="hidden label sm:inline">select a stage</span>
      </div>

      <ol className="mt-5">
        {glance.architecture.map((node, i) => {
          const isOpen = open === node.id;
          const panelId = `glance-arch-${node.id}`;
          return (
            <li key={node.id}>
              {i > 0 ? <Connector /> : null}
              <div
                className={cn(
                  "rounded-lg border transition-colors duration-300",
                  isOpen
                    ? "border-accent/50 bg-accent/[0.06] shadow-[0_0_0_4px_rgb(139_123_255/0.06)]"
                    : "border-line bg-surface/70 hover:border-line-strong",
                  node.id === "feed" && !isOpen && "border-cyan/30",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : node.id)}
                  className="group block w-full rounded-lg px-4 py-3 text-left"
                >
                  <NodeBody node={node} index={i} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <m.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-line px-4 pt-3 pb-4 text-sm leading-relaxed text-muted">
                        {node.detail}
                      </p>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 font-mono text-[10px] leading-relaxed text-subtle">
        Simplified for a public page — internal details intentionally omitted.
      </p>
    </div>
  );
}
