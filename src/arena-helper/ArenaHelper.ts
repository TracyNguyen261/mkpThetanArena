import { Page } from "@playwright/test"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export default class AllPopup {
    static async ClosePopup(page: Page): Promise<void> {
        var locator = page.locator("img.qyN2w96htGOSy3f9Xj90")

        while (await locator.isVisible()) {
            await delay(2000)
            await locator.click()
            await delay(1000)
        }

    }
}

