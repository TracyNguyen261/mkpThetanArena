import { BrowserContext, Page } from "playwright";

// các utility dùng để đợi
export class WaitUtil {
  // trả về 1 tab/page/popup mới sau khi thực hiện hành động
  static async ActAndWaitNewTab(
    act: Promise<void>,
    browser: BrowserContext
  ): Promise<Page> {
    const [newPage] = await Promise.all([
      browser.waitForEvent("page", { timeout: 60000 }),
      act,
    ]);

    await newPage.waitForLoadState();

    return newPage;
  }

  // ====
  static async Delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// xử lý text
export class TextUtil {
  static GetIntFromText(text: string): number {
    let numStr = "";

    for (let i = 0; i < text.length; i++) {
      const element = text[i];

      if (element >= "0" && element <= "9") {
        numStr += element;
      }
    }

    return Number.parseInt(numStr);
  }
}

// xử lý số
export class MathUtil {
  static RandNumber(min: number, max: number): number {
    // let a = getRandomPrice(50,100)
    return Math.round(Math.random() * (max - min) + min);
  }
}
