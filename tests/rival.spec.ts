import { test, expect, chromium, BrowserContext, request } from '@playwright/test';

import MaketPlace, { DataResponse, Response } from '../src/arena-helper/MarketPlaceHelper';
import Rival, { APIResp, InventoryResponse, EvolveSkin, AdminSendInventoryReq, SendMinionReq, InventoryItem, Inventory, UserMinion ,MinionResponse} from '../src/arena-helper/RivalHelper';
import MyHttp from '../src/helper/HttpUtil';

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// var stgRivalsUrl = 'https://data-rivals.staging.thetanarena.com/api/v1'

var address = "0x3cc80663077111fcfe1f9ae36ebdaf5a99bfefcf"
var adminEmail = "trinhntl@wolffungame.com"
var userEmail = "trinhntl+stgmeta01@wolffungame.com"
var userId = '62cbdf00f88e1482debba671'
var tokenAdmin = ""
var tokenUser = "" //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKV1RfQVBJUyIsImNhbl9taW50IjpmYWxzZSwiZXhwIjoxNjY3MDU1MTgxLCJpc3MiOiJodHRwczovL2FwaS5tYXJrZXRwbGFjZS5hcHAiLCJuYmYiOjE2NjY0NTAzODEsInJvbGUiOjAsInNpZCI6IjB4M2NjODA2NjMwNzcxMTFmY2ZlMWY5YWUzNmViZGFmNWE5OWJmZWZjZiIsInN1YiI6InQtcmluZy1zdGciLCJ1c2VyX2lkIjoiNjJjYmRjOGVmODhlMTQ4MmRlYmJhNjZiIn0.wWqTYNjNnuJRkVitLf40w_RRkj8sbqU1D4TklXCVcPk"
var minionId = ""

test.beforeAll(async ({ request }) => {
    // ---------- goi api lay access token Admin
    const responseAdmin = await request.post(`https://auth.staging.thetanarena.com/auth/v1/loginByEmail`, {
        data: {
            "email": `${adminEmail}`
        }
    })
    const data = await responseAdmin.json()
    // console.log("-------response here---", data);

    let x: Response = await responseAdmin.json()
    tokenAdmin = await x.data.accessToken
    console.log(tokenAdmin)

    console.log("----ACCESS TOKEN ADMIN----", tokenAdmin.substring(tokenAdmin.length - 10, tokenAdmin.length))

    const responseUser = await request.post(`https://auth.staging.thetanarena.com/auth/v1/loginByEmail`, {
        data: {
            "email": `${userEmail}`
        }
    })
    let y: Response = await responseUser.json()
    tokenUser = await y.data.accessToken
    console.log(tokenUser)
    console.log("-----ACCESS TOKEN USER----", tokenUser.substring(tokenUser.length - 10, tokenUser.length))

})


test('--------  GET INVENTORY API ------', async ({ request }) => {
    console.log("Send API :")
    // await delay(2000)
    const response = await request.get(`https://data-rivals.staging.thetanarena.com/api/v1/inventory`, {
        headers: {
            'Authorization': `Bearer ${tokenUser}`,
        }
    })
    const data = await response.json()
    console.log("-------response code here---: ", data);
});

test('--------EVOLVE SKIN - GET INVENTORY-----', async ({ request }) => {
    let response = await MyHttp.GET<InventoryItem[]>(`https://data.staging.thetanarena.com/theta/v1/inventory`, request, {}, tokenUser)

    console.log("response Body full-----", response.bodyJson)

    console.log("---User ID -------", response.body)
    console.log("----inventories-------", response.data?.inventories)
    console.log("check enhancer ammount---", response.data?.inventories["1_25"])
    // console.log("ID ------", response.data?.invetories)
    // console.log("33333", response.data?.data?.inventories.inventories)
    //console.log("1111", tokenUser)
    return

});
test.only('--- GET MY MINION---', async ({ request }) => {
    let response = await MyHttp.GET<MinionResponse>(`https://data-rivals.staging.thetanarena.com/api/v1/minion`, request, {}, tokenUser)
    console.log('MY MINIONS LIST', response.bodyJson?.data)
    // console.log('LEVEL----', response.bodyJson?.minions[0].level)
    // console.log("lelvel---", response.bodyJson?.level)
    // // response.data?.minions[0]
    // console.log('Minion 0 ', response.data?.minions[0])
    // response.data?.minions[0].addInds.backBling
    // console.log('AddInds---', response.data?.minions[0]?.addInds[0].backBling)

});

test('----ADMIN SEND COSMETIC-----', async ({ request }) => {
    let body: SendInventoryReq = {

        userId: "632969daa7600c7fc408f597",
        inventories: [
            {
                kind: 4,
                type: 16000001,
                amount: 123
            }
        ]

    }
    let response = await Rival.AdminSendInventory<Response>(request, body, tokenAdmin)
    console.log("response---", response.data)

})
test('---USER EVOLVE----', async ({ request }) => {

    let boby: EvolveSkin = {
        minionId: '6329758077c0012bc1a2d5de',
        cosmeticId: 16000001
    }
    let reponse = await Rival.PostEvolve<Response>(request, boby, tokenUser)
    console.log("2222", reponse.data?.success)
})

//=============FULL FLOW EVOLVE SKIN =======
var rivalUrl = 'https://data-rivals.staging.thetanarena.com/api/v1'

function evolveMinionToLevel(userId: string, minion: Minion, level: Number) {
    // for i := minion.level; i < level; i++ ------ 
    // get item type evolve minion len level <i>
    // send item type do cho userId
    // evolve <minionId> bang itemType mới gửi cho user
    // minion = get minion kiểm tra lại level
    // -----------
}

// let level2 = [160001, 160002, 160003]
// let level3 = [160001, 160002, 160003]
// let userID = 'u1'
// for i =0,  level1[i]
// send minion level1- u1
// get inventory lấy ra để check enhancer + minionId có level 1
// evolve minion to level2
test('---thử thôi nha, ko biết được ko---', async ({ request }) => {
    let level2Name = "backBling"
    let level2 = [16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014, 16000015, 16000021, 16000022, 16000023, 16000007, 16000008, 16000009, 16000010, 16000016, 16000017, 16000024, 16000025, 16000026, 16000027, 16000028, 16000012, 16000013, 16000018, 16000019, 16000020, 16000029, 16000030, 16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014]
    let level3 = [15000001, 15000002, 15000003, 15000004, 15000005, 15000006, 15000007, 15000008, 15000020, 15000021, 15000022, 15000023, 15000024, 15000025, 15000028, 15000031, 15000032, 15000009, 15000010, 15000011, 15000012, 15000013, 15000026, 15000027, 15000029, 15000033, 15000034, 15000035, 15000014, 15000015, 15000016, 15000017, 15000018, 15000019, 15000030, 15000036]
    let level4 = [13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008]
    let level5 = [12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019, 12000020, 12000007, 12000012, 12000013, 12000014, 12000021, 12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019]
    let level6 = [10000001, 10000002, 10000004, 10000005, 10000008, 10000009, 10000015, 10000018, 10000019, 10000024, 10000025, 10000026, 10000003, 10000006, 10000010, 10000011, 10000016, 10000020, 10000021, 10000022, 10000027, 10000028, 10000029, 10000007, 10000012, 10000013, 10000014, 10000017, 10000023, 10000030, 10000001, 10000002, 10000004, 10000005, 10000008, 10000009]

    let userID = '62cbdf00f88e1482debba671'

    let sourceLevel = 1

    for (let i = 0; i < level2.length; i++) {
        // 1. send minion level 1 cho user <userId>
        let body: SendMinionReq = {
            userId: `${userId}`,
            addSeasonPoints: 0,
            addExp: 0,
            addRivalBucks: 0,
            addMinion: 0
        }
        let responseSendMinion = await Rival.AdminSendMinion<UserMinion>(request, body, tokenAdmin)
        expect(responseSendMinion.error, responseSendMinion.error).not.toBeNull()
        let minionId = await responseSendMinion.bodyJson?.data?.id
        console.log("MinionId----", minionId)


        //console.log("--Response sau khi send minion----", responseSendMinion.success, responseSendMinion.code)

        // 2. send cosmetic level2[i] cho user <userId>
        let bodyInventory: AdminSendInventoryReq = {
            userId: `${userId}`,
            inventories: [
                {
                    kind: 4,
                    type: level2[i],
                    amount: 1
                }
            ]
        }
        let responseInventory = await Rival.AdminSendInventory<InventoryItem[]>(request, bodyInventory, tokenAdmin)
        expect(responseSendMinion.error, responseSendMinion.error).not.toBeNull()

        let inventories = responseInventory.bodyJson?.data
        if (inventories == null) {
            expect(inventories, "inventories bi null").not.toBeNull()
            return
        }

        let amount = 0
        inventories.forEach(e => {
            if (e.type != level2[i]) {
                return
            }

            amount = e.amount

        });

        console.log("----So luong Cosmetic level 2[i]--- ", amount)


        // get inventory
        // 3. lưu A = enhancer, B = so luong cosmetic Level 2

        let responseGetInventory = await MyHttp.GET<Inventory>(`https://data-rivals.staging.thetanarena.com/api/v1/inventory`, request, {}, tokenUser)
        if (responseGetInventory.bodyJson?.inventories == null) {
            expect(responseGetInventory.bodyJson?.inventories).not.toBeNull()
            return
        }

        console.log("Response Inventory", responseGetInventory.bodyJson?.inventories)
        let mapInventory = responseGetInventory.bodyJson?.inventories
        let preEnhancer = 0
        let preCosmeticLevel2 = 0
        mapInventory.forEach((value, key) => {
            if (value.type == 25 && value.kind == 1) {
                preEnhancer = value.amount
                console.log("---Amount Enhancer---", preEnhancer)

            }
            if (value.type == level2[i] && value.kind == 4) {
                preCosmeticLevel2 = value.amount
                console.log("----So luong cosmetic level 2: ", preCosmeticLevel2)
            }
        });

        // 4. evolve minion
        let bodyEvolve: EvolveSkin = {
            minionId: `${minionId}`,
            cosmeticId: level2[i]
        }
        let responseEvolveSkin = await Rival.Evolve<UserMinion>(request, bodyEvolve, tokenUser)
        if (responseEvolveSkin.bodyJson?.data == null) {
            expect(responseEvolveSkin.bodyJson?.data).not.toBeNull()
            return
        }
        console.log(responseEvolveSkin.bodyJson?.data?.level)

        // get minion

        //      5. kiểm tra đã đặt đúng level2[i] vào trong minion

        // Dinh nghia  a = string[] { "backBling", "dance", "..." }
        // For toan bo string 
        // ok = false, Kiem tra AddIns[a[i]] == level2[i], ok = true
        // Expect ok == true 
        
        let responseMyMinion = await MyHttp.GET<UserMinion>(`https://data-rivals.staging.thetanarena.com/api/v1/minion`, request, {}, tokenUser)
        if (responseMyMinion.bodyJson?.addIns == null) {
            expect(responseMyMinion.bodyJson?.addIns).not.toBeNull()
            return
        }
        
        let mapAddIns = await responseMyMinion.bodyJson?.addIns
        console.log("responseMyMinion----", responseMyMinion.bodyJson?.addIns)

        let addInsArray = ["backBling", "dance", "flyCraft", "footprint", "glow", "spray", "voice"]
        let checkLevel = false
        mapAddIns?.forEach((value, key) => {
            if (value == level2[i]) {
                checkLevel = true
                console.log('da dat level vao minion', mapAddIns?.set(key, value))
                expect(checkLevel==true).toBeTruthy()

            }
        }

        )

     
        // get inventory 
        //  6. kiểm tra số lượng cosmetic level[i] = B - 1

        responseGetInventory = await MyHttp.GET<Inventory>(`https://data-rivals.staging.thetanarena.com/api/v1/inventory`, request, {}, tokenUser)
        if (responseGetInventory.bodyJson?.inventories == null) {
            expect(responseGetInventory.bodyJson?.inventories).not.toBeNull()
            return
        }

        console.log("Response Inventory", responseGetInventory.bodyJson?.inventories)
        mapInventory = responseGetInventory.bodyJson?.inventories
        let postEnhancer = 0
        let postCosmeticLevel2 = 0
        mapInventory.forEach((value, key) => {
            if (value.type == 25 && value.kind == 1) {
                postEnhancer = value.amount
                console.log("---Amount Enhancer sau khi evolve---", postEnhancer)

            }
            if (value.type == level2[i] && value.kind == 4) {
                postCosmeticLevel2 = value.amount
                console.log("----So luong cosmetic level 2 sau khi evolve: ", postCosmeticLevel2)
            }
        });
        //      6. kiểm tra số lượng cosmetic level[i] = B - 1
        expect(preCosmeticLevel2 == postCosmeticLevel2 + 1).toBeTruthy()

        // 7. kiểm tra số lượng enhancer < A
        expect(postEnhancer > preEnhancer).toBeTruthy()


    }


    return
    // let body: SendMinionReq = {
    //     userId: `${userId}`,
    //     addSeasonPoints: 0,
    //     addExp: 0,
    //     addRivalBucks: 0,
    //     addMinion: 0
    // }
    // // let responseSendMinion = await Rival.AdminSendMinion(request, body, tokenAdmin)
    // // console.log("--Response sau khi send minion----", responseSendMinion.success, responseSendMinion.code)

    // // 2. get minionId có level 1

    // let responseGetMinion = await MaketPlace.GET<Response>(`https://data-rivals.staging.thetanarena.com/api/v1/minion`, request, {}, tokenUser)
    // console.log("----Response My minion-----", responseGetMinion.data)
    // console.log("----Response My minion array-----", responseGetMinion.data?.minions)
    // console.log("--------get ID minion ---------", responseGetMinion.data?.minions[1].id)
    // console.log("--------get LEVEL minion ---------", responseGetMinion.data?.minions[1].level)


    // let totalMinion = responseGetMinion.data?.minions
    // if (totalMinion == undefined) {
    //     expect(totalMinion).not.toEqual(undefined)
    //     return
    // }


    // console.log("- total length", totalMinion.length)

    // responseGetMinion.data?.minions.length
    // let minionId = ''
    // let level = 1
    // let daTimDuocMinion = false
    // // let levelMinion = responseGetMinion.data?.minions
    // for (let t = 0; t < totalMinion.length; t++) {
    //     let minionLevel = responseGetMinion.data?.minions[t].level
    //     if (minionLevel != level) {
    //         continue
    //     }
    //     daTimDuocMinion = true
    //     minionId = responseGetMinion.data?.minions[t].id
    //     break
    // }

    // // 3. get inventory user để check current enhancer + cosmeticId

    // let responseInventory = await MaketPlace.GET<Response>(`https://data-rivals.staging.thetanarena.com/api/v1/inventory`, request, {}, tokenUser)
    // console.log('response Inventory full ----', responseInventory.data)
    // console.log('Check currrent Enhancer', responseInventory.data?.inventories['1_25'])

    // // 4. send cosmeticID cho user 

    // // 5. evolve minion từng level 2->6 cho minionId đã get bằng vòng for
    // // sau mỗi lần evolve thì get lại inventory để check enhancer + minionID level + addIns

    // let minionId8 = 'm1'
    // for (let i = 0; i < level2.length; i++) {
    //     const cosmeticLevel2 = level2[i]

    //     //evolve minion to level 2

    //     let boby: EvolveSkin = {
    //         minionId: `${minionId}`,
    //         cosmeticId: cosmeticLevel2
    //     }
    //     let reponseEvolve = await Rival.PostEvolve<Response>(request, boby, tokenUser)
    //     console.log("reponseEvolve----", reponseEvolve.data?.success)

    //     // get inventory check enhancer amount at level 2 
    //     let responseInventory = await MaketPlace.GET<Response>(`https://data-rivals.staging.thetanarena.com/api/v1/inventory`, request, {}, tokenUser)
    //     console.log('Check currrent Enhancer after evolve level 2', responseInventory.data?.inventories['1_25'])

    //     // check  minionId level from get minion
    //     let responseGetMinion = await MaketPlace.GET<Response>(`https://data-rivals.staging.thetanarena.com/api/v1/minion`, request, {}, tokenUser)


    //     // // get level minion => expected level 2
    //     // let responseGetMinion = await MaketPlace.GET<Response>(`https://data-rivals.staging.thetanarena.com/api/v1/minion`, request, {}, tokenUser)
    //     // console.log("--------get Level minion ---------", responseGetMinion.data?.minions[t].level)

    //     //evolve minion to level 3

    //     for (let j = 0; j < level3.length; j++) {
    //         const cosmeticLevel3 = level3[j];
    //         // get inventory check enhancer amount + minionId level

    //     }


    // }


})

test('--EVOLVE SKIN---', async ({ request }) => {
    // level 1 thì x = 2 (x là level muốn minion lên)
    // 1. đếm số lượng itemType có thể evolve minion lên level x: 160001, 160002, 160003 là 3 
    // 2. lấy minion của user A và có level bằng x
    // 3. nếu số lượng minion không đủ (< itemType), thì send minions level 1 cho user 
    // 4. evolve minion đó lên level x 
    // 5. for các item type để evolve từng minion
    //      - evolve minion
    //      - get minion để xem đã evolve chưa (level tăng, cosmetic đã vào slot evolve)
    //      - get inventory để check enhancer + đã mất item evolved chưa 


    // 2. get inventory of user
    // let inventoryResponse = await MaketPlace.GET<Response>(`${rivalUrl}/inventory`, request, {}, tokenUser)
    // console.log("---inventoryResponse----", inventoryResponse.data?.inventories)

    // // 2. get minion
    // let MinionResponse = await MaketPlace.GET<Response>(`${rivalUrl}/minion`, request, {}, tokenUser)
    // console.log("----MinionResponse----", MinionResponse.data?.minions)

    // // 3. admin send cosmetic
    // let bodySendCosmetic: SendInventoryReq = {
    //     userId: `${userId}`,
    //     inventories: [    // hỏi Phương
    //         {
    //             kind: 4,
    //             type: 15000001,
    //             amount: 123
    //         },
    //         {
    //             kind: 1,
    //             type: 25,
    //             amount: 234000
    //         }
    //     ]

    // }
    // let cosmeticResponse = await Rival.AdminSendInventory<Response>(request, bodySendCosmetic, tokenAdmin)
    // console.log("----cosmeticResponse----", cosmeticResponse.data)

    // // 4. post evolve   // hỏi Phương
    // let bodyPostedEvolve: EvolveSkin = {

    //     minionId: '6329758077c0012bc1a2d5de',
    //     cosmeticId: 16000001
    // }
    // let postedEvolveResponse = await Rival.PostEvolve<Response>(request, bodyPostedEvolve, tokenUser)
    // console.log("----postedEvolveResponse-----", postedEvolveResponse.data)
})