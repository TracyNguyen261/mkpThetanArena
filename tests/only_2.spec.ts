import { test, expect, chromium } from '@playwright/test';



function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}


test('--------CHECK HERO DETAIL------', async ({ page, browser }) => {
    
    await delay(2000)
    await page.goto('https://staging.marketplace.thetanarena.com/item/6332de7d7af5e5ca7bb966b3')
    await delay(2000)
    const heroDetail = page.url()
    await delay(2000)
    console.log("-----URL-----: ", heroDetail)
    const  heroId = heroDetail.slice(heroDetail.lastIndexOf("/")+1)
    console.log("-----URL-----: ", heroId)
    await delay(2000)

});