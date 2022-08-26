
import { test, expect } from '@playwright/test';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

test('test1', async ({ page }) => {
    // Go to https://marketplace.thetanarena.com/
    await page.goto('https://marketplace.thetanarena.com/');
    // Click a:nth-child(4) > .IhdL9jZBOqVmA8ayAFWW
    await page.locator('a:nth-child(4) > .IhdL9jZBOqVmA8ayAFWW').click();
    await expect(page).toHaveURL('https://marketplace.thetanarena.com/buy');
    // Click .uvApu9_ZYtUS0LligK3A >> nth=0
    await page.locator('.uvApu9_ZYtUS0LligK3A').first().click();
    await expect(page).toHaveURL('https://marketplace.thetanarena.com/item/630777c8062d8728effcd64e');
    // Click button:has-text("Purchase")
    await page.locator('button:has-text("Purchase")').click();
    await delay(500)
    // Click button:has-text("Connect") >> nth=1
    await page.locator('button:has-text("Connect")').nth(1).click();
    await delay(500)
    await expect(page).toHaveURL('https://marketplace.thetanarena.com/connect');
    // Go to https://marketplace.thetanarena.com/item/630777c8062d8728effcd64e
    await delay(500)
    await page.goto('https://marketplace.thetanarena.com/item/630777c8062d8728effcd64e');
    // Click button:has-text("Purchase")
    await delay(500)
    await page.locator('button:has-text("Purchase")').click();
    // Click button:has-text("Cancel")
    await delay(500)
    await page.locator('button:has-text("Cancel")').click();

    await delay(5000)
});