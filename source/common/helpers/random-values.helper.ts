export function getRandomValue(number: number): number {
  return Math.round(Math.random() * number);
}

export function randomStringValue(values: string[]): string {
  return values[Math.floor(Math.random() * values.length)];
}

export function getRandomValueFromArray<T>(array: T[]): T {
  return array[Math.round(Math.random() * (array.length - 1))];
}

export function getRandomArbitrary(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomArbitraryWithLimit(
  min: number,
  max: number,
  limit?: number
): number {
  const randomValue = Math.random() * (max - min) + min;

  const roundedValue = Math.floor(randomValue);

  return limit ? Math.min(roundedValue, limit) : roundedValue;
}
