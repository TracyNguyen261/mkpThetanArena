import { BrowserContext, Page } from 'playwright'

// đợi 
export default class Waiter {

    // trả về 1 tab/page/popup mới sau khi thực hiện hành động
    static async ActAndWaitNewTab(act: Promise<void>, browser: BrowserContext): Promise<Page> {
        const [newPage] = await Promise.all([
            browser.waitForEvent('page', { timeout: 60000 }),
            act,
        ]);

        await newPage.waitForLoadState();

        return newPage
    }
}
// trả về số lượng 
export class Texter {
    static GetIntFromText(text: string): number {
        let numStr = ""

        for (let i = 0; i < text.length; i++) {
            const element = text[i];

            if (element >= '0' && element <= '9') {
                numStr += element
            }
        }

        return Number.parseInt(numStr)
    }


}
export class Price {
     static  GetRandomPrice(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
      }
        //let a = getRandomPrice(50,100)

}
export class Evolve{
    static EvolveMinion(minionId: string, level: number){}
}
export class Random {
    static RandomNumber(min, max) { // min and max included 
        return Math.round(Math.random() * (max - min) + min);
      }
    }