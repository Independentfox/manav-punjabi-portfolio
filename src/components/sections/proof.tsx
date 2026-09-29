import { GraduationCap, Rocket } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { achievements, education, leadership } from "@/content/site";
import { delay } from "@/lib/utils";

export function Proof() {
  return (
    <Section id="proof" className="border-t border-line">
      <SectionHeader
        id="proof"
        index="07"
        kicker="Proof"
        path="~/achievements"
        title="Proof of work."
        lede="Ranks and results from national exams, olympiads and contests."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        <ol className="border-t border-line">
          {achievements.map((a, i) => (
            <li
              key={a.what}
              data-reveal
              style={delay(i * 50)}
              className="group grid grid-cols-[112px_1fr] items-baseline gap-4 border-b border-line py-5 transition-colors hover:bg-white/[0.015] sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              <span className="text-2xl font-semibold tracking-[-0.03em] whitespace-nowrap text-fg transition-colors group-hover:text-accent-bright sm:text-3xl">
                {a.mark}
              </span>
              <span>
                <span className="block text-[15px] font-medium text-fg">{a.what}</span>
                <span className="mt-0.5 block text-sm text-subtle">{a.note}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="space-y-4">
          <div data-reveal className="rounded-2xl border border-line bg-surface/40 p-6">
            <div className="flex items-center justify-between">
              <span className="label text-accent-bright">Education</span>
              <GraduationCap size={16} className="text-subtle" aria-hidden />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-fg">IIT Roorkee</h3>
            <p className="mt-1 text-[15px] text-muted">{education.degree}</p>
            <p className="mt-1 text-sm text-subtle">{education.minor}</p>
            <p className="mt-4 font-mono text-xs text-subtle">{education.period}</p>
          </div>
          <div data-reveal style={delay(80)} className="rounded-2xl border border-line bg-surface/40 p-6">
            <div className="flex items-center justify-between">
              <span className="label text-accent-bright">Leadership</span>
              <Rocket size={16} className="text-subtle" aria-hidden />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-fg">{leadership.role}</h3>
            <p className="mt-1 text-sm text-subtle">{leadership.org}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{leadership.detail}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
