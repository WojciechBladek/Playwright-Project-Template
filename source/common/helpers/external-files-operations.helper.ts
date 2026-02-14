import csv from 'csv-parser';
import * as fs from 'fs';
import * as XLSX from 'xlsx';

export async function readCsvHeaders(filePath: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    const headers: string[] = [];

    const stream = fs
      .createReadStream(filePath)
      .pipe(csv())
      .on('headers', (headerList: string[]) => {
        headers.push(...headerList);

        // Stop reading the file after getting headers
        stream.destroy();
      })
      .on('close', () => {
        resolve(headers);
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });
}

export const readXLSXFile = (filePath: string): XLSX.WorkBook => {
  const workbook = XLSX.readFile(filePath);
  return workbook;
};

export const readXLSXHeaders = (
  filePath: string,
  sheetName: string
): object[] => {
  const workbook = readXLSXFile(filePath);
  const worksheets: Record<string, object[]> = {};

  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }
  const sheet = worksheets[sheetName];
  const headers = sheet;

  return headers;
};
