"use client";

import { AnimatePresence, m } from "framer-motion";
import { Command, FileDown, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { mailto, navLinks, site } from "@/content/site";
import { openPalette, useIsApple } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const isApple = useIsApple();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item whose section is currently in the reading zone.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-line bg-ink/75 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-4 px-5 sm:px-8"
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-[15px] font-semibold tracking-tight text-fg"
          aria-label={`${site.name} — back to top`}
        >
          <span>
            MANAV<span className="text-accent-bright transition-colors group-hover:text-cyan">.</span>
          </span>
        </a>

        <span className="hidden items-center gap-2 rounded-full border border-line px-2.5 py-1 md:flex">
          <span className="status-dot size-1.5 rounded-full bg-ok" aria-hidden />
          <span className="font-mono text-[10px] tracking-[0.14em] text-subtle uppercase">online</span>
        </span>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-accent to-cyan"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1.5 md:ml-2">
          <button
            type="button"
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-2.5 text-subtle transition-colors hover:border-line-strong hover:text-fg"
            aria-label="Open command palette"
            aria-keyshortcuts={isApple ? "Meta+K" : "Control+K"}
          >
            <Search size={14} aria-hidden />
            <span className="hidden items-center gap-0.5 font-mono text-[11px] sm:flex">
              {isApple ? <Command size={11} aria-hidden /> : "Ctrl "}K
            </span>
          </button>
          <a
            href={site.resume}
            download="Manav-Punjabi-Resume.pdf"
            className="hidden h-9 items-center gap-2 rounded-lg bg-fg px-3 text-sm font-medium text-ink transition-colors hover:bg-white lg:flex"
          >
            <FileDown size={14} aria-hidden />
            Resume
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg border border-line text-muted md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
          >
            <div className="px-5 pt-3 pb-6">
              <ul className="divide-y divide-line">
                {navLinks.map((link, i) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline justify-between py-4 text-2xl font-semibold tracking-tight text-fg"
                    >
                      {link.label}
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={mailto("Let's build something")}
                  className="col-span-2 flex h-12 items-center justify-center rounded-[10px] bg-fg text-sm font-medium text-ink"
                >
                  Let&apos;s build something →
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-[10px] border border-line-strong text-sm text-fg"
                >
                  <GitHubIcon size={15} /> GitHub
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-[10px] border border-line-strong text-sm text-fg"
                >
                  <LinkedInIcon size={15} /> LinkedIn
                </a>
                <a
                  href={site.resume}
                  download="Manav-Punjabi-Resume.pdf"
                  className="col-span-2 flex h-12 items-center justify-center gap-2 rounded-[10px] border border-line-strong text-sm text-fg"
                >
                  <FileDown size={15} aria-hidden /> Download resume
                </a>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
