"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { copyText } from "@/lib/hooks";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (await copyText(site.email)) {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }
      }}
      className="group flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-ink/60 px-3 py-2.5 text-left transition-colors hover:border-line-strong"
    >
      <span className="truncate text-fg">{site.email}</span>
      <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-subtle group-hover:text-fg">
        {copied ? <Check size={13} className="text-ok" aria-hidden /> : <Copy size={13} aria-hidden />}
        <span aria-live="polite">{copied ? "copied" : "copy"}</span>
      </span>
    </button>
  );
}
