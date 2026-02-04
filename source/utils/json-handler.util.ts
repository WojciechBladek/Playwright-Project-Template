import Logger from '@_logger/Logger.js';
import * as fs from 'fs';
import { Stats, promises as fsp } from 'fs';

/*
The module contains ready-made methods 
for working with files.
*/

export function stringifyJsonData(jsonData: object | unknown): string {
  try {
    return JSON.stringify(jsonData, null, 2);
  } catch (error) {
    throw new Error(
      `Failed to stringify jsonData. ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function writeJsonFile(path: string, jsonData: object): void {
  try {
    fs.writeFileSync(path, stringifyJsonData(jsonData), { encoding: 'utf8' });
  } catch (error) {
    throw new Error(
      `Failed to write file to path: "${path}". ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function readJsonFile(path: string): string {
  try {
    return fs.readFileSync(path, { encoding: 'utf8' });
  } catch (error) {
    throw new Error(
      `Failed to read file from path: "${path}". ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function readParsedJsonFile<T = object>(path: string): T {
  try {
    return JSON.parse(readJsonFile(path));
  } catch (error) {
    throw new Error(
      `Failed to read and parse file from path: "${path}". ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function addNewObjectToJsonFile<T = object>(
  object: T,
  filePath: string
): void {
  let data: T[] = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    if (fileContent.trim().length > 0) {
      data = JSON.parse(fileContent);
    }
  }

  data.push(object);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function removeJsonFile(path: string): void {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    } else {
      Logger.info(`File: ${path} do not exists`);
    }
  } catch (error) {
    throw new Error(
      `Failed to remove file from path: "${path}". ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function checkIfFileExist(path: string): boolean {
  const file = fs.existsSync(path);

  if (!file) {
    throw new Error(`File do not exists`);
  }

  return file;
}

export async function printFileData(path: string): Promise<Stats> {
  try {
    return await fsp.stat(path);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Error occurred while reading file stats: ${message}`);
  }
}
