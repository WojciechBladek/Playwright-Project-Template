import { checkoutEnvVariableForPipeline } from '@_config/env.config';

/**
 * Example of use
 * const key = exampleKey.key;
 */

export const exampleKey = {
  get key(): string | undefined {
    return checkoutEnvVariableForPipeline('EXAMPLE_KEY');
  }
};
