
async function btcPlugin(page,item) {
    try {
         //1. 获取交易数据

         await page.goto(item.tranUrl,{waitUntil: 'networkidle0',timeout: 30000});

         console.log("logding page:",item.tranUrl);
         
        
         await page.waitForSelector(item.tranSelector);
 
         const rawBtcTrans = await page.$eval(item.tranSelector, el => el.innerText);
 
         const btcTransStr = rawBtcTrans.replaceAll(',','');
         
         // 3. 获取tps数据
         await page.goto(item.tpsUrl,{waitUntil: 'networkidle0',timeout: 30000});
     
         await page.waitForSelector(item.tpsSelector);
         
         const rawBtcTps = await page.$eval(item.tpsSelector, el => el.innerText);
 
         const btcTpsStr = rawBtcTps.match(/[\d\.]+/)[0];
 
         // 4. 获取gas数据
         await page.goto(item.gasUrl,{waitUntil: 'networkidle0',timeout: 30000});
     
         await page.waitForSelector(item.gasSelector);
 
         const rawBtcGasStr = await page.$eval(item.gasSelector, el => el.innerText);
 
         const btcGasCostStr = rawBtcGasStr.match(/[\d\.]+/)[0];

 
         if(btcTransStr && btcTpsStr && btcGasCostStr){
             console.log(`this is ${item.name} dailyData:`,btcTransStr,btcTpsStr,btcGasCostStr);
             return ({
                "l1Name":item.name,
                "dailyTransaction":btcTransStr,
                "tpsNum":btcTpsStr,
                "gasCost":btcGasCostStr,
            });
         }else{
             console.log('btc dailyData failed:',btcTransStr,btcTpsStr,btcGasCostStr);
             return ({
                "l1Name":"Bitcion Data failed",
                "dailyTransaction":"null",
                "tpsNum":"null",
                "gasCost":"null",
            })
         }


    } catch (error) {
        console.log('browser btcPage launch failed::', error);
        
    }
}

export default btcPlugin;