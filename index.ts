import { Bestbuy, Result } from "./Auto";

(async function () {
    const RTX_4090_URL = "https://www.bestbuy.com/site/nvidia-geforce-rtx-4090-24gb-gddr6x-graphics-card-titanium-and-black/6521430.p?skuId=6521430";
    const RTX_3090TI_URL = "https://www.bestbuy.com/site/nvidia-geforce-rtx-3090-ti-titanium-and-black/6502626.p?skuId=6502626";


    
    let rtx = new Bestbuy(RTX_3090TI_URL, { freq: 10000, viewPort: true, headless: false });

    const browser = await rtx.initBrowser();
    const page = await rtx.initPage(browser);
    await page.goto(rtx.uri as string);
    await rtx.throttle(async () => new Promise((resolve, reject) => {
        rtx.addToCartCheck(page)
            .then((canBePurchased: Boolean) => {
                if (canBePurchased)
                    return;
                else
                    reject(Result.fail);
            })
            .then(() => rtx.placeOrder(page))
            .then((isPurchased: Result) => {
                if (isPurchased === Result.success)
                    resolve(Result.success);
                else
                    reject(Result.fail);
            })
            .catch(err => {
                console.error(err);
            })
    }))
    await page.close();
    await browser.close()

})();
