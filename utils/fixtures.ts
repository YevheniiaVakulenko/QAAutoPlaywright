import { test as base, request,  APIRequestContext } from '@playwright/test';
export const test = base.extend<{
    userGaragePage: any;
    ApiContext: APIRequestContext;
}>({
    userGaragePage: async ({ browser ,baseURL}, use) => {
        const context = await browser.newContext({ storageState: './utils/storageState.json' });
        const page = await context.newPage();
        await page.goto(`${baseURL}/panel/garage`);
         
        await use(page);

        await context.close();
    },

    ApiContext: async ({}, use) => {
      const apiContext =  await request.newContext({ storageState: './utils/storageState.json' });
      await use(apiContext);

      await apiContext.dispose();
    },
});
