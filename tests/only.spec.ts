import { test, expect, chromium, BrowserContext, request } from '@playwright/test';
//import AllPopup, { SendHeroReq } from '../src/arena-helper/ArenaHelper';
import MaketPlace, { APIResp, SendHeroReq, SetMaterial, SetHeroLevel, SetHeroBattleCap, Box, BoxInfo, ThetanBoxData, BoxType } from '../src/arena-helper/marketPlaceHelper';


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

class FusionSuccessRepsonse {
    bio: string
    name: string

}
class DataResponse {

    accessToken: string
    refreshToken: string
}
class Response {
    code: number
    success: boolean
    data: DataResponse
}

class Hero {
    data: HeroInfo[]
}

class HeroInfo {
    id: string
    userId: string
    ownerAddress: string
    skinId: string

}
var address = "0x3cc80663077111fcfe1f9ae36ebdaf5a99bfefcf"
var skinId = 2500
var tokenAdmin = "" //= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKV1RfQVBJUyIsImNhbl9taW50IjpmYWxzZSwiZXhwIjoxNjY1OTc3ODQ1LCJpc3MiOiJodHRwczovL2FwaS5tYXJrZXRwbGFjZS5hcHAiLCJuYmYiOjE2NjUzNzMwNDUsInJvbGUiOjIsInNpZCI6IjB4ZDIwMWE0ZTU5ZWIxYmY1NGVhMDExZWEzMmE4YWY3ZDdlZGVhMTk0NiIsInN1YiI6InRyaW5obnRsKzIiLCJ1c2VyX2lkIjoiNjIyOWIyYTJkOGZhMWJhYWNmOGM2ZGU2In0.I5YpDSC4T8STwuIu7lx-ydfHXmer3rZ5gV_NQgXaLvs'
var tokenUser = ""
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

test.beforeAll(async ({ request }) => {
    // ---------- goi api lay access token Admin
    const responseAdmin = await request.post(`https://auth.staging.thetanarena.com/auth/v1/loginByEmail`, {
        data: {
            "email": "trinhntl@wolffungame.com"
        }
    })
    const data = await responseAdmin.json()
    // console.log("-------response here---", data);

    let x: Response = await responseAdmin.json()
    tokenAdmin = await x.data.accessToken
    console.log(tokenAdmin)
    console.log("----ACCESS TOKEN ADMIN----", tokenAdmin.substring(tokenAdmin.length - 10, tokenAdmin.length))

    const responsUser = await request.post(`https://auth.staging.thetanarena.com/auth/v1/loginByEmail`, {
        data: {
            "email": "trinhntl+stg1000@wolffungame.com"
        }
    })
    let y: Response = await responsUser.json()
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
    let x: FusionSuccessRepsonse = await response.json()
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
            "skinId": skinId,
            "address": `${address}`,
            "amount": 3,
            "motLaAm999HaiLa0": 2
        },
        headers: {
            'Authorization': `Bearer ${tokenAdmin}`,
        }
    })
    const data = await response.json()

    console.log("-------response code here---: ", data.code);
    let hero: Hero = await response.json()

    console.log("show info Hero", hero.data)
    console.log(data)
    console.log("Id hero la: ", hero.data[0].skinId)

});

test('-------- SEND HERO ------', async ({ request }) => {
    console.log("Send hero start:")
    let req: SendHeroReq = {
        address: address,
        amount: 3,
        motLaAm999HaiLa0: 2,
        skinId: skinId
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

test.only('---full flow send box -> open box -> check ti le ---', async ({ request }) => {
    let boxInfo: BoxInfo = {
        boxType: 3,
        amount: 100
    }
    let boby: Box = {
        userAddress: "0x241edee3f1ab2a44e47cf0e94c13fd0c150aa5ef",
        userEmail: "trinhntl+stgmeta01@wolffungame.com",
        boxes: [boxInfo]

    }
    let responseSendBox = await MaketPlace.SendBox<Box>(request, boby, tokenAdmin)
    console.log("SENDBOX", responseSendBox)
    await delay(2000)

    let a = await MaketPlace.GET<ThetanBoxData>(`https://data.staging.thetanarena.com/theta/v1/thetanbox`, request, {}, tokenUser)
    console.log("--THETANBOX LIST", a.data?.boxDataArr[BoxType.Legendary])
    let responseOpenBox = await MaketPlace.OpenBox<BoxInfo>(request, boxInfo, tokenUser)
    console.log("OPENBOX", responseOpenBox.data)

})
// test('-------- Check mint ------', async ({ request }) => {
//     // api send hero
//     for (;;) {
//         // api get hero 
//         // check mint chua 
//     }
/*
kiem tra inventory / thetanbox api
send 1k box
kiem tra lai inventory / thetanbox api
lap for để mở 1k box trong vòng 1phút - delay = 60/1000
kiểm tra nếu có lỗi=> in ra lỗi
pass ==> đếm số lượng skinId, hero rarity, skin rarity 
*/