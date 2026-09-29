"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  Copy,
  CornerDownLeft,
  FileDown,
  Grid3x3,
  Hash,
  Search,
  Terminal,
} from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { CodeforcesIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { mailto, sections, site } from "@/content/site";
import { PALETTE_EVENT, copyText, scrollToSection, toast, toggleBlueprint, useIsApple } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Command = {
  id: string;
  group: "Navigate" | "Links" | "Actions" | "System";
  label: string;
  hint?: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
  hidden?: boolean;
};

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function downloadResume() {
  const a = document.createElement("a");
  a.href = site.resume;
  a.download = "Manav-Punjabi-Resume.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function hireManav() {
  toast("[sudo] access granted — drafting that email.");
  window.setTimeout(() => {
    window.location.href = mailto("Let's build something together");
  }, 700);
}

function buildCommands(): Command[] {
  const nav: Command[] = sections.map((s) => ({
    id: `nav-${s.id}`,
    group: "Navigate",
    label: s.label,
    hint: s.hint,
    keywords: `${s.id} go section`,
    icon: <Hash size={15} />,
    run: () => scrollToSection(s.id),
  }));

  return [
    ...nav,
    {
      id: "github",
      group: "Links",
      label: "GitHub",
      hint: `@${site.handles.github}`,
      keywords: "code repos source",
      icon: <GitHubIcon size={15} />,
      run: () => openExternal(site.links.github),
    },
    {
      id: "linkedin",
      group: "Links",
      label: "LinkedIn",
      hint: "Manav Punjabi",
      keywords: "profile connect",
      icon: <LinkedInIcon size={15} />,
      run: () => openExternal(site.links.linkedin),
    },
    {
      id: "codeforces",
      group: "Links",
      label: "Codeforces",
      hint: `${site.handles.codeforces} · Candidate Master`,
      keywords: "competitive programming cp rating",
      icon: <CodeforcesIcon size={15} />,
      run: () => openExternal(site.links.codeforces),
    },
    {
      id: "email",
      group: "Actions",
      label: "Email Manav",
      hint: site.email,
      keywords: "contact mail hire message",
      icon: <AtSign size={15} />,
      run: () => {
        window.location.href = mailto("Hello from your portfolio");
      },
    },
    {
      id: "copy-email",
      group: "Actions",
      label: "Copy email address",
      hint: site.email,
      keywords: "clipboard contact",
      icon: <Copy size={15} />,
      run: async () => {
        const ok = await copyText(site.email);
        toast(ok ? "Email copied to clipboard." : site.email);
      },
    },
    {
      id: "resume",
      group: "Actions",
      label: "Download resume",
      hint: "PDF",
      keywords: "cv pdf download",
      icon: <FileDown size={15} />,
      run: downloadResume,
    },
    {
      id: "blueprint",
      group: "Actions",
      label: "Toggle blueprint mode",
      hint: "see the boxes",
      keywords: "debug outline grid layout konami",
      icon: <Grid3x3 size={15} />,
      run: toggleBlueprint,
    },
    {
      id: "sudo",
      group: "System",
      label: "sudo hire manav",
      hint: "requires recruiter privileges",
      keywords: "sudo hire",
      icon: <Terminal size={15} />,
      run: hireManav,
      hidden: true,
    },
  ];
}

const COMMANDS = buildCommands();

function matches(cmd: Command, q: string) {
  if (!q) return !cmd.hidden;
  const hay = `${cmd.label} ${cmd.hint ?? ""} ${cmd.keywords ?? ""} ${cmd.group}`.toLowerCase();
  if (cmd.hidden) return q.startsWith("sudo") || q.startsWith("hire");
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const listId = useId();
  const isApple = useIsApple();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMANDS.filter((c) => matches(c, q));
  }, [query]);

  const show = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus?.({ preventScroll: true });
  }, []);

  // Global shortcut + event bus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, onOpen);
    };
  }, [open, show, close]);

  // Lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Keep the active option in view.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (cmd: Command | undefined) => {
    if (!cmd) return;
    setOpen(false);
    // Let the dialog unmount before navigating so focus lands on the target.
    window.setTimeout(() => cmd.run(), 10);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      // Single focusable control: keep focus inside the dialog.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          key="palette"
          className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[12vh] sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div aria-hidden className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-line-strong bg-surface/95 shadow-[0_30px_120px_-20px_rgb(0_0_0/0.8),0_0_0_1px_rgb(139_123_255/0.12)] backdrop-blur-xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={16} className="shrink-0 text-subtle" aria-hidden />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search Manav…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                autoComplete="off"
                spellCheck={false}
                className="h-14 w-full bg-transparent text-base text-fg placeholder:text-subtle focus:outline-none sm:text-[15px]"
              />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
                ESC
              </kbd>
            </div>

            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(420px,55vh)] overflow-y-auto overscroll-contain p-2"
            >
              {results.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-subtle" role="presentation">
                  No results. Try <span className="font-mono text-muted">projects</span>,{" "}
                  <span className="font-mono text-muted">resume</span> or{" "}
                  <span className="font-mono text-muted">sudo</span>.
                </li>
              ) : (
                results.map((cmd, i) => {
                  const header = i === 0 || results[i - 1].group !== cmd.group ? cmd.group : null;
                  return (
                    <li key={cmd.id} role="presentation">
                      {header ? (
                        <div className="px-3 pt-3 pb-1.5 label text-[10px]" aria-hidden>
                          {header}
                        </div>
                      ) : null}
                      <div
                        id={`${listId}-${cmd.id}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(cmd)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                          i === active ? "bg-white/[0.07] text-fg" : "text-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-md border border-line",
                            i === active ? "text-accent-bright" : "text-subtle",
                          )}
                        >
                          {cmd.icon}
                        </span>
                        <span className={cn("truncate", cmd.hidden && "font-mono")}>{cmd.label}</span>
                        {cmd.hint ? (
                          <span className="ml-auto hidden truncate pl-3 text-xs text-subtle sm:inline">
                            {cmd.hint}
                          </span>
                        ) : null}
                        {i === active ? (
                          <CornerDownLeft size={14} className="ml-2 shrink-0 text-subtle" aria-hidden />
                        ) : (
                          <ArrowRight size={14} className="ml-2 shrink-0 opacity-0" aria-hidden />
                        )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
              <span className="flex items-center gap-3">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span className="hidden sm:inline">esc close</span>
              </span>
              <span>{isApple ? "⌘" : "Ctrl"} K</span>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
