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
export class Box{
    userAddress: string
    userEmail: string
    boxes: [BoxInfo]
}
export class BoxInfo{
    boxType: number
    amount:number
}

var stgDataUrl = 'https://data.staging.thetanarena.com/theta/v1' 

export default class MaketPlace {


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

    static async SimulateHeroBattle<T>(request: APIRequestContext, body: SetHeroBattleCap, token: string):Promise<APIResp<T>>{
        const response = await request.post(`${stgDataUrl}/fusion/simulate/battle-cap`, {
            data: body,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok()){
            return new APIResp<T>()
        }
        return await response.json()
    }

    static async SendBox<T>(request:APIRequestContext, body:Box, token:string): Promise<APIResp<T>>{
        const response = await request.post(`${stgDataUrl}/thetanbox/send`, {
            data: body,
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok()){
            return new APIResp<T>()
        }
        return await response.json()
    }

}