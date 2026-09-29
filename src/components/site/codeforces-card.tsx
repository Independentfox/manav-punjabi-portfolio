import { ArrowUpRight } from "lucide-react";
import { competitive, site } from "@/content/site";
import { getRatingHistory, getSolvedCount, tierFor, type RatingPoint } from "@/lib/codeforces";

function RatingLine({ points }: { points: RatingPoint[] }) {
  const W = 640;
  const H = 120;
  const pad = { l: 4, r: 4, t: 18, b: 18 };
  const peak = points.reduce((a, b) => (b.rating > a.rating ? b : a));
  const yMin = 0;
  const yMax = Math.max(2100, peak.rating + 100);
  const t0 = points[0].t;
  const t1 = points[points.length - 1].t;
  const x = (t: number) => pad.l + ((t - t0) / Math.max(t1 - t0, 1)) * (W - pad.l - pad.r);
  const y = (r: number) => pad.t + (1 - (r - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);
  const line = points
    .map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)} ${y(p.rating).toFixed(1)}`)
    .join(" ");
  const area = `${line} L${x(t1).toFixed(1)} ${H - pad.b} L${x(t0).toFixed(1)} ${H - pad.b} Z`;
  const years = [...new Set(points.map((p) => new Date(p.t * 1000).getUTCFullYear()))];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`Codeforces rating over ${points.length} rated contests, peaking at ${peak.rating}.`}
    >
      <defs>
        <linearGradient id="cf-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--peach)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--peach)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Candidate Master threshold */}
      <line
        x1={pad.l}
        x2={W - pad.r}
        y1={y(1900)}
        y2={y(1900)}
        stroke="var(--line-strong)"
        strokeDasharray="3 5"
      />
      <text x={pad.l} y={y(1900) - 6} fontSize="11" fill="var(--subtle)">
        1900 · CM
      </text>
      <path d={area} fill="url(#cf-area)" />
      <path
        d={line}
        fill="none"
        stroke="var(--peach)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="draw"
        pathLength={1}
      />
      <circle
        cx={x(peak.t)}
        cy={y(peak.rating)}
        r="4"
        fill="var(--peach)"
        stroke="var(--canvas)"
        strokeWidth="2"
      />
      <text
        x={x(peak.t) - 10}
        y={y(peak.rating) + 4}
        textAnchor="end"
        fontSize="12"
        fontWeight="600"
        fill="var(--fg)"
      >
        {peak.rating}
      </text>
      {years.map((yr) => {
        const at = Math.max(Date.UTC(yr, 0, 1) / 1000, t0);
        return (
          <text key={yr} x={x(at)} y={H - 2} fontSize="11" fill="var(--subtle)">
            {yr}
          </text>
        );
      })}
    </svg>
  );
}

export async function CodeforcesCard() {
  const [{ points }, solved] = await Promise.all([getRatingHistory(), getSolvedCount()]);
  const peak = Math.max(...points.map((p) => p.rating), competitive.maxRating);

  return (
    <section
      aria-labelledby="cf-title"
      data-reveal
      className="rounded-2xl border border-line bg-card/60 p-5 sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="cf-title" className="eyebrow">
          Codeforces
        </h2>
        <a
          href={site.links.codeforces}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-xs text-subtle transition-colors hover:text-fg"
        >
          {site.handles.codeforces}
          <ArrowUpRight
            size={13}
            aria-hidden
            className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
          />
        </a>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        <span className="font-medium text-fg">{tierFor(peak).label}</span> · peak{" "}
        <span className="font-medium text-fg">{peak}</span> ·{" "}
        <span className="font-medium text-fg">{solved}</span> problems solved ·{" "}
        <span className="font-medium text-fg">#{competitive.contestRank}</span> globally in Round 1033
      </p>
      <div className="mt-5">
        <RatingLine points={points} />
      </div>
    </section>
  );
}
