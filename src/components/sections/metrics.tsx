import { CountUp } from "@/components/visuals/count-up";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { metrics } from "@/content/site";
import { delay } from "@/lib/utils";

export function Metrics() {
  return (
    <Section id="signal" className="pt-16 md:pt-24">
      <SectionHeader
        id="signal"
        index="01"
        kicker="Signal"
        path="~/metrics"
        title="Engineer at a glance."
        lede="Every number here traces back to shipped work or a public result."
      />

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.source}
            data-reveal
            style={delay(i * 60)}
            className="group relative flex min-h-[176px] flex-col justify-between bg-ink p-4 transition-colors duration-300 hover:bg-surface sm:min-h-[200px] sm:p-6"
          >
            <span
              aria-hidden
              className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-accent to-cyan transition-[width] duration-500 group-hover:w-full"
            />
            <div className="flex items-center justify-between font-mono text-[10px] text-subtle">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="truncate pl-2 opacity-80">{m.source}</span>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="mt-3 min-h-[2.8em] text-[13px] leading-snug text-muted sm:text-sm">{m.label}</dt>
              <dd className="text-[2.1rem] leading-none font-semibold tracking-[-0.04em] text-fg sm:text-5xl">
                {m.prefix ? <span className="text-muted">{m.prefix}</span> : null}
                <CountUp value={m.value} />
                {m.suffix ? <span className="text-accent-bright">{m.suffix}</span> : null}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </Section>
  );
}
