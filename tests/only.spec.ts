import { test as base, expect, chromium, BrowserContext } from '@playwright/test';
import Metamask from '../src/metamask/Metamask';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

var metamask: Metamask

export const test = base.extend<{
    context: BrowserContext;
    extensionId: string;
}>({
    context: async ({ }, use) => {
        // init metamask + browser
        metamask = await new Metamask()
        var context = await metamask.initBrowserContext()

        // metamask
        metamask.__getStarted()


        // reject improve Metamask
        metamask.__rejectImprove()

        // import wallet
        metamask.__importWallet()
        await delay(1000)

        // import account bnb
        metamask.__importAccount()
        await delay(1000)

        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        // for manifest v3:
        let [background] = context.serviceWorkers();
        if (!background)
            background = await context.waitForEvent("serviceworker");

        const extensionId = background.url().split("/")[2];
        await use(extensionId);
    },
});

test.setTimeout(100 * 60 * 60);


//login
// test.only('login', async ({ page, browser }) => {
//     page.goto("https://staging.marketplace.thetanarena.com/")
//     await page.locator("button._trpA_NQ_KOKYFXSV2oa").click()
//     await page.locator(".ZPKehyuOXkcNnT3_AzFi", { hasText: "Login with Metamask" }).click()

//     const [newPage] = await Promise.all([
//         metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
//         page.locator("button.UbQxYBXfgGDIuLkCeyyJ").click(),
//     ]);

//     await newPage.waitForLoadState()
//     await metamask.switchNetwork()
//     await metamask.connectAndSignAccount()
//     await page.waitForLoadState()
//     await delay(100000)
// });

// buy box
test.only('buy box', async ({ page, browser }) => {
    page.goto("https://staging.marketplace.thetanarena.com/")
    await page.locator("button._trpA_NQ_KOKYFXSV2oa").click()
    await page.locator(".ZPKehyuOXkcNnT3_AzFi", { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator("button.UbQxYBXfgGDIuLkCeyyJ").click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()
    await page.locator("img.DENGJCh2IDjHHDCkdKbG").click()
    await page.locator("span.LgQwYfAFOvr7RXPuf23w").click()
    await page.waitForLoadState()
    await delay(10000)
});