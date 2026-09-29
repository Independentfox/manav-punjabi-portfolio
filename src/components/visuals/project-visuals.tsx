import { forecasting, healthQuery, voiceAgent } from "@/content/site";
import { cn, delay } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 01 — self-correction loop                                           */
/* ------------------------------------------------------------------ */

export function CorrectionLoop() {
  const nodes = voiceAgent.loop;
  const radius = 41; // % of the square
  return (
    <div
      data-cursor="card"
      className="relative mx-auto aspect-square w-full max-w-[460px] rounded-2xl border border-line bg-ink/60"
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-grid [mask-image:radial-gradient(closest-side,#000,transparent)] opacity-60"
      />

      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="0.3" />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgb(139 123 255 / 0.7)"
          strokeWidth="0.35"
          className="flow"
          pathLength={200}
        />
      </svg>

      {/* Orbiting packet */}
      <div aria-hidden className="orbit absolute inset-[9%]">
        <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_3px_rgb(95_216_230/0.6)]" />
      </div>

      <ol aria-label="Self-correction loop">
        {nodes.map((n, i) => {
          const angle = (-90 + i * (360 / nodes.length)) * (Math.PI / 180);
          const left = 50 + radius * Math.cos(angle);
          const top = 50 + radius * Math.sin(angle);
          return (
            <li
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span
                data-reveal="fade"
                style={delay(100 + i * 110)}
                className="block rounded-lg border border-line-strong bg-surface px-2 py-1.5 text-center shadow-lg sm:px-3"
              >
                <span className="block font-mono text-[10px] font-medium text-fg sm:text-[11px]">
                  <span className="text-subtle">{i + 1}·</span>
                  {n.label}
                </span>
                <span className="hidden font-mono text-[9.5px] whitespace-nowrap text-subtle sm:block">
                  {n.sub}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="absolute inset-[27%] flex flex-col items-center justify-center text-center" data-reveal>
        <span className="label text-[9px] sm:text-[10px]">agent success</span>
        <span className="mt-2 text-2xl font-semibold tracking-[-0.04em] whitespace-nowrap text-fg sm:text-4xl">
          <span className="text-subtle">17%</span> <span className="text-accent-bright">→</span> 100%
        </span>
        <span
          aria-hidden
          className="meter mt-3 block h-1 w-full max-w-[150px] overflow-hidden rounded-full bg-white/10"
        >
          <span className="meter-fill block h-full rounded-full bg-gradient-to-r from-accent to-cyan" />
        </span>
        <span className="mt-2 font-mono text-[9px] text-subtle sm:text-[10px]">no human in the loop</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — benchmark bracket                                              */
/* ------------------------------------------------------------------ */

export function ModelBracket() {
  return (
    <div data-cursor="card" className="rounded-2xl border border-line bg-ink/60 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span className="rounded-md border border-line bg-surface px-2 py-1 text-fg">
          28 financial indicators
        </span>
        <span aria-hidden className="text-subtle">
          →
        </span>
        <span className="rounded-md border border-line px-2 py-1 text-muted">impute · winsorize · scale</span>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-line pb-2">
          <span className="label text-[10px]">architecture</span>
          <span className="flex gap-1.5">
            {forecasting.horizons.map((h) => (
              <span key={h} className="w-7 text-center font-mono text-[10px] text-subtle">
                {h}
              </span>
            ))}
          </span>
        </div>
        <ol>
          {forecasting.models.map((model, i) => {
            const best = "best" in model && model.best;
            return (
              <li
                key={model.name}
                data-reveal="fade"
                style={delay(120 + i * 120)}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b py-3",
                  best ? "border-accent/40" : "border-line",
                )}
              >
                <span className="min-w-0">
                  <span className={cn("block text-[15px] font-medium", best ? "text-fg" : "text-muted")}>
                    {model.name}
                    {best ? (
                      <span className="ml-2 rounded border border-cyan/50 bg-cyan/10 px-1.5 py-0.5 align-middle font-mono text-[10px] text-cyan">
                        best
                      </span>
                    ) : null}
                  </span>
                  <span className="block font-mono text-[11px] text-subtle">{model.note}</span>
                </span>
                <span
                  role="img"
                  className="flex gap-1.5"
                  aria-label={`Evaluated at ${forecasting.horizons.join(", ")}`}
                >
                  {forecasting.horizons.map((h) => (
                    <span
                      key={h}
                      className={cn(
                        "grid h-6 w-7 place-items-center rounded-[4px] border",
                        best ? "border-accent/60 bg-accent/25" : "border-line bg-white/[0.03]",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("size-1 rounded-full", best ? "bg-accent-bright" : "bg-white/25")}
                      />
                    </span>
                  ))}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-[10px]">best model</p>
          <p className="mt-1.5 text-4xl font-semibold tracking-[-0.04em] text-fg">
            <span className="text-muted">&lt;</span>20 <span className="text-lg text-subtle">RMSE</span>
          </p>
        </div>
        <p className="max-w-[200px] font-mono text-[10px] leading-relaxed text-subtle">
          Every architecture evaluated at the same three horizons.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — two-lane RAG                                                   */
/* ------------------------------------------------------------------ */

function Lane({
  label,
  steps,
  start,
  terminal,
}: {
  label: string;
  steps: readonly { label: string; sub: string }[];
  start: number;
  terminal?: { label: string; sub: string };
}) {
  return (
    <div>
      <p className="label text-[10px]">{label}</p>
      <div className="relative mt-3">
        <div aria-hidden className="absolute inset-x-4 top-1/2 hidden h-px bg-line sm:block" />
        <div
          aria-hidden
          className="packet absolute inset-x-4 top-1/2 -mt-px hidden h-[3px] sm:block"
          style={{ ["--dur" as string]: "3.6s", ["--boot" as string]: `${start}ms` }}
        >
          <span className="absolute right-0 size-[3px] rounded-full bg-cyan shadow-[0_0_8px_2px_rgb(95_216_230/0.7)]" />
        </div>
        <ol className="relative grid grid-cols-3 gap-1.5 sm:auto-cols-fr sm:grid-flow-col sm:grid-cols-none sm:gap-2">
          {steps.map((s, i) => (
            <li
              key={s.label}
              data-reveal="fade"
              style={delay(start / 4 + i * 90)}
              className="rounded-lg border border-line bg-surface px-1.5 py-2 text-center sm:px-2"
            >
              <span className="block font-mono text-[10px] font-medium text-fg sm:text-[11px]">
                {s.label}
              </span>
              <span className="mt-0.5 block truncate font-mono text-[9px] text-subtle sm:text-[10px]">
                {s.sub}
              </span>
            </li>
          ))}
          {terminal ? (
            <li className="rounded-lg border border-accent/50 bg-accent/10 px-1.5 py-2 text-center sm:px-2">
              <span className="block font-mono text-[10px] font-medium text-fg sm:text-[11px]">
                {terminal.label}
              </span>
              <span className="mt-0.5 block truncate font-mono text-[9px] text-accent-bright sm:text-[10px]">
                {terminal.sub}
              </span>
            </li>
          ) : null}
        </ol>
      </div>
    </div>
  );
}

export function RagPipeline() {
  const [pdf, ocr, chunk, embed, retrieve, generate] = healthQuery.pipeline;
  return (
    <div data-cursor="card" className="rounded-2xl border border-line bg-ink/60 p-4 sm:p-6">
      <Lane
        label="ingest · once per document"
        steps={[pdf, ocr, chunk, embed]}
        start={400}
        terminal={{ label: "Index", sub: "embeddings" }}
      />

      <div
        aria-hidden
        className="my-3 flex items-center justify-end gap-2 pr-[9%] font-mono text-[10px] text-subtle"
      >
        <span>nearest chunks</span>
        <svg width="10" height="26" viewBox="0 0 10 26">
          <line x1="5" y1="0" x2="5" y2="20" stroke="rgb(139 123 255 / 0.8)" className="flow" />
          <path d="M1.5 18 L5 23 L8.5 18" fill="none" stroke="rgb(169 157 255 / 0.8)" />
        </svg>
      </div>

      <Lane
        label="query · every question"
        steps={[
          { label: "Question", sub: "user" },
          { label: "Embed", sub: "same model" },
          retrieve,
          generate,
        ]}
        start={1400}
        terminal={{ label: "Answer", sub: "grounded" }}
      />

      <p className="mt-6 font-mono text-[10px] leading-relaxed text-subtle">
        Answers come from a locally run LLM (Ollama), grounded in retrieved chunks.
      </p>
    </div>
  );
}
