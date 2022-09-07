import { BrowserContext, chromium, Page } from '@playwright/test';
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'

const seed = ""
const password = "12345678"

export default class Metamask {
    pathToExtension: string;
    tmpDir: string;
    userDataDir: string;
    browserContext: BrowserContext;
    metaMaskPage: Page;

    // dùng để load vị trí extension và tạo persistent storage của metamask
    constructor() {
        this.pathToExtension = path.join(__dirname, "metamask-extension")
        this.tmpDir = path.join(__dirname, 'tmp')
        this.userDataDir = path.join(__dirname, 'tmp', crypto.randomBytes(16).toString('hex'))

        this.__createFolder(this.tmpDir);
        this.__createFolder(this.userDataDir);
    }

    // dùng để tạo chrome với metamask
    async initBrowserContext(): Promise<BrowserContext> {
        this.browserContext = await chromium.launchPersistentContext(this.userDataDir, {
            headless: false,
            args: [
                `--disable-extensions-except=${this.pathToExtension}`,
                `--load-extension=${this.pathToExtension}`
            ],
        })

        this.browserContext.setDefaultTimeout(600 * 1000);


        await this.__waitForHomeScreen()

        return this.browserContext;
    }

    // load metamask page 
    async __waitForHomeScreen() {
        [this.metaMaskPage] = await Promise.all([
            this.browserContext.waitForEvent('page', { timeout: 60000 }),
        ]);
        console.log(await this.metaMaskPage.evaluate('location.href'));
        await this.metaMaskPage.waitForLoadState();
    }

    // async initFirstTime() {
    //     this.__getStarted()
    // }

    // 
    async __getStarted() {
        this.metaMaskPage.locator(".btn-primary").click()
        await this.metaMaskPage.waitForLoadState();
    }

    async __rejectImprove() {
        await this.metaMaskPage.locator(".btn-secondary").click()

    }
    async __agreeImprove() {
        await this.metaMaskPage.locator(".btn-primary").click()
    }

    async __importWallet() {
        await this.metaMaskPage.locator(".btn-primary", { hasText: "Import Wallet" }).click()
    }

    async __importAccount() {
        let arr = seed.split(' ')
        for (let i = 0; i < 12; i++) {
            await this.metaMaskPage.locator(`input[data-testid="import-srp__srp-word-${i}"]`).fill(arr[i])
        }

        await this.metaMaskPage.locator("#password").fill(password)
        await this.metaMaskPage.locator("#confirm-password").fill(password)
        await this.metaMaskPage.locator("#create-new-vault__terms-checkbox").click()
        await this.metaMaskPage.locator("button.btn-primary").click()
        await this.metaMaskPage.locator("button.btn-primary").click()
    }

    async switchNetwork() {
        const allWindows = await this.browserContext.pages();
        let approvePage = await allWindows[allWindows.length - 1];

        console.log("windows length: ", allWindows.length)
        allWindows.forEach(page => {
            console.log("---------------", page.url())
        })

        await approvePage.locator(".btn-primary").click() // approve 

        const [newPage] = await Promise.all([
            this.browserContext.waitForEvent('page', { timeout: 60000 }),
            approvePage.locator(".btn-primary").click(),  // switch network
        ]);
        await newPage.waitForLoadState()
    }

    async connectAndSignAccount() {
        const allWindows = await this.browserContext.pages();
        let connectPage = allWindows[allWindows.length - 1];

        await connectPage.locator(".btn-primary").click() // next 
        await connectPage.locator(".btn-primary").click() // connect 

        await connectPage.locator(".btn-primary").click() // next 
    }

    __createFolder(dir: string) {
        try {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir)
            }
        } catch (err) {
            console.error(err)
        }
    }
}