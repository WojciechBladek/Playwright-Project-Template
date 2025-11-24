export function IsWithinTolerance(
  actual: number,
  expected: number,
  tolerance: number
): boolean | null {
  if (!expected) {
    return null;
  } else {
    return actual >= expected - tolerance && actual <= expected + tolerance;
  }
}
