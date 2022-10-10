import * as puppeteer from "puppeteer";

export enum Result {
    fail,
    success
}

export interface IController {
    freq: number;
    viewPort: boolean;
    headless: boolean;
}
export interface IArg extends IController { }

export class AutoBuy {

    public uri: string | URL;
    protected args: IArg;
    protected isSwitchOn: boolean;

    static defaultArgs: IArg = {
        freq: 10000,
        viewPort: false,
        headless: false
    };

    constructor(uri: string | URL, args: IArg = AutoBuy.defaultArgs) {
        this.uri = uri;
        this.args = args;
        this.isSwitchOn = false;
    }

    async initBrowser(): Promise<puppeteer.Browser> {
        const browser = await puppeteer.launch({
            headless: this.args.headless,
            args: [
                '--no-sandbox',
                '--disable-web-security',
                '--disable-setuid-sandbox',
                '--window-size=1920,1080'
            ]
        });
        return browser;
    }

    async initPage(browser: puppeteer.Browser): Promise<puppeteer.Page> {
        const page: puppeteer.Page = await browser.newPage();
        if (this.args.viewPort)
            await page.setViewport({ width: 1920, height: 1080 });
        await page.setRequestInterception(true);
        page.on('request', (req: puppeteer.HTTPRequest) => {
            if (req.resourceType() === 'image') {
                req.abort();
            } else {
                req.continue();
            }
        });
        return page
    }

    delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async throttle(myPromise: () => Promise<Result>) {
        while (this.isSwitchOn === true) {
            let result: Result = await myPromise();
            if (result === Result.success) {
                this.turnOff();
                // return;
            }
            await this.delay(this.args.freq)
        }
    }

    turnOff() {
        this.isSwitchOn = false;
    }

}

export class Bestbuy extends AutoBuy {
    constructor(uri: string | URL, args: IArg = Bestbuy.defaultArgs) {
        super(uri, args);
    }

    async addToCartCheck(page: puppeteer.Page): Promise<boolean> {
        const XPATH_FULLFILLMENT_BUTTON = `//div[@class="fulfillment-add-to-cart-button]/button"`
        const ATTRIBUTE_ID = `data-button-state`;
        await page.waitForXPath(XPATH_FULLFILLMENT_BUTTON);
        const btn = await page.$x(XPATH_FULLFILLMENT_BUTTON);
        console.log(btn)
        // const btnState = await page.evaluate("button.data-button-state", (ele) => ele.getAtt)
        return true
    }

    async placeOrder(page: puppeteer.Page): Promise<Result> {
        return Result.success;
    }
}