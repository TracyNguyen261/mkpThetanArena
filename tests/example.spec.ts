import { test, expect, chromium } from '@playwright/test';
//import {chromium} from '@playwright/test';


// test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);

//   // create a locator
//   const getStarted = page.locator('text=Get Started');

//   // Expect an attribute "to be strictly equal" to the value.
//   await expect(getStarted).toHaveAttribute('href', '/docs/intro');

//   // Click the get started link.
//   await getStarted.click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });

const HERO_1_OF_BUY_PAGE = "div.ujtfg6kpyFh4fHPZFcUd"
const HERO_DETAIL_LEVEL = "span.PeXKNo3V8R7bcjHLEb56"
const HERO_DETAIL_SKINNAME = "span._atuzuFtpVmwrmeGN5eL"
const HERO_DETAIL_NAME = "span.GqA6UYIRwfKSavQs_noo"
const YOUR_QUEST_POINT = 'span.EiyovqrTjr7v6pfJaABI'
const DAILY_FREE_QUEST_POINT = 'span.DhSa1FvhFNmC0fUx3bI_'
const MY_REFERAL_LINK = 'div.DOVN3iNxHbSolUQTK9wE'
const CLOSE_POP_UP = 'img.tub8F06x3oXfq0hxWycJ'
const BANNER = ''

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
// test.beforeAll(async({page})=> {
//   await page.goto('https://staging.marketplace.thetanarena.com')
//   await delay(3000)
//   console.log('---------', "gi cung dc")
// });


// test('get Hero info of the 1st Hero @heroinfo ', async ({ page }) => {
//   await page.goto('https://staging.marketplace.thetanarena.com/buy');

//   // await delay(2000)

//   let elem = page.locator(HERO_1_OF_BUY_PAGE)

//   await elem.first().click()

//   let levelLct = page.locator(HERO_DETAIL_LEVEL)
//   let level = await levelLct.innerText()

//   let skinNameLct = await page.locator(HERO_DETAIL_SKINNAME).innerText()
//   let nameLct =  await page.locator(HERO_DETAIL_NAME).innerText()
//   let heroName = `${toTitleCase(nameLct)} (${toTitleCase(skinNameLct)})`

//   console.log("- Hero level:", level)
//   console.log("- Hero name:", heroName)

//   await delay(1000)

// //   // test.skip('skip this page ', async ({ page }) => {
// //   //   await page.goto('https://staging.marketplace.thetanarena.com/special-event')
//   });
  

// test('test only chrome browser', async({page})=>
// {
//   await page.goto('https://staging.marketplace.thetanarena.com')
//   await delay(2000)
//   await expect(page).toHaveTitle('The Official Marketplace of Thetan Arena')
//   console.log("đây là title page: ", await page.title() )
//   console.log('check browser:', "chrome ne")
//   await expect(page).toHaveURL('https://staging.marketplace.thetanarena.com/')
//   console.log("đây là url: ", await page.url() )
// });

test('get popup My referal link ', async ({page})=> {
await page.goto('https://staging.marketplace.thetanarena.com/')
await delay(2000)
let referalLct =  await page.locator(MY_REFERAL_LINK)
//await expect(referalLct).toHaveScreenshot('referal.png')
console.log("đây là popup referal:" , await expect(referalLct).toHaveScreenshot('referal.png') )
await delay(1000)
let closeLct = await page.locator(CLOSE_POP_UP).click()
await delay(2000)

});



//   // test('skip this test', async({page, browserName})=> {o
//   //   test.skip(browserName==='firefox', 'using this browser to test')
//   // })


//   // // Expect a title "to contain" a substring.
//   // await expect(page).toHaveTitle(/buy/);

//   // // create a locator
//   // const getStarted = page.locator('text=Get Started');

//   // // Expect an attribute "to be strictly equal" to the value.
//   // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

//   // // Click the get started link.
//   // await getStarted.click();

//   // // Expects the URL to contain intro.
//   // await expect(page).toHaveURL(/.*intro/);
// });

// learning group test
// test.describe('two tests', () => {
//   test('one', async ({ page }) => {
//     await page.goto('https://staging.marketplace.thetanarena.com/staking')
//     await delay(4000)
//   });

//   test('two', async ({ page }) => {
//     await page.goto('https://staging.marketplace.thetanarena.com/daily-quest')
//     await delay(2000)
//   });
// });

// learning skip, skip another browsers

// test.describe('run test on chromium only', () => {
//   test.skip(({ browserName }) => browserName !== 'chromium');

//   test.beforeEach(async ({ page }) => {
//     // This hook is only run in Chromium.
//     await page.goto('https://staging.marketplace.thetanarena.com/daily-quest')
//     await delay(2000)
//   });

//   test('get your quest point', async ({ page }) => {
//     // This test is only run in Chromium.
//     let yourQuestPointLct = await page.locator(YOUR_QUEST_POINT).innerText()
//     await delay(2000)
//     console.log('Your Quest Point:', yourQuestPointLct)
//     let dailyQuestPointLct = await page.locator(DAILY_FREE_QUEST_POINT).innerText()
//     await delay(2000)
//     console.log('Daily free quest point:', dailyQuestPointLct)


//   });
//   test('test 2', async ({ page }) => {
//     // This test is only run in Chromium.
//   });
// });

//

// test.fixme((obj) => obj.browserName === 'chromium')

// test('test fixme', async ({ page }) => {
//   await page.goto('https://staging.marketplace.thetanarena.com/vesting-safe')
//   await delay(1000)
// })


// test.only('focus this test 1', async ({ page }) => {
//   await page.goto('https://staging.marketplace.thetanarena.com/vesting-safe')
//   await delay(1000)
// });

// test.skip(({ browserName }) => browserName !== 'chromium');

// test.only('focus this test 2', async ({ page }) => {
//   await page.goto('https://staging.marketplace.thetanarena.com/vesting-safe')
//   await delay(1000)
// });

// test.describe('two tests', () => {
//   test('one', async ({ page, isMobile }) => {
//     await page.goto('https://staging.marketplace.thetanarena.com/vesting-safe')
//     //...

//     // test.fixme(vestingSafe == 0, "skip becaust vesting == 0")

//     await delay(1000)
//   });

//   test('two', async ({ page }) => {
//     await page.goto('https://staging.marketplace.thetanarena.com/vesting-safe')
//     await delay(1000)
//   });

//   test('two', async (obj) => {
//     await obj.page.goto('https://staging.marketplace.thetanarena.com/vesting-safe')
//     await delay(1000)
//   });
// });
