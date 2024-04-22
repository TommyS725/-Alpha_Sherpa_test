export function round2decimalPts(num: number, pts: number): number {
  const rounder = Math.pow(10, pts);
  return Math.round(num * rounder) / rounder;
}
