import { APIRequestContext, Page } from "@playwright/test"
import { InventoryData, Minion } from "./RivalHelper"

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

export class FusionSuccessRepsonse {
    bio: string
    name: string

}

export class DataResponse {

    accessToken: string
    refreshToken: string

}



export class Response {
    code: number
    success: boolean
    id: string // Rival  userId
    inventories: InventoryData // Rival 
    minions: Minion[]  // Rival
    data: DataResponse
}



export class OpenBoxData {
    data: {
        heroId: string
        heroTypeId: number
        usedBattleTHC: number
        battleCapTHC: number
        skinInfo: Skin
        heroInfo: HeroInfo
        itemType: number
        rarity: number // hero, cosmetic
        cosmeticId: string
        typeId: number // cosmetic typeId
        type: number // cosmetic type
        name: string // currrency name

    }

    itemType: number
}

export class Skin {
    id: number
    heroTypeId: number
    heroRarity: number
    skinRarity: number
}

class Hero {
    data: HeroInfo[]
}

export class HeroInfo {
    id: string
    userId: string
    ownerAddress: string
    skinId: string

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
    boxType: BoxType
    amount?: number
    name?: string
}
// export class OpenBox{
//     boxType: number
// }

export enum BoxType {
    Common = 1,
    Epic = 2,
    Legendary = 3,
    Halloween = 17,
    Hattrick = 19

}
export class ThetanBoxData {
    boxDataArr: Map<Number, BoxAmount>
}


export class BoxAmount {
    amount: number
    processing: number
}

var dataUrl = 'https://data.staging.thetanarena.com/theta/v1'
// var dataUrl = 'https://data.uat.thetanarena.com/theta/v1'


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
        const response = await request.post(`${dataUrl}/hero/send-hero`, {
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

    // =============== # Hero Simulation

    static async SimulateInput<T>(request: APIRequestContext, body: SetMaterial, token: string): Promise<APIResp<T>> {
        const response = await request.post(`${dataUrl}/fusion/simulate/inps`, {
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
        const response = await request.post(`${dataUrl}/fusion/simulate/level`, {
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
        const response = await request.post(`${dataUrl}/fusion/simulate/battle-cap`, {
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

    // =============== # Box

    static async SendBox<T>(request: APIRequestContext, body: Box, token: string): Promise<APIResp<T>> {
        return this.POST(`${dataUrl}/thetanbox/send`, request, body, token)
    }

    static async OpenBox<T>(request: APIRequestContext, body: BoxInfo, token: string): Promise<APIResp<T>> {
        return this.POST(`${dataUrl}/thetanbox/open-box`, request, body, token)
    }

}