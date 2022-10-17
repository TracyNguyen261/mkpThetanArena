import { APIRequestContext, Page } from "@playwright/test"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export class APIResp<T>  {
    success: boolean = false
    code: number = 0
    data: T
}

export class SendHeroReq {
    skinId: Number
    address: string
    amount: Number
    motLaAm999HaiLa0: Number
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

    static async SendHero<T>(request: APIRequestContext, body: SendHeroReq, token: string): Promise<APIResp<T>> {
        const response = await request.post(`https://data.staging.thetanarena.com/theta/v1/fusion/simulate/inps`, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        if (!response.ok()) {
            return new APIResp<T>()
        }

        return await response.json()
    }
}