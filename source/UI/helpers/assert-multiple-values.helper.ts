import { Locator } from '@playwright/test';

export interface AssertionMap {
  [value: string]: Locator;
}

type AssertionFn = (locator: Locator, expectedValue: string) => Promise<void>;

export async function assertMappedValues(
  map: AssertionMap,
  assertFn: AssertionFn
): Promise<void> {
  for (const [expectedValue, locator] of Object.entries(map)) {
    await assertFn(locator, expectedValue);
  }
}
