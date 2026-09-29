import { site } from "@/content/site";

export type RatingPoint = { contest: string; rank: number; rating: number; delta: number; t: number };

/**
 * Snapshot of https://codeforces.com/api/user.rating?handle=Akaza_3,
 * taken 2026-09-30. Used when the live API is unreachable at build time.
 */
const SNAPSHOT: [string, number, number, number, number][] = [
  ["Codeforces Round 962 (Div. 3)", 14862, 0, 408, 1722013500],
  ["Pinely Round 4 (Div. 1 + Div. 2)", 8193, 408, 717, 1722188100],
  ["Educational Codeforces Round 168", 14561, 717, 891, 1722357300],
  ["Codeforces Round 992 (Div. 2)", 6919, 891, 1025, 1733675700],
  ["Good Bye 2024", 12344, 1025, 1046, 1735407300],
  ["Codeforces Round 1003 (Div. 4)", 5429, 1046, 1144, 1739119800],
  ["Codeforces Round 1004 (Div. 2)", 6351, 1144, 1177, 1739291700],
  ["Codeforces Round 1011 (Div. 2)", 9162, 1177, 1147, 1742661300],
  ["Codeforces Round 1013 (Div. 3)", 4833, 1147, 1200, 1742921400],
  ["Codeforces Round 1014 (Div. 2)", 410, 1200, 1470, 1743266100],
  ["Educational Codeforces Round 177", 2127, 1470, 1517, 1743698100],
  ["Teza Round 1 (Codeforces Round 1015)", 4891, 1517, 1472, 1743874500],
  ["Codeforces Round 1028 (Div. 2)", 2478, 1472, 1502, 1748709300],
  ["Codeforces Round 1029 (Div. 3)", 1646, 1502, 1521, 1749401400],
  ["Codeforces Round 1030 (Div. 2)", 3856, 1521, 1512, 1749746100],
  ["Codeforces Round 1031 (Div. 2)", 1472, 1512, 1545, 1749985500],
  ["Codeforces Round 1032 (Div. 3)", 254, 1545, 1653, 1750179000],
  ["Codeforces Round 1033 (Div. 2) and CodeNite 2025", 5, 1653, 1992, 1750523700],
  ["Educational Codeforces Round 180", 2172, 1992, 1905, 1750696500],
];

const fromSnapshot = (): RatingPoint[] =>
  SNAPSHOT.map(([contest, rank, oldRating, rating, t]) => ({
    contest,
    rank,
    rating,
    delta: rating - oldRating,
    t,
  }));

type ApiEntry = {
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
};

export async function getRatingHistory(): Promise<{ points: RatingPoint[]; live: boolean }> {
  try {
    const res = await fetch(`https://codeforces.com/api/user.rating?handle=${site.handles.codeforces}`, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as { status: string; result?: ApiEntry[] };
    if (body.status !== "OK" || !body.result?.length) throw new Error("empty result");
    return {
      live: true,
      points: body.result.map((e) => ({
        contest: e.contestName,
        rank: e.rank,
        rating: e.newRating,
        delta: e.newRating - e.oldRating,
        t: e.ratingUpdateTimeSeconds,
      })),
    };
  } catch {
    return { points: fromSnapshot(), live: false };
  }
}

/** Unique problems solved (accepted at least once). Snapshot: 177 on 2026-09-30. */
export async function getSolvedCount(): Promise<number> {
  try {
    const res = await fetch(`https://codeforces.com/api/user.status?handle=${site.handles.codeforces}`, {
      next: { revalidate: 86_400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = (await res.json()) as {
      status: string;
      result?: { verdict?: string; problem: { contestId?: number; index: string; name: string } }[];
    };
    if (body.status !== "OK" || !body.result) throw new Error("bad result");
    const solved = new Set(
      body.result
        .filter((s) => s.verdict === "OK")
        .map((s) => `${s.problem.contestId ?? s.problem.name}-${s.problem.index}`),
    );
    return solved.size || 177;
  } catch {
    return 177;
  }
}

export const CF_TIERS = [
  { min: 0, label: "Newbie", color: "#8a8a8a" },
  { min: 1200, label: "Pupil", color: "#4ade80" },
  { min: 1400, label: "Specialist", color: "#5fd8e6" },
  { min: 1600, label: "Expert", color: "#6f8cff" },
  { min: 1900, label: "Candidate Master", color: "#b48cff" },
  { min: 2100, label: "Master", color: "#f5b454" },
  { min: 2400, label: "Grandmaster", color: "#ff6b7d" },
] as const;

export function tierFor(rating: number) {
  return [...CF_TIERS].reverse().find((t) => rating >= t.min) ?? CF_TIERS[0];
}
