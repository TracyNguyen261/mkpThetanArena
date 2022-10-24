import { test, expect, chromium, BrowserContext, request } from '@playwright/test';
//import AllPopup, { SendHeroReq } from '../src/arena-helper/ArenaHelper';
import MaketPlace, { APIResp, SendHeroReq, SetMaterial, SetHeroLevel, SetHeroBattleCap, Box, BoxInfo, ThetanBoxData, BoxType, OpenBoxData, Skin, HeroInfo, Response } from '../src/arena-helper/MarketPlaceHelper';



// export const test = base.extend<{
//     context: BrowserContext;
//     extensionId: string;
// }>({
//     context: async ({ }, use) => {
//         // init metamask + browser
//         metamask = await new Metamask()
//         var context = await metamask.initBrowserContext()

//         // metamask
//         await metamask.__getStarted()

//         // reject improve Metamask
//         await metamask.__rejectImprove()

//         // import wallet
//         await metamask.__importWallet()
//         await delay(1000)

//         // import account bnb
//         await metamask.__importAccount()
//         await delay(1000)

//         await use(context);
//         await context.close();
//     },
//     extensionId: async ({ context }, use) => {
//         // for manifest v3:
//         let [background] = context.serviceWorkers();
//         if (!background)
//             background = await context.waitForEvent("serviceworker");

//         const extensionId = background.url().split("/")[2];
//         await use(extensionId);
//     },
// });

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

var adminEmail = "trinhntl@wolffungame.com"
var userAddress = "0x241edee3f1ab2a44e47cf0e94c13fd0c150aa5ef"
var userEmail = "trinhntl+stgmeta01@wolffungame.com"
var tokenAdmin = ""
var tokenUser = ""


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

test('-------- test api ------', async ({ request }) => {
    const response = await request.get(`https://api.github.com/users/github`);
    const data = await response.json();
    // console.log(data);
    expect(response.status() == 400).toBeFalsy()
    // console.log("response status = ", response.status())
    expect(await response.text()).toContain('How people build software.')
    console.log()
    // let x: FusionSuccessRepsonse = await response.json()
    let y = await response.json()

    // let a = await response.json()
    // let b = await response.text()

    // console.log(typeof (a))
    // console.log(a)
    // console.log(typeof (b))
    // console.log(b)

    return
});

// test.describe.serial('two tests', () => {
//     test('one', async ({ page }) => {
//         // ...
//     });

//     test('two', async ({ page }) => {
//         // ...
//     });
// });


test('-------- test login by email ------', async ({ request }) => {
    const response = await request.post(`https://auth.staging.thetanarena.com/auth/v1/loginByEmail`, {
        data: {
            "email": "trinhntl@wolffungame.com"
        }
    })
    const data = await response.json()
    console.log("-------response here---", data);

    let x: Response = await response.json()
    // console.log("response ne: ", x)
    // console.log("success nha: ", x.success)
    // console.log("code:", x.code)
    // console.log("data", x.data)

    // console.log("-----access token-------", x.data.accessToken)
    // console.log("-----refresh token-------", x.data.refreshToken)

    tokenAdmin = await x.data.accessToken
    console.log("- Access Token:", tokenAdmin.substring(0, 10))
});

test('-------- SEND HERO API ------', async ({ request }) => {
    console.log("Send hero start:")
    await delay(2000)
    const response = await request.post(`https://data.staging.thetanarena.com/theta/v1/hero/send-hero`, {
        data: {
            "skinId": 2500,
            "address": `${userAddress}`,
            "amount": 3,
            "motLaAm999HaiLa0": 2
        },
        headers: {
            'Authorization': `Bearer ${tokenAdmin}`,
        }
    })
    const data = await response.json()

    console.log("-------response code here---: ", data.code);
    let hero: HeroInfo = await response.json()

    console.log("show info Hero", hero)
    console.log(data)
    console.log("Id hero la: ", hero.id)

});

test('-------- SEND HERO ------', async ({ request }) => {
    console.log("Send hero start:")
    let req: SendHeroReq = {
        address: userAddress,
        amount: 3,
        motLaAm999HaiLa0: 2,
        skinId: 2500
    }

    let response = await MaketPlace.SendHero<HeroInfo>(request, req, tokenAdmin)
    expect(response.success, { message: "Send hero failed" }).toEqual(true)

    console.log("SEND HERO RESPONSE:", response)
});

test('-------- SET MATERIALS ------', async ({ request }) => {
    console.log("Set input materials:")
    let bodyInps: SetMaterial = {
        userId: '62cbdc8ef88e1482debba66b', //// acc: trinhntl+stg1000@wolffungame.com
        inps: [2000, 2500]
    }
    let response = await MaketPlace.SimulateInput<SetMaterial>(request, bodyInps, tokenAdmin)
    console.log("-----set input-----", response)
});


test('------SET HERO LEVEL-----', async ({ request }) => {
    console.log("SET HERO LEVEL:")
    let body: SetHeroLevel = {
        heroId: '634d64d2b1e6a95741fe0e1b',
        level: 3
    }

    let response = await MaketPlace.SimulateHeroLevel<SetHeroLevel>(request, body, tokenAdmin)
    console.log('-------SET HERO LEVEL----', response)
});

test('------SET HERO BATTLE CAP---', async ({ request }) => {
    let body: SetHeroBattleCap = {
        heroId: '634d64d2b1e6a95741fe0e1b',
        battleCap: 500
    }
    let response = await MaketPlace.SimulateHeroBattle<SetHeroBattleCap>(request, body, tokenAdmin)
    console.log("SET HERO BATTLE CAP:----", response)
})

test('-------SEND BOX------', async ({ request }) => {
    let boxInfo: BoxInfo = {
        boxType: 3,
        amount: 1
    }
    let body: Box = {
        userAddress: "0x3cc80663077111fcfe1f9ae36ebdaf5a99bfefcf",
        userEmail: "trinhntl+stg1000@wolffungame.com",
        boxes: [boxInfo]
    }
    let response = await MaketPlace.SendBox<Box>(request, body, tokenAdmin)
    // expect(response, response.body).toBeTruthy()
    console.log("Box:-------", response)
})

test('----OpenBox---', async ({ request }) => {
    let body: BoxInfo = {
        boxType: 3
    }
    let response = await MaketPlace.OpenBox<BoxInfo>(request, body, tokenUser)
    console.log("-----OPEN BOX-----", response)
    console.log("-----FULL RESPONSE-----", response.data)
})

test('---full flow send box -> open box -> check ti le ---', async ({ request }) => {
    let boxInfo: BoxInfo = {
        boxType: 3,
        amount: 1000
    }
    let boby: Box = {
        userAddress: "0x241edee3f1ab2a44e47cf0e94c13fd0c150aa5ef",
        userEmail: "trinhntl+stgmeta01@wolffungame.com",
        boxes: [boxInfo]

    }
    // Send box
    // let responseSendBox = await MaketPlace.SendBox<Box>(request, boby, tokenAdmin)
    // console.log("SENDBOX", responseSendBox)
    // await delay(1000)
    // kiểm tra số lượng box Hattrick = 19 trong inventory 

    let a = await MaketPlace.GET<ThetanBoxData>(`https://data.staging.thetanarena.com/theta/v1/thetanbox`, request, {}, tokenUser)
    //console.log("--THETANBOX LIST", a.data?.boxDataArr[BoxType.Legendary])
    console.log("---SO LUONG BOX LEGEND---", a.data?.boxDataArr[3].amount)

    let skinIDCounter = new Map<Number, Number>()
    // skinIDCounter.get(123)

    let amountBox = a.data?.boxDataArr[3].amount
    for (let i = 0; i < (amountBox - amountBox + 30); i++) {
        let responseOpenBox = await MaketPlace.OpenBox<OpenBoxData>(request, boxInfo, tokenUser)
        if (!responseOpenBox.success) {
            console.log(responseOpenBox.body)
            continue
        }

        //   console.log("OPENBOX", responseOpenBox[i])
        let heroRarityCount = 0
        if (responseOpenBox.data?.data?.heroInfo?.rarity != null) {
            heroRarityCount++
        }
        let skinRarityCount = 0
        if (responseOpenBox.data?.data?.skinInfo?.skinRarity != null) {
            skinRarityCount++
        }
        let skinIdCount = 0

        if (responseOpenBox.data?.data?.skinInfo?.id != null) {
            skinIdCount++
            let skinId = responseOpenBox.data?.data?.skinInfo?.id

            let count = isNaN(Number(skinIDCounter.get(skinId))) ? 1 : Number(skinIDCounter.get(skinId)) + 1
            skinIDCounter.set(skinId, count)
        }

        console.log("OPENBOX NE", responseOpenBox.data?.data.heroTypeId)
        console.log("itemType", responseOpenBox.data?.itemType)
        console.log("battleCapTHC", responseOpenBox.data?.data?.battleCapTHC)
    }

    console.log("---", skinIDCounter)
    // let responseOpenBox = await MaketPlace.OpenBox<BoxInfo>(request, boxInfo, tokenUser)
    // console.log("OPENBOX", responseOpenBox.data)


})

test('----DRAFF----SEND BOX -> OPEN BOX -> CHECK TI LE ------', async ({ request }) => {
    let boxType = 19 // HATTRICK BOX
    // let boxType: 17  // HALLOWEEN BOX
    let boxAmount = 1000
    let openAmount = 10
    let boxInfo: BoxInfo = {
        boxType: boxType,
        amount: boxAmount
    }
    let boby: Box = {
        userAddress: `${userAddress}`,//"0x241edee3f1ab2a44e47cf0e94c13fd0c150aa5ef",
        userEmail: `${userEmail}`,  //"trinhntl+stgmeta01@wolffungame.com",
        boxes: [boxInfo]

    }
    // SEND BOX
    let responseSendBox = await MaketPlace.SendBox<Box>(request, boby, tokenAdmin)
    console.log("SENDBOX", responseSendBox)
    await delay(1000)

    // KIEM TRA SO LUONG BOX TRONG INVENTORY

    let a = await MaketPlace.GET<ThetanBoxData>(`https://data.staging.thetanarena.com/theta/v1/thetanbox`, request, {}, tokenUser)
    //console.log("--THETANBOX LIST", a.data?.boxDataArr[BoxType.Legendary])
    // console.log("--- SO LUONG BOX HALLOWEEN---", a.data?.boxDataArr[17].amount)
    console.log("--- SO LUONG BOX---", a.data?.boxDataArr[boxInfo.boxType].amount)

    // OPEN BOX

    // TẠO MAP CHỨA THÔNG TIN CẦN TRẢ VỀ THEO TỪNG LOẠI BOX TYPE: HERO, COSMETIC, CURRENCY

    // let itemTypeCounter = new Map<Number, Number>()  
    let heroCounter = new Map<Number, Number>()
    let cosmeticTypeCounter = new Map<Number, Number>()
    let currencyTypeCounter = new Map<Number, Number>()
    let skinIdCounter = new Map<Number, number>()
    let skinRarityIdCounter = new Map<Number, Number>()
    let heroRarityIdCounter = new Map<Number, Number>()
    let cosmeticTypeIdCounter = new Map<Number, Number>()
    let currencyNameCounter = new Map<Number, Number>()

    // skinIDCounter.get(123)
    // let amountBox = a.data?.boxDataArr[3].amount

    // MỞ TỪNG BOX VÀ LƯU VÀO MAP
    for (let i = 0; i < openAmount; i++) {
        let response = await MaketPlace.OpenBox<OpenBoxData>(request, boxInfo, tokenUser)
        if (!response.success) {
            console.log(response.body)
            continue
        }

        //   console.log("OPENBOX", responseOpenBox[i])
        // let heroRarityCount = 0
        // if (response.data?.data?.heroInfo?.rarity != null) {
        //     heroRarityCount++
        // }
        // let skinRarityCount = 0
        // if (response.data?.data?.skinInfo?.skinRarity != null) {
        //     skinRarityCount++
        // }
        // let skinIdCount = 0

        // if (response.data?.data?.skinInfo?.id != null) {
        //     skinIdCount++
        //     let skinId = response.data?.data?.skinInfo?.id

        //     let count = isNaN(Number(skinIDCounter.get(skinId))) ? 1 : Number(skinIDCounter.get(skinId)) + 1
        //     skinIDCounter.set(skinId, count)
        // }
        // let cosmeticTypeCount = 0

        // if (response.data?.itemType == 2) {
        //     cosmeticTypeCount++

        //     let cosmeticType = response.data?.data?.itemType
        //     let count = isNaN(Number(skinIDCounter.get(cosmeticType))) ? 1 : Number(skinIDCounter.get(cosmeticType)) + 1
        //     skinIDCounter.set(cosmeticType, count)

        // }

        // let currencyTypeCount = 0

        // THÔNG TIN BOX HERO
        let skinId: Number = Number(response.data?.data?.skinInfo?.id)
        let skinRarity: Number = Number(response.data?.data?.skinInfo?.skinRarity)
        let heroRarity: Number = Number(response.data?.data?.heroInfo?.rarity)

        // THÔNG TIN BOX COSMETIC   
        let cosmeticTypeId: Number = Number(response.data?.data?.typeId)

        //THÔNG TIN BOX CURRENCY
        let currencyName: Number = Number(response.data?.data?.name)

        let itemType: Number = Number(response.data?.itemType)

        // let count = isNaN(Number(itemTypeCounter.get(itemType))) ? 1 : Number(itemTypeCounter.get(itemType)) + 1
        // itemTypeCounter.set(itemType, count)

        // CHECK TI LE BOX HERO 
        // if  itemType =1 => add map heroRarityCounter

        if (itemType == 0) {

            let count = isNaN(Number(heroCounter.get(itemType))) ? 1 : Number(heroCounter.get(itemType)) + 1
            heroCounter.set(itemType, count) // MAP HERO COUNTER 

            let countSkinId = isNaN(Number(skinIdCounter.get(skinId))) ? 1 : Number(skinIdCounter.get(skinId)) + 1
            skinIdCounter.set(skinId, countSkinId) // MAP SKINID COUNTER

            let countHeroRarity = isNaN(Number(heroRarityIdCounter.get(heroRarity))) ? 1 : Number(heroRarityIdCounter.get(heroRarity)) + 1
            heroRarityIdCounter.set(heroRarity, countHeroRarity)  // MAP HERORARITY COUNTER

            let countSkinRarity = isNaN(Number(skinRarityIdCounter.get(skinRarity))) ? 1 : Number(skinRarityIdCounter.get(skinRarity)) + 1
            skinRarityIdCounter.set(skinRarity, countSkinRarity)  // MAP SKINRARITY COUNTER



        }
        // CHECK TI LE BOX COSMETIC
        // if  itemType =2 => add map cosmeticTypeCounter
        if (itemType == 2) {
            let count = isNaN(Number(cosmeticTypeCounter.get(itemType))) ? 1 : Number(cosmeticTypeCounter.get(itemType)) + 1
            cosmeticTypeCounter.set(itemType, count) // MAP COSMETIC TYPE COUNTER

            let countCosmeticTypeId = isNaN(Number(cosmeticTypeIdCounter.get(cosmeticTypeId))) ? 1 : Number(cosmeticTypeIdCounter.get(cosmeticTypeId)) + 1
            cosmeticTypeIdCounter.set(cosmeticTypeId, countCosmeticTypeId)  // MAP COSMETIC TYPEID COUNTER

        }

        // CHECK TI LE BOX CURRENCY
        if (itemType == 3) {
            let count = isNaN(Number(currencyTypeCounter.get(itemType))) ? 1 : Number(currencyTypeCounter.get(itemType)) + 1
            currencyTypeCounter.set(itemType, count) // MAP CURRENCY TYPE COUNTER

            let countCurrencyName = isNaN(Number(currencyNameCounter.get(currencyName))) ? 1 : Number(currencyNameCounter.get(currencyName)) + 1
            currencyNameCounter.set(currencyName, countCurrencyName) // MAP CURRENCY NAME COUNTER




        }

        // if (response.data?.itemType == 3) {
        //     currencyTypeCount++

        //     let currencyType = response.data?.data?.itemType
        //     let count = isNaN(Number(skinIDCounter.get(currencyType))) ? 1 : Number(skinIDCounter.get(currencyType)) + 1
        //     skinIDCounter.set(currencyType, count)

        // }

        // if (response.data?.itemType == 3 || response.data?.itemType == 2) {
        //     console.log(response.data)
        // }

        // console.log(response.data)

        // console.log("OPENBOX NE", response.data?.data.heroTypeId)
        // console.log("itemType", response.data?.itemType)
        // console.log("battleCapTHC", response.data?.data?.battleCapTHC)
        // console.log("RESPONSE BODY", response.data)

        console.log(i)
    }

    // console.log("---", itemTypeCounter)
    console.log("1. Số lượng box Bero------------", heroCounter)
    console.log("1.1. Hero info- HeroRarity------", heroRarityIdCounter)
    console.log("1.2. Hero info- SkinId----------", skinIdCounter)
    console.log("1.3. Hero info- SkinRarity------", skinRarityIdCounter)

    console.log("2. Box cosmeticc-------", cosmeticTypeCounter)
    console.log("2.1. Cosmetic TypeID", cosmeticTypeIdCounter)
    console.log("3. Box currency-------", currencyTypeCounter)
    console.log("3.1 Currency Name", currencyNameCounter)
    // let responseOpenBox = await MaketPlace.OpenBox<BoxInfo>(request, boxInfo, tokenUser)
    // console.log("OPENBOX", responseOpenBox.data)


})
// ========================= FULL FLOW SEND BOX - OPEN BOX ==============

var thetanUrl = "https://data.staging.thetanarena.com/theta/v1/thetanbox"
// var thetanUrl = "https://data.uat.thetanarena.com/theta/v1/thetanbox"

function IsGiftBox(boxType: Number): boolean {
    return boxType == 17 || boxType == 12
}

function BoxDataURL(boxType: Number): string {
    return `${thetanUrl}` + (IsGiftBox(boxType) ? "/giftbox" : "")
}

test('--------SEND BOX -> OPEN BOX -> CHECK TI LE ------', async ({ request }) => {
    let boxType = 19 // HATTRICK BOX
    let boxName = 'HATTRICK BOX'
    // let boxType = 17  // HALLOWEEN BOX
    // let boxName = 'HALLOWEEN BOX'
    let boxAmount = 2000
    let openAmount = 2
    let boxInfo: BoxInfo = {
        boxType: boxType,
        amount: boxAmount,
        name: boxName
    }
    let boby: Box = {
        userAddress: `${userAddress}`,//"0x241edee3f1ab2a44e47cf0e94c13fd0c150aa5ef",
        userEmail: `${userEmail}`,  //"trinhntl+stgmeta01@wolffungame.com",
        boxes: [boxInfo]
    }

    // SEND BOX
    let responseSendBox = await MaketPlace.SendBox<Box>(request, boby, tokenAdmin)
    console.log("----SENDBOX ",`${boxName}`, responseSendBox)
    await delay(1000)

    // KIEM TRA SO LUONG BOX TRONG INVENTORY

    let a = await MaketPlace.GET<ThetanBoxData>(BoxDataURL(boxType), request, {}, tokenUser)
    console.log("--THETANBOX LIST", a.data)
    // console.log("--- SO LUONG BOX HALLOWEEN---", a.data?.boxDataArr[19].amount)
    console.log("--- SO LUONG BOX", `${boxName}`, a.data?.boxDataArr[boxInfo.boxType]?.amount)

    // OPEN BOX

    // TẠO MAP CHỨA THÔNG TIN CẦN TRẢ VỀ THEO TỪNG LOẠI BOX TYPE: HERO, COSMETIC, CURRENCY

    // let itemTypeCounter = new Map<Number, Number>()  
    let heroCounter = new Map<Number, Number>()
    let cosmeticTypeCounter = new Map<Number, Number>()
    let currencyTypeCounter = new Map<Number, Number>()
    let skinIdCounter = new Map<Number, number>()
    let skinRarityIdCounter = new Map<Number, Number>()
    let heroRarityIdCounter = new Map<Number, Number>()
    let cosmeticTypeIdCounter = new Map<Number, Number>()
    let currencyNameCounter = new Map<Number, Number>()

    // skinIDCounter.get(123)
    // let amountBox = a.data?.boxDataArr[3].amount

    // MỞ TỪNG BOX VÀ LƯU VÀO MAP
    for (let i = 0; i < openAmount; i++) {
        let response = await MaketPlace.OpenBox<OpenBoxData>(request, boxInfo, tokenUser)
        if (!response.success) {
            console.log(response.body)
            continue
        }


        // THÔNG TIN BOX HERO
        let skinId: Number = Number(response.data?.data?.skinInfo?.id)
        let skinRarity: Number = Number(response.data?.data?.skinInfo?.skinRarity)
        let heroRarity: Number = Number(response.data?.data?.heroInfo?.rarity)

        // THÔNG TIN BOX COSMETIC   
        let cosmeticTypeId: Number = Number(response.data?.data?.typeId)

        //THÔNG TIN BOX CURRENCY
        let currencyName: Number = Number(response.data?.data?.name)

        let itemType: Number = Number(response.data?.itemType)

        // let count = isNaN(Number(itemTypeCounter.get(itemType))) ? 1 : Number(itemTypeCounter.get(itemType)) + 1
        // itemTypeCounter.set(itemType, count)

        // CHECK TI LE BOX HERO 
        // if  itemType =1 => add map heroRarityCounter

        if (itemType == 0) {

            let count = isNaN(Number(heroCounter.get(itemType))) ? 1 : Number(heroCounter.get(itemType)) + 1
            heroCounter.set(itemType, count) // MAP HERO COUNTER 

            let countSkinId = isNaN(Number(skinIdCounter.get(skinId))) ? 1 : Number(skinIdCounter.get(skinId)) + 1
            skinIdCounter.set(skinId, countSkinId) // MAP SKINID COUNTER

            let countHeroRarity = isNaN(Number(heroRarityIdCounter.get(heroRarity))) ? 1 : Number(heroRarityIdCounter.get(heroRarity)) + 1
            heroRarityIdCounter.set(heroRarity, countHeroRarity)  // MAP HERORARITY COUNTER

            let countSkinRarity = isNaN(Number(skinRarityIdCounter.get(skinRarity))) ? 1 : Number(skinRarityIdCounter.get(skinRarity)) + 1
            skinRarityIdCounter.set(skinRarity, countSkinRarity)  // MAP SKINRARITY COUNTER



        }
        // CHECK TI LE BOX COSMETIC
        // if  itemType =2 => add map cosmeticTypeCounter
        if (itemType == 2) {
            let count = isNaN(Number(cosmeticTypeCounter.get(itemType))) ? 1 : Number(cosmeticTypeCounter.get(itemType)) + 1
            cosmeticTypeCounter.set(itemType, count) // MAP COSMETIC TYPE COUNTER

            let countCosmeticTypeId = isNaN(Number(cosmeticTypeIdCounter.get(cosmeticTypeId))) ? 1 : Number(cosmeticTypeIdCounter.get(cosmeticTypeId)) + 1
            cosmeticTypeIdCounter.set(cosmeticTypeId, countCosmeticTypeId)  // MAP COSMETIC TYPEID COUNTER

        }

        // CHECK TI LE BOX CURRENCY
        if (itemType == 3) {
            let count = isNaN(Number(currencyTypeCounter.get(itemType))) ? 1 : Number(currencyTypeCounter.get(itemType)) + 1
            currencyTypeCounter.set(itemType, count) // MAP CURRENCY TYPE COUNTER

            let countCurrencyName = isNaN(Number(currencyNameCounter.get(currencyName))) ? 1 : Number(currencyNameCounter.get(currencyName)) + 1
            currencyNameCounter.set(currencyName, countCurrencyName) // MAP CURRENCY NAME COUNTER




        }

        console.log(i)
    }

    // console.log("---", itemTypeCounter)
    console.log("1. Số lượng box Bero------------", heroCounter)
    console.log("1.1. Hero info- HeroRarity------", heroRarityIdCounter)
    console.log("1.2. Hero info- SkinId----------", skinIdCounter)
    console.log("1.3. Hero info- SkinRarity------", skinRarityIdCounter)

    console.log("2. Box cosmeticc-------", cosmeticTypeCounter)
    console.log("2.1. Cosmetic TypeID", cosmeticTypeIdCounter)
    console.log("3. Box currency-------", currencyTypeCounter)
    console.log("3.1 Currency Name", currencyNameCounter)
    // let responseOpenBox = await MaketPlace.OpenBox<BoxInfo>(request, boxInfo, tokenUser)
    // console.log("OPENBOX", responseOpenBox.data)


})

