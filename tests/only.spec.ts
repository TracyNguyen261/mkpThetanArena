import { test as base, expect, chromium, BrowserContext } from '@playwright/test';
import AllPopup from '../src/arena-helper/ArenaHelper';
import Waiter, { Texter } from '../src/helper/Helper';
import Metamask from '../src/metamask/Metamask';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// .A1QYx9ifNzwsMmtHXou8 > div:nth-child(1)


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

test('buy hero ', async ({ page, browser }) => {
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

    await page.locator(`div.RzCtmnvJtc4BwmQPIiSK`).click() // click DDL filter
    await delay(2000)

    await page.locator(`//span[contains(.,"Cheapest Item")]`).click()
    // await page.locator(`.AKO9NaM23tnI_yIaFSsb`, {hasText:"Cheapest Item"}).click()

    await delay(4000)


    const PRICE_TEXT = await page.locator(`.wlYd9YCSxc4V1_yktp93 > .y0q8jlGWIeRjuoKU41e9`).nth(1).innerText()
    const PRICE = parseFloat(PRICE_TEXT.replace(",", ""))
    if (PRICE < 50000) {
        await page.locator(`.pTlq4suyqtK3Lmj4MH27`).nth(1).click() // lay item dau tien trong list hero
    }

    const pageDetail = page.url()

    await page.locator(`span.amttH6S21k7IsiPB9GBn`).click() // click buy


    //span[contains(.,"Owner by me")]

    await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    // await page.waitForLoadState()
    await page.waitForSelector(`//span[contains(.,"Close")]`, {})
    await delay(2000)
    await page.locator(`//span[contains(.,"Close")]`).click()
    await delay(2000)

    // var isOwner = await page.locator(`span[contains(.,"Owner by me")]`).isVisible()
    // if (!isOwner) {
    //     test.fail()
    // }
    await page.goto(pageDetail)
    await delay(3000)

    await expect(page.locator(`//span`, { hasText: "Owner by me" })).toBeVisible()

    // var isVisible = await page.locator(`//span`, { hasText: "Owner by me"}).isVisible()
    // if (!isVisible ){
    //     return false
    // }

    console.log("DONE")
    // kiểm tra hero trong inventory 
    // await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory")

    // console.log("số lượng box sau khi mua:", Texter.GetIntFromText(await page.locator('span.cF3D5iGpvsF7xF_0g5fV').innerText()))
    // await delay(10000)
});
test('sell hero ', async ({ page, browser }) => {
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

    await delay(2000)
    await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory")

    await delay(3000)

    var heroCount = await page.locator('.LoG5KRQGfS_ExpEYUM9r').count()
    for (let i = 0; i < heroCount; i++) {
        await page.locator('.LoG5KRQGfS_ExpEYUM9r').nth(i).click()
        //console.log("Start vong for")
        await delay(1200)
        let sellBtnLocator = page.locator(`//span`, { hasText: "Sell" })


        let isSellBtnVisible = await sellBtnLocator.isVisible()
        if (!isSellBtnVisible) {
            // console.log("Khong tim thay sell btn")
            await page.goBack({ waitUntil: "load" })
            continue
        }

        let isSellBtnEnable = await sellBtnLocator.isEnabled()
        if (!isSellBtnEnable) {
            console.log("Sell btn disabled")
            await page.goBack({ waitUntil: "load" })
            continue
        }

        let SellingBtn = await sellBtnLocator.innerText()
        if (SellingBtn == 'Stop selling') {
            console.log('Hero is selling')
            await page.goBack({ waitUntil: "load" })
            continue
        }



        // let isSellBtn = 
        // console.log("End isEnabled")
        // if (!isSellBtn) {
        //     await page.goBack()
        //     continue
        // }
        await sellBtnLocator.click()
        await delay(2000)
        break

        //await expect(page.locator(`//span`, {hasText: "Sell"})).toBeVisible()
    }

    await page.locator(`input.AI0g6_78kpjQEk7KU44r`).fill('10000')
    await page.locator(`button.cOBQpozfZ4Q94cdPJ0MK`, { hasText: "Sell now" }).click()
    await delay(20000)
    //await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    await delay(2000)
    // await page.locator(`//span[contains(.,"I understand”)]`).click()
    await page.locator(`button.cOBQpozfZ4Q94cdPJ0MK`).click  // understand btn
    // await page.waitForLoadState()
    // await page.waitForSelector(`//span[contains(.,"Close")]`, {})
    // await delay(2000)
    // await page.locator(`//span[contains(.,"Close")]`).click()
    // await delay(2000)
    //  await Waiter.ActAndWaitNewTab(page.locator(`//span[contains(.,"I understand”)]`).click(), )


    console.log("DONE")

});
// check latest item???
test.only('sell hero trinh ', async ({ page, browser }) => {
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

    await delay(2000)
    await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory")

    await delay(1200)

    var pageTotal = Texter.GetIntFromText(await page.locator(`.EvpVAk_1hz05LPdtaLW7`).innerText())
    for (let i = 1; i < pageTotal; i++) {
        var pageNumber = await page.locator(`input[type="number"]`).fill(i.toString())
        await page.keyboard.press('Enter')
        await delay(1000)
        console.log("page 1")

        var heroCount = await page.locator('.LoG5KRQGfS_ExpEYUM9r').count()

        var ok = false
        for (let j = 0; j < heroCount; j++) {
            // console.log(`let statusLabel = await page.locator('.Dfj5fSymG7FC_pQ1ltOn').nth(i).innerText()`)
            if (await page.locator(`.Dfj5fSymG7FC_pQ1ltOn`).nth(j).isVisible()) {

                let statusLabel = await page.locator(`.Dfj5fSymG7FC_pQ1ltOn`).nth(j).innerText()
                console.log(statusLabel)

                if (statusLabel == 'SELLING') {
                    console.log(`statusLabel == 'SELLING'`)
                }

                if (statusLabel == 'NOT MINT') {
                    console.log(`statusLabel == 'NOT MINT'`)
                }

                continue

            }
            await page.locator('.LoG5KRQGfS_ExpEYUM9r').nth(j).click()
            await delay(1000)


            //console.log("Start vong for")

            let sellBtnLocator = page.locator(`//span`, { hasText: "Sell" })

            //let sellBtnLocator = page.locator(`//span[contains(.,"Sell")]`)

            let isSellBtnVisible = await sellBtnLocator.isVisible()
            if (!isSellBtnVisible) {
                console.log("Khong tim thay sell btn")
                await page.goBack({ waitUntil: "load" })
                continue
            }

            let isSellBtnEnable = await sellBtnLocator.isEnabled()
            if (!isSellBtnEnable) {
                console.log("Sell btn disabled")
                await page.goBack({ waitUntil: "load" })
                continue
            }

            await sellBtnLocator.click()
            await delay(2000)

            // ------- SUCCESS
            ok = true
        }

        if (ok) {
            break
        }

        //await expect(page.locator(`//span`, {hasText: "Sell"})).toBeVisible()
    }

    await page.locator(`input.AI0g6_78kpjQEk7KU44r`).fill('10000')
    await delay(2000)
    const priceSellStr = await page.locator(`input.AI0g6_78kpjQEk7KU44r`).innerText() // luu price
    await delay(2000)
    const priceSellInt = parseInt(priceSellStr)
    //console.log('priceSellStr = await page.locator(`input.AI0g6_78kpjQEk7KU44r`).innerText()')
    await delay(2000)



    await page.locator(`button.cOBQpozfZ4Q94cdPJ0MK`, { hasText: "Sell now" }).click()
    await delay(2000)
    //await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    await delay(2000)
    await page.locator(`button.cOBQpozfZ4Q94cdPJ0MK`).click  // understand btn

    /*
    // check new hero tren cho'
    await page.goto('https://staging.marketplace.thetanarena.com/buy')
    AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(`div.RzCtmnvJtc4BwmQPIiSK`).click() // click DDL filter latest
    await delay(2000)
    await page.locator(`//span[contains(.,"Latest")]`).click()
    await page.locator(`..pTlq4suyqtK3Lmj4MH27`).first().click()
    //Check price
    const priceHero =  parseInt(await page.locator(`.f9zZck_3CSpfmtllo7B2`).innerText())
    await delay(2000)
    if(priceSellInt == priceHero){
        await delay(2000)

        console.log('Gia dung roi')
    }
    return
    // <span class="f9zZck_3CSpfmtllo7B2">10,000 THC</span>
*/


    console.log("DONE")

});


// api simulate Hero, level 
test('Fusion hero trinh ', async ({ page, browser }) => {
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

    await delay(2000)
    await page.goto("https://staging.marketplace.thetanarena.com/profile?tab=inventory")

    await delay(1200)

    var heroCount = await page.locator('.LoG5KRQGfS_ExpEYUM9r').count()
    for (let i = 0; i < heroCount; i++) {
        await delay(1000)

        console.log(`let sellingLabel = await page.locator('.Dfj5fSymG7FC_pQ1ltOn').nth(i).innerText()`)
        let sellingLabel = await page.locator(`.Dfj5fSymG7FC_pQ1ltOn`).nth(i).innerText()
        if (sellingLabel == 'SELLING') {
            console.log(`sellingLabel == 'SELLING'`)
            continue

        }

        await page.locator('.LoG5KRQGfS_ExpEYUM9r').nth(i).click()
        await delay(1000)
        //console.log("Start vong for")

        let sellBtnLocator = page.locator(`//span`, { hasText: "Sell" })

        //let sellBtnLocator = page.locator(`//span[contains(.,"Sell")]`)

        let isSellBtnVisible = await sellBtnLocator.isVisible()
        if (!isSellBtnVisible) {
            console.log("Khong tim thay sell btn")
            await page.goBack({ waitUntil: "load" })
            continue
        }

        let isSellBtnEnable = await sellBtnLocator.isEnabled()
        if (!isSellBtnEnable) {
            console.log("Sell btn disabled")
            await page.goBack({ waitUntil: "load" })
            continue
        }


        // let SellingBtn = await sellBtnLocator.innerText()
        // if(SellingBtn == 'Stop selling'){
        //     console.log('Hero is selling')
        //     await page.goBack({waitUntil: "load"})
        //     continue
        // }



        // let isSellBtn = 
        // console.log("End isEnabled")
        // if (!isSellBtn) {
        //     await page.goBack()
        //     continue
        // }

        await sellBtnLocator.click()
        await delay(2000)
        break

        //await expect(page.locator(`//span`, {hasText: "Sell"})).toBeVisible()
    }

    await page.locator(`input.AI0g6_78kpjQEk7KU44r`).fill('10000')
    await delay(2000)
    const priceSellStr = await page.locator(`input.AI0g6_78kpjQEk7KU44r`).innerText() // luu price
    await delay(2000)
    const priceSellInt = parseInt(priceSellStr)
    //console.log('priceSellStr = await page.locator(`input.AI0g6_78kpjQEk7KU44r`).innerText()')
    await delay(2000)



    await page.locator(`button.cOBQpozfZ4Q94cdPJ0MK`, { hasText: "Sell now" }).click()
    await delay(2000)
    //await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    await delay(2000)
    await page.locator(`button.cOBQpozfZ4Q94cdPJ0MK`).click  // understand btn

    /*
    // check new hero tren cho'
    await page.goto('https://staging.marketplace.thetanarena.com/buy')
    AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(`div.RzCtmnvJtc4BwmQPIiSK`).click() // click DDL filter latest
    await delay(2000)
    await page.locator(`//span[contains(.,"Latest")]`).click()
    await page.locator(`..pTlq4suyqtK3Lmj4MH27`).first().click()
    //Check price
    const priceHero =  parseInt(await page.locator(`.f9zZck_3CSpfmtllo7B2`).innerText())
    await delay(2000)
    if(priceSellInt == priceHero){
        await delay(2000)

        console.log('Gia dung roi')
    }
    return
    // <span class="f9zZck_3CSpfmtllo7B2">10,000 THC</span>
*/


    console.log("DONE")

});