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
