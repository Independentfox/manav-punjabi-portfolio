import { LayerStack } from "@/components/visuals/layer-stack";
import { Section, SectionHeader } from "@/components/ui/primitives";

export function Range() {
  return (
    <Section id="range" className="border-t border-line">
      <SectionHeader
        id="range"
        index="03"
        kicker="Range"
        path="~/stack-depth"
        title="Not just models. The whole stack."
        lede="From algorithms to production — where each piece of work actually sits."
      />
      <div data-reveal>
        <LayerStack />
      </div>
    </Section>
  );
}
