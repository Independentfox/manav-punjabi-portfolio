import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Manav Punjabi — Software Engineer. Backend systems, ML infrastructure and AI tooling.";

const font = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

const BG = "#111111";
const FG = "#ededed";
const MUTED = "#a3a3a3";
const SUBTLE = "#8f8f8f";
const PEACH = "#f7b98b";

export async function renderOgCard() {
  const [regular, semibold, serif, mono] = await Promise.all([
    font("Figtree-Regular.ttf"),
    font("Figtree-SemiBold.ttf"),
    font("InstrumentSerif-Italic.ttf"),
    font("GeistMono-Medium.ttf"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px 88px",
        background: BG,
        backgroundImage: "radial-gradient(circle at 88% 12%, rgba(247,185,139,0.16), transparent 42%)",
        color: FG,
        fontFamily: "Figtree",
      }}
    >
      <div
        style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 22, letterSpacing: 3, color: SUBTLE }}
      >
        MANAV PUNJABI
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
          Hi, I&apos;m <span style={{ color: PEACH, marginLeft: 26 }}>Manav</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", marginTop: 26, fontSize: 52, color: MUTED }}>
          <span>&amp; I build</span>
          <span style={{ fontFamily: "Instrument Serif", fontSize: 62, color: PEACH, marginLeft: 16 }}>
            systems that scale
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 28,
          fontSize: 26,
          color: MUTED,
        }}
      >
        <span>Software Engineer · Backend · ML Infrastructure · AI Tooling</span>
        <span style={{ color: FG }}>IIT Roorkee</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Figtree", data: regular, weight: 400, style: "normal" },
        { name: "Figtree", data: semibold, weight: 600, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
