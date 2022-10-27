import { APIRequestContext, Page, request } from "@playwright/test"
import MaketPlace, { APIResp } from "./MarketPlaceHelper"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
var thetanRivalsUrl = 'https://data-rivals.staging.thetanarena.com/api/v1'
export class InventoryData {

    inventories: {
        "1_25": {
            "kind": string,
            "type": string,
            "amount": number,
            "decimals": number
        },

    }
}
export class MinonArray {
    minions: Minion[]
}
export class Minion {

    id: string
    userId: string
    type: number
    skin: number
    nft: boolean
    status: number
    level: number
    addInds: AddIns
   
}
export class AddIns {
    backBling: number
    dance: number
    flyCraft: number
    footprint: number
    glow: number
    spray: number
    voice: number

}
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
export class SendInventoryReq {

    userId: string
    inventories: [
        {
            "kind": number,
            "type": number,
            "amount": number
        }
    ]


}
export class EvolveSkin {
    minionId: string
    cosmeticId: number
}
export class SendMinionReq {

    useId: string
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
    static async AdminSendInventory<T>(request: APIRequestContext, body: SendInventoryReq, token: string): Promise<APIResp<T>> {
        return MaketPlace.POST(`${thetanRivalsUrl}/inventory/admin/send`, request, body, token)

    }
    static async PostEvolve<T>(request: APIRequestContext, boby: EvolveSkin, token: string): Promise<APIResp<T>> {
        return MaketPlace.POST(`${thetanRivalsUrl}/minion/evolve`, request, boby, token)
    }

    static async AdminSendMinion<T>(request: APIRequestContext, boby:SendMinionReq, token: string): Promise<APIResp<T>>{
        return MaketPlace.POST(`https://thetan-rivals-service-preview-pr-232.staging.thetanarena.com/api/v1/season-pass/admin/simulate`, request, boby, token)
    }
}