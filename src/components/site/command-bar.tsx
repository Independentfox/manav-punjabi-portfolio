"use client";

import { ArrowUpRight, Copy, CornerDownLeft, SendHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import {
  achievements,
  chess,
  competitive,
  education,
  experience,
  mailto,
  moreProjects,
  projects,
  site,
  stack,
} from "@/content/site";
import { copyText, toast, useIsApple } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/*
 * Not an AI: a command bar with canned answers drawn from site content.
 * Free text is matched to the closest command by keyword.
 */

type Command = {
  name: string;
  hint: string;
  keywords: string[];
  render: () => ReactNode;
  run?: () => void;
};

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 inline-link"
    >
      {children}
      <ArrowUpRight size={13} aria-hidden />
    </a>
  );
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = site.resume;
  a.download = "Manav-Punjabi-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const COMMANDS: Command[] = [
  {
    name: "about",
    hint: "who I am",
    keywords: ["about", "who", "yourself", "bio", "education", "college", "study", "iit", "degree"],
    render: () => (
      <div className="space-y-2">
        <p>
          Software engineer working on backend systems, ML infrastructure and AI tooling. Most recently built
          a recommendation pipeline serving <b className="font-medium text-fg">300M+ users</b> at Glance ·
          InMobi.
        </p>
        <p>
          {education.degree}, {education.school} ({education.period}) · {education.minor}.
        </p>
      </div>
    ),
  },
  {
    name: "experience",
    hint: "where I've worked",
    keywords: ["experience", "work", "job", "intern", "internship", "company", "glance", "airblack", "noos"],
    render: () => (
      <ul className="space-y-2.5">
        {experience.map((r) => (
          <li key={r.id}>
            <span className="font-medium text-fg">{r.company}</span> — {r.role}
            <span className="block text-xs text-subtle">{r.period}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: "projects",
    hint: "things I've built",
    keywords: ["project", "projects", "built", "build", "github", "code", "repo"],
    render: () => (
      <div className="space-y-3">
        <ul className="space-y-2.5">
          {projects.map((p) => (
            <li key={p.name}>
              {p.href ? (
                <Ext href={p.href}>{p.name}</Ext>
              ) : (
                <span className="font-medium text-fg">{p.name}</span>
              )}
              <span className="block text-xs text-subtle">{p.meta}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-subtle">Also: {moreProjects.map((p) => p.name).join(" · ")}</p>
      </div>
    ),
  },
  {
    name: "achievements",
    hint: "ranks and results",
    keywords: ["achievement", "achievements", "award", "rank", "jee", "kvpy", "olympiad", "win"],
    render: () => (
      <ul className="space-y-1.5">
        {achievements.map((a) => (
          <li key={a.what} className="grid grid-cols-[72px_1fr] gap-3">
            <span className="font-mono text-link">{a.mark}</span>
            <span>
              {a.what} <span className="text-subtle">· {a.note}</span>
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    name: "cp",
    hint: "Codeforces & chess",
    keywords: ["cp", "codeforces", "competitive", "rating", "chess", "leetcode", "dsa", "algorithm"],
    render: () => (
      <div className="space-y-2">
        <p>
          <b className="font-medium text-fg">{competitive.title}</b> on Codeforces — peak{" "}
          {competitive.maxRating}, global rank #{competitive.contestRank} in Round 1033 (Div. 2).{" "}
          <Ext href={site.links.codeforces}>Akaza_3</Ext>
        </p>
        <p>National-level chess player — peak {chess.map((c) => `${c.peak} on ${c.platform}`).join(", ")}.</p>
      </div>
    ),
  },
  {
    name: "stack",
    hint: "tools I use",
    keywords: ["stack", "skill", "skills", "tech", "language", "languages", "tools", "framework"],
    render: () => (
      <dl className="space-y-2">
        {stack.map((g) => (
          <div key={g.group}>
            <dt className="text-xs text-subtle">{g.group}</dt>
            <dd className="text-fg">{g.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    name: "contact",
    hint: "get in touch",
    keywords: ["contact", "email", "mail", "reach", "hire", "linkedin", "talk", "call", "connect"],
    render: () => (
      <div className="space-y-3">
        <p>Email is the fastest way to reach me.</p>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={mailto("Hello from your portfolio")}
            className="inline-flex h-9 items-center rounded-lg bg-peach px-3 text-sm font-medium text-peach-fg"
          >
            Send an email
          </a>
          <button
            type="button"
            onClick={async () => toast((await copyText(site.email)) ? "Email copied" : site.email)}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line-strong px-3 text-sm text-fg hover:bg-canvas"
          >
            <Copy size={13} aria-hidden /> {site.email}
          </button>
        </div>
        <p className="text-sm">
          <Ext href={site.links.linkedin}>LinkedIn</Ext> · <Ext href={site.links.github}>GitHub</Ext>
        </p>
      </div>
    ),
  },
  {
    name: "resume",
    hint: "download the PDF",
    keywords: ["resume", "cv", "pdf"],
    run: downloadResume,
    render: () => (
      <p>
        Downloading my resume… If nothing happened,{" "}
        <a href={site.resume} className="inline-link">
          open the PDF
        </a>
        .
      </p>
    ),
  },
];

const HELP: Command = {
  name: "help",
  hint: "list commands",
  keywords: ["help", "commands", "?"],
  render: () => (
    <ul className="space-y-1">
      {COMMANDS.map((c) => (
        <li key={c.name}>
          <span className="font-mono text-link">/{c.name}</span>{" "}
          <span className="text-subtle">— {c.hint}</span>
        </li>
      ))}
    </ul>
  ),
};

const ALL = [...COMMANDS, HELP];

function resolve(input: string): Command | null {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  if (q.startsWith("/")) {
    const name = q.slice(1).split(/\s+/)[0];
    return ALL.find((c) => c.name === name) ?? ALL.find((c) => c.name.startsWith(name)) ?? null;
  }
  const words = q.split(/[^a-z0-9?]+/).filter(Boolean);
  let best: Command | null = null;
  let bestScore = 0;
  for (const c of ALL) {
    const score = words.filter((w) =>
      c.keywords.some(
        (k) => k === w || (w.length > 3 && k.length > 3 && (k.startsWith(w) || w.startsWith(k))),
      ),
    ).length;
    if (score > bestScore) {
      best = c;
      bestScore = score;
    }
  }
  return best;
}

type Answer = { title: string; body: ReactNode };

export function CommandBar() {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const isApple = useIsApple();

  const suggestions = useMemo(() => {
    if (!value.startsWith("/")) return [];
    const q = value.slice(1).toLowerCase();
    return ALL.filter((c) => c.name.startsWith(q));
  }, [value]);
  const menuOpen = focused && suggestions.length > 0;

  const runCommand = useCallback((cmd: Command) => {
    cmd.run?.();
    setAnswer({ title: `/${cmd.name}`, body: cmd.render() });
    setValue("");
    setActive(0);
  }, []);

  const submit = () => {
    const picked = menuOpen ? suggestions[active] : resolve(value);
    if (picked) {
      runCommand(picked);
      return;
    }
    if (!value.trim()) return;
    setAnswer({
      title: value.trim().slice(0, 40),
      body: (
        <p>
          I&apos;m a command bar, not a chatbot. Try <span className="font-mono text-link">/projects</span>,{" "}
          <span className="font-mono text-link">/experience</span> or{" "}
          <span className="font-mono text-link">/contact</span> — or type <span className="font-mono">/</span>{" "}
          for the full list.
        </p>
      ),
    });
    setValue("");
  };

  // "/" or ⌘K anywhere focuses the bar; Escape closes the answer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest("input, textarea, [contenteditable='true']");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
        setValue("/");
      } else if (e.key === "Escape" && !typing) {
        setAnswer(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (menuOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + dir + suggestions.length) % suggestions.length);
    } else if (menuOpen && e.key === "Tab") {
      e.preventDefault();
      setValue(`/${suggestions[active].name}`);
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (value) setValue("");
      else if (answer) setAnswer(null);
      else inputRef.current?.blur();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:pb-6">
      <div className="pointer-events-auto mx-auto w-full max-w-[680px]">
        {answer ? (
          <section
            aria-live="polite"
            aria-label={`Answer for ${answer.title}`}
            className="pop-in mb-2 max-h-[min(55vh,440px)] overflow-y-auto overscroll-contain rounded-2xl border border-line-strong bg-card/95 p-4 text-[14.5px] leading-relaxed text-muted shadow-[0_20px_60px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-subtle">{answer.title}</span>
              <button
                type="button"
                onClick={() => setAnswer(null)}
                aria-label="Close answer"
                className="grid size-7 place-items-center rounded-md text-subtle hover:bg-canvas hover:text-fg"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
            {answer.body}
          </section>
        ) : null}

        {menuOpen ? (
          <ul
            id={listId}
            role="listbox"
            aria-label="Commands"
            className="pop-in mb-2 overflow-hidden rounded-2xl border border-line-strong bg-card/95 p-1.5 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.5)] backdrop-blur-xl"
          >
            {suggestions.map((c, i) => (
              <li
                key={c.name}
                id={`${listId}-${c.name}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  runCommand(c);
                }}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm",
                  i === active ? "bg-canvas text-fg" : "text-muted",
                )}
              >
                <span className="font-mono text-link">/{c.name}</span>
                <span className="truncate text-subtle">{c.hint}</span>
                {i === active ? (
                  <CornerDownLeft size={13} aria-hidden className="ml-auto text-subtle" />
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-center gap-2 rounded-2xl border border-line-strong bg-card/85 py-2 pr-2 pl-4 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.45)] backdrop-blur-xl transition-colors focus-within:border-tint-line"
        >
          <label htmlFor="command-input" className="sr-only">
            Ask about my work or type a slash command
          </label>
          <input
            ref={inputRef}
            id="command-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ask about my work, or type /"
            role="combobox"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? listId : undefined}
            aria-autocomplete="list"
            aria-activedescendant={menuOpen ? `${listId}-${suggestions[active]?.name}` : undefined}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-subtle focus:outline-none sm:text-[15px]"
          />
          <kbd className="hidden rounded border border-line-strong px-1.5 py-0.5 font-mono text-[11px] text-subtle sm:inline">
            {isApple ? "⌘K" : "Ctrl K"}
          </kbd>
          <button
            type="submit"
            aria-label="Send"
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-tint-line bg-tint text-link transition-colors hover:bg-peach hover:text-peach-fg"
          >
            <SendHorizontal size={16} aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}
