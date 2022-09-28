import { test as base, expect, chromium, BrowserContext } from '@playwright/test';
import AllPopup from '../src/arena-helper/ArenaHelper';
import Waiter, { Texter } from '../src/helper/Helper';
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
        await metamask.__getStarted()

        // reject improve Metamask
        await metamask.__rejectImprove()

        // import wallet
        await metamask.__importWallet()
        await delay(1000)

        // import account bnb
        await metamask.__importAccount()
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

const BUY_BOX = '//*[@id="app"]/div[1]/div[1]/a[3]/div/span'
const COMMON_BOX = '//*[@id="app"]/div[3]/div/div/div[2]/div[4]/div[2]/div[1]/span'
const COSMETIC_BOX = '//*[@id="app"]/div[3]/div/div/div[2]/div[1]/div[2]/div[1]/span'
const LEGENDARY_BOX = '//*[@id="app"]/div[3]/div/div/div[2]/div[2]/div[2]/div[1]/span'
const EPIC_BOX = '//*[@id="app"]/div[3]/div/div/div[2]/div[3]/div[2]/div[1]/span'



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

//     await delay(10000)
// });


test('buy common box ', async ({ page, browser }) => {
    await page.goto("https://staging.marketplace.thetanarena.com/")
    await AllPopup.ClosePopup(page);



    // await page.locator("img.qyN2w96htGOSy3f9Xj90").click() // close daily check
    // await page.locator(Texter.ClosePopup().click())

    // var isVisible = await page.locator("img.qyN2w96htGOSy3f9Xj90").isVisible()
    // var element = await page.locator("img.qyN2w96htGOSy3f9Xj90")
    // if(isVisible == true){
    //     await delay(10000)
    //     await element.click()
    // }

    // await delay(10000)
    // console.log("end")



    // await page.locator("img.qyN2w96htGOSy3f9Xj90").click() // close do quest 
    await delay(2000)
    await page.locator("button.YtC7SW5QBXao_Bj5rMO5", { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(".ZPKehyuOXkcNnT3_AzFi", { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator("button.UbQxYBXfgGDIuLkCeyyJ").click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    // await page.waitForLoadState()
    // await page.locator("img.DENGJCh2IDjHHDCkdKbG").click()

    // kiểm tra số lượng box trong inventory 
    /* await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory&category=thetabox")
    // console.log("số lượng box:", Texter.GetIntFromText(await page.locator('span.cF3D5iGpvsF7xF_0g5fV').innerText()))
     await delay(3000)
    */

    // chọn menu thetanbox
    await page.locator(`//span[contains(.,"ThetanBox")]`).click()
    await delay(2000)
    // await page.locator("img.qyN2w96htGOSy3f9Xj90").click() // close daily check
    // await delay(2000)
    // await page.locator("img.qyN2w96htGOSy3f9Xj90").click() // close do quest 
    // await delay(2000)

    // const thetanbox = await page.waitForSelector(BUY_BOX,  { state: 'visible' })
    // await delay(1000)
    // await thetanbox.click()
    // await expect(page).toHaveURL('https://staging.marketplace.thetanarena.com/thetanbox')
    //  const thetanbox = await page.waitForSelector(LEGENDARY_BOX, {state: 'visible'})
    //  await delay(2000)
    //  await thetanbox.click()


    //Mua common box
    await page.locator(`//span[contains(.,"Common box")]`).click()
    await delay(2000)
    await page.locator(`//button[contains(.,"Buy")]`).click()
    // await page.locator(`//span[contains(.,"Purchase")]`).click()
    await delay(2000)

    await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    // await page.waitForLoadState()
    await page.waitForSelector(`//span[contains(.,"Close")]`, {})
    await delay(2000)
    await page.locator(`//span[contains(.,"Close")]`).click()
    await delay(2000)

    // kiểm tra số lượng box trong inventory 
    await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory&category=thetabox")
    console.log("số lượng box sau khi mua:", Texter.GetIntFromText(await page.locator('span.cF3D5iGpvsF7xF_0g5fV').innerText()))
    await delay(10000)



});

test.only('buy hero ', async ({ page, browser }) => {
    await page.goto("https://staging.marketplace.thetanarena.com/")
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator("button.YtC7SW5QBXao_Bj5rMO5", { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(".ZPKehyuOXkcNnT3_AzFi", { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator("button.UbQxYBXfgGDIuLkCeyyJ").click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    // chọn menu buy
    await page.locator(`//span[contains(.,"Buy")]`).click()
    await delay(2000)
    
    //Mua common box
    await page.locator(`//span[contains(.,"Common box")]`).click()
    await delay(2000)
    await page.locator(`//button[contains(.,"Buy")]`).click()
    // await page.locator(`//span[contains(.,"Purchase")]`).click()
    await delay(2000)

    await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    // await page.waitForLoadState()
    await page.waitForSelector(`//span[contains(.,"Close")]`, {})
    await delay(2000)
    await page.locator(`//span[contains(.,"Close")]`).click()
    await delay(2000)

    // kiểm tra số lượng box trong inventory 
    await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory&category=thetabox")
    console.log("số lượng box sau khi mua:", Texter.GetIntFromText(await page.locator('span.cF3D5iGpvsF7xF_0g5fV').innerText()))
    await delay(10000)



});