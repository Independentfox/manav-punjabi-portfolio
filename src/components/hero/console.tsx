"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { mailto, site } from "@/content/site";
import { openPalette, useClock, useIsApple } from "@/lib/hooks";
import { cn, delay } from "@/lib/utils";

type Line = { id: number; kind: "in" | "out" | "ok" | "err" | "dim"; text: string };

let lineId = 0;
const line = (kind: Line["kind"], text: string): Line => ({ id: ++lineId, kind, text });

const HELP = [
  "whoami          who is this",
  "ls              what's here",
  "cat about.txt   the short version",
  "open <target>   github · linkedin · codeforces · resume",
  "contact         reach me",
  "sudo hire manav you know what this does",
  "clear           clean slate",
];

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Pure command interpreter: returns output lines and an optional side effect. */
function interpret(raw: string): { out: Line[]; effect?: () => void; clear?: boolean } {
  const input = raw.trim().replace(/\s+/g, " ");
  const [cmd, ...rest] = input.toLowerCase().split(" ");
  const arg = rest.join(" ");

  switch (cmd) {
    case "":
      return { out: [] };
    case "help":
    case "?":
      return { out: HELP.map((h) => line("dim", h)) };
    case "whoami":
      return {
        out: [
          line("out", "Manav Punjabi — software engineer."),
          line("dim", "backend systems · ML infrastructure · AI tooling · IIT Roorkee '27"),
        ],
      };
    case "ls":
      return { out: [line("out", "experience/  projects/  about.txt  resume.pdf  contact.sh")] };
    case "cat":
      if (arg === "about.txt")
        return {
          out: [
            line("out", "Built recommendation infra serving 300M+ users at Glance · InMobi."),
            line(
              "out",
              "Shipped a payments + scheduling backend at Airblack. Candidate Master on Codeforces.",
            ),
          ],
        };
      if (arg === "resume.pdf")
        return { out: [line("err", "cat: resume.pdf: binary file — try `open resume`")] };
      return { out: [line("err", `cat: ${arg || "(missing operand)"}: no such file`)] };
    case "open": {
      const targets: Record<string, () => void> = {
        github: () => openExternal(site.links.github),
        linkedin: () => openExternal(site.links.linkedin),
        codeforces: () => openExternal(site.links.codeforces),
        resume: () => openExternal(site.resume),
      };
      const run = targets[arg];
      if (!run) return { out: [line("err", "open: try github, linkedin, codeforces or resume")] };
      return { out: [line("ok", `opening ${arg}…`)], effect: run };
    }
    case "contact":
    case "./contact.sh":
      return {
        out: [line("out", site.email), line("ok", "opening mail client…")],
        effect: () => (window.location.href = mailto("Hello from your portfolio")),
      };
    case "sudo":
      if (arg === "hire manav")
        return {
          out: [
            line("dim", "[sudo] password for recruiter: ********"),
            line("ok", "✓ access granted. drafting email…"),
          ],
          effect: () =>
            window.setTimeout(() => {
              window.location.href = mailto("Let's build something together");
            }, 900),
        };
      return {
        out: [
          line("err", "recruiter is not in the sudoers file. This incident will be reported."),
          line("dim", "hint: sudo hire manav"),
        ],
      };
    case "e4":
    case "1.e4":
      return { out: [line("out", "1. e4 — best by test. Peak: chess.com 2100 · lichess 2200.")] };
    case "cd":
      return {
        out: [line("dim", "navigation lives in the command palette — opening it…")],
        effect: openPalette,
      };
    case "exit":
    case "quit":
      return { out: [line("dim", "there is no exit. only ship.")] };
    case "clear":
      return { out: [], clear: true };
    case "rm":
      return { out: [line("err", "rm: nice try.")] };
    default:
      return { out: [line("err", `zsh: command not found: ${cmd}`), line("dim", "type `help`")] };
  }
}

function Row({ k, children, i }: { k: string; children: ReactNode; i: number }) {
  return (
    <div
      className="boot grid grid-cols-[88px_1fr] gap-3 sm:grid-cols-[96px_1fr]"
      style={delay(520 + i * 70, "--boot")}
    >
      <dt className="text-subtle uppercase">{k}</dt>
      <dd className="text-fg uppercase">{children}</dd>
    </div>
  );
}

export function HeroConsole() {
  const [log, setLog] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const time = useClock(site.timezone);
  const isApple = useIsApple();

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const { out, effect, clear } = interpret(value);
    if (value.trim()) history.current.unshift(value);
    cursor.current = -1;
    setLog((prev) => (clear ? [] : [...prev, line("in", value), ...out].slice(-40)));
    setValue("");
    effect?.();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const h = history.current;
      if (!h.length) return;
      cursor.current =
        e.key === "ArrowUp" ? Math.min(cursor.current + 1, h.length - 1) : Math.max(cursor.current - 1, -1);
      setValue(cursor.current === -1 ? "" : h[cursor.current]);
    }
  };

  return (
    <div
      className="boot relative w-full overflow-hidden rounded-xl border border-line-strong bg-surface/80 font-mono text-[12px] leading-[1.7] shadow-[0_40px_120px_-40px_rgb(139_123_255/0.35)] backdrop-blur-md sm:text-[12.5px]"
      style={delay(380, "--boot")}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        if (window.getSelection()?.toString()) return;
        inputRef.current?.focus({ preventScroll: true });
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
          <span className="size-2.5 rounded-full bg-white/10" />
        </div>
        <span className="text-[11px] text-subtle">manav@iitr — zsh</span>
        <button
          type="button"
          onClick={openPalette}
          className="ml-auto rounded border border-line px-1.5 py-0.5 text-[10px] text-subtle transition-colors hover:text-fg"
        >
          {isApple ? "⌘" : "Ctrl "}K
        </button>
      </div>

      <div className="px-4 pt-4 pb-3 sm:px-5">
        <div className="boot flex items-baseline justify-between" style={delay(460, "--boot")}>
          <span className="text-[13px] font-semibold tracking-wide text-fg">MANAV.PUNJABI</span>
          <span className="text-[10px] text-subtle">v2026.09</span>
        </div>
        <div aria-hidden className="my-2.5 h-px bg-line" />

        <dl className="space-y-0.5">
          <Row k="status" i={0}>
            <span className="inline-grid">
              <span aria-hidden className="boot-swap-out col-start-1 row-start-1 text-warn">
                booting…
              </span>
              <span className="boot-swap-in col-start-1 row-start-1 flex items-center gap-2 text-ok">
                <span className="status-dot size-1.5 rounded-full bg-ok" aria-hidden />
                online
              </span>
            </span>
          </Row>
          <Row k="role" i={1}>
            Software engineer
          </Row>
          <Row k="focus" i={2}>
            AI + systems
          </Row>
          <Row k="base" i={3}>
            IIT Roorkee, IN
          </Row>
          <Row k="local" i={4}>
            <span suppressHydrationWarning>{time}</span> IST
          </Row>
          <Row k="cf peak" i={5}>
            1992 · cand. master
          </Row>
          <Row k="uptime" i={6}>
            ∞
          </Row>
        </dl>

        <div aria-hidden className="my-3 h-px bg-line" />

        <p className="boot text-muted" style={delay(1100, "--boot")}>
          <span className="text-accent-bright">→</span> currently building:{" "}
          <span className="text-fg">AI / ML infrastructure</span>
        </p>

        <div
          ref={logRef}
          aria-live="polite"
          className={cn("mt-2 max-h-36 overflow-y-auto overscroll-contain", log.length === 0 && "hidden")}
        >
          {log.map((l) => (
            <div
              key={l.id}
              className={cn(
                "break-words whitespace-pre-wrap",
                l.kind === "in" && "text-fg",
                l.kind === "out" && "text-muted",
                l.kind === "dim" && "text-subtle",
                l.kind === "ok" && "text-ok",
                l.kind === "err" && "text-err",
              )}
            >
              {l.kind === "in" ? <span className="text-accent-bright">$ </span> : null}
              {l.text}
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="boot mt-2 flex items-center gap-2" style={delay(1250, "--boot")}>
          <label htmlFor="hero-console-input" className="text-accent-bright">
            $<span className="sr-only">Terminal command</span>
          </label>
          <input
            ref={inputRef}
            id="hero-console-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type `help`"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="w-full min-w-0 bg-transparent text-base text-fg caret-accent-bright placeholder:text-subtle focus:outline-none sm:text-[12.5px]"
          />
        </form>
      </div>
    </div>
  );
}
