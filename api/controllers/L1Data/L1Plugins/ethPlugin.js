async function ethPlugin(page,item) {
    try {
        // 获取交易数据
        await page.goto(item.tranUrl,{waitUntil: 'networkidle0',timeout: 30000});
        console.log("logding page:",item.tranUrl);
        
        await page.waitForSelector(item.tranSelector);
        await page.waitForSelector(item.gasSelector);

        const rawTrans = await page.$eval(item.tranSelector, el => el.innerText);

        const ethTransStr = rawTrans.replaceAll(',','');

        // 获取gas数据  
        const rawEthGasStr = await page.$eval(item.gasSelector, el => el.innerText);

        const ethGasCostStr = rawEthGasStr.match(/[\d\.]+/)[0];
        
        // 获取tps数据
        await page.goto(item.tpsUrl,{waitUntil: 'networkidle0',timeout: 30000});
    
        await page.waitForSelector(item.tpsSelector);
        
        const rawEthTps = await page.$eval(item.tpsSelector, el => el.innerText);
    
        //console.log(rawEthTps);
    
        const ethTpsStr = rawEthTps.match(/[\d\.]+/)[0];

        // 获取gas数据
        //await page.goto(item.gasUrl,{waitUntil: 'load',timeout: 30000});
    
        if(ethTransStr && ethTpsStr && ethGasCostStr){
            console.log(`this is ${item.name} dailyData:`,ethTransStr,ethTpsStr,ethGasCostStr);
            return ({
                "l1Name":item.name,
                "dailyTransaction":ethTransStr,
                "tpsNum":ethTpsStr,
                "gasCost":ethGasCostStr,
            });
        }else{
            console.log('eth dailyData failed:',ethTransStr,ethTpsStr,ethGasCostStr);
        }

    } catch (error) {
        console.log('browser ethPage launch failed:', error);
        
    }
}

export default ethPlugin;