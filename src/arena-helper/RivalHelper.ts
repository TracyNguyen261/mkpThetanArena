import { APIRequestContext, Page, request } from "@playwright/test"
import MyHttp, { Response } from "../helper/HttpUtil"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
var thetanRivalsUrl = 'https://data-rivals.staging.thetanarena.com/api/v1'

export class APIResp<T>  {
    success: boolean = false
    httpCode: number = 0
    code: number = 0
    data?: T
    body: string
}

export class Minion {
    minions: UserMinion[]
}
export class UserMinion {
    id: string
    userId: string
    type: number
    skin: number
    nft: boolean
    status: number
    level: number
    addIns: Map<string, number>
}

export class AdminSendInventoryReq {
    userId: string
    inventories: InventoryItem[]
}

export class InventoryResponse extends APIResp<InventoryItem[]> {
}

export class InventoryItem {
    kind: number
    type: number
    amount: number
    decimals?: number
}

export class Inventory {
    id: string
    inventories: Map<string, InventoryItem>
}

// export class Minion {

//     id: string
//     userId: string
//     type: number
//     skin: number
//     nft: boolean
//     status: number
//     level: number
//     addInds: AddIns

// }
// export class AddIns {
//     backBling: number
//     dance: number
//     flyCraft: number
//     footprint: number
//     glow: number
//     spray: number
//     voice: number

// }
// export enum addIns{
//     backBling = 1,
//     dance =  2,
//     flyCraft = 3,
//     footprint = 4 ,
//     glow = 5,
//     spray = 6,
//     voice = 7
// }

// export class Response {
//     code: number
//     success: boolean
//     data: InventoryData
// }

export class EvolveSkin {
    minionId: string
    cosmeticId: number
}
export class SendMinionReq {

    userId: string
    addSeasonPoints: Number
    addExp: number
    addRivalBucks: number
    addMinion: number

}

export default class Rival {
    // static async adminSendInventory<T>(request: APIRequestContext, body:SendInventoryReq  , token: string): Promise<APIResp<T>>{
    //     const response = await request.post(`${thetanRivalsUrl}/inventory/admin/send`,{
    //         data: body, 
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     if(!response.ok(){
    //         return new APIResp<T>()
    //     })
    //     return response.json()
    // }
    //     static async POST<T>(url: string, request: APIRequestContext, body: any, token: string): Promise<APIResp<T>> {
    //         const response = await request.post(url, {
    //             data: body,
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }

    //         })
    //         if (!response.ok()) {
    //             return {
    //                 body: await (await response.body()).toString(),
    //                 httpCode: response.status(),
    //                 code: 0,
    //                 success: false,
    //             }
    //         }
    //         return await response.json()
    //     }
    //     static async GET<T>(url: string, request: APIRequestContext, params:any = {}, token: string): Promise<APIResp<T>>{
    //         const response = await request.get(url, {
    //             headers:{
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             params: params
    //         })
    //         if(!response.ok()){
    //             return new APIResp<T>()
    //         }
    //         return await response.json()
    //     }
    static async AdminSendInventory<T>(request: APIRequestContext, body: AdminSendInventoryReq, token: string): Promise<Response<APIResp<T>>> {
        return MyHttp.POST<APIResp<T>>(`${thetanRivalsUrl}/inventory/admin/send`, request, body, token)

    }

    static async Evolve<T>(request: APIRequestContext, body: EvolveSkin, token: string): Promise<Response<APIResp<T>>> {
        return MyHttp.POST(`${thetanRivalsUrl}/minion/evolve`, request, body, token)
    }

    static async AdminSendMinion<T>(request: APIRequestContext, boby: SendMinionReq, token: string): Promise<Response<APIResp<T>>> {
        return MyHttp.POST<APIResp<T>>(`https://thetan-rivals-service-preview-pr-232.staging.thetanarena.com/api/v1/season-pass/admin/simulate`, request, boby, token)
    }
}