import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Manav Punjabi — Software Engineer. AI / ML · Systems · Backend.";

const font = (file: string) => readFile(join(process.cwd(), "src/app/_og", file));

const INK = "#07070b";
const FG = "#ececf1";
const MUTED = "#a3a3b3";
const SUBTLE = "#85859a";
const ACCENT = "#a99dff";
const CYAN = "#5fd8e6";
const LINE = "rgba(255,255,255,0.12)";

export async function renderOgCard() {
  const [sans, sansBold, mono] = await Promise.all([
    font("InstrumentSans-Regular.ttf"),
    font("InstrumentSans-SemiBold.ttf"),
    font("JetBrainsMono-Medium.ttf"),
  ]);

  const stages = ["USER", "DATA", "MODEL", "INFRA", "PRODUCT"];
  const signals = ["IIT Roorkee", "Glance · InMobi", "300M+ users", "Codeforces Candidate Master"];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: INK,
        backgroundImage: `radial-gradient(circle at 82% 18%, rgba(139,123,255,0.28), transparent 45%), radial-gradient(circle at 10% 100%, rgba(95,216,230,0.10), transparent 40%), linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 100% 100%, 56px 56px, 56px 56px",
        color: FG,
        fontFamily: "Instrument Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "JetBrains Mono",
            fontSize: 20,
            letterSpacing: 3,
            color: SUBTLE,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#4ade80" }} />
          <span style={{ color: MUTED }}>SYSTEM ONLINE</span>
        </div>
        <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 26, color: FG }}>
          MANAV<span style={{ color: ACCENT }}>.</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 118, fontWeight: 600, letterSpacing: -5, lineHeight: 1 }}>MANAV PUNJABI</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 22 }}>
          <span style={{ fontSize: 50, color: FG, letterSpacing: -1.5 }}>Software Engineer</span>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 26, color: ACCENT, letterSpacing: 1 }}>
            AI / ML · Systems · Backend
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "JetBrains Mono",
            fontSize: 18,
            letterSpacing: 2,
          }}
        >
          {stages.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  padding: "8px 14px",
                  border: `1px solid ${i === stages.length - 1 ? CYAN : "rgba(169,157,255,0.55)"}`,
                  borderRadius: 8,
                  color: FG,
                  background: INK,
                }}
              >
                {s}
              </div>
              {i < stages.length - 1 ? (
                <div
                  style={{
                    display: "flex",
                    width: 58,
                    height: 2,
                    background: "linear-gradient(to right, #8b7bff, #5fd8e6)",
                  }}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, borderTop: `1px solid ${LINE}`, paddingTop: 24 }}>
          {signals.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "8px 14px",
                border: `1px solid ${LINE}`,
                borderRadius: 8,
                fontFamily: "JetBrains Mono",
                fontSize: 19,
                color: MUTED,
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Sans", data: sans, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: sansBold, weight: 600, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
