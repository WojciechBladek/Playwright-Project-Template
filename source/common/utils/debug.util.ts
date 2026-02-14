export function getCallerInfo(): string {
  const stack = new Error().stack;

  if (!stack) return '';

  const stackLines = stack.split('\n');

  const callerLine = stackLines[3]?.trim() || '';

  return callerLine;
}
