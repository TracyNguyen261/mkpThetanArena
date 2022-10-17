import { test, expect, chromium, BrowserContext, request } from '@playwright/test';
//import AllPopup, { SendHeroReq } from '../src/arena-helper/ArenaHelper';
import MaketPlace, { APIResp, SendHeroReq, SetMaterial, SetHeroLevel, SetHeroBattleCap } from '../src/arena-helper/marketPlaceHelper';


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
var token = "" //= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKV1RfQVBJUyIsImNhbl9taW50IjpmYWxzZSwiZXhwIjoxNjY1OTc3ODQ1LCJpc3MiOiJodHRwczovL2FwaS5tYXJrZXRwbGFjZS5hcHAiLCJuYmYiOjE2NjUzNzMwNDUsInJvbGUiOjIsInNpZCI6IjB4ZDIwMWE0ZTU5ZWIxYmY1NGVhMDExZWEzMmE4YWY3ZDdlZGVhMTk0NiIsInN1YiI6InRyaW5obnRsKzIiLCJ1c2VyX2lkIjoiNjIyOWIyYTJkOGZhMWJhYWNmOGM2ZGU2In0.I5YpDSC4T8STwuIu7lx-ydfHXmer3rZ5gV_NQgXaLvs'
let apiContext;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

test.beforeAll(async ({ request }) => {
    // ---------- goi api lay access token
    const response = await request.post(`https://auth.staging.thetanarena.com/auth/v1/loginByEmail`, {
        data: {
            "email": "trinhntl@wolffungame.com"
        }
    })
    const data = await response.json()
    // console.log("-------response here---", data);

    let x: Response = await response.json()
    token = await x.data.accessToken
    console.log(token)
    console.log("- Access Token:", token.substring(token.length - 10, token.length))
    // ------------

    console.log("BEFORE ALL DONE")
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

    token = await x.data.accessToken
    console.log("- Access Token:", token.substring(0, 10))
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
            'Authorization': `Bearer ${token}`,
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

    let response = await MaketPlace.SendHero<HeroInfo>(request, req, token)
    expect(response.success, { message: "Send hero failed" }).toEqual(true)

    console.log(response)
});

test('-------- SET MATERIALS ------', async ({ request }) => {
    console.log("Set input materials:")
    let bodyInps : SetMaterial = {
        userId: '62cbdc8ef88e1482debba66b', //// acc: trinhntl+stg1000@wolffungame.com
        inps: [2000,2500]
    }
   let response = await MaketPlace.SimulateInput<SetMaterial>(request,bodyInps, token)  
   console.log("-----set input-----",response)
});


test('------SET HERO LEVEL-----', async({request})=> {
    console.log("SET HERO LEVEL:")
    let body: SetHeroLevel = {
        heroId: '634d64d2b1e6a95741fe0e1b',
        level: 3
    }
    
    let response = await MaketPlace.SimulateHeroLevel<SetHeroLevel>(request, body, token)
    console.log('-------SET HERO LEVEL----', response)
});

test.only('------SET HERO BATTLE CAP---', async({request})=> {
    let body: SetHeroBattleCap = {
        heroId: '634d64d2b1e6a95741fe0e1b',
        battleCap: 500
    }
    let response = await MaketPlace.SimulateHeroBattle<SetHeroBattleCap>(request,body,token)
    console.log("SET HERO BATTLE CAP:----", response)
})
// test('-------- Check mint ------', async ({ request }) => {
//     // api send hero
//     for (;;) {
//         // api get hero 
//         // check mint chua 
//     }
