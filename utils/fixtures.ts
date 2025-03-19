import { test as base } from '@playwright/test';

export const test = base.extend<{
    userGaragePage: any;
}>({
    userGaragePage: async ({ browser ,baseURL}, use) => {
        const context = await browser.newContext({ storageState: './utils/storageState.json' });
        const page = await context.newPage();
        await page.goto(`${baseURL}/panel/garage`);

        await use(page);

        await context.close();
    },
});
