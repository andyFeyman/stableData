import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra from 'puppeteer-extra';

//正则提取tps数值
function tpsFilter(tpsText){
    const match = tpsText.match(/\(([\d.]+)\sTPS\)/);
    if(match){
        const floatValue = parseFloat(match[1]);
        return floatValue;
    }else{
        console.log("didn't get tps num");
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

const pageList=[
    ArbPage,BasePage,OpPage,BlasePage,ZkPage,LineaPage
];

const tpsLinks = [
    "https://arbiscan.io/",
    "https://basescan.org/",
    "https://optimistic.etherscan.io/",
    "https://blastscan.io/",
    "https://era.zksync.network/",
    "https://lineascan.build/"
];

const l2NameList = ['arb','base','op','blast','zks','linea'];
const tpsObject = {};

export async function getL2DailyTps(){

    const processingPromises = pageList.map(async(item,index)=>{
        //item.setDefaultNavigationTimeout(30000);
        if(index<4){
            const selector = '#ContentPlaceHolder1_mainboxes > div > div.col-md-6.col-lg-4.border-md-start > div:nth-child(2) > div.text-end > span';
            try {           
                await item.goto(tpsLinks[index],{
                    waitUntil: 'networkidle2',
                });
                await item.waitForSelector(selector);
                const tpsText = await item.$eval(selector, element => element.textContent);
        
                const tpsNum = tpsFilter(tpsText);
                
                tpsObject[l2NameList[index]] = tpsNum;
    
                //console.log(`${l2NameList[index]}`,tpsNum);
            } catch (error) {
                console.error(`Error navigating to ${tpsLinks[index]}:`, error);
            }
    
        }else{
            const selector2 = '#ContentPlaceHolder1_mainboxes > div > div.col-md-6.col-lg-4.border-md-start > div:nth-child(2) > div.flex-grow-1 > span';
            try {
                await item.goto(tpsLinks[index],{
                    waitUntil: 'networkidle2',
                });
                await item.waitForSelector(selector2);
                const tpsText = await item.$eval(selector2, element => element.textContent);
        
                const tpsNum = tpsFilter(tpsText);
                
                tpsObject[l2NameList[index]] = tpsNum;
    
                //console.log(`${l2NameList[index]}`,tpsNum);
                
            } catch (error) {
                console.error(`Error navigating to ${tpsLinks[index]}:`, error);
            }
        }
        
    });
    
    await Promise.all(processingPromises);
    
    if(Object.keys(tpsObject).length === 6){
        //console.log(tpsObject);
        console.log("tpsObject cook done!");
        await browser.close();
        return(tpsObject);
    }
};

//getL2DailyTps();



