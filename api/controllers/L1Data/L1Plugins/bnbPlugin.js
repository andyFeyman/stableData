async function bnbPlugin(page,item) {
    try {
        // 获取交易数据
        await page.goto(item.tranUrl,{waitUntil: 'networkidle0',timeout: 30000});
        console.log("logding page:",item.tranUrl);
        
        await page.waitForSelector(item.tranSelector);
        await page.waitForSelector(item.gasSelector);

        const rawTrans = await page.$eval(item.tranSelector, el => el.innerText);

        const bnbTransStr = rawTrans.replaceAll(',','');

        // 获取gas数据  
        const rawBnbGasStr = await page.$eval(item.gasSelector, el => el.innerText);

        const bnbGasCostStr = rawBnbGasStr.match(/[\d\.]+/)[0];
        
        // 获取tps数据
        await page.goto(item.tpsUrl,{waitUntil: 'networkidle0',timeout: 30000});
    
        await page.waitForSelector(item.tpsSelector);
        
        const rawBnbTps = await page.$eval(item.tpsSelector, el => el.innerText);
    
        //console.log(rawEthTps);
    
        const bnbTpsStr = rawBnbTps.match(/[\d\.]+/)[0];

        // 获取gas数据
        //await page.goto(item.gasUrl,{waitUntil: 'load',timeout: 30000});
    
        if(bnbTransStr && bnbTpsStr && bnbGasCostStr){
            console.log(`this is ${item.name} dailyData:`,bnbTransStr,bnbTpsStr,bnbGasCostStr);
            return ({
                "l1Name":item.name,
                "dailyTransaction":bnbTransStr,
                "tpsNum":bnbTpsStr,
                "gasCost":bnbGasCostStr,
            });
        }else{
            console.log('Binance dailyData failed:',bnbTransStr,bnbTpsStr,bnbGasCostStr);
        }

    } catch (error) {
        console.log('browser bnbPage launch failed:', error);
        
    }
}

export default bnbPlugin;