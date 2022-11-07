import { test, expect, chromium, BrowserContext, request } from '@playwright/test';

import MaketPlace, { DataResponse, Response } from '../src/arena-helper/MarketPlaceHelper';
import Rival, { APIResp, InventoryResponse, EvolveSkin, MinionPagingResp, AdminSendInventoryReq, SendMinionReq, InventoryItem, Inventory, UserMinion, UserMinionsPaging } from '../src/arena-helper/RivalHelper';
import MyHttp from '../src/helper/HttpUtil';
import log4js from "log4js";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// var stgRivalsUrl = 'https://data-rivals.staging.thetanarena.com/api/v1'

var address = "0x3cc80663077111fcfe1f9ae36ebdaf5a99bfefcf"
var adminEmail = "trinhntl@wolffungame.com"
// var userEmail = "trinhntl+stgmeta01@wolffungame.com"
// var userId = '62cbdf00f88e1482debba671'
var userEmail = "trangnh+evolve7@wolffungame.com"
var userId = '6364fa3e0a7a598c66d250ce'
var tokenAdmin = ""
var tokenUser = "" //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKV1RfQVBJUyIsImNhbl9taW50IjpmYWxzZSwiZXhwIjoxNjY3MDU1MTgxLCJpc3MiOiJodHRwczovL2FwaS5tYXJrZXRwbGFjZS5hcHAiLCJuYmYiOjE2NjY0NTAzODEsInJvbGUiOjAsInNpZCI6IjB4M2NjODA2NjMwNzcxMTFmY2ZlMWY5YWUzNmViZGFmNWE5OWJmZWZjZiIsInN1YiI6InQtcmluZy1zdGciLCJ1c2VyX2lkIjoiNjJjYmRjOGVmODhlMTQ4MmRlYmJhNjZiIn0.wWqTYNjNnuJRkVitLf40w_RRkj8sbqU1D4TklXCVcPk"
var minionId = ""
var urlInventory = 'https://data-rivals.staging.thetanarena.com/api/v1/inventory'
var urlMinion = 'https://data-rivals.staging.thetanarena.com/api/v1/minion'

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
    const response = await request.get(`${urlInventory}`, {
        headers: {
            'Authorization': `Bearer ${tokenUser}`,
        }
    })
    const data = await response.json()
    console.log("-------response code here---: ", data);
});

test('------- GET INVENTORY-----', async ({ request }) => {
    let response = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
    if (response.bodyJson?.data?.inventories == null) {
        expect(response.bodyJson?.data?.inventories).not.toBeFalsy()
        return
    }

    console.log("sss", response.bodyJson?.data?.inventories)


    // let responseGetInventory = await MyHttp.GET<Inventory>(`${urlInventory}`, request, {}, tokenUser)
    // if (responseGetInventory.bodyJson?.inventories == null) {
    //     expect(responseGetInventory.bodyJson?.inventories).not.toBeFalsy()
    //     return
    // }


});
test('--- GET MY MINION---', async ({ request }) => {
    // let response = await MyHttp.GET<MinionResponse>(`${urlMinion}`, request, {}, tokenUser)
    // console.log('MY MINIONS LIST', response.bodyJson?.data)
    // console.log('LEVEL----', response.bodyJson?.minions[0].level)
    // console.log("lelvel---", response.bodyJson?.level)
    // // response.data?.minions[0]
    // console.log('Minion 0 ', response.data?.minions[0])
    // response.data?.minions[0].addInds.backBling
    // console.log('AddInds---', response.data?.minions[0]?.addInds[0].backBling)

});

test('----ADMIN SEND COSMETIC-----', async ({ request }) => {
    // let body: SendInventoryReq = {

    //     userId: "632969daa7600c7fc408f597",
    //     inventories: [
    //         {
    //             kind: 4,
    //             type: 16000001,
    //             amount: 123
    //         }
    //     ]

    // }
    // let response = await Rival.AdminSendInventory<Response>(request, body, tokenAdmin)
    // console.log("response---", response.data)
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

// function evolveMinionToLevel(userId: string, minion: Minion, level: Number) {
//     // for i := minion.level; i < level; i++ ------ 
//     // get item type evolve minion len level <i>
//     // send item type do cho userId
//     // evolve <minionId> bang itemType mới gửi cho user
//     // minion = get minion kiểm tra lại level
//     // -----------
// }


// hàm: evolve(minion, cosmeticId) 
// trả về: minion với level mới 

test('---Evolve skin +function ---', async ({ request }) => {
    let level2 = [16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014, 16000015, 16000021, 16000022, 16000023, 16000007, 16000008, 16000009, 16000010, 16000016, 16000017, 16000024, 16000025, 16000026, 16000027, 16000028, 16000012, 16000013, 16000018, 16000019, 16000020, 16000029, 16000030, 16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014]
    let level3 = [15000001, 15000002, 15000003, 15000004, 15000005, 15000006, 15000007, 15000008, 15000020, 15000021, 15000022, 15000023, 15000024, 15000025, 15000028, 15000031, 15000032, 15000009, 15000010, 15000011, 15000012, 15000013, 15000026, 15000027, 15000029, 15000033, 15000034, 15000035, 15000014, 15000015, 15000016, 15000017, 15000018, 15000019, 15000030, 15000036]
    let level4 = [13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008]
    let level5 = [12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019, 12000020, 12000007, 12000012, 12000013, 12000014, 12000021, 12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019]
    let level6 = [10000001, 10000002, 10000004, 10000005, 10000008, 10000009, 10000015, 10000018, 10000019, 10000024, 10000025, 10000026, 10000003, 10000006, 10000010, 10000011, 10000016, 10000020, 10000021, 10000022, 10000027, 10000028, 10000029, 10000007, 10000012, 10000013, 10000014, 10000017, 10000023, 10000030, 10000001, 10000002, 10000004, 10000005, 10000008, 10000009]

    let userID = '62cbdf00f88e1482debba671'

    let sourceLevel = 1

    for (let i = 0; i < level2.length; i++) {
        // send 1 minion level 1
        // evolve(minionId, level2[i])
        // evolve(minionId, level3[i])
        // evolve(minionId, level4[i])
        // evolve(minionId, level5[i])
        // evolve(minionId, level6[i])


        console.log("- Test:", level2[i])
        // 1. send minion level 1 cho user <userId>


        // 1. send minion level 1 cho user <userId>
        let body: SendMinionReq = {
            userId: `${userId}`,
            addSeasonPoints: 0,
            addExp: 0,
            addRivalBucks: 0,
            addMinion: 0
        }
        let responseSendMinion = await Rival.AdminSendMinion(request, body, tokenAdmin)
        expect(responseSendMinion.error, responseSendMinion.error).toBeFalsy()
        let minionId = await responseSendMinion.bodyJson?.data?.id
        console.log("---------- 1. MinionId: --------", minionId)
        //console.log("--Response sau khi send minion----", responseSendMinion.success, responseSendMinion.code)


        async function EvolveMinion(minionId: string, level: number): Promise<void> {
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
            let responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)
            expect(responseSendMinion.error, responseInventory.body).toBeFalsy()

            let inventories = responseInventory.bodyJson?.data
            if (inventories == null) {
                expect(inventories, responseInventory.body).not.toBeFalsy()
                return
            }

            let amount = 0
            inventories.forEach(e => {
                if (e.type != level2[i]) {
                    return
                }

                amount = e.amount

            });
            console.log("---------- 2. CosmeticId level 2:-----", level2[i])
            console.log("---------- 3. So luong CosmeticId - level 2[i]:----- ", amount)


            // get inventory
            // 3. lưu A = enhancer, B = so luong cosmetic Level 2

            let responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
            if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                return
            }

            let mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data.inventories))
            let preEnhancer = 0
            let preCosmeticLevel2 = 0
            mapInventory.forEach((value) => {
                if (value.type == 25 && value.kind == 1) {
                    preEnhancer = value.amount

                }
                if (value.type == level2[i] && value.kind == 4) {
                    preCosmeticLevel2 = value.amount
                }
            });
            console.log("---------- 4. Amount Enhancer truoc khi Evolve to next level:-----", preEnhancer)
            console.log("---------- 5. So luong cosmetic level 2 truoc khi Evolve Skin:----- ", preCosmeticLevel2)

            // 4. evolve minion
            let bodyEvolve: EvolveSkin = {
                minionId: `${minionId}`,
                cosmeticId: level2[i]
            }
            let responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)
            expect(responseEvolveSkin.bodyJson?.success).toBeTruthy()

            // get minion
            let responseMyMinion = await MyHttp.GET<APIResp<UserMinionsPaging>>(`${urlMinion}`, request, {}, tokenUser)
            if (responseMyMinion.bodyJson?.data?.minions == null) {
                expect(responseMyMinion.bodyJson?.data?.minions, responseMyMinion.body).not.toBeFalsy()
                return
            }

            // 5. kiểm tra đã đặt đúng level2[i] vào trong minion
            let selectedAddIns = new Map<String, number>()
            responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
                if (value.id == minionId) {
                    selectedAddIns = new Map(Object.entries(value.addIns))
                }
            });

            expect(selectedAddIns.size).toBeGreaterThan(0)

            let daDatVaoTrongEvolveSlots = false
            selectedAddIns.forEach((value) => {
                if (value == level2[i]) {
                    daDatVaoTrongEvolveSlots = true
                }
            })

            expect(daDatVaoTrongEvolveSlots).toBeTruthy()



            // get inventory 
            //  6. kiểm tra số lượng cosmetic level[i] = B - 1

            responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
            if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                return
            }

            console.log("Response Inventory", responseGetInventory.bodyJson?.data?.inventories)
            mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data.inventories))
            let postEnhancer = 0
            let postCosmeticLevel2 = 0
            mapInventory.forEach((value) => {
                if (value.type == 25 && value.kind == 1) {
                    postEnhancer = value.amount

                }
                if (value.type == level2[i] && value.kind == 4) {
                    postCosmeticLevel2 = value.amount

                }
            });

            console.log("---------- 6. Amount Enhancer sau khi evolve skin: ---", postEnhancer)
            console.log("---------- 7. So luong cosmetic level 2 sau khi evolve:---- ", postCosmeticLevel2)

            // 6. kiểm tra số lượng cosmetic level[i] = B - 1
            expect(preCosmeticLevel2 == postCosmeticLevel2 + Math.pow(10, 8), `preCosmeticLevel2 = ${preCosmeticLevel2}, postCosmeticLevel2 = ${postCosmeticLevel2}`).toBeTruthy()

            // 7. kiểm tra số lượng enhancer < A
            expect(postEnhancer < preEnhancer, `postEnhancer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy()

        }
        return
    }

})

test.only('--- LOOP EVOLVE SKIN ---', async ({ request }) => {
    log4js.configure({
        appenders: {
            application: {
                type: "console",
            },

            file: {
                type: "file",
                filename: "./logs/application.log",
                compression: true,
                maxLogSize: 10485760,
                backups: 100,
            }
        },

        categories: {
            default: {
                appenders: [
                    "application",
                    "file"
                ],
                level: "info"
            }
        }
    });

    const logger = log4js.getLogger();
    // logger.info("Some debug messages");
    // return

    let level2 = [16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014, 16000015, 16000021, 16000022, 16000023, 16000007, 16000008, 16000009, 16000010, 16000016, 16000017, 16000024, 16000025, 16000026, 16000027, 16000028, 16000012, 16000013, 16000018, 16000019, 16000020, 16000029, 16000030, 16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014]
    let level3 = [15000001, 15000002, 15000003, 15000004, 15000005, 15000006, 15000007, 15000008, 15000020, 15000021, 15000022, 15000023, 15000024, 15000025, 15000028, 15000031, 15000032, 15000009, 15000010, 15000011, 15000012, 15000013, 15000026, 15000027, 15000029, 15000033, 15000034, 15000035, 15000014, 15000015, 15000016, 15000017, 15000018, 15000019, 15000030, 15000036]
    let level4 = [13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008]
    let level5 = [12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019, 12000020, 12000007, 12000012, 12000013, 12000014, 12000021, 12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019]
    let level6 = [10000001, 10000002, 10000004, 10000005, 10000008, 10000009, 10000015, 10000018, 10000019, 10000024, 10000025, 10000026, 10000003, 10000006, 10000010, 10000011, 10000016, 10000020, 10000021, 10000022, 10000027, 10000028, 10000029, 10000007, 10000012, 10000013, 10000014, 10000017, 10000023, 10000030, 10000001, 10000002, 10000004, 10000005, 10000008, 10000009]

    for (let i = 0; i < level2.length; i++) {

    
        //========= 1.  send minion level 1 cho user <userId>
        let body: SendMinionReq = {
            userId: `${userId}`,
            addSeasonPoints: 0,
            addExp: 0,
            addRivalBucks: 0,
            addMinion: 0
        }
        let responseSendMinion = await Rival.AdminSendMinion(request, body, tokenAdmin)
        expect(responseSendMinion.error, responseSendMinion.error).toBeFalsy()
        let minionId = await responseSendMinion.bodyJson?.data?.id
        logger.info("---------- 1. MINION_ID: --------", minionId)

        let evolveSuccess = false
        logger.info("----- TEST LEVEL 2: --------", level2[i])

        //========= 2. send cosmetic level2[i] cho user <userId>

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
        let responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)
        expect(responseInventory.error, responseInventory.body).toBeFalsy()

        let inventories = responseInventory.bodyJson?.data
        if (inventories == null) {
            expect(inventories, responseInventory.body).not.toBeFalsy()
            return
        }

        let amount = 0
        inventories.forEach(e => {
            if (e.type != level2[i]) {
                return
            }

            amount = e.amount

        });
        logger.info("---------- 1.2. CosmeticId level 2: --------", level2[i])
        logger.info("---------- 1.3. So luong CosmeticId - level 2: --------", amount)

        //========= 3. get inventory
        // 3. lưu A = enhancer, B = so luong cosmetic Level 2

        let responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
        if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
            expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
            return
        }

        let mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data.inventories))
        let preEnhancer = 0
        let preCosmeticLevel2 = 0
        mapInventory.forEach((value) => {
            if (value.type == 25 && value.kind == 1) {
                preEnhancer = value.amount

            }
            if (value.type == level2[i] && value.kind == 4) {
                preCosmeticLevel2 = value.amount
            }
        });
        logger.info("---------- 1.4. Amount Enhancer truoc khi Evolve to level 2: --------", preEnhancer)
        logger.info("---------- 1.5. So luong cosmetic level 2 truoc khi Evolve Skin: --------", preCosmeticLevel2)

        //========= 4. evolve minion
        let bodyEvolve: EvolveSkin = {
            minionId: `${minionId}`,
            cosmeticId: level2[i]
        }
        let responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)
        expect(responseEvolveSkin.bodyJson?.success).toBeTruthy()

        //========= 5. get minion
        let responseMyMinion = await MyHttp.GET<APIResp<UserMinionsPaging>>(`${urlMinion}`, request, {}, tokenUser)
        if (responseMyMinion.bodyJson?.data?.minions == null) {
            expect(responseMyMinion.bodyJson?.data?.minions, responseMyMinion.body).not.toBeFalsy()
            return
        }
        //========= 6. kiểm tra đã đặt đúng level2[i] vào trong minion
        let selectedAddIns = new Map<String, number>()
        responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
            if (value.id == minionId) {
                selectedAddIns = new Map(Object.entries(value.addIns))
            }
        });

        expect(selectedAddIns.size).toBeGreaterThan(0)

        let daDatVaoTrongEvolveSlots = false
        selectedAddIns.forEach((value) => {
            if (value == level2[i]) {
                daDatVaoTrongEvolveSlots = true
            }
        })

        expect(daDatVaoTrongEvolveSlots).toBeTruthy()

        //========= 7. get inventory 

        responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
        if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
            expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
            return
        }
        //logger.info("Response Inventory", responseGetInventory.bodyJson?.data?.inventories)
        mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data.inventories))
        let postEnhancer = 0
        let postCosmeticLevel2 = 0
        mapInventory.forEach((value) => {
            if (value.type == 25 && value.kind == 1) {
                postEnhancer = value.amount

            }
            if (value.type == level2[i] && value.kind == 4) {
                postCosmeticLevel2 = value.amount

            }
        });

        logger.info("---------- 1.6. Amount Enhancer sau khi evolve skin level 2: --------", postEnhancer)
        logger.info("---------- 1.7. So luong cosmetic level 2 sau khi evolve: --------", postCosmeticLevel2)

        //========= 8. kiểm tra số lượng cosmetic level[i] = B - 1
        expect(preCosmeticLevel2 == postCosmeticLevel2 + Math.pow(10, 8), `preCosmeticLevel2 = ${preCosmeticLevel2}, postCosmeticLevel2 = ${postCosmeticLevel2}`).toBeTruthy()

        //========= 9. kiểm tra số lượng enhancer < A
        expect(postEnhancer < preEnhancer, `postEnhancer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy()

        /////////////////////////////////// ====== LEVEL 3==========

        {
            logger.info("---------ADD LEVEL 3: --------", level3[i])

            //========= 2. send cosmetic level3[i] cho user <userId>
            let bodyInventory: AdminSendInventoryReq = {
                userId: `${userId}`,
                inventories: [
                    {
                        kind: 4,
                        type: level3[i],
                        amount: 1
                    }
                ]
            }
            let responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)
            expect(responseInventory.error, responseInventory.body).toBeFalsy()

            inventories = responseInventory.bodyJson?.data
            if (inventories == null) {
                expect(inventories, responseInventory.body).not.toBeFalsy()
                return
            }

            let amount = 0
            inventories.forEach(e => {
                if (e.type != level3[i]) {
                    return
                }
                amount = e.amount
            })

            logger.info("---------- 1.2 CosmeticId level 3: --------", level3[i])
            logger.info("---------- 1.3  So luong CosmeticId - level 3: --------", amount)

            // GET Inventory level 3 

            responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
            if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                return
            }

            mapInventory = new Map(Object.entries(responseGetInventory.bodyJson.data.inventories))
            preEnhancer = 0
            let preCosmeticLevel3 = 0
            mapInventory.forEach((value) => {
                if (value.type == 25 && value.kind == 1) {
                    preEnhancer = value.amount
                }
                if (value.type == level3[i] && value.kind == 4) {
                    preCosmeticLevel3 = value.amount
                }
            })
            logger.info("------------------ 1.4 Amount Enhance truoc khi evolve skin level 3: --------", preEnhancer)
            logger.info("-------------------1.5 So luong Cosmetic Level 3 truoc khi evolve skin level 3: --------", preCosmeticLevel3)

            // 4.2 Evolve minion
            let bodyEvolve: EvolveSkin = {
                minionId: `${minionId}`,
                cosmeticId: level3[i]
            }
            responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)

            expect(responseEvolveSkin.bodyJson?.success, responseEvolveSkin.body).toBeTruthy()

            // Get minion

            responseMyMinion = await MyHttp.GET<APIResp<UserMinionsPaging>>(`${urlMinion}`, request, {}, tokenUser)
            if (responseMyMinion.bodyJson?.data?.minions == null) {
                expect(responseMyMinion.bodyJson?.data?.minions, responseMyMinion.body).not.toBeFalsy()
                return
            }

            // 5.2 Kiem tra dat dung level3[i]

            selectedAddIns = new Map<string, number>()
            responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
                if (value.id == minionId) {
                    selectedAddIns = new Map(Object.entries(value.addIns))
                }
            })
            expect(selectedAddIns.size).toBeGreaterThan(0)

            let daDatVaoTrongEvolveSlots = false
            selectedAddIns.forEach((value) => {
                if (value == level3[i]) {
                    daDatVaoTrongEvolveSlots = true
                }
            })
            expect(daDatVaoTrongEvolveSlots).toBeTruthy()

            // GET INVENTORY

            // 6.2 Kieemr tra so luong cosmetic level3 [j] = B-1

            responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
            if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                return
            }
            mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data?.inventories))
            let postEnhancer = 0
            let postCosmeticLevel3 = 0
            mapInventory.forEach((value) => {
                if (value.type == 25 && value.kind == 1) {
                    postEnhancer = value.amount
                }
                if (value.type == level3[i] && value.kind == 4) {
                    postCosmeticLevel3 = value.amount
                }
            })


            logger.info("--------------1.6 Amount Enhancer sau khi Evolve level 3: --------", postEnhancer)
            logger.info("-------------- 1.7  So luong Cosmetic level 3 sau khi Evolve: --------", postCosmeticLevel3)

            // 6.2 Kieem tra so luong cosmetic level 3
            expect(preCosmeticLevel3 == postCosmeticLevel3 + Math.pow(10, 8), `preCosmeticLevel3 = ${preCosmeticLevel3}, postCosmeticLevel3 = ${postCosmeticLevel3}`).toBeTruthy()


            // 7.2 Kiem tra so luong enhancer sau khi evolve level 3
            expect(postEnhancer < preEnhancer, `postEnhanceer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy

            // 6.2.2 kiểm tra số lượng cosmetic level[i] = B - 1
            expect(preCosmeticLevel3 == postCosmeticLevel3 + Math.pow(10, 8), `preCosmeticLevel3 = ${preCosmeticLevel3}, postCosmeticLevel3 = ${postCosmeticLevel3}`).toBeTruthy()

            // 7. 2.2  kiểm tra số lượng enhancer < A
            expect(postEnhancer < preEnhancer, `postEnhancer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy()

            ////============ LEVEL 4 (k)==========

            {
                logger.info("---------TEST ADD LEVEL 4: --------", level4[i])

                //========= 2. send cosmetic level4[i] cho user <userId>

                let bodyInventory: AdminSendInventoryReq = {
                    userId: `${userId}`,
                    inventories: [
                        {
                            kind: 4,
                            type: level4[i],
                            amount: 1
                        }
                    ]
                }
                let responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)
                expect(responseInventory.error, responseInventory.body).toBeFalsy()

                inventories = responseInventory.bodyJson?.data
                if (inventories == null) {
                    expect(inventories, responseInventory.body).not.toBeFalsy()
                    return
                }

                let amount = 0
                inventories.forEach(e => {
                    if (e.type != level4[i]) {
                        return
                    }
                    amount = e.amount
                })

                logger.info("---------- 1.2 CosmeticId level 4: --------", level4[i])
                logger.info("---------- 1.3  So luong CosmeticId - level 4: --------", amount)

                // GET Inventory level 4

                responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
                if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                    expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                    return
                }

                mapInventory = new Map(Object.entries(responseGetInventory.bodyJson.data.inventories))
                preEnhancer = 0
                let preCosmeticLevel4 = 0
                mapInventory.forEach((value) => {
                    if (value.type == 25 && value.kind == 1) {
                        preEnhancer = value.amount
                    }
                    if (value.type == level4[i] && value.kind == 4) {
                        preCosmeticLevel4 = value.amount
                    }
                })
                logger.info("------------------1.4 Amount Enhance truoc khi evolve skin level 4: --------", preEnhancer)
                logger.info("-------------------1.5 So luong Cosmetic Level 4 truoc khi evolve skin level 4: --------", preCosmeticLevel4)

                // 4.2 Evolve minion
                let bodyEvolve: EvolveSkin = {
                    minionId: `${minionId}`,
                    cosmeticId: level4[i]
                }
                responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)

                expect(responseEvolveSkin.bodyJson?.success, responseEvolveSkin.body).toBeTruthy()

                // Get minion

                responseMyMinion = await MyHttp.GET<APIResp<UserMinionsPaging>>(`${urlMinion}`, request, {}, tokenUser)
                if (responseMyMinion.bodyJson?.data?.minions == null) {
                    expect(responseMyMinion.bodyJson?.data?.minions, responseMyMinion.body).not.toBeFalsy()
                    return
                }



                // 5.2 Kiem tra dat dung level4[i]

                selectedAddIns = new Map<string, number>()
                responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
                    if (value.id == minionId) {
                        selectedAddIns = new Map(Object.entries(value.addIns))
                    }
                })
                expect(selectedAddIns.size).toBeGreaterThan(0)

                let daDatVaoTrongEvolveSlots = false
                selectedAddIns.forEach((value) => {
                    if (value == level4[i]) {
                        daDatVaoTrongEvolveSlots = true
                    }
                })
                expect(daDatVaoTrongEvolveSlots).toBeTruthy()

                // GET INVENTORY

                // 6.2 Kieemr tra so luong cosmetic level4[i] = B-1

                responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
                if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                    expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                    return
                }
                mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data?.inventories))
                let postEnhancer = 0
                let postCosmeticLevel4 = 0
                mapInventory.forEach((value) => {
                    if (value.type == 25 && value.kind == 1) {
                        postEnhancer = value.amount
                    }
                    if (value.type == level4[i] && value.kind == 4) {
                        postCosmeticLevel4 = value.amount
                    }
                })


                logger.info("--------------1.6 Amount Enhancer sau khi Evolve: --------", postEnhancer)
                logger.info("--------------1.7 So luong Cosmetic level 4 sau khi Evolve: --------", postCosmeticLevel4)

                // 6.3 Kieem tra so luong cosmetic level 4
                expect(preCosmeticLevel4 == postCosmeticLevel4 + Math.pow(10, 8), `preCosmeticLevel4 = ${preCosmeticLevel4}, postCosmeticLevel4 = ${postCosmeticLevel4}`).toBeTruthy()


                // 7.3 Kiem tra so luong enhancer sau khi evolve level 4
                expect(postEnhancer < preEnhancer, `postEnhanceer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy

                // 6.3.3 kiểm tra số lượng cosmetic level[i] = B - 1
                expect(preCosmeticLevel4 == postCosmeticLevel4 + Math.pow(10, 8), `preCosmeticLevel4 = ${preCosmeticLevel4}, postCosmeticLevel4 = ${postCosmeticLevel4}`).toBeTruthy()

                // 7. 3.2  kiểm tra số lượng enhancer < A
                expect(postEnhancer < preEnhancer, `postEnhancer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy()
                {
                    ////////////============ LEVEL 5 [l]=========

                    logger.info("-------TEST ADD LEVEL 5: --------", level5[i])
                    //========= 2. send cosmetic level4[i] cho user <userId>

                    let bodyInventory: AdminSendInventoryReq = {
                        userId: `${userId}`,
                        inventories: [
                            {
                                kind: 4,
                                type: level5[i],
                                amount: 1
                            }
                        ]


                    }
                    responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)

                    inventories = responseInventory.bodyJson?.data
                    if (inventories == null) {
                        expect(inventories, responseInventory.body).not.toBeFalsy()
                        return
                    }

                    let amount = 0
                    inventories.forEach(e => {
                        if (e.type != level5[i]) {
                            return
                        }
                        amount = e.amount

                    })
                    logger.info("---------- 1.2. CosmeticId level 5: --------", level5[i])
                    logger.info("---------- 1.3. So luong CosmeticId - level 5: --------", amount)

                    //GET INVENTORY

                    responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
                    if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                        expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                        return
                    }

                    mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data?.inventories))
                    preEnhancer = 0
                    let preCosmeticLevel5 = 0
                    mapInventory.forEach((value) => {
                        if (value.type == 25 && value.kind == 1) {
                            preEnhancer = value.amount
                        }
                        if (value.type == level5[i] && value.kind == 4) {
                            preCosmeticLevel5 = value.amount
                        }

                    })
                    logger.info("------------------1.4 Amount Enhance truoc khi evolve skin level 5: --------", preEnhancer)
                    logger.info("-------------------1.5 So luong Cosmetic Level 5 truoc khi evolve skin: --------", preCosmeticLevel5)

                    // EVOVE SKIN LEVEL 5

                    let bodyEvolve: EvolveSkin = {
                        minionId: `${minionId}`,
                        cosmeticId: level5[i]
                    }

                    responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)
                    expect(responseEvolveSkin.bodyJson?.success, responseEvolveSkin.body).toBeTruthy()

                    // GET MINION SAU KHI EVOLVE
                    responseMyMinion = await MyHttp.GET<APIResp<UserMinionsPaging>>(`${urlMinion}`, request, {}, tokenUser)

                    responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
                        if (value.id == minionId) {
                            selectedAddIns = new Map(Object.entries(value.addIns))
                        }
                    })
                    expect(selectedAddIns.size).toBeGreaterThan(0)

                    let daDatVaoTrongEvolveSlots = false
                    selectedAddIns.forEach((value) => {
                        if (value == level5[i]) {
                            daDatVaoTrongEvolveSlots = true
                        }
                    })
                    expect(daDatVaoTrongEvolveSlots).toBeTruthy()

                    // GET INVENTORY
                    responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
                    if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                        expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
                        return
                    }

                    let postEnhancer = 0
                    let postCosmeticLevel5 = 0
                    mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data?.inventories))
                    mapInventory.forEach((value) => {
                        if (value.type == 25 && value.kind == 1) {
                            postEnhancer = value.amount
                        }
                        if (value.type == level5[i] && value.kind == 4) {
                            postCosmeticLevel5 = value.amount
                        }
                    })
                    logger.info("--------------1.6 Amount Enhancer sau khi Evolve skin level 5: --------", postEnhancer)
                    logger.info("-------------- 1.7  So luong Cosmetic level 5 sau khi Evolve: --------", postCosmeticLevel5)

                    expect(postCosmeticLevel5 == preCosmeticLevel5 - Math.pow(10, 8), `postCosmeticLevel 5 = ${postCosmeticLevel5}, preCosmeticLevel5 = ${preCosmeticLevel5}`).toBeTruthy()
                    expect(postEnhancer < preEnhancer, `preEnahncer = ${preEnhancer}, postEnhancer = ${postEnhancer}`).toBeTruthy()


                    ///===============TEST ADD LEVEL 6: --------
                    {
                        logger.info("-------TEST ADD LEVEL 6: --------", level6[i])

                        // admin send cosmetic level 6
                        let bodyInventory: AdminSendInventoryReq = {
                            userId: `${userId}`,
                            inventories: [
                                {
                                    kind: 4,
                                    type: level6[i],
                                    amount: 1

                                }
                            ]


                        }
                        responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)
                        inventories = responseInventory.bodyJson?.data
                        if (inventories == undefined) {
                            expect(inventories).not.toBeFalsy()
                            return
                        }
                        let amount = 0
                        inventories.forEach(e => {
                            if (e.type != level6[i]) {
                                return
                            }
                            amount = e.amount
                        })

                        logger.info("---------- 1.2. CosmeticId level 6: --------", level6[i])
                        logger.info("---------- 1.3. So luong CosmeticId - level 6: --------", amount)

                        // GET INVENTORY LEVEL 6

                        responseGetInventory = await MyHttp.GET(`${urlInventory}`, request, {}, tokenUser)
                        if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                            expect(responseGetInventory.bodyJson?.data?.inventories).toBeTruthy()
                            return
                        }
                        let preEnahncer = 0
                        let preCosmeticLevel6 = 0
                        mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data?.inventories))

                        mapInventory.forEach((value => {
                            if (value.type == 25 && value.kind == 1) {
                                preEnahncer = value.amount
                            }
                            if (value.type == level6[i] && value.kind == 4) {
                                preCosmeticLevel6 = value.amount
                            }
                        }))
                        logger.info("---------- 1.4. Amount Enhancer truoc khi Evolve to next level 6: --------", preEnahncer)
                        logger.info("---------- 1.5. So luong cosmetic level 6 truoc khi Evolve Skin: --------", preCosmeticLevel6)

                        //// EVOLVE LEVEL 6

                        let bodyEvolve: EvolveSkin = {
                            minionId: `${minionId}`,
                            cosmeticId: level6[i]
                        }
                        responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)
                        expect(responseEvolveSkin.bodyJson?.success, responseEvolveSkin.body).toBeTruthy()


                        // GET MINION 
                        responseMyMinion = await MyHttp.GET(`${urlMinion}`, request, {}, tokenUser)
                        responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
                            if (value.id == minionId) {
                                selectedAddIns = new Map(Object.entries(value.addIns))

                            }
                        })
                        expect(selectedAddIns.size).toBeGreaterThan(0)


                        let daDatVaoTrongEvolveSlots = false
                        selectedAddIns.forEach((value) => {
                            if (value == level6[i]) {
                                daDatVaoTrongEvolveSlots = true
                            }

                        })
                        expect(daDatVaoTrongEvolveSlots).toBeTruthy()

                        // GET INVENTORY LEVEL 6
                        responseGetInventory = await MyHttp.GET(`${urlInventory}`, request, {}, tokenUser)
                        if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
                            expect(responseGetInventory.bodyJson?.data?.inventories).not.toBeFalsy()
                            return
                        }

                        let postEnhancer = 0
                        let postCosmeticLevel6 = 0
                        mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data?.inventories))

                        mapInventory.forEach((value) => {
                            if (value.type == 25 && value.kind == 1) {
                                postEnhancer = value.amount
                            }

                            if (value.type == level6[i] && value.kind == 4) {
                                postCosmeticLevel6 = value.amount
                            }
                        })
                        logger.info("--------------1.6 Amount Enhancer sau khi Evolve skin level 6: --------", postEnhancer)
                        logger.info("-------------- 1.7  So luong Cosmetic level 6 sau khi Evolve: --------", postCosmeticLevel6)

                        expect(preCosmeticLevel6 == postCosmeticLevel6 + Math.pow(10, 8), `preCosmenticLevel 6 = ${preCosmeticLevel6}, postCosmenticLevel6 = ${postCosmeticLevel6}`).toBeTruthy()
                        expect(preEnhancer > postEnhancer, `preEnhancer = ${preEnhancer}, postEnhancer = ${postEnhancer}`).toBeTruthy()

                        evolveSuccess = true


                    }


                }

            }


        }
    }



})





test('---EVOLVE SKIN---LEVEL 2----', async ({ request }) => {
    let level2 = [16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014, 16000015, 16000021, 16000022, 16000023, 16000007, 16000008, 16000009, 16000010, 16000016, 16000017, 16000024, 16000025, 16000026, 16000027, 16000028, 16000012, 16000013, 16000018, 16000019, 16000020, 16000029, 16000030, 16000001, 16000002, 16000003, 16000004, 16000005, 16000006, 16000014]
    let level3 = [15000001, 15000002, 15000003, 15000004, 15000005, 15000006, 15000007, 15000008, 15000020, 15000021, 15000022, 15000023, 15000024, 15000025, 15000028, 15000031, 15000032, 15000009, 15000010, 15000011, 15000012, 15000013, 15000026, 15000027, 15000029, 15000033, 15000034, 15000035, 15000014, 15000015, 15000016, 15000017, 15000018, 15000019, 15000030, 15000036]
    let level4 = [13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008, 13000009, 13000010, 13000011, 13000004, 13000007, 13000012, 13000013, 13000014, 13000015, 13000001, 13000002, 13000003, 13000005, 13000006, 13000008]
    let level5 = [12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019, 12000020, 12000007, 12000012, 12000013, 12000014, 12000021, 12000001, 12000002, 12000003, 12000004, 12000008, 12000009, 12000015, 12000016, 12000017, 12000005, 12000006, 12000010, 12000011, 12000018, 12000019]
    let level6 = [10000001, 10000002, 10000004, 10000005, 10000008, 10000009, 10000015, 10000018, 10000019, 10000024, 10000025, 10000026, 10000003, 10000006, 10000010, 10000011, 10000016, 10000020, 10000021, 10000022, 10000027, 10000028, 10000029, 10000007, 10000012, 10000013, 10000014, 10000017, 10000023, 10000030, 10000001, 10000002, 10000004, 10000005, 10000008, 10000009]

    let userID = '62cbdf00f88e1482debba671'

    let sourceLevel = 1

    for (let i = 0; i < level2.length; i++) {
        // send 1 minion level 1
        // evolve(minionId, level2[i])
        // evolve(minionId, level3[i])
        // evolve(minionId, level4[i])
        // evolve(minionId, level5[i])
        // evolve(minionId, level6[i])


        console.log("- Test:", level2[i])
        // 1. send minion level 1 cho user <userId>
        let body: SendMinionReq = {
            userId: `${userId}`,
            addSeasonPoints: 0,
            addExp: 0,
            addRivalBucks: 0,
            addMinion: 0
        }
        let responseSendMinion = await Rival.AdminSendMinion(request, body, tokenAdmin)
        expect(responseSendMinion.error, responseSendMinion.error).toBeFalsy()
        let minionId = await responseSendMinion.bodyJson?.data?.id
        console.log("---------- 1. MinionId: --------", minionId)


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
        let responseInventory = await Rival.AdminSendInventory(request, bodyInventory, tokenAdmin)
        expect(responseSendMinion.error, responseInventory.body).toBeFalsy()

        let inventories = responseInventory.bodyJson?.data
        if (inventories == null) {
            expect(inventories, responseInventory.body).not.toBeFalsy()
            return
        }

        let amount = 0
        inventories.forEach(e => {
            if (e.type != level2[i]) {
                return
            }

            amount = e.amount

        });
        console.log("---------- 2. CosmeticId level 2:-----", level2[i])
        console.log("---------- 3. So luong CosmeticId - level 2[i]:----- ", amount)


        // get inventory
        // 3. lưu A = enhancer, B = so luong cosmetic Level 2

        let responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
        if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
            expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
            return
        }

        let mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data.inventories))
        let preEnhancer = 0
        let preCosmeticLevel2 = 0
        mapInventory.forEach((value) => {
            if (value.type == 25 && value.kind == 1) {
                preEnhancer = value.amount

            }
            if (value.type == level2[i] && value.kind == 4) {
                preCosmeticLevel2 = value.amount
            }
        });
        console.log("---------- 4. Amount Enhancer truoc khi Evolve to next level:-----", preEnhancer)
        console.log("---------- 5. So luong cosmetic level 2 truoc khi Evolve Skin:----- ", preCosmeticLevel2)

        // 4. evolve minion
        let bodyEvolve: EvolveSkin = {
            minionId: `${minionId}`,
            cosmeticId: level2[i]
        }
        let responseEvolveSkin = await Rival.Evolve(request, bodyEvolve, tokenUser)
        expect(responseEvolveSkin.bodyJson?.success).toBeTruthy()

        // get minion
        let responseMyMinion = await MyHttp.GET<APIResp<UserMinionsPaging>>(`${urlMinion}`, request, {}, tokenUser)
        if (responseMyMinion.bodyJson?.data?.minions == null) {
            expect(responseMyMinion.bodyJson?.data?.minions, responseMyMinion.body).not.toBeFalsy()
            return
        }

        // 5. kiểm tra đã đặt đúng level2[i] vào trong minion
        let selectedAddIns = new Map<String, number>()
        responseMyMinion.bodyJson?.data?.minions.forEach((value) => {
            if (value.id == minionId) {
                selectedAddIns = new Map(Object.entries(value.addIns))
            }
        });

        expect(selectedAddIns.size).toBeGreaterThan(0)

        let daDatVaoTrongEvolveSlots = false
        selectedAddIns.forEach((value) => {
            if (value == level2[i]) {
                daDatVaoTrongEvolveSlots = true
            }
        })

        expect(daDatVaoTrongEvolveSlots).toBeTruthy()


        // Dinh nghia  a = string[] { "backBling", "dance", "..." }
        // For toan bo string 
        // ok = false, Kiem tra AddIns[a[i]] == level2[i], ok = true
        // Expect ok == true 

        // let mapAddIns = await responseMyMinion.bodyJson?.data?.minions
        // console.log("responseMyMinion----", responseMyMinion.bodyJson?.data?.addIns)

        // let addInsArray = ["backBling", "dance", "flyCraft", "footprint", "glow", "spray", "voice"]
        // // let checkLevel = false
        // mapAddIns?.forEach((value, key) => {
        //     if (value == level2[i]) {
        //         checkLevel = true
        //         console.log('da dat level vao minion', mapAddIns?.set(key, value))
        //         expect(checkLevel == true).toBeTruthy()

        //     }
        // })


        // get inventory 
        //  6. kiểm tra số lượng cosmetic level[i] = B - 1

        responseGetInventory = await MyHttp.GET<APIResp<Inventory>>(`${urlInventory}`, request, {}, tokenUser)
        if (responseGetInventory.bodyJson?.data?.inventories == undefined) {
            expect(responseGetInventory.bodyJson?.data?.inventories, responseGetInventory.body).not.toBeFalsy()
            return
        }

        console.log("Response Inventory", responseGetInventory.bodyJson?.data?.inventories)
        mapInventory = new Map(Object.entries(responseGetInventory.bodyJson?.data.inventories))
        let postEnhancer = 0
        let postCosmeticLevel2 = 0
        mapInventory.forEach((value) => {
            if (value.type == 25 && value.kind == 1) {
                postEnhancer = value.amount

            }
            if (value.type == level2[i] && value.kind == 4) {
                postCosmeticLevel2 = value.amount

            }
        });

        console.log("---------- 6. Amount Enhancer sau khi evolve skin: ---", postEnhancer)
        console.log("---------- 7. So luong cosmetic level 2 sau khi evolve:---- ", postCosmeticLevel2)

        // 6. kiểm tra số lượng cosmetic level[i] = B - 1
        expect(preCosmeticLevel2 == postCosmeticLevel2 + Math.pow(10, 8), `preCosmeticLevel2 = ${preCosmeticLevel2}, postCosmeticLevel2 = ${postCosmeticLevel2}`).toBeTruthy()

        // 7. kiểm tra số lượng enhancer < A
        expect(postEnhancer < preEnhancer, `postEnhancer = ${postEnhancer}, preEnhancer = ${preEnhancer}`).toBeTruthy()
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

    // let responseGetMinion = await MaketPlace.GET<Response>(`${urlMinion}`, request, {}, tokenUser)
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

    // let responseInventory = await MaketPlace.GET<Response>(`${urlInventory}`, request, {}, tokenUser)
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
    //     let responseInventory = await MaketPlace.GET<Response>(`${urlInventory}`, request, {}, tokenUser)
    //     console.log('Check currrent Enhancer after evolve level 2', responseInventory.data?.inventories['1_25'])

    //     // check  minionId level from get minion
    //     let responseGetMinion = await MaketPlace.GET<Response>(`${urlMinion}`, request, {}, tokenUser)


    //     // // get level minion => expected level 2
    //     // let responseGetMinion = await MaketPlace.GET<Response>(`${urlMinion}`, request, {}, tokenUser)
    //     // console.log("--------get Level minion ---------", responseGetMinion.data?.minions[t].level)

    //     //evolve minion to level 3

    //     for (let j = 0; j < level3.length; j++) {
    //         const cosmeticLevel3 = level3[i];
    //         // get inventory check enhancer amount + minionId level

    //     }


    // }


})

