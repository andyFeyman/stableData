import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra from 'puppeteer-extra';
import allL1Data from './allL1Data.js';
import btcPlugin from './L1Plugins/btcPlugin.js';
import ethPlugin from './L1Plugins/ethPlugin.js';
import solPlugin from './L1Plugins/solPlugin.js';
import bnbPlugin from './L1Plugins/bnbPlugin.js';
import dogePlugin from './L1Plugins/dogePlugin.js';
import avaxPlugin from './L1Plugins/avaxPlugin.js';
import suiPlugin from './L1Plugins/suiPlugin.js';
import tonPlugin from './L1Plugins/tonplugin.js';
import nearPlugin from './L1Plugins/nearPlugin.js';
import mantlePlugin from './L1Plugins/mantlePlugin.js';
import kasPlugin from './L1Plugins/kasPlugin.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const l1DataList = allL1Data.explorerBasicData;

// 使用 stealth 插件
puppeteerExtra.use(StealthPlugin());

const browserConfig = {
    headless: false,
    defaultViewport: null,
    args: [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-infobars',
        '--ignore-certifcate-errors',
        '--ignore-certifcate-errors-spki-list',
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'
    ]
};

async function setupPluginWithPage(browser, plugin, dataIndex) {
    try {
        const page = await browser.newPage();
        return plugin(page, l1DataList[dataIndex]);
    } catch (error) {
        console.error(`Error in plugin ${dataIndex}:`, error);
        return null;
    }
}

async function l1DataRunner() {
    const browser = await puppeteerExtra.launch(browserConfig);
    if (!browser) throw new Error('Browser failed to launch');

    try {
        // 定义所有任务
        const tasks = [
            setupPluginWithPage(browser, btcPlugin, 0),
            setupPluginWithPage(browser, ethPlugin, 1),
            setupPluginWithPage(browser, solPlugin, 2),
            setupPluginWithPage(browser, bnbPlugin, 3),
            setupPluginWithPage(browser, dogePlugin, 4),
            avaxPlugin(l1DataList[5]), // 特殊处理不需要page的插件
            setupPluginWithPage(browser, tonPlugin, 7),
            suiPlugin(), // 特殊处理不需要page的插件
            nearPlugin(), // 特殊处理不需要page的插件
            setupPluginWithPage(browser, mantlePlugin, 9),
            setupPluginWithPage(browser, kasPlugin, 10)
        ];

        // 并行执行所有任务
        const results = await Promise.all(tasks);

        if (results.length !== 11) {
            console.log("L1 DailyData incomplete!");
            return ("L1 DailyData incomplete!", results);
        }
        // 处理结果
        //解構賦值[promiseResult]
        const [promiseResult] = await prisma.$transaction([
            prisma.l1DailyData.createMany({
                data: results.map(item => (item)),
            })
        ]);
        console.log();
        
        // 監控結果
        const savedCount = promiseResult.count; // 成功插入的記錄數
        const expectedCount = results.length; // 預期插入的記錄數

        if (savedCount === expectedCount) {
            console.log(`all completed successfully`);
            console.log("Number of L1 DailyData created:", savedCount);
        }else{
            console.log({
                message:"Some data might have been skipped",
                status: "partial_success",
                expectedCount: expectedCount,
                savedCount: savedCount,
            });
        }

        // results.forEach(async(result, index) => {
        //     //console.log(result,typeof(result));           
        //     if (result) {
        //         try {
        //             const l1DailyDataSaved = await prisma.l1DailyData.create({
        //                 data:result
        //             });  

        //         } catch (error) {
        //             // 如果是Prisma的验证错误，返回400状态码
        //             if (error.code === 'P2009') {
        //                 console.log("prisma Saved Fail,error code:P2009");
        //             }
        //             console.log("prisma Saved error",error);

        //         }   

        //         console.log(`Task ${index} completed successfully`);
        //     } else {
        //         console.log(`Task ${index} failed or returned null`);
        //     }
        // });

    } catch (error) {
        console.error('Error in l1DataRunner:', error);

    } finally {
        // 确保浏览器被关闭
        await browser.close();
        await prisma.$disconnect();
    }
}

// 执行主函数
await l1DataRunner().catch(error => {
    console.error('Main process error:', error);
    process.exit(1);
});