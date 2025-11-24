/* 
The module contains ready-made 
methods for parsing dates.
*/

export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
};

export function parseCustomDateString(dateTimeStr: string): Date | null {
  if (!dateTimeStr || typeof dateTimeStr !== 'string') return null;

  const [datePart, timePart] = dateTimeStr.split(' ');
  if (!datePart || !timePart) return null;

  const [day, month, year] = datePart.split('.');
  const [hours, minutes] = timePart.split(':');

  if (!day || !month || !year || !hours || !minutes) return null;

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes)
  );
}

export const getDateInFormatDDMMRRRR = (date: string | Date): string => {
  const [year, month, day] = date.toString().split('-');
  return `${day.slice(0, 2)}.${month}.${year}`;
};
