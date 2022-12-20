import { test as base, expect, chromium, BrowserContext, request } from '@playwright/test';
import AllPopup from '../src/arena-helper/ArenaHelper';
import Waiter, { Price, Texter } from '../src/helper/Helper';
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

var connectWalletBtn = "button.YtC7SW5QBXao_Bj5rMO5"
var loginMetamaskBtn = ".ZPKehyuOXkcNnT3_AzFi"
// var confirmBtn = "button.UbQxYBXfgGDIuLkCeyyJ"
const confirmBtn = "button.btn-primary"
var closePopup = "button.pLR7HMsTTEl5rpFrMLcR"

var nextBtn = "button.btn-primary"
var rentMenu = `//span[contains(.,"Rent")]`
var pageTotalLct = `.EvpVAk_1hz05LPdtaLW7`
var pageNumLct = `.L_M93__9aZoANZFOXRAn`
var heroItemInventoryLct = `.LoG5KRQGfS_ExpEYUM9r`
var heroItemMaketLct = `.pTlq4suyqtK3Lmj4MH27`
var understandBtn = `button.cOBQpozfZ4Q94cdPJ0MK`
var dropDownListLct = `div.RzCtmnvJtc4BwmQPIiSK`
var priceHeroLct = `.wlYd9YCSxc4V1_yktp93 > span.y0q8jlGWIeRjuoKU41e9`
var url = 'https://marketplace-preview-pr-559.staging.thetanarena.com'

test('login1', async ({ page, browser }) => {
    page.goto(`${url}`)
    console.log("------------- START-------")

    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(2000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    console.log("------------- 111--------")

    await delay(2000)
    const [newPage] = await Promise.all([

        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        // page.locator(confirmBtn).click(),
        console.log("------------- 222--------")
    ]);
    // await delay(3000)
    // page.locator(confirmBtn).click(),

    console.log("------------- 333----")
    await delay(2000)

    await newPage.waitForLoadState()
    await delay(2000)

    await metamask.switchNetwork()
    await delay(2000)

    await metamask.connectAndSignAccount()

    await page.waitForLoadState()

    await delay(10000)
});

test('--------- LOGIN  @login --------- ', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);

    await delay(2000)
    await page.locator(closePopup).click() // close popup

    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    console.log("-------------- start")
    const [newPage] = await Promise.all([
        
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        
    ]);
    await delay(3000)
    page.locator(confirmBtn).click(),
        console.log("-------------- METAMASK NEXT BUTTON ----")
    // ]);

    await newPage.waitForLoadState()
    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- METAMASK CONNECT BUTTON ----")

    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- METAMASK  APPROVE BUTTON ----")

    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- 666 ----")

    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- switch network ----")

    await delay(5000)
    console.log("-------------- Accept and Sign ----")
    await page.locator(`//span[contains(.,"Accept and sign")]`).click()

    await delay(3000)
    await metamask.connectAndSignAccount()
    console.log("-------------- FINISH Sign Signature ----")
    await delay(3000)
    await page.waitForLoadState()

    // await page.locator(closePopup).click() // close popup
    await page.locator("button.pLR7HMsTTEl5rpFrMLcR").click() // close 1st popup
    await delay(2000)

    await page.locator("button.X8V1duQb_w6mhY4h9ogt").click() // close 2nd popup
    console.log("-------------- LOGIN SUCCESS ------")
    

});
test.only('--------- BUY COMMON BOX @buy --------- ', async ({ page, browser }) => {
    await page.goto("https://marketplace-preview-pr-559.staging.thetanarena.com/")
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
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    console.log("-------------- start")
    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        // page.locator(confirmBtn).click()
    ]);
    console.log("-------------- stop")

    await delay(2000)

    // const [newPage] = await Promise.all([
    //     metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
    page.locator(confirmBtn).click(),
        console.log("--------------  222 ----")
    // ]);

    await newPage.waitForLoadState()
    console.log("-------------- 333 ----")

    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- 4444 ----")

    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- 555 ----")

    await delay(3000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- 666 ----")

    await delay(2000)
    await newPage.locator(confirmBtn).click()
    console.log("-------------- switch network ----")

    await delay(2000)
    console.log("-------------- Accept and Sign ----")
    await page.locator(`//span[contains(.,"Accept and sign")]`).click()


    // await delay(3000)
    // await newPage.waitForLoadState()
    // console.log("-------------- 777 ----")

    // await newPage.locator(confirmBtn).click()
    // console.log("-------------- Sign Signature ----")

    // await delay(200000)
    // await newPage.locator(confirmBtn).click()
    // console.log("-------------- switch network  ----")

    // await delay(3000)
    // await metamask.switchNetwork()
    // console.log("-------------- 777 ----")

    await delay(2000)
    await metamask.connectAndSignAccount()
    console.log("-------------- Sign Signature ----")
    await delay(20000)

    await page.waitForLoadState()

    await delay(20000)
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
    // await expect(page).toHaveURL('`${url}`/thetanbox')
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
    await page.goto("`${url}`/profile?tab=inventory&category=thetabox")
    console.log("số lượng box sau khi mua:", Texter.GetIntFromText(await page.locator('span.cF3D5iGpvsF7xF_0g5fV').innerText()))
    await delay(10000)



});

test('-------------BUY HERO CO GIA < 50000 @buy ------------', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    // chọn menu buy
    await page.locator(`//span[contains(.,"Buy")]`).click()
    await delay(2000)

    await page.locator(dropDownListLct).click() // click DDL filter
    await delay(2000)

    // filter cheapest 
    await page.locator(`//span[contains(.,"Cheapest Item")]`).click()
    // await page.locator(`.AKO9NaM23tnI_yIaFSsb`, {hasText:"Cheapest Item"}).click()

    await delay(4000)


    var pageTotal = Texter.GetIntFromText(await page.locator(pageTotalLct).innerText())
    for (let i = 1; i < pageTotal; i++) {
        await page.locator(pageNumLct).fill(i.toString())
        await page.keyboard.press('Enter')
        await delay(1000)
        console.log('page', i)

        var heroItem = await page.locator(heroItemMaketLct).count()
        await delay(2000)

        let daTimDuocHero = false

        for (let j = 1; j < heroItem; j++) {
            // await page.locator(heroItemMaketLct).nth(j).click()
            await delay(1000)

            const priceHeroStr = await page.locator(priceHeroLct).nth(j).innerText()
            const priceHero = parseFloat(priceHeroStr.replace(",", ""))

            if (priceHero < 50000) {
                await delay(1000)
                await page.locator(heroItemMaketLct).nth(j).click()
                await delay(1000)
                var isOwnerCheck = await page.locator(`//span`, { hasText: "Owner by me" }).isVisible()

                if (isOwnerCheck) {
                    console.log('DANG LA OWNER')
                    await page.goBack({ waitUntil: 'load' })
                    continue   // quay lai for(j)
                }

            }
            daTimDuocHero = true
            break
        }

        if (daTimDuocHero) {
            console.log("CO HERO PHU HOP DE BAN")
            break
        }

    }
    await delay(1000)

    // HERO DETAIL PAGE
    const pageDetail = page.url()
    const heroId = pageDetail.slice(pageDetail.lastIndexOf("/") + 1)
    console.log("DETAIL HERO:", pageDetail)
    console.log("HEROID LA: ", heroId)
    await delay(1000)

    // CLICK BUY 
    await page.locator(`span.amttH6S21k7IsiPB9GBn`).click()
    await delay(1000)

    await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    // await page.waitForLoadState()
    await page.waitForSelector(`//span[contains(.,"Close")]`, {})
    await delay(2000)
    await page.locator(`//span[contains(.,"Close")]`).click()
    await delay(2000)

    // CHECK OWNER SAU KHI ĐĂNG BÁN THÀNH CÔNG
    await page.goto(pageDetail)
    await delay(3000)

    await expect(page.locator(`//span`, { hasText: "Owner by me" })).toBeVisible()

    // var isVisible = await page.locator(`//span`, { hasText: "Owner by me"}).isVisible()
    // if (!isVisible ){
    //     return false
    // }

    console.log("DONE")

});

test('---------- STOP BUY HERO @buy -------------', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    // chọn menu buy
    await page.locator(`//span[contains(.,"Buy")]`).click()
    await delay(2000)
    var pageTotal = Texter.GetIntFromText(await page.locator(pageTotalLct).innerText())
    console.log(pageTotal)
    for (let i = 1; i <= pageTotal; i++) {
        await page.locator(pageNumLct).fill(i.toString())
        await page.keyboard.press('Enter')
        await delay(1000)
        console.log("page", i)

        var heroItem = await page.locator(heroItemMaketLct).count()

        let daTimHero = false
        for (let j = 0; j < heroItem; j++) {
            await page.locator(heroItemMaketLct).nth(j).click()

            await delay(3000)
            var isOwnerCheck = await page.locator(`//span`, { hasText: "Owner by me" }).isVisible()
            if (!isOwnerCheck) {
                console.log("KHONG PHAI OWNER")
                await page.goBack({ waitUntil: "load" })
                continue
            }

            daTimHero = true
            break
        }

        if (daTimHero) {
            break
        }
    }

    // CHỌN HERO OWNER ĐỂ STOP SELLING
    await page.locator(`//span`, { hasText: 'Stop selling' }).click();
    await delay(2000)
    await page.locator(`.RKJ62RKkTu4ysVb7Q1FQ`).click();

    await delay(2000)
    await metamask.__primaryMetamask()
    await delay(2000)
    await page.waitForLoadState()
    console.log("- Click understand")
    await page.locator(understandBtn, { hasText: "Understand" }).click()  // understand btn
    // await delay(2000)
    await page.waitForLoadState()

    console.log("DONE")

});

test('-------------- SELL HERO @sell --------------', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()


    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    await delay(2000)
    await page.goto("`${url}`/profile?tab=inventory")

    await delay(3000)

    var heroCount = await page.locator(heroItemInventoryLct).count()
    for (let i = 0; i < heroCount; i++) {
        await page.locator(heroItemInventoryLct).nth(i).click()
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
    await page.locator(understandBtn, { hasText: "Sell now" }).click()
    await delay(20000)
    //await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    await metamask.__primaryMetamask()
    await delay(2000)
    // await page.locator(`//span[contains(.,"I understand”)]`).click()
    await page.locator(understandBtn).click  // understand btn
    // await page.waitForLoadState()
    // await page.waitForSelector(`//span[contains(.,"Close")]`, {})
    // await delay(2000)
    // await page.locator(`//span[contains(.,"Close")]`).click()
    // await delay(2000)
    //  await Waiter.ActAndWaitNewTab(page.locator(`//span[contains(.,"I understand”)]`).click(), )


    console.log("DONE")

});
// check latest item???

test('------------ SELL HERO TRINH @sell ------------', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    await delay(2000)
    await page.goto("`${url}`/profile?tab=inventory")

    await delay(1200)

    var pageTotal = Texter.GetIntFromText(await page.locator(pageTotalLct).innerText())
    let sellBtnLocator = page.locator(`//span`, { hasText: "Sell" })
    var coChonDuocHeroCoTheSellKhong = false
    for (let i = 1; i <= pageTotal; i++) {
        await page.locator(`input[type="number"]`).fill(i.toString())
        await page.keyboard.press('Enter')
        await delay(1000)
        console.log("page", i)

        var heroCount = await page.locator(heroItemInventoryLct).count()


        let heroLocator = page.locator(heroItemInventoryLct)

        // LABEL HERO: NOT MINT, SELLING ...
        let labelSelector = '.Dfj5fSymG7FC_pQ1ltOn'

        for (let j = 0; j < heroCount; j++) {

            if (await heroLocator.nth(j).locator(labelSelector).isVisible()) {
                continue // nếu có label thì quay lại for (j)

            }

            console.log(`let statusLabel = await page.locator('.Dfj5fSymG7FC_pQ1ltOn').nth(i).innerText()`)
            // if (await page.locator(`.Dfj5fSymG7FC_pQ1ltOn`).nth(j).isVisible()) {

            //     let statusLabel = await page.locator(`.Dfj5fSymG7FC_pQ1ltOn`).nth(j).innerText()
            //     console.log(statusLabel)

            //     if (statusLabel == 'SELLING') {
            //         console.log(`statusLabel == 'SELLING'`)
            //     }

            //     if (statusLabel == 'NOT MINT') {
            //         console.log(`statusLabel == 'NOT MINT'`)
            //     }

            //     continue

            // }
            await page.locator(heroItemInventoryLct).nth(j).click()
            await delay(1000)

            //let sellBtnLocator = page.locator(`//span[contains(.,"Sell")]`)

            // kiểm tra có button sell hay ko?
            let isSellBtnVisible = await sellBtnLocator.isVisible()
            if (!isSellBtnVisible) {
                console.log("Khong tim thay sell btn")
                await page.goBack({ waitUntil: "load" })
                continue // quay lại for (j)
            }

            // kiểm tra button sell có enable ko?
            let isSellBtnEnable = await sellBtnLocator.isEnabled()
            if (!isSellBtnEnable) {
                console.log("Sell btn disabled")
                await page.goBack({ waitUntil: "load" })
                continue // quay lại for (j)
            }
            coChonDuocHeroCoTheSellKhong = true
            break // end for (j)
        }
        if (coChonDuocHeroCoTheSellKhong) {
            console.log("co hero phu hop")
            break // end for (i)
        }

        //await expect(page.locator(`//span`, {hasText: "Sell"})).toBeVisible()
    }
    if (!coChonDuocHeroCoTheSellKhong) {
        console.log("------------- KHONG CO HERO PHU HOP -------------")
        return
    }

    // CLICK SELL BUTTON 
    await sellBtnLocator.click()
    await delay(2000)

    // RANDOM GIÁ TỪ 50 - 100             
    const price = Math.round(Math.random() * 10000 + 10000)
    console.log("- Price:", price)
    await page.locator(`input.AI0g6_78kpjQEk7KU44r`).fill(price.toString())
    await delay(2000)
    // const priceSellStr = await page.locator(`input.AI0g6_78kpjQEk7KU44r`).innerText() // luu price
    // await delay(2000)
    // const priceSellInt = parseInt(priceSellStr)
    // console.log("GIA HERO LA:",priceSellInt)
    // await delay(2000)



    console.log("- Click sell")
    await page.locator(understandBtn, { hasText: "Sell now" }).click()
    await delay(2000)
    //await Waiter.ActAndWaitNewTab(page.locator(`//button[contains(.,"Checkout")]`).click(), metamask.browserContext)
    console.log("- Click metamask")
    await metamask.__primaryMetamask()
    await delay(2000)
    await page.waitForLoadState()
    console.log("- Click understand")
    await page.locator(understandBtn, { hasText: "Understand" }).click()  // understand btn
    // await delay(2000)
    await page.waitForLoadState()

    console.log("- After understand")

    // check new hero tren chợ
    await page.goto('`${url}`/buy')
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(dropDownListLct).click() // click DDL filter latest
    await delay(2000)
    await page.locator(`//span[contains(.,"Latest")]`).click()
    await page.locator(heroItemMaketLct).first().click()
    //Check price
    const priceHero = await page.locator(`.f9zZck_3CSpfmtllo7B2`).innerText()
    const priceNum = parseFloat(priceHero.replace(",", ""))
    await delay(2000)
    if (price == priceNum) {
        await delay(2000)
        console.log('Gia dung roi:', price)
    }

    //Check owner
    var owner = await page.locator(`//span`, { hasText: "Owner by me" }).isVisible()
    if (owner) {
        await delay(1000)
        console.log("TOI LA OWNER")
    }

    // return
    console.log("DONE")

});

test('----------- RENT OUT HERO @rent ----------- ', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    await delay(2000)
    await page.goto("`${url}`/profile?tab=inventory")
    await delay(1200)

    var pageTotal = Texter.GetIntFromText(await page.locator(pageTotalLct).innerText())
    let rentOutBtnLocator = page.locator(`//span`, { hasText: "Rent out" })
    var coChonDuocHeroCoTheRentKhong = false
    for (let i = 1; i <= pageTotal; i++) {
        await page.locator(`input[type="number"]`).fill(i.toString())
        await page.keyboard.press('Enter')
        await delay(4000)
        console.log("page", i)

        var heroCount = await page.locator(heroItemInventoryLct).count()

        let heroLocator = page.locator(heroItemInventoryLct)
        let labelSelector = '.Dfj5fSymG7FC_pQ1ltOn'

        for (let j = 0; j < heroCount; j++) {

            if (await heroLocator.nth(j).locator(labelSelector).isVisible()) {
                continue
            }


            await page.locator(heroItemInventoryLct).nth(j).click()
            await delay(1000)

            // kiểm tra có button RENT hay ko?
            let isRentOutBtnVisible = await rentOutBtnLocator.isVisible()
            if (!isRentOutBtnVisible) {
                console.log("Khong tim thay sell btn")
                await page.goBack({ waitUntil: "load" })
                continue
            }

            // kiểm tra button RENT có enable ko?
            let isRentOutBtnEnable = await rentOutBtnLocator.isEnabled()
            if (!isRentOutBtnEnable) {
                console.log("Sell btn disabled")
                await page.goBack({ waitUntil: "load" })
                continue
            }
            coChonDuocHeroCoTheRentKhong = true
            break
        }
        if (coChonDuocHeroCoTheRentKhong) {
            console.log("co hero phu hop")
            break
        }

        //await expect(page.locator(`//span`, {hasText: "Sell"})).toBeVisible()
    }
    if (!coChonDuocHeroCoTheRentKhong) {
        console.log("------------- KHONG CO HERO PHU HOP -------------")
        return
    }

    await delay(2000)
    const heroDetail = page.url()
    await delay(2000)
    console.log("-----URL-----: ", heroDetail)
    const heroId = heroDetail.slice(heroDetail.lastIndexOf("/") + 1) // get Hero Id from the URL

    await rentOutBtnLocator.click()
    await delay(2000)

    // RANDOM GIÁ TỪ 50->100
    const rentingPrice = Price.GetRandomPrice(50, 100)
    console.log("- Price:", rentingPrice)
    await page.locator(`input.tyMBbWlgZp5BaqSW29K2`).fill(rentingPrice.toString()) // input renting price
    await delay(2000)
    await page.locator(`div._87zo8hJVkYqURYaVtol`).click() // check box
    await delay(2000)
    await page.locator(`//span`, { hasText: "Put up for rent" }).click()
    await delay(2000)

    console.log("- Click metamask")
    await metamask.__primaryMetamask()
    await delay(5000)
    await page.waitForLoadState()
    await delay(5000)
    console.log("- Click I got it ")
    await page.locator(understandBtn, { hasText: "I got it" }).click()  // I got it btn
    // await delay(2000)
    await page.waitForLoadState()

    console.log("- After I got it")
    await delay(5000)

    // check new hero tren cho'
    await page.goto('`${url}`/rental')
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(dropDownListLct).click() // click DDL filter latest
    await delay(2000)
    await page.locator(`//span[contains(.,"Latest")]`).click()
    await page.locator(heroItemMaketLct).first().click()

    //Check price
    const priceRentOutHero = await page.locator(`span.f9zZck_3CSpfmtllo7B2`).innerText()
    const priceRentOutHeroNum = parseFloat(priceRentOutHero.replace(",", ""))
    await delay(2000)
    if (rentingPrice == priceRentOutHeroNum) {
        await delay(2000)
        console.log('-------GIA CHO THUE LA :', rentingPrice)
    }

    //Check owner
    var owner = await page.locator(`//span`, { hasText: "Owner by me" }).isVisible()
    if (owner) {
        await delay(1000)
        console.log("TOI LA OWNER CUA HERO NAY")
    }

    // Check label
    var labelRentOut = await page.locator(`//span`, { hasText: "Cancel renting" }).isVisible()
    if (labelRentOut) {
        await delay(1000)
        console.log("-------LABEL IS RENT OUT--------")

    }
    // var isVisible = await page.locator(`//span`, { hasText: "Owner by me"}).isVisible()
    // if (!isVisible ){
    //     return false
    // }

    // Check history
    await delay(2000)
    await page.goto('`${url}`/profile?tab=history')
    await delay(2000)
    await page.locator(`.StJzsR5pcPKJ15moS3G3`, { hasText: "More" }).click()// more filter
    await delay(2000)
    await page.locator(`//span`, { hasText: "Renting History" }).click()
    await delay(1000)
    // Check Hero detail in history
    const heroIdInventory = await page.locator(`span.IpznSo8M9_7uqaFGDreR`).first().innerText()
    if (heroIdInventory == heroId) {
        await delay(1000)


    }
    console.log("Hero cho thue la:", heroId)

    console.log("DONE")

});

test('----------- CANCEL RENT HERO @rent ------------', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    // chọn menu rent
    await page.locator(rentMenu).click()
    await delay(2000)
    var pageTotal = Texter.GetIntFromText(await page.locator(pageTotalLct).innerText())
    console.log(pageTotal)
    for (let i = 1; i <= pageTotal; i++) {
        await page.locator(pageNumLct).fill(i.toString())
        await page.keyboard.press('Enter')
        await delay(1000)
        console.log("page", i)

        var heroItem = await page.locator(heroItemMaketLct).count()
        await delay(3000)

        let daTimHero = false
        for (let j = 0; j < heroItem; j++) {
            await page.locator(heroItemMaketLct).nth(j).click()
            await delay(3000)
            var isOwnerCheck = await page.locator(`//span`, { hasText: "Owner by me" }).isVisible()
            if (!isOwnerCheck) {
                console.log("KHONG PHAI OWNER")
                await page.goBack({ waitUntil: "load" })
                continue
            }

            daTimHero = true
            break
        }

        if (daTimHero) {
            break
        }
    }

    await page.locator(`//span`, { hasText: 'Cancel renting' }).click();
    await delay(2000)
    await page.locator(`//span`, { hasText: 'Stop renting' }).click();

    await delay(2000)
    await metamask.__primaryMetamask()
    await delay(2000)
    await page.waitForLoadState()
    // console.log("- Click understand")
    // await page.locator(understandBtn, { hasText: "Understand" }).click()  // understand btn
    // // await delay(2000)
    // await page.waitForLoadState()

    console.log("DONE")

});

// api simulate Hero, level 
test('---------- Check history after Rent @rent -----------', async ({ page, browser }) => {
    await page.goto(`${url}`)
    await AllPopup.ClosePopup(page);
    await delay(2000)
    await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    await delay(1000)
    await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    const [newPage] = await Promise.all([
        metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
        page.locator(confirmBtn).click(),
    ]);

    await newPage.waitForLoadState()
    await metamask.switchNetwork()
    await metamask.connectAndSignAccount()

    // Check history
    await delay(2000)
    await page.goto('`${url}`/profile?tab=history')
    await delay(2000)
    await page.locator(`.StJzsR5pcPKJ15moS3G3`, { hasText: "More" }).click()// more filter
    await delay(2000)
    await page.locator(`//span`, { hasText: "Renting History" }).click()
    await delay(1000)
    console.log("DONE")

});

test('---------- CHECK HERO DETAIL @hero ---------', async ({ page, browser }) => {
    // await page.goto(`${url}`)
    // await AllPopup.ClosePopup(page);
    // await delay(2000)
    // await page.locator(connectWalletBtn, { hasText: "Connect Wallet" }).click() // button connect wallet
    // await delay(1000)
    // await page.locator(loginMetamaskBtn, { hasText: "Login with Metamask" }).click()

    // const [newPage] = await Promise.all([
    //     metamask.browserContext.waitForEvent('page', { timeout: 60000 }),
    //     page.locator(confirmBtn).click(),
    // ]);

    // await newPage.waitForLoadState()
    // await metamask.switchNetwork()
    // await metamask.connectAndSignAccount()

    // Check hero detail
    await delay(2000)
    await page.goto('`${url}`/item/6332de7d7af5e5ca7bb966b3')
    await delay(2000)
    const heroDetail = page.url()
    await delay(2000)
    console.log("-----URL-----: ", heroDetail)
    const heroId = heroDetail.slice(heroDetail.lastIndexOf("/"))
    console.log("-----URL-----: ", heroId)
    await delay(2000)

});


