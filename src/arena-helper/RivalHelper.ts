import { APIRequestContext, Page, request } from "@playwright/test"
import MyHttp, { Response } from "../helper/HttpUtil"

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
var thetanRivalsUrl = 'https://thetan-rivals-service-preview-pr-471.staging.thetanarena.com/api/v1'

export class APIResp<T>  {
    success: boolean = false
    code: number = 0
    data?: T
}

export class RivalResp<T> extends Response<APIResp<T>> {
}

export class MinionPagingResp extends Response<APIResp<UserMinionsPaging>>{
}

export class UserMinionsPaging {
    minions: UserMinion[]
    total: number
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

export class UserRanking {
    trophy: number
    rank: number
    division: number
    milestone: number
    trophyCurRank: number
    trophyHighest: number
    seasonTrophyHighest: number
    rankingLevelHighest: number
    seasonID: number
    rewards: [number]

}
export class Reward {

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
export class AddRivalBoxReq {
    boxType: BoxType
    num: number
}
export enum BoxType {
    RivalBox = 1,
    BigBox = 2

}

export class UserProfile {
    id: string
    email: string
    address: string
    nickname: string
    avatar: number
    avatarFrame: number
    changeNameTickets: number
    biography: string
    stats: Stats
    country: string


}
export class Stats {
    minion: number
    battle: number
    vitory: number
    streak: number
    curStreak: number
    winRound: number
}


//  ham static battle end mock data
export class BattleEndReq {
    static battleMockData(playerId: string) {
        return {
            thetan: "thetan2",
            matchId: "matchIds",
            gameMode: 3,
            inGameMode: 32,
            listRoundInfo: [
                {
                    round: 1,
                    mapId: 0
                },
                {
                    round: 2,
                    mapId: 1
                },
                {
                    round: 3,
                    mapId: 3
                }

            ],
            operationSystem: "operationSystem2",
            appVersion: "appVersion2",
            listPlayers: [
                {
                    playerId: playerId,
                    battleRank: 1
                }
            ]

        }

    }

}

export class BattleEnd {
    trophySearch: number
    seasonPoint: number
    battleNumber: number
    specialEventScore: number
    exp: number
    trophy: number
}
export class OpenRivalBox {
    boxType: BoxType
    version: string
    seleted: number

}
export class RivalBoxDataArray {

    data: RivalBoxInfo
    kind: number
}

export class RivalBoxInfo {
    amount: number
    kind: number
    decimal: number
    type: number
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
    static async AdminSendInventory(request: APIRequestContext, body: AdminSendInventoryReq, token: string): Promise<RivalResp<InventoryItem[]>> {
        return MyHttp.POST<APIResp<InventoryItem[]>>(`${thetanRivalsUrl}/inventory/admin/send`, request, body, token)

    }

    static async Evolve(request: APIRequestContext, body: EvolveSkin, token: string): Promise<Response<APIResp<UserMinion>>> {
        return MyHttp.POST<APIResp<UserMinion>>(`${thetanRivalsUrl}/minion/evolve`, request, body, token)
    }

    static async AdminSendMinion(request: APIRequestContext, boby: SendMinionReq, token: string): Promise<Response<APIResp<UserMinion>>> {
        return MyHttp.POST<APIResp<UserMinion>>(`https://thetan-rivals-service-preview-pr-232.staging.thetanarena.com/api/v1/season-pass/admin/simulate`, request, boby, token)
    }

    static async AddRivalBox(request: APIRequestContext, body: AddRivalBoxReq, token: string): Promise<Response<APIResp<any>>> {
        return MyHttp.POST(`${thetanRivalsUrl}/rivals-box/addbox`, request, body, token)

    }
}