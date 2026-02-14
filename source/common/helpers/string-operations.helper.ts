interface Difference {
  differenceNewObject: Set<string>;
  differenceExpectedObject: Set<string>;
}

export function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function getFirstWord(input: string): string {
  try {
    return input.split(' ')[0].toLowerCase();
  } catch {
    return input;
  }
}
export function getLastWord(input: string): string {
  try {
    return input.split(' / ')[1].toLowerCase();
  } catch {
    return input;
  }
}

export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * This function finds and return difference in long string
 * In the future if should be needed function can be extended (split option - set as additional param)
 * @param expectedString - string
 * @param newString - string
 * @returns - string
 */
export function differenceInString(
  expectedString: string,
  newString: string
): string {
  const { differenceExpectedObject, differenceNewObject } = difference(
    expectedString,
    newString,
    'split'
  );

  return differenceNewObject.size !== 0
    ? 'Missing column : ' + differenceAsString(differenceNewObject)
    : `If the column name <"${differenceAsString(differenceExpectedObject)}"> is empty , a reorder occurred`;
}

export function difference(
  expectedString: string,
  newString: string,
  split?: string
): Difference {
  let expectedObject: Set<string>;
  let newObject: Set<string>;

  if (split === 'split') {
    expectedObject = new Set(expectedString.split(';'));
    newObject = new Set(newString.split(';'));
  } else {
    expectedObject = new Set(expectedString);
    newObject = new Set(newString);
  }

  const differenceNewObject = new Set(
    [...newObject].filter((x) => !expectedObject.has(x))
  );
  const differenceExpectedObject = new Set(
    [...expectedObject].filter((x) => !newObject.has(x))
  );

  return {
    differenceNewObject: differenceNewObject,
    differenceExpectedObject: differenceExpectedObject
  };
}

function differenceAsString(difference: Set<string>): string {
  let newString = '';
  const stringOnlyDifference = [...difference].filter(
    (x) => typeof x === 'string'
  );
  for (const string of stringOnlyDifference) {
    newString += string + ' ';
  }
  return newString;
}
