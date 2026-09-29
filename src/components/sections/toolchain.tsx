import { Constellation } from "@/components/visuals/constellation";
import { Section, SectionHeader } from "@/components/ui/primitives";

export function Toolchain() {
  return (
    <Section id="toolchain" className="border-t border-line">
      <SectionHeader
        id="toolchain"
        index="08"
        kicker="Toolchain"
        path="~/skills"
        title="Tools I reach for."
        lede="Grouped by the layer they serve — and mapped to where I actually used them."
      />
      <div data-reveal>
        <Constellation />
      </div>
    </Section>
  );
}
