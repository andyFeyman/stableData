import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra from 'puppeteer-extra';

const explorerLinks = [
    "https://arbiscan.io/",
    "https://basescan.org/",
    "https://optimistic.etherscan.io/",
    "https://blastscan.io/",
    "https://era.zksync.network/",
    "https://lineascan.build/"
];

function getYesterdayTimestamp() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(8, 0, 0);
    // 使用 Math.floor() 将毫秒时间戳向下取整为秒级整数
    const timestamp = Math.floor(today.getTime() / 1000); 
  
    return timestamp;
}

function getTransactionStr(str){

    const regex = /(\d{1,3}(?:,\d{3})*)/;
    const match = str.match(regex);

    if (match) {
        // 去掉逗号并转换为整数,
        //如果找到了匹配项，则使用 replace(/,/g, '') 去掉逗号，然后用 parseInt 转换为整数，基数设置为10以确保正确解析。
        const number = parseInt(match[1].replace(/,/g, ''), 10);
        return(number); 
    } else {
        console.log("No number found in the string.");
    }
}




export async function getL2DailyTrans() {
    // launch browser
    // 使用 stealth 插件
    puppeteerExtra.use(StealthPlugin());
    
    // 2. 启动配置
    const browser = await puppeteerExtra.launch({
    headless: true, // 设为 false 更容易通过检测
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
    
    const yesterdayStamp = getYesterdayTimestamp();
    
    const l2NameList = ['arb','base','op','blast','zks','linea'];
    
    const transactionObject = {};
    
    const processingPromises = pageList.map(async(item,index)=>{
            //item.setDefaultNavigationTimeout(30000);
            const selector = '#ContentPlaceHolder1_divDataInfo > div > div:nth-child(1) > span';
            try {           
                await item.goto(explorerLinks[index]+"txs?dt="+yesterdayStamp,{
                    waitUntil: 'networkidle2',
                });
                await item.waitForSelector(selector);
                const transactionNumStr = await item.$eval(selector, element => element.textContent);
    
                const transactionNum = getTransactionStr(transactionNumStr);
    
                transactionObject[l2NameList[index]] = transactionNum;
    
                console.log(`${l2NameList[index]}`,transactionNum);
    
    
            } catch (error) {
                console.error(`Error navigating to ${tpsLinks[index]}:`, error);
            }
        }
    );
    
    await Promise.all(processingPromises);
    
    if(Object.keys(transactionObject).length === 6){
        //console.log(transactionObject);
        console.log("transactionObject cook done!");
        await browser.close();
        return (transactionObject);
    }

}

//getL2DailyTrans();