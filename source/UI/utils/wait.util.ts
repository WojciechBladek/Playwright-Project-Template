import { Page, Response } from 'playwright';

export interface WaitParams {
  page: Page;
  url: string;
  method?: string;
  status?: number;
  timeout?: number;
}
/** 
  @info Returns the matched response
  @interface { page: Page;
  url: string;
  method?: string
  status?: number
  timeout?: number}
  @example
  const responsePromise = waitForResponse({
  page: page,
  url: ENDPOINTS.wholesaleRoutes,
  method: 'POST',
  status: 201});

  await this.commandBarComponent.clickOnButton('Zapisz');
  
  const response = await responsePromise;
  */
export async function waitForResponse({
  page,
  url,
  method,
  status,
  timeout
}: WaitParams): Promise<Response> {
  return page.waitForResponse(
    (response) => {
      return (
        response.url().includes(url) &&
        (!method || response.request().method() === method) &&
        (!status || response.status() === status)
      );
    },
    { timeout: timeout ? timeout : 10_000 }
  );
}
