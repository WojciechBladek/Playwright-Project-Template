import { Locator } from '@playwright/test';

export type AssertionMap = Record<string, Locator>;

type AssertionFn = (locator: Locator, expectedValue: string) => Promise<void>;

export async function assertMultipleObjects(
  map: AssertionMap,
  assertFn: AssertionFn
): Promise<void> {
  for (const [expectedValue, locator] of Object.entries(map)) {
    await assertFn(locator, expectedValue);
  }
}

export function isBetween(
  min: number,
  max: number,
  expected: number
): boolean | null {
  if (expected == null) return null;

  return expected >= min && expected <= max;
}

export function isEmpty(value: unknown): boolean {
  return value == null || value === '';
}

export function isWithinTolerance(
  actual: number,
  expected: number,
  tolerance: number
): boolean | null {
  if (expected == null) return null;

  return actual >= expected - tolerance && actual <= expected + tolerance;
}
