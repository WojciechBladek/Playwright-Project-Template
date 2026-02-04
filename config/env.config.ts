import Logger from '@_logger/Logger.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export enum environments {
  local = 'local',
  uat = 'uat',
  prod = 'prod'
}

/**
 * This function defines which environment will be used to read variables from the .env file.
 */
function defineEnv(): void {
  // If need to change env from uat just change uat to prod in defaultEnvironment variable
  const defaultEnvironment = environments.local;
  const environment = process.env.ENVIRONMENT ?? defaultEnvironment;
  const envPath = `.env.${environment}`;
  dotenv.config({ path: envPath, quiet: true });

  if (!fs.existsSync(envPath)) {
    throw new Error(`File named "${envPath}" doesn't exists`);
  }
}
/**
 * The method is recommended for using constant variables that are required for the project to work.
 * @param envVariable An environment variable that is passed from the .env file
 * @returns
 */
function requireEnvVariable(envVariable: string): string {
  defineEnv();

  const envVariableValue = process.env[envVariable];
  if (envVariableValue === undefined) {
    throw new Error(`Environment variable  ${envVariable} is not set.`);
  }

  return envVariableValue;
}

//* We constantly declare environmental variables here.
//! To declare environmental variables used for pipeline use another folder in source/env-variables
export const BASE_URL = requireEnvVariable('BASE_URL');
export const BASE_API_URL = requireEnvVariable('API_URL');

export const USER_NAME_API = requireEnvVariable('USER_NAME_API');
export const USER_PASSWORD_API = requireEnvVariable('USER_PASSWORD_API');

export const USER_PASSWORD_UI = requireEnvVariable('USER_PASSWORD_UI');
export const USER_EMAIL_UI = requireEnvVariable('USER_EMAIL_UI');

/**
 *This method is recommended for use if we use many environmental variables that are created in the pipeline, but we do not need to store them locally.
 * @param envVariable An environment variable that is passed from the .env file
 * @returns
 */
export function checkoutEnvVariableForPipeline(
  envVariable: string
): string | undefined {
  const envVariableValue = process.env[envVariable];
  if (envVariableValue === undefined) {
    Logger.warn('');
    Logger.warn(
      `Environment variable ${envVariable} is not set please checkout and set variable in pipeline or local env`
    );
    Logger.warn('');
  } else {
    return envVariableValue;
  }
  return undefined;
}

/**
 * Method iterates over all environment variables available in process.env and removes each of them if it has any value assigned to it.
 */
function resetEnv(): void {
  for (const key in process.env) {
    if (process.env[key]) {
      delete process.env[key];
    }
  }
}

/**
 * This method is recommended for use if the test requires data from different environments. For example, visual regression tests, take BASE_URL from UAT and PROD.
 * @param envVariable Name of environmental variable
 * @param environment Environment name
 * @returns
 */
export function setSpecificEnvWithVariable(
  envVariable: string,
  environment: string
): string | undefined {
  resetEnv();
  const envPath = `.env.${environment}`;
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    return process.env[envVariable];
  } else {
    Logger.error(`Error: ${envPath} does not exist`);
    return undefined;
  }
}
