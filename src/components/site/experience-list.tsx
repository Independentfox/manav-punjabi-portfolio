"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Role } from "@/content/site";
import { cn } from "@/lib/utils";

export function ExperienceList({ roles }: { roles: Role[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set([roles[0]?.id]));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ul className="divide-y divide-dashed divide-line-strong">
      {roles.map((role) => {
        const isOpen = open.has(role.id);
        const panelId = `role-${role.id}`;
        return (
          <li key={role.id} id={`experience-${role.id}`} className="scroll-mt-24">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(role.id)}
              className="group flex w-full items-center gap-4 py-5 text-left"
            >
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-card text-lg font-semibold text-fg transition-colors group-hover:border-tint-line group-hover:text-link"
              >
                {role.monogram}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] leading-tight font-medium text-fg">{role.company}</span>
                <span className="mt-1 block text-[15px] leading-tight text-muted">{role.role}</span>
              </span>
              <span className="hidden shrink-0 text-right sm:block">
                <span className="block text-sm text-fg/85">{role.period}</span>
                {role.place ? <span className="mt-1 block text-[13px] text-subtle">{role.place}</span> : null}
              </span>
              <ChevronDown
                size={16}
                aria-hidden
                className={cn(
                  "shrink-0 text-subtle transition-transform duration-300 group-hover:text-fg",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <div id={panelId} className="collapse-body" data-open={isOpen} inert={!isOpen}>
              <div>
                <div className="pb-6 sm:pl-15">
                  <p className="mb-3 text-sm text-subtle sm:hidden">{role.period}</p>
                  <ul className="list-disc space-y-2.5 pl-5 text-[15px] leading-relaxed text-muted marker:text-subtle">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                    {role.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs text-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
