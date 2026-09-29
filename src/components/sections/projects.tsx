import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { GitHubIcon } from "@/components/ui/icons";
import { ExternalArrow, Section, SectionHeader, Tag } from "@/components/ui/primitives";
import { CorrectionLoop, ModelBracket, RagPipeline } from "@/components/visuals/project-visuals";
import { forecasting, healthQuery, otherBuilds, site, voiceAgent } from "@/content/site";
import { cn, delay } from "@/lib/utils";

type CaseData = {
  index: string;
  id: string;
  title: string;
  subtitle?: string;
  org: string;
  date: string;
  problem: string;
  system: string;
  results?: readonly { value: string; label: string }[];
  stack: readonly string[];
  repo?: string;
};

function RepoLink({ href, label = "View source" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      <GitHubIcon size={14} />
      {label}
      <ExternalArrow className="text-subtle" />
    </a>
  );
}

function ProjectCase({ data, visual, reverse }: { data: CaseData; visual: ReactNode; reverse?: boolean }) {
  const titleId = `project-${data.id}-title`;
  return (
    <article
      id={`project-${data.id}`}
      aria-labelledby={titleId}
      className="grid scroll-mt-24 gap-10 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-16"
    >
      <div className={cn(reverse && "lg:order-2")}>
        <div data-reveal className="flex items-center gap-4">
          <span className="font-mono text-5xl font-light tracking-tighter text-white/15 sm:text-6xl">
            {data.index}
          </span>
          <span className="label leading-relaxed">
            {data.org}
            <br />
            {data.date}
          </span>
        </div>
        <h3
          id={titleId}
          data-reveal
          style={delay(60)}
          className="mt-5 text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance text-fg sm:text-4xl"
        >
          {data.title}
        </h3>
        {data.subtitle ? (
          <p data-reveal style={delay(80)} className="mt-2 text-muted">
            {data.subtitle}
          </p>
        ) : null}

        <dl className="mt-8 space-y-6">
          {[
            ["Problem", data.problem],
            ["System", data.system],
          ].map(([k, v], i) => (
            <div
              key={k}
              data-reveal
              style={delay(100 + i * 60)}
              className="grid gap-2 sm:grid-cols-[88px_1fr]"
            >
              <dt className="pt-1 label text-accent-bright">{k}</dt>
              <dd className="text-[15px] leading-relaxed text-muted">{v}</dd>
            </div>
          ))}
        </dl>

        {data.results ? (
          <dl
            data-reveal
            style={delay(200)}
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line"
          >
            {data.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse bg-ink px-4 py-4">
                <dt className="mt-1 text-xs text-subtle">{r.label}</dt>
                <dd className="text-xl font-semibold tracking-tight text-fg sm:text-2xl">{r.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div data-reveal style={delay(240)} className="mt-8 flex flex-wrap items-center gap-1.5">
          {data.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        {data.repo ? (
          <div data-reveal style={delay(280)} className="mt-6">
            <RepoLink href={data.repo} />
          </div>
        ) : null}
      </div>

      <div data-reveal style={delay(120)} className={cn(reverse && "lg:order-1")}>
        {visual}
      </div>
    </article>
  );
}

function OtherBuilds() {
  return (
    <div className="mt-6 md:mt-10">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="label text-accent-bright">Also built</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">
            Other things I&apos;ve built
          </h3>
        </div>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-fg"
        >
          <GitHubIcon size={13} /> all repositories <ExternalArrow />
        </a>
      </div>

      <ul className="grid lg:grid-cols-2 lg:gap-x-10">
        {otherBuilds.map((b, i) => (
          <li key={b.name} data-reveal="fade" style={delay((i % 4) * 60)} className="border-b border-line">
            <details className="group/d">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <span className="pt-1 font-mono text-[11px] text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-base font-medium text-fg">{b.name}</span>
                    <span className="font-mono text-[10px] tracking-wide text-subtle uppercase">
                      {b.kind}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{b.blurb}</span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className="mt-1 shrink-0 text-subtle transition-transform duration-300 group-open/d:rotate-180"
                />
              </summary>
              <div className="pb-6 pl-8">
                <p className="text-sm leading-relaxed text-muted">{b.detail}</p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {b.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                <a
                  href={b.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 font-mono text-xs text-accent-bright hover:text-fg"
                >
                  <GitHubIcon size={13} /> source <ExternalArrow />
                </a>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects" className="border-t border-line">
      <SectionHeader
        id="projects"
        index="04"
        kicker="Builds"
        path="~/projects"
        title="Case studies, not screenshots."
        lede="Problem first, then the system — with the numbers where they exist."
      />

      <ProjectCase data={voiceAgent} visual={<CorrectionLoop />} />
      <ProjectCase data={forecasting} visual={<ModelBracket />} reverse />
      <ProjectCase data={healthQuery} visual={<RagPipeline />} />

      <OtherBuilds />
    </Section>
  );
}
