import { test, expect } from '@playwright/test';

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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

test('get Hero info of the 1st Hero ', async ({ page }) => {
  await page.goto('https://staging.marketplace.thetanarena.com/buy');

  // await delay(2000)

  let elem = page.locator(HERO_1_OF_BUY_PAGE)

  await elem.first().click()

  let levelLct = page.locator(HERO_DETAIL_LEVEL)
  let level = await levelLct.innerText()

  let skinNameLct = await page.locator(HERO_DETAIL_SKINNAME).innerText()
  let nameLct =  await page.locator(HERO_DETAIL_NAME).innerText()
  let heroName = `${toTitleCase(nameLct)} (${toTitleCase(skinNameLct)})`

  console.log("- Hero level:", level)
  console.log("- Hero name:", heroName)
  
  await delay(1000)


  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/buy/);

  // // create a locator
  // const getStarted = page.locator('text=Get Started');

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});