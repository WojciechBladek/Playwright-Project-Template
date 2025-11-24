export function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

export function reverseDate(date: string, separator: '.'): string {
  const [year, month, day] = date.split('-');
  return `${day}${separator}${month}${separator}${year}`;
}
