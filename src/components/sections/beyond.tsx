import { CodeforcesIcon } from "@/components/ui/icons";
import { ExternalArrow, Section, SectionHeader } from "@/components/ui/primitives";
import { chess, competitive, site } from "@/content/site";
import { CF_TIERS, getRatingHistory, tierFor, type RatingPoint } from "@/lib/codeforces";
import { knightsTour } from "@/lib/knights-tour";
import { delay } from "@/lib/utils";

const TOUR = knightsTour(1, 0); // starts on b1, where a knight begins the game

// Board squares and visit dots as single paths — two nodes instead of ~100.
const SQUARES = Array.from({ length: 64 }, (_, i) => [i % 8, Math.floor(i / 8)])
  .filter(([f, r]) => (f + r) % 2 === 1)
  .map(([f, r]) => `M${f} ${r}h1v1h-1z`)
  .join("");
const DOTS = TOUR.map(
  ([f, r]) => `M${f + 0.445} ${7.5 - r}a.055 .055 0 1 0 .11 0a.055 .055 0 1 0 -.11 0`,
).join("");

const CHART = {
  wide: { W: 600, H: 250, pad: { l: 6, r: 78, t: 30, b: 24 }, font: 10 },
  compact: { W: 340, H: 230, pad: { l: 4, r: 4, t: 34, b: 22 }, font: 11 },
} as const;

/** `compact` keeps labels legible on phones: narrower viewBox, tier labels inside the bands. */
function RatingChart({
  points,
  variant,
  className,
}: {
  points: RatingPoint[];
  variant: keyof typeof CHART;
  className?: string;
}) {
  const { W, H, pad, font } = CHART[variant];
  const compact = variant === "compact";
  const peak = points.reduce((a, b) => (b.rating > a.rating ? b : a));
  const yMin = 200;
  const yMax = Math.max(2200, peak.rating + 150);
  const t0 = points[0].t;
  const t1 = points[points.length - 1].t;
  const x = (t: number) => pad.l + ((t - t0) / Math.max(t1 - t0, 1)) * (W - pad.l - pad.r);
  const y = (r: number) => pad.t + (1 - (Math.max(r, yMin) - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);
  const d = points.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)} ${y(p.rating).toFixed(1)}`).join(" ");
  const years = Array.from(new Set(points.map((p) => new Date(p.t * 1000).getUTCFullYear()))).filter(
    (yr) => Date.UTC(yr, 0, 1) / 1000 > t0,
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={`Codeforces rating history: ${points.length} rated contests, peak ${peak.rating} after ${peak.contest} (rank ${peak.rank}).`}
    >
      <defs>
        <linearGradient id={`cf-line-${variant}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8b7bff" />
          <stop offset="1" stopColor="#5fd8e6" />
        </linearGradient>
      </defs>

      {CF_TIERS.map((tier, i) => {
        const next = CF_TIERS[i + 1]?.min ?? Infinity;
        if (tier.min >= yMax || next <= yMin) return null;
        const top = y(Math.min(next, yMax));
        const bottom = y(Math.max(tier.min, yMin));
        return (
          <g key={tier.label}>
            <rect
              x={pad.l}
              y={top}
              width={W - pad.l - pad.r}
              height={bottom - top}
              fill={tier.color}
              opacity={0.05}
            />
            <line
              x1={pad.l}
              x2={W - pad.r}
              y1={bottom}
              y2={bottom}
              stroke={tier.color}
              strokeOpacity={0.18}
              strokeDasharray="2 4"
            />
            {bottom - top > 14 && !(compact && tier.min < 1200) ? (
              <text
                x={compact ? pad.l + 6 : W - pad.r + 8}
                y={(top + bottom) / 2 + 3}
                fill={tier.color}
                fillOpacity={0.75}
                fontSize={font - 0.5}
                fontFamily="var(--font-mono)"
              >
                {tier.label === "Candidate Master" ? "Cand. Master" : tier.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {years.map((yr) => {
        const xx = x(Date.UTC(yr, 0, 1) / 1000);
        return (
          <g key={yr}>
            <line x1={xx} x2={xx} y1={pad.t - 8} y2={H - pad.b} stroke="rgb(255 255 255 / 0.08)" />
            <text x={xx + 4} y={H - 8} fill="#85859a" fontSize={font} fontFamily="var(--font-mono)">
              {yr}
            </text>
          </g>
        );
      })}

      <path
        d={d}
        fill="none"
        stroke={`url(#cf-line-${variant})`}
        strokeWidth="2"
        strokeLinejoin="round"
        className="draw"
        pathLength={1}
      />
      {points.map((p) => (
        <circle
          key={p.t}
          cx={x(p.t)}
          cy={y(p.rating)}
          r={p === peak ? 4.5 : 2.2}
          fill={p === peak ? "#fff" : tierFor(p.rating).color}
          stroke={p === peak ? "#a99dff" : "none"}
          strokeWidth={p === peak ? 3 : 0}
        />
      ))}

      {/* Peak annotation */}
      <g transform={`translate(${x(peak.t) - 12} ${y(peak.rating) - 14})`}>
        <text
          textAnchor="end"
          fill="#ececf1"
          fontSize={font + 2}
          fontWeight="600"
          fontFamily="var(--font-mono)"
        >
          {peak.rating}
        </text>
        <text textAnchor="end" y={font + 4} fill="#a99dff" fontSize={font} fontFamily="var(--font-mono)">
          rank #{peak.rank} · +{peak.delta}
        </text>
      </g>
    </svg>
  );
}

function KnightBoard() {
  const cx = (f: number) => f + 0.5;
  const cy = (r: number) => 7 - r + 0.5;
  const d = TOUR.map(([f, r], i) => `${i ? "L" : "M"}${cx(f)} ${cy(r)}`).join(" ");
  const [sf, sr] = TOUR[0];
  const [ef, er] = TOUR[TOUR.length - 1];
  return (
    <svg
      viewBox="-0.3 -0.3 8.6 8.6"
      className="aspect-square w-full"
      role="img"
      aria-label={`A knight's tour: the knight visits all ${TOUR.length} squares exactly once, starting on b1, chosen with Warnsdorff's rule.`}
    >
      <path d={SQUARES} fill="rgb(255 255 255 / 0.045)" />
      <rect x={0} y={0} width={8} height={8} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth={0.03} />
      <path
        d={d}
        fill="none"
        stroke="#8b7bff"
        strokeOpacity={0.55}
        strokeWidth={0.035}
        strokeLinejoin="round"
        className="draw"
        style={{ ["--draw" as string]: "6s" }}
        pathLength={1}
      />
      <path d={DOTS} fill="rgb(255 255 255 / 0.35)" />
      <circle cx={cx(ef)} cy={cy(er)} r={0.14} fill="#5fd8e6" />
      <text
        x={cx(sf)}
        y={cy(sr) + 0.3}
        textAnchor="middle"
        fontSize="0.85"
        fill="#ececf1"
        style={{ fontFamily: "system-ui, sans-serif" }}
      >
        ♞
      </text>
    </svg>
  );
}

export async function Beyond() {
  const { points, live } = await getRatingHistory();
  const peak = Math.max(...points.map((p) => p.rating), competitive.maxRating);
  const tier = tierFor(peak);

  return (
    <Section id="beyond" className="border-t border-line">
      <SectionHeader
        id="beyond"
        index="06"
        kicker="Off the clock"
        path="~/beyond"
        title="Beyond the codebase."
        lede="Timed contests and long games — the same muscle, trained on different boards."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <article
          aria-labelledby="cp-title"
          data-reveal
          className="flex flex-col rounded-2xl border border-line bg-surface/40 p-5 sm:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="label text-accent-bright">Competitive programming</span>
            <a
              href={site.links.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-muted hover:text-fg"
            >
              <CodeforcesIcon size={12} /> {competitive.handle} <ExternalArrow />
            </a>
          </div>
          <h3
            id="cp-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
            style={{ color: tier.color }}
          >
            {tier.label}
          </h3>
          <p className="mt-1 text-sm text-muted">on Codeforces</p>

          <dl className="mt-7 grid grid-cols-3 divide-x divide-line border-y border-line">
            {[
              { k: "peak rating", v: String(peak) },
              { k: "global rank, R1033", v: `#${competitive.highlight.rank}` },
              { k: "rated contests", v: String(points.length) },
            ].map((s, i) => (
              <div key={s.k} className={i ? "flex flex-col-reverse py-4 pl-4" : "flex flex-col-reverse py-4"}>
                <dt className="mt-1 text-[11px] leading-tight text-subtle sm:text-xs">{s.k}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6" data-reveal="fade" style={delay(150)}>
            <RatingChart points={points} variant="compact" className="h-auto w-full sm:hidden" />
            <RatingChart points={points} variant="wide" className="hidden h-auto w-full sm:block" />
          </div>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-subtle">
            {competitive.highlight.contest} — rank 5 worldwide. Data{" "}
            {live ? "live from the Codeforces API, refreshed daily" : "from the Codeforces API"}.
          </p>
        </article>

        <article
          aria-labelledby="chess-title"
          data-reveal
          style={delay(100)}
          className="flex flex-col rounded-2xl border border-line bg-surface/40 p-5 sm:p-8"
        >
          <span className="label text-accent-bright">Chess</span>
          <h3 id="chess-title" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">
            {chess.title}
          </h3>
          <dl className="mt-7 grid grid-cols-2 divide-x divide-line border-y border-line">
            {chess.ratings.map((r, i) => (
              <div
                key={r.platform}
                className={i ? "flex flex-col-reverse py-4 pl-4" : "flex flex-col-reverse py-4"}
              >
                <dt className="mt-1 text-xs text-subtle">{r.platform} peak</dt>
                <dd className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{r.peak}</dd>
              </div>
            ))}
          </dl>
          <div className="mx-auto mt-6 w-full max-w-[340px]" data-reveal="fade" style={delay(250)}>
            <KnightBoard />
          </div>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-subtle">
            A knight&apos;s tour, generated with Warnsdorff&apos;s rule — every square, exactly once.
          </p>
        </article>
      </div>
    </Section>
  );
}
