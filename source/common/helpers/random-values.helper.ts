export const getRandomValue = (number: number): number =>
  Math.round(Math.random() * number);

export const randomStringValue = (values: string[]): string =>
  values[Math.floor(Math.random() * values.length)];

export const getRandomValueFromArray = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomArbitrary = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min);

export const getRandomArbitraryWithLimit = (
  min: number,
  max: number,
  limit?: number
): number => {
  const roundedValue = Math.floor(Math.random() * (max - min) + min);

  return limit ? Math.min(roundedValue, limit) : roundedValue;
};
