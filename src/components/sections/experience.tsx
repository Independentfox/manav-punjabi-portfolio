import type { ReactNode } from "react";
import { GlanceArchitecture } from "@/components/visuals/glance-architecture";
import { StegoPipeline } from "@/components/visuals/stego-pipeline";
import { Section, SectionHeader, Tag } from "@/components/ui/primitives";
import { airblack, glance, journey, noos } from "@/content/site";
import { cn, delay } from "@/lib/utils";

function JourneyRail() {
  return (
    <nav aria-label="Career progression" data-reveal className="mb-10 md:mb-14">
      <ol className="relative grid grid-cols-3">
        <span
          aria-hidden
          className="absolute top-[7px] right-[16.66%] left-[16.66%] h-px bg-gradient-to-r from-line-strong via-accent/60 to-cyan/70"
        />
        {journey.map((stop, i) => {
          const last = i === journey.length - 1;
          return (
            <li key={stop.id} className="relative flex flex-col items-center text-center">
              <a href={`#exp-${stop.id}`} className="group flex flex-col items-center">
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 size-[15px] rounded-full border-2 bg-ink transition-colors",
                    last ? "border-cyan shadow-[0_0_14px_rgb(95_216_230/0.6)]" : "border-accent/70",
                  )}
                />
                <span className="mt-3 font-mono text-[10px] text-subtle">{stop.year}</span>
                <span className="mt-1 text-sm font-medium text-fg transition-colors group-hover:text-accent-bright sm:text-base">
                  {stop.company}
                </span>
                <span className={cn("mt-1 label text-[10px]", last ? "text-cyan" : "text-subtle")}>
                  {stop.stage}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((b, i) => (
        <li
          key={b}
          data-reveal
          style={delay(80 + i * 70)}
          className="grid grid-cols-[26px_1fr] text-[15px] leading-relaxed text-muted"
        >
          <span aria-hidden className="pt-px font-mono text-[13px] text-accent-bright">
            →
          </span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseHeader({
  stage,
  period,
  company,
  suffix,
  role,
  featured,
  titleId,
}: {
  titleId: string;
  stage: string;
  period: string;
  company: string;
  suffix?: string;
  role: string;
  featured?: boolean;
}) {
  return (
    <div data-reveal>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className={cn("label", featured ? "text-cyan" : "text-accent-bright")}>
          {featured ? "Featured · " : ""}
          {stage}
        </span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        <span className="label">{period}</span>
      </div>
      <h3
        id={titleId}
        className={cn(
          "mt-4 font-semibold tracking-[-0.03em] text-fg",
          featured ? "text-4xl sm:text-5xl" : "text-3xl",
        )}
      >
        {company}
        {suffix ? <span className="text-subtle"> · {suffix}</span> : null}
      </h3>
      <p className="mt-1.5 text-[15px] text-muted">{role}</p>
    </div>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <div data-reveal className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}

function ServiceGrid() {
  return (
    <span aria-hidden className="mt-2 flex gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className="size-2 rounded-[2px] bg-accent/80"
          style={{ opacity: 0.45 + (i / 9) * 0.55 }}
        />
      ))}
    </span>
  );
}

function GlanceCase() {
  return (
    <article
      id="exp-glance"
      aria-labelledby="exp-glance-title"
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-line-strong bg-gradient-to-b from-surface to-ink p-5 sm:p-8 lg:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(139_123_255/0.14),transparent)]"
      />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <div>
            <CaseHeader
              titleId="exp-glance-title"
              featured
              stage={glance.stage}
              period={glance.period}
              company={glance.company}
              suffix={glance.parent}
              role={glance.role}
            />
          </div>
          <p data-reveal className="mt-6 max-w-md text-lg leading-snug text-fg/90">
            {glance.summary}
          </p>

          <dl data-reveal className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line">
            {glance.figures.map((f, i) => (
              <div key={f.label} className={cn("flex flex-col-reverse py-4", i > 0 && "pl-4")}>
                <dt className="mt-1 text-xs text-subtle">{f.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {f.value}
                  {i === 1 ? <ServiceGrid /> : null}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <Bullets items={glance.bullets} />
          </div>
          <div className="mt-8">
            <Tags tags={glance.tags} />
          </div>
        </div>

        <div data-reveal style={delay(120)}>
          <GlanceArchitecture />
        </div>
      </div>
    </article>
  );
}

function ZudoStatus() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink/70 font-mono text-[11px] sm:text-[12px]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="text-[11px] text-subtle">zudo — production</span>
        <span className="flex items-center gap-1.5 text-[10px] text-ok">
          <span className="size-1.5 rounded-full bg-ok" aria-hidden />
          live
        </span>
      </div>
      <div className="p-4">
        <p className="text-fg">
          <span className="text-accent-bright">$</span> zudo status --all
        </p>
        <ul className="mt-3 space-y-1.5" aria-label="Modules I built or owned">
          {airblack.modules.map((mod, i) => (
            <li
              key={mod.name}
              data-reveal="fade"
              style={delay(150 + i * 110)}
              className="flex items-baseline gap-2"
            >
              <span aria-hidden className="text-ok">
                ●
              </span>
              <span className="text-fg">{mod.name}</span>
              <span aria-hidden className="mb-1 min-w-4 flex-1 border-b border-dotted border-white/15" />
              <span className={cn("text-right", mod.name === "payments" ? "text-cyan" : "text-muted")}>
                {mod.status}
              </span>
            </li>
          ))}
        </ul>
        <p data-reveal="fade" style={delay(900)} className="mt-3 text-ok">
          all systems operational ✓
        </p>
      </div>
    </div>
  );
}

function SideCase({
  id,
  header,
  summary,
  visual,
  bullets,
  tags,
  extra,
}: {
  id: string;
  header: ReactNode;
  summary: string;
  visual: ReactNode;
  bullets: readonly string[];
  tags: readonly string[];
  extra?: ReactNode;
}) {
  return (
    <article
      id={`exp-${id}`}
      aria-labelledby={`exp-${id}-title`}
      className="flex scroll-mt-24 flex-col gap-7 rounded-2xl border border-line bg-surface/40 p-5 sm:p-8"
    >
      <div>{header}</div>
      <p data-reveal className="-mt-2 text-[17px] leading-snug text-fg/90">
        {summary}
      </p>
      <div data-reveal style={delay(80)}>
        {visual}
      </div>
      {extra}
      <Bullets items={bullets} />
      <Tags tags={tags} />
    </article>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        index="02"
        kicker="Production"
        path="~/experience"
        title={
          <>
            Research <span className="text-subtle">→</span> product <span className="text-subtle">→</span>{" "}
            scale.
          </>
        }
        lede="Three internships, each one a step closer to production at scale."
      />

      <JourneyRail />
      <GlanceCase />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SideCase
          id="airblack"
          header={
            <CaseHeader
              titleId="exp-airblack-title"
              stage={airblack.stage}
              period={airblack.period}
              company={airblack.company}
              role={airblack.role}
            />
          }
          summary={airblack.summary}
          visual={<ZudoStatus />}
          bullets={airblack.bullets}
          tags={airblack.tags}
        />
        <SideCase
          id="noos"
          header={
            <CaseHeader
              titleId="exp-noos-title"
              stage={noos.stage}
              period={noos.period}
              company={noos.company}
              role={noos.role}
            />
          }
          summary={noos.summary}
          visual={<StegoPipeline />}
          extra={
            <div data-reveal className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-subtle">
              <span>compared</span>
              {noos.techniques.map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  {i > 0 ? <span aria-hidden>vs</span> : null}
                  <span className="rounded border border-line px-1.5 py-0.5 text-muted">{t}</span>
                </span>
              ))}
            </div>
          }
          bullets={noos.bullets}
          tags={noos.tags}
        />
      </div>
    </Section>
  );
}
