import Logger from '@_logger/Logger.js';
import { Stats, existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { stat } from 'fs/promises';

/*
The module contains ready-made methods 
for working with files.
*/

function formatError(message: string, error: unknown): string {
  return `${message} ${error instanceof Error ? error.message : String(error)}`;
}

export function stringifyJsonData(jsonData: unknown): string {
  try {
    return JSON.stringify(jsonData, null, 2);
  } catch (error) {
    throw new Error(formatError('Failed to stringify jsonData.', error), {
      cause: error
    });
  }
}

export function writeJsonFile(path: string, jsonData: object): void {
  try {
    writeFileSync(path, stringifyJsonData(jsonData), { encoding: 'utf8' });
  } catch (error) {
    throw new Error(
      formatError(`Failed to write file to path: "${path}".`, error),
      { cause: error }
    );
  }
}

export function readJsonFile(path: string): string {
  try {
    return readFileSync(path, { encoding: 'utf8' });
  } catch (error) {
    throw new Error(
      formatError(`Failed to read file from path: "${path}".`, error),
      { cause: error }
    );
  }
}

export function readParsedJsonFile<T = object>(path: string): T {
  try {
    return JSON.parse(readJsonFile(path));
  } catch (error) {
    throw new Error(
      formatError(`Failed to read and parse file from path: "${path}".`, error),
      { cause: error }
    );
  }
}

export function addNewObjectToJsonFile<T = object>(
  object: T,
  filePath: string
): void {
  let data: T[] = [];

  if (existsSync(filePath)) {
    const fileContent = readFileSync(filePath, 'utf-8');
    if (fileContent.trim().length > 0) {
      data = JSON.parse(fileContent);
    }
  }

  data.push(object);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function removeJsonFile(path: string): void {
  try {
    if (existsSync(path)) {
      unlinkSync(path);
    } else {
      Logger.info(`File: ${path} do not exists`);
    }
  } catch (error) {
    throw new Error(
      formatError(`Failed to remove file from path: "${path}".`, error),
      { cause: error }
    );
  }
}

export function checkIfFileExist(path: string): boolean {
  if (!existsSync(path)) {
    throw new Error('File do not exists');
  }

  return true;
}

export async function printFileData(path: string): Promise<Stats> {
  try {
    return await stat(path);
  } catch (error) {
    throw new Error(
      formatError('Error occurred while reading file stats:', error),
      { cause: error }
    );
  }
}
