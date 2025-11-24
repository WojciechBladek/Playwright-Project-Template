export function sortArrayNumbersFromLowestToHighest<T extends number>(
  array: T[]
): T[] {
  return array.sort((a, b) => Number(a) - Number(b));
}

export function sortArrayNumbersFromHighestToLowest<T extends number>(
  array: T[]
): T[] {
  return array.sort((a, b) => Number(b) - Number(a));
}

export function sortArrayStrings(array: string[]): string[] {
  return [...array].sort((a, b) => a.localeCompare(b));
}
export function sortArrayStringsReverse(array: string[]): string[] {
  return [...array].sort((a, b) => b.localeCompare(a));
}

export function sortMixedAsText(
  array: (string | number)[]
): (string | number)[] {
  return [...array].sort((a, b) => a.toString().localeCompare(b.toString()));
}

export function sortMixedAsNumbers(
  array: (string | number)[]
): (string | number)[] {
  return [...array].sort((a, b) => Number(a) - Number(b));
}
