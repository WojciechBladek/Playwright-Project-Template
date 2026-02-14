/* 
The module contains useful methods for generating test data. 
I also recommend using the faker library to create data in factories.
*/

export function generateValidNIP(): string {
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  const digits: number[] = [];

  for (let i = 1; i < 10; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const checksum =
    digits.reduce((sum, digit, index) => sum + digit * weights[index], 0) % 11;

  if (checksum === 10) {
    return generateValidNIP();
  } else {
    digits.push(checksum);
    return digits.join('');
  }
}

export function generateRandomPhoneNumber(): string {
  const phoneNumber = `+48${Math.floor(100000000 + Math.random() * 900000000)}`;
  return phoneNumber;
}

export function generateRandomNumber(length: number): number {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateRandomEmail(prefix = '@test.com'): string {
  const email = `test${generateRandomString(20)}${prefix}`;
  return email;
}

export function generateValidPesel(): string {
  const start = new Date(1950, 0, 1);
  const end = new Date();
  end.setFullYear(end.getFullYear() - 18);

  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const yy = date.getFullYear().toString().slice(-2);
  const mm =
    date.getFullYear() < 2000
      ? String(date.getMonth() + 1).padStart(2, '0')
      : String(date.getMonth() + 21);
  const dd = String(date.getDate()).padStart(2, '0');
  const randomDigits = String(Math.floor(Math.random() * 10000)).padStart(
    4,
    '0'
  );
  const peselWithoutChecksum = `${yy}${mm}${dd}${randomDigits}`;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const checksum =
    peselWithoutChecksum
      .split('')
      .reduce(
        (sum, digit, index) => sum + parseInt(digit) * weights[index],
        0
      ) % 10;
  const finalChecksum = (10 - checksum) % 10;
  return `${peselWithoutChecksum}${finalChecksum}`;
}
