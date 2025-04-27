import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra from 'puppeteer-extra';

// 正则提取 TPS 数值
function tpsFilter(tpsText) {
    const match = tpsText.match(/\(([\d.]+)\sTPS\)/);
    if (match) {
        const floatValue = parseFloat(match[1]);
        return floatValue;
    } else {
        console.log("Didn't get TPS number from text:", tpsText);
        return null; // 返回 null 作为正则匹配失败的默认值
    }
}

// 1. 使用 stealth 插件
puppeteerExtra.use(StealthPlugin());

// 2. 启动配置
const browser = await puppeteerExtra.launch({
    headless: "new",
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--window-position=0,0',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
});

const ArbPage = await browser.newPage();
const BasePage = await browser.newPage();
const OpPage = await browser.newPage();
const BlasePage = await browser.newPage();
const ZkPage = await browser.newPage();
const LineaPage = await browser.newPage();

const pageList = [ArbPage, BasePage, OpPage, BlasePage, ZkPage, LineaPage];

const tpsLinks = [
    "https://arbiscan.io/",
    "https://basescan.org/",
    "https://optimistic.etherscan.io/",
    "https://blastscan.io/",
    "https://era.zksync.network/",
    "https://lineascan.build/"
];

const l2NameList = ['arb', 'base', 'op', 'blast', 'zks', 'linea'];
const tpsObject = {};

export async function getL2DailyTps() {
    const processingPromises = pageList.map(async (item, index) => {
        const selector = index < 4
            ? '#ContentPlaceHolder1_mainboxes > div > div.col-md-6.col-lg-4.border-md-start > div:nth-child(2) > div.text-end > span'
            : '#ContentPlaceHolder1_mainboxes > div > div.col-md-6.col-lg-4.border-md-start > div:nth-child(2) > div.flex-grow-1 > span';

        try {
            await item.goto(tpsLinks[index], {
                waitUntil: 'networkidle2',
                timeout: 30000
            });
            await item.waitForSelector(selector, { timeout: 10000 });

            let tpsNum;
            try {
                const tpsText = await item.$eval(selector, element => element.textContent);
                tpsNum = tpsFilter(tpsText);
            } catch (evalError) {
                console.error(`Failed to evaluate selector for ${l2NameList[index]}:`, evalError);
                tpsNum = null; // 设置异常值
            }

            tpsObject[l2NameList[index]] = tpsNum;
            console.log(`${l2NameList[index]} TPS:`, tpsNum);
        } catch (error) {
            console.error(`Error processing ${tpsLinks[index]}:`, error);
            tpsObject[l2NameList[index]] = null; // 设置异常值
        }
    });

    await Promise.all(processingPromises);

    console.log("TPS Object:", tpsObject);
    console.log("TPS Object cook done!");
    await browser.close();
    return tpsObject;
};


// //await getL2DailyTps();



