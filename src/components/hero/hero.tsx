import { FileDown } from "lucide-react";
import { Arrow, Container, ExternalArrow, buttonStyles } from "@/components/ui/primitives";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { heroSignals, mailto, pipelineStages, site } from "@/content/site";
import { cn, delay } from "@/lib/utils";
import { HeroConsole } from "./console";
import { PaletteHint } from "./palette-hint";

/* A faint cluster topology behind the console. Pure SVG + CSS. */
const NODES: [number, number][] = [
  [40, 70],
  [170, 36],
  [310, 80],
  [460, 44],
  [580, 118],
  [96, 196],
  [236, 168],
  [388, 214],
  [530, 250],
  [30, 330],
  [180, 312],
  [330, 352],
  [476, 392],
  [590, 340],
  [120, 458],
  [276, 476],
  [430, 494],
];
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [1, 6],
  [2, 6],
  [2, 7],
  [3, 7],
  [4, 8],
  [5, 6],
  [6, 7],
  [7, 8],
  [5, 9],
  [5, 10],
  [6, 10],
  [7, 11],
  [8, 12],
  [8, 13],
  [9, 10],
  [10, 11],
  [11, 12],
  [12, 13],
  [10, 14],
  [11, 15],
  [12, 16],
  [14, 15],
  [15, 16],
];
const FLOWS = [
  [0, 1],
  [6, 7],
  [7, 8],
  [11, 12],
  [10, 14],
];

function Topology() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 620 530"
      className="boot-fade pointer-events-none absolute top-16 right-[-6%] hidden w-[58%] max-w-[760px] opacity-80 lg:block"
      style={delay(200, "--boot")}
    >
      <defs>
        <radialGradient id="topo-fade" cx="55%" cy="45%" r="60%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="topo-mask">
          <rect width="620" height="530" fill="url(#topo-fade)" />
        </mask>
      </defs>
      <g mask="url(#topo-mask)">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="rgb(255 255 255 / 0.07)"
          />
        ))}
        {FLOWS.map(([a, b]) => (
          <line
            key={`f-${a}-${b}`}
            className="flow"
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            stroke="rgb(139 123 255 / 0.55)"
          />
        ))}
        {NODES.map(([x, y], i) => (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={i % 4 === 0 ? 3.2 : 2.2}
              fill={i % 5 === 2 ? "#a99dff" : "rgb(255 255 255 / 0.35)"}
            />
            {i % 4 === 0 ? <circle cx={x} cy={y} r={9} fill="none" stroke="rgb(169 157 255 / 0.18)" /> : null}
          </g>
        ))}
      </g>
    </svg>
  );
}

function PipelineTrace() {
  const start = 700;
  const step = 170;
  return (
    <div className="relative mt-16 md:mt-24">
      <div className="boot flex items-center justify-between" style={delay(start - 100, "--boot")}>
        <span className="label">system.trace</span>
        <span className="hidden label sm:inline">user → product · end-to-end</span>
      </div>
      <div className="relative mt-5">
        {/* Rail */}
        <div aria-hidden className="absolute inset-x-[10%] top-[17px] h-px bg-line" />
        <div
          aria-hidden
          className="trace-fill absolute inset-x-[10%] top-[17px] h-px bg-gradient-to-r from-accent via-accent-bright to-cyan opacity-70"
          style={delay(start, "--boot")}
        />
        {/* Packets */}
        {[
          { dur: "4.8s", at: 2100 },
          { dur: "4.8s", at: 3700 },
          { dur: "7.2s", at: 2900 },
        ].map((p, i) => (
          <div
            key={i}
            aria-hidden
            className="packet absolute inset-x-[10%] top-[16px] h-[3px]"
            style={{ ...delay(p.at, "--boot"), ["--dur" as string]: p.dur }}
          >
            <span className="absolute right-0 size-[3px] rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(95_216_230/0.7)]" />
          </div>
        ))}

        <ol aria-label="How I think about systems" className="relative grid grid-cols-5">
          {pipelineStages.map((stage, i) => (
            <li key={stage.id} className="flex flex-col items-center text-center">
              <span
                className="node-on relative z-10 rounded-md border border-line bg-ink px-2 py-[7px] font-mono text-[10px] tracking-[0.12em] text-subtle uppercase sm:px-3 sm:text-[11px]"
                style={delay(start + i * step, "--boot")}
              >
                <span className="sm:hidden">{stage.short}</span>
                <span className="hidden sm:inline">{stage.label}</span>
              </span>
              <span
                className="boot mt-2.5 font-mono text-[10px] text-subtle"
                style={delay(start + i * step + 120, "--boot")}
              >
                {stage.note}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20"
    >
      <div aria-hidden className="glow-top" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-radial opacity-80" />
      <Topology />

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="boot flex flex-wrap items-center gap-x-2.5 gap-y-1 label">
              <span className="status-dot size-1.5 rounded-full bg-ok" aria-hidden />
              <span className="text-muted">System online</span>
              <span aria-hidden className="text-line-strong">
                /
              </span>
              <span>{site.name}</span>
            </p>

            <h1
              id="hero-title"
              className="mt-7 text-[3.1rem] leading-[0.94] font-semibold tracking-[-0.05em] text-fg min-[390px]:text-[3.5rem] sm:text-7xl lg:text-[5.4rem]"
            >
              <span className="sr-only">{site.name}: </span>
              <span className="boot-rise block" style={delay(0, "--boot")}>
                I build systems
              </span>
              <span className="boot-rise block" style={delay(70, "--boot")}>
                that <span className="text-gradient pr-1">scale.</span>
              </span>
            </h1>

            <p
              className="boot mt-7 max-w-[560px] text-[17px] leading-relaxed text-muted md:text-lg"
              style={delay(260, "--boot")}
            >
              Software engineer focused on backend systems, ML infrastructure and AI tooling. Most recently, a
              recommendation pipeline serving <span className="text-fg">300M+ users</span> at Glance · InMobi.
            </p>

            <ul
              aria-label="Highlights"
              className="boot mt-8 flex flex-wrap gap-2"
              style={delay(340, "--boot")}
            >
              {heroSignals.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-2.5 py-1.5 font-mono text-[11px] text-muted",
                    i === 2 && "border-accent/40 text-fg",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("size-1 rounded-full", i === 2 ? "bg-cyan" : "bg-accent")}
                  />
                  {s}
                </li>
              ))}
            </ul>

            <div className="boot mt-10 flex flex-wrap items-center gap-2.5" style={delay(420, "--boot")}>
              <a href={mailto("Let's build something")} className={cn(buttonStyles.primary, "px-5")}>
                Let&apos;s build something <Arrow />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.secondary}
              >
                <GitHubIcon size={15} />
                View GitHub
                <ExternalArrow className="text-subtle" />
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.secondary}
              >
                <LinkedInIcon size={15} />
                LinkedIn
                <ExternalArrow className="text-subtle" />
              </a>
            </div>

            <p
              className="boot mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-subtle"
              style={delay(500, "--boot")}
            >
              <a
                href={site.resume}
                download="Manav-Punjabi-Resume.pdf"
                className="group inline-flex items-center gap-1.5 text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
              >
                <FileDown size={13} aria-hidden />
                resume.pdf
              </a>
              <span aria-hidden className="text-line-strong">
                /
              </span>
              <span>
                or press <PaletteHint /> to explore
              </span>
            </p>
          </div>

          <div className="lg:pt-3">
            <HeroConsole />
          </div>
        </div>

        <PipelineTrace />
      </Container>
    </section>
  );
}
