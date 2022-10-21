import { APIRequestContext, Page } from "@playwright/test"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export class APIResp<T>  {
    success: boolean = false
    httpCode: number = 0
    code: number = 0
    data?: T
    body: string
}

export class OpenBoxData {
    heroId: string
    heroTypeId: number
    usedBattleTHC: number
    battleCapTHC: number
    skinInfo: Skin
    heroInfo: HeroInBox
    itemType: number
    
}

export class Skin{
    skinId: number
    heroTypeId: number
    heroRarity: number
    skinRarity: number
}

export class HeroInBox{
    name: string
    rarity: number
}
export class SendHeroReq {
    skinId: Number
    address: string
    amount: Number
    motLaAm999HaiLa0: Number
}

export class SetMaterial {
    userId: string
    inps: number[]
}

export class SetHeroLevel {
    heroId: string
    level: number
}

export class SetHeroBattleCap {
    heroId: string
    battleCap: number
}
export class Box {
    userAddress: string
    userEmail: string
    boxes: BoxInfo[]
}
export class BoxInfo {
    boxType: number
    amount?: number
}
// export class OpenBox{
//     boxType: number
// }

export enum BoxType {
    Common = 1,
    Epic,
    Legendary,
    Hattrick = 19

}
export class ThetanBoxData {
    boxDataArr: Map<Number, BoxAmount>
}


export class BoxAmount {
    amount: number
    processing: number
}

var stgDataUrl = 'https://data.staging.thetanarena.com/theta/v1'

export default class MaketPlace {
    static async POST<T>(url: string, request: APIRequestContext, body: any, token: string): Promise<APIResp<T>> {
        const response = await request.post(url, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        if (!response.ok()) {
            return {
                body: await (await response.body()).toString(),
                httpCode: response.status(),
                code: 0,
                success: false,
            }
        }
        return await response.json()
    }

    static async GET<T>(url: string, request: APIRequestContext, params: any = {}, token: string = ""): Promise<APIResp<T>> {
        const response = await request.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: params
        })
        if (!response.ok()) {
            return new APIResp<T>()
        }
        return await response.json()
    }

    static async SendHero<T>(request: APIRequestContext, body: SendHeroReq, token: string): Promise<APIResp<T>> {
        const response = await request.post(`${stgDataUrl}/hero/send-hero`, {
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

    static async SimulateInput<T>(request: APIRequestContext, body: SetMaterial, token: string): Promise<APIResp<T>> {
        const response = await request.post(`${stgDataUrl}/fusion/simulate/inps`, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok()) {
            return new APIResp<T>()
        }
        return await response.json()
    }

    static async SimulateHeroLevel<T>(request: APIRequestContext, body: SetHeroLevel, token: string): Promise<APIResp<T>> {
        const response = await request.post(`${stgDataUrl}/fusion/simulate/level`, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok()) {
            return new APIResp<T>()
        }

        return await response.json()
    }

    static async SimulateHeroBattle<T>(request: APIRequestContext, body: SetHeroBattleCap, token: string): Promise<APIResp<T>> {
        const response = await request.post(`${stgDataUrl}/fusion/simulate/battle-cap`, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!response.ok()) {
            return new APIResp<T>()
        }
        return await response.json()
    }

    static async SendBox<T>(request: APIRequestContext, body: Box, token: string): Promise<APIResp<T>> {
        return this.POST(`${stgDataUrl}/thetanbox/send`, request, body, token)
    }

    static async OpenBox<T>(request: APIRequestContext, body: BoxInfo, token: string): Promise<APIResp<T>> {
        return this.POST(`${stgDataUrl}/thetanbox/open-box`, request, body, token)
    }

}