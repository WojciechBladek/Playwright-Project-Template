import { format, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

/*
The module contains ready-made methods 
for generating dates.
*/

export const getTimeStamp = {
  get number(): string {
    return new Date().getTime().toString();
  }
};

export function getDateXDaysAgoAtMidnight(daysAgo = 1): Date {
  const now = new Date();
  now.setDate(now.getDate() - daysAgo);
  now.setHours(0, 0, 0, 0);
  return now;
}

export function checkIfItExistsLongerThan(
  timestampFromDB: Date | string,
  thresholdDateToSet: number
): boolean {
  const oldDateAtMidnight = new Date(timestampFromDB);
  oldDateAtMidnight.setHours(0, 0, 0, 0);

  const thresholdDate = getDateXDaysAgoAtMidnight(thresholdDateToSet);

  return oldDateAtMidnight <= thresholdDate ? true : false;
}

export function generateDateWithDaysBackFromCurrentDate(
  daysBack: number,
  pattern: string
): string {
  const currentDate = new Date();
  const targetDate = new Date(currentDate.getTime() - daysBack * 86400000);
  return format(targetDate, pattern, { locale: enUS });
}
/**
 * Get the past date, moved back by the number of days from the given date.
 * @param inputDate specific date.
 * @param daysBack number of days you want to go back
 * @param pattern set pattern e.g "yyyy-MM-dd'T'HH:mm:ss"
 * @param hour Optional - hour at which the returned date will be
 * @param minute Optional - minute at which the returned date will be
 * @param second Optional - second at which the returned date will be
 * @returns past date with specific time
 */
export function generateDateWithDaysBackFromSpecificDateAndTime(
  inputDate: string,
  daysBack: number,
  pattern: string,
  hour?: number,
  minute?: number,
  second?: number
): string {
  const currentDate = parse(inputDate, pattern, new Date());
  const targetDate = new Date(currentDate.getTime() - daysBack * 86400000);
  if (hour !== undefined && minute !== undefined && second !== undefined) {
    targetDate.setHours(hour, minute, second, 0);
  }

  return format(targetDate, pattern, { locale: enUS });
}
/**
 * Get future date, increased by number of days from the current one
 * @param daysUp number of days you want to go up
 * @param pattern set pattern e.g "yyyy-MM-dd'T'HH:mm:ss"
 * @returns future date
 */
export function generateDateWithDaysFutureFromCurrentDate(
  daysUp: number,
  pattern: string
): string {
  const currentDate = new Date();
  const targetDate = new Date(currentDate.getTime() + daysUp * 86400000);
  return format(targetDate, pattern, { locale: enUS });
}
/**
 * Get future date, increased by number of days from given date
 * @param inputDate specific date
 * @param daysUp number of days you want to go up
 * @param pattern set pattern e.g "yyyy-MM-dd'T'HH:mm:ss"
 * @param hour Optional - hour at which the returned date will be
 * @param minute Optional - minute at which the returned date will be
 * @param second Optional - second at which the returned date will be
 * @returns future date with specific time
 */
export function generateDateWithDaysFutureWithSpecificDateAndTime(
  inputDate: string,
  daysUp: number,
  pattern: string,
  hour?: number,
  minute?: number,
  second?: number
): string {
  const currentDate = parse(inputDate, pattern, new Date());
  const targetDate = new Date(currentDate.getTime() + daysUp * 86400000);
  if (hour !== undefined && minute !== undefined && second !== undefined) {
    targetDate.setHours(hour, minute, second, 0);
  }

  return format(targetDate, pattern, { locale: enUS });
}
/**
 * Get current date with specific time and pattern
 * @param pattern set pattern e.g "yyyy-MM-dd'T'HH:mm:ss"
 * @param hour Optional - hour at which the returned date will be
 * @param minute Optional - minute at which the returned date will be
 * @param second Optional - second at which the returned date will be
 * @returns current date
 */
export function generateCurrentDateWithSpecificTime(
  pattern = "yyyy-MM-dd'T'HH:mm:ss",
  hour?: number,
  minute?: number,
  second?: number
): string {
  const currentDate = new Date();

  if (hour && !minute && !second) {
    currentDate.setHours(hour, 0, 0, 0);
  } else if (hour && minute && !second) {
    currentDate.setHours(hour, minute, 0, 0);
  } else if (hour && minute && second) {
    currentDate.setHours(hour, minute, second, 0);
  }
  return format(currentDate, pattern, { locale: enUS });
}

export function getFirstDayOfNextMonthFormatted(): string {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth();

  const firstDayNextMonth: Date = new Date(year, month + 1, 1);

  const day: string = String(firstDayNextMonth.getDate()).padStart(2, '0');
  const monthFormatted: string = String(
    firstDayNextMonth.getMonth() + 1
  ).padStart(2, '0');
  const yearFormatted: number = firstDayNextMonth.getFullYear();

  return `${day}.${monthFormatted}.${yearFormatted}`;
}

export function getIsoDateWithOffset(daysToAdd = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString();
}

export function getFormattedDateWithOffset(
  daysToAdd = 1,
  separator = '.'
): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}${separator}${month}${separator}${year}`;
}

export function getRRMMDDDateWithOffset(
  daysToAdd = 1,
  separator = '.'
): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${year}${separator}${month}${separator}${day}`;
}

export function getCurrentDateFormatted(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // miesiące od 0
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

export function getStartAndPreviousDayEnd(dateString: string): {
  from: string;
  to: string;
} {
  const [day, month, year] = dateString.split('.').map(Number);

  const date = new Date(year, month - 1, day);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfPreviousDay = new Date(date);
  endOfPreviousDay.setDate(endOfPreviousDay.getDate());
  endOfPreviousDay.setHours(23, 59, 59, 0);

  const formatDate = (date: Date): string => {
    const pad = (n: number): string => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  return {
    from: formatDate(startOfDay),
    to: formatDate(endOfPreviousDay)
  };
}

export function getLastDayOfCurrentMonth(): string {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth() + 1, 0).toLocaleDateString(
    'pl-PL'
  );
}
