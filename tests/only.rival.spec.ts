import { test, expect, chromium, BrowserContext, request } from '@playwright/test';

import MaketPlace, { APIResp, DataResponse, Response } from '../src/arena-helper/MarketPlaceHelper';
import Rival, { EvolveSkin, InventoryData, Minion, SendInventoryReq } from '../src/arena-helper/RivalHelper';

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

test.only('--EVOLVE SKIN---', async ({ request }) => {
    // get random 1 user co 1 minion level 1 tu DB
    // 1. get Inventory for new user
    let inventoryResponse = await MaketPlace.GET<Response>(`${rivalUrl}/inventory`, request, {}, tokenUser)
    console.log("---inventoryResponse----", inventoryResponse.data?.inventories)


    // 2. get Minion
    let MinionResponse = await MaketPlace.GET<Response>(`${rivalUrl}/minion`, request, {}, tokenUser)
    console.log("----MinionResponse----", MinionResponse.data?.minions)

    // 3. admin send cosmetic
    let bodySendCosmetic: SendInventoryReq = {

        userId: `${userId}`,
        inventories: [    // hỏi Phương
            {
                kind: 4,
                type: 15000001,
                amount: 123
            },
            {
                kind: 1,
                type: 25,
                amount: 234000
            }
        ]

    }
    let cosmeticResponse = await Rival.AdminSendInventory<Response>(request, bodySendCosmetic, tokenAdmin)
    console.log("----cosmeticResponse----", cosmeticResponse.data)

    // 4. post evolve   // hỏi Phương
    let bodyPostedEvolve: EvolveSkin = {

        minionId: '6329758077c0012bc1a2d5de',
        cosmeticId: 16000001
    }
    let postedEvolveResponse = await Rival.PostEvolve<Response>(request, bodyPostedEvolve, tokenUser)
    console.log("----postedEvolveResponse-----", postedEvolveResponse.data)
})