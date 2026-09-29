/** Warnsdorff's rule: always jump to the square with the fewest onward moves. */
const MOVES: [number, number][] = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

export function knightsTour(startFile = 1, startRank = 0, n = 8): [number, number][] {
  const seen = new Set<number>();
  const key = (f: number, r: number) => r * n + f;
  const inside = (f: number, r: number) => f >= 0 && r >= 0 && f < n && r < n;
  const onward = (f: number, r: number) =>
    MOVES.filter(([df, dr]) => inside(f + df, r + dr) && !seen.has(key(f + df, r + dr))).length;

  const path: [number, number][] = [[startFile, startRank]];
  seen.add(key(startFile, startRank));
  while (path.length < n * n) {
    const [f, r] = path[path.length - 1];
    let best: [number, number] | null = null;
    let bestScore = Infinity;
    for (const [df, dr] of MOVES) {
      const nf = f + df;
      const nr = r + dr;
      if (!inside(nf, nr) || seen.has(key(nf, nr))) continue;
      const score = onward(nf, nr);
      if (score < bestScore) {
        bestScore = score;
        best = [nf, nr];
      }
    }
    if (!best) break;
    seen.add(key(best[0], best[1]));
    path.push(best);
  }
  return path;
}
