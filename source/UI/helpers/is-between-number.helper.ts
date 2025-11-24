export function isBetween(
  min: number,
  max: number,
  expected: number
): boolean | null {
  if (!expected) {
    return null;
  } else {
    return expected >= min && expected <= max;
  }
}
