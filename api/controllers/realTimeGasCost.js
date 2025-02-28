import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra from 'puppeteer-extra';
import {baseApiRequest} from "../lib/apiRequest.js"
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config({ path: '../.env' });

//console.log('API Key:', process.env.BASE_API_KEY);

const explorerLinks = [
    "https://arbiscan.io/",
    "https://basescan.org/",
    "https://optimistic.etherscan.io/",
    "https://blastscan.io/",
    "https://era.zksync.network/",
    "https://lineascan.build/"
];


async function getEthPrice(){
    try {
        const response = await baseApiRequest(`/api?module=stats&action=ethprice&apikey=${process.env.BASE_API_KEY}`);
        
        const ethRealTimePrice = parseFloat(parseFloat(response.data.result.ethusd).toFixed(4));

        return (ethRealTimePrice);
        
    } catch (error) {
        console.log(error);
    }
    
}

// getEthPrice()异步方法直接返回的是promise对象，必须用await 才能取到最终返回值。
const EthPrice =await getEthPrice();



// launch browser
// 使用 stealth 插件
puppeteerExtra.use(StealthPlugin());

//2. 启动配置
const browser = await puppeteerExtra.launch({

headless: "new", // 设为 false 更容易通过检测
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


const l2NameList = ['arb','base','op','blast','zks','linea'];

const gasCostObject = {};

export async function getGasCost(){

    const processingPromises = pageList.map(async(item,index)=>{
    
            const gasFeeList = [];
    
            await item.goto(explorerLinks[index]+"txs?ps=10",{
                waitUntil: 'networkidle2',
            });
    
            for(let i =1; i<11; i++){
    
                const selector = `#ContentPlaceHolder1_divTransactions > div.table-responsive > table > tbody > tr:nth-child(${i}) > td.small.text-muted.showTxnFee`;
                try {           
                    await item.waitForSelector(selector);
                    const gasFeeStr = await item.$eval(selector, element => element.textContent.replace(/[^0-9.]/g, ''));
                    const fixFloatStr = parseFloat(gasFeeStr).toFixed(8);
                    gasFeeList.push(parseFloat(fixFloatStr));
                } catch (error) {
                    console.error(`Error navigating to ${tpsLinks[index]}:`, error);
                }
            };
    
            try {
                //console.log(gasFeeList);
                const gasSum = gasFeeList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
                const gasAverageNum =parseFloat((gasSum/10).toFixed(8));
                
                //console.log(`${l2NameList[index]}`,gasAverageNum);
    
                if(EthPrice){
                    const usdGasNum = (gasAverageNum * EthPrice);
    
                    gasCostObject[l2NameList[index]] = usdGasNum.toFixed(4); //将 格式化好的usdGasNum赋值给gasCostObject；             
                    //console.log(usdGasNum);
                   // console.log(`${l2NameList[index]}`,usdGasNum.toFixed(4) +"USD");
                   
                }else{
                    console.log("ethPrice don't exist!");
                    
                }
              
            } catch (error) {
                console.log(error);
                
            };
    
        }
    );
    
    
    await Promise.all(processingPromises);
    
    
    if(Object.keys(gasCostObject).length === 6){
        //console.log(gasCostObject);
        console.log("gasCostObject cook done!");
        await browser.close();
        return (gasCostObject);
    }

}

//getGasCost();