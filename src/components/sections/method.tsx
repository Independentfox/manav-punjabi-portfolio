import { Section, SectionHeader } from "@/components/ui/primitives";
import { principles } from "@/content/site";
import { delay } from "@/lib/utils";

export function Method() {
  return (
    <Section id="method" className="border-t border-line">
      <SectionHeader
        id="method"
        index="05"
        kicker="Method"
        path="~/principles"
        title="How I build."
        lede="Four rules I keep coming back to — each one visible in something I shipped."
      />

      <div className="relative">
        {/* Rail linking the four nodes (desktop) */}
        <div
          aria-hidden
          className="absolute top-[7px] right-[12.5%] left-[12.5%] hidden h-px bg-line md:block"
        />
        <div
          aria-hidden
          className="packet absolute top-[6px] right-[12.5%] left-[12.5%] hidden h-[3px] md:block"
          style={{ ["--dur" as string]: "6s" }}
        >
          <span className="absolute right-0 size-[3px] rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(95_216_230/0.7)]" />
        </div>

        <ol className="relative grid gap-8 md:grid-cols-4 md:gap-0">
          {principles.map((p, i) => (
            <li
              key={p.index}
              data-reveal
              style={delay(i * 110)}
              className="relative grid grid-cols-[24px_1fr] gap-x-4 md:block md:px-5 md:text-center"
            >
              {/* Mobile rail */}
              {i < principles.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-5 bottom-[-2rem] left-[7px] w-px bg-line md:hidden"
                />
              ) : null}
              <span
                aria-hidden
                className="relative z-10 mt-0.5 block size-[15px] rounded-full border-2 border-accent/80 bg-ink shadow-[0_0_0_5px_rgb(7_7_11)] md:mx-auto md:mt-0"
              />
              <div className="md:mt-7">
                <span className="font-mono text-[11px] text-accent-bright">{p.index}</span>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-fg">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted md:mx-auto md:max-w-[240px]">
                  {p.body}
                </p>
                <p className="mt-4 rounded-lg border border-line bg-surface/50 px-3 py-2.5 text-left font-mono text-[11px] leading-relaxed text-subtle md:mx-auto md:max-w-[250px]">
                  <span className="text-accent-bright">↳ </span>
                  {p.evidence}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Return path: 04 feeds back into 01 */}
        <div aria-hidden className="mt-10 hidden md:block">
          <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="h-10 w-full">
            <path
              d="M875 0 V20 Q875 32 863 32 H137 Q125 32 125 20 V0"
              fill="none"
              stroke="rgb(139 123 255 / 0.5)"
              vectorEffect="non-scaling-stroke"
              className="flow"
            />
          </svg>
          <p className="-mt-1 text-center font-mono text-[10px] tracking-[0.14em] text-subtle uppercase">
            ↺ repeat — every loop starts from what the last one measured
          </p>
        </div>
      </div>
    </Section>
  );
}
