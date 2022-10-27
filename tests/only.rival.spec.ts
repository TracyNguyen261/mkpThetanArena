import { test, expect, chromium, BrowserContext, request } from '@playwright/test';

import MaketPlace, { APIResp, DataResponse, Response } from '../src/arena-helper/MarketPlaceHelper';
import Rival, { EvolveSkin, InventoryData, Minion, SendInventoryReq, SendMinionReq, MinonArray } from '../src/arena-helper/RivalHelper';

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

    let response = await MaketPlace.GET<Response>(`https://data.staging.thetanarena.com/theta/v1/inventory`, request, {}, tokenUser)

    console.log("response Body full-----", response.data)
    response.data?.id

    console.log("---User ID -------", response.data?.id)
    console.log("----inventories-------", response.data?.inventories)
    console.log("check enhancer ammount---", response.data?.inventories["1_25"])
    // console.log("ID ------", response.data?.invetories)
    // console.log("33333", response.data?.data?.inventories.inventories)
    //console.log("1111", tokenUser)
    return

});
test('--- GET MY MINION---', async ({ request }) => {
    let response = await MaketPlace.GET<Response>(`https://data.staging.thetanarena.com/theta/v1/minion`, request, {}, tokenUser)
    console.log('MY MINIONS LIST', response.data)
    console.log('LEVEL----', response.data?.minions[0].level)
    // response.data?.minions[0]
    console.log('Minion 0 ', response.data?.minions[0])
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
test('---USER POST EVOLVE----', async ({ request }) => {

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
test.only('---thử thôi nha, ko biết được ko---', async ({ request }) => {
    let level2 = [16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014, 16000015, 16000021, 16000022, 16000023, 16000007, 16000008, 16000009, 16000010, 16000016, 16000017, 16000024, 16000025, 16000026, 16000027, 16000028, 16000012, 16000013, 16000018, 16000019, 16000020, 16000029, 16000030, 16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014]
    let level3 = [15000001, 15000002, 15000003, 15000004, 15000005, 15000006, 15000007, 15000008, 15000020, 15000021, 15000022, 15000023, 15000024, 15000025, 15000028, 15000031, 15000032, 15000009, 15000010, 15000011, 15000012, 15000013, 15000026, 15000027, 15000029, 15000033, 15000034, 15000035, 15000014, 15000015, 15000016, 15000017, 15000018, 15000019, 15000030, 15000036]
    let level4 = [13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008]
    let level5 = [12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019, 12000020, 12000007, 12000012, 12000013, 12000014, 12000021, 12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019]
    let level6 = [10000001, 10000002, 10000004, 10000005, 10000008, 10000009, 10000015, 10000018, 10000019, 10000024, 10000025, 10000026, 10000003, 10000006, 10000010, 10000011, 10000016, 10000020, 10000021, 10000022, 10000027, 10000028, 10000029, 10000007, 10000012, 10000013, 10000014, 10000017, 10000023, 10000030, 10000001, 10000002, 10000004, 10000005, 10000008, 10000009]

    let userID = '62cbdf00f88e1482debba671'
    // send minion level1 cho user u1
    let body: SendMinionReq = {
        useId: `${userId}`,
        addSeasonPoints: 0,
        addExp: 0,
        addRivalBucks: 0,
        addMinion: 0
    }
    // let responseSendMinion = await Rival.AdminSendMinion(request, body, tokenAdmin)
    // console.log("--Response sau khi send minion----", responseSendMinion.success, responseSendMinion.code)
    
// get minionId có level 1
    let responseGetMinion = await MaketPlace.GET<Response>(`https://data-rivals.staging.thetanarena.com/api/v1/minion`, request, {}, tokenUser)
    console.log("----Response My minion-----", responseGetMinion.data)
    console.log("----Response My minion array-----", responseGetMinion.data?.minions)
    console.log("--------get ID minion ---------", responseGetMinion.data?.minions[1].id)
    console.log("--------get LEVEL minion ---------", responseGetMinion.data?.minions[1].level)

   
    let totalMinion = responseGetMinion.data?.minions
   let a =  totalMinion?.minions[length]
    console.log("totallllll", a)
          
    // responseGetMinion.data?.minions.length
    // let minionId = ''
    // let level = 1
    // let daTimDuocMinion = false
    // // let levelMinion = responseGetMinion.data?.minions
    // for (let t = 0; t < responseGetMinion.data?.minions[length]; t++) {
    //     let minionLevel = responseGetMinion.data?.minions[t].level
    //     if(minionLevel != level) {
    //         continue
    //     }
    //     daTimDuocMinion = true
    //     break
    // }


/*
    
    let minionId = 'm1'
    for (let i = 0; i < level2.length; i++) {
        const a = level2[i]
        //evolve minion to level 2
        // get inventory check enhancer amount + minionId level
        for (let j = 0; j < level3.length; j++) {
            const element = level3[j];
            //evolve minion to level 2
            // get inventory check enhancer amount + minionId level

        }

    }

    */
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