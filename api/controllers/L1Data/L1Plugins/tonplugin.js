async function tonPlugin(page,item) {
    try {
        // 获取交易数据
        await page.goto(item.tranUrl,{waitUntil: 'domcontentloaded',timeout: 30000});
        console.log("logding page:",item.tranUrl);
        
        await page.waitForSelector(item.tranSelector);
        await page.waitForSelector(item.totallyFee);

        const rawTrans = await page.$eval(item.tranSelector, el => el.innerText);

        const tonTransStr = rawTrans.replaceAll(',','');
        //console.log("tonTransStr: ",tonTransStr);
        

        // 计算gasNum数据  
        const rawFeeStr = await page.$eval(item.totallyFee, el => el.innerText);

        const feeStr = rawFeeStr.replaceAll(',','');

        const tonGasNum = (Number(feeStr)/Number(tonTransStr)).toFixed(6);
        //console.log("tonGasNum: ",tonGasNum);

        //get price num
        await page.goto(item.priceUrl,{waitUntil: 'domcontentloaded',timeout: 30000})

        await page.waitForSelector(item.priceSelector);

        const priceText = await page.$eval(item.priceSelector,el => el.innerText)

        const priceStr = priceText.match(/[\d\.]+/)[0];
        const priceNum = Number(priceStr);
        //console.log("priceNum: ",priceNum);

        //get gasCost
        const tonGasCost = (priceNum * tonGasNum).toFixed(6);
        //console.log("tonGasCost: ",tonGasCost);
        
        
        // 获取tps数据
        await page.goto(item.tpsUrl,{waitUntil: 'domcontentloaded',timeout: 30000});
    
        await page.waitForSelector(item.tpsSelector);
        
        const tonTpsStr = await page.$eval(item.tpsSelector, el => el.innerText);
    
        //console.log("tonTpsStr:",tonTpsStr);
    
    
        if(tonTransStr && tonTpsStr && tonGasCost){
            console.log(`this is ${item.name} dailyData:`,tonTransStr,tonTpsStr,tonGasCost);
            return ({
                "l1Name":item.name,
                "dailyTransaction":tonTransStr,
                "tpsNum":tonTpsStr,
                "gasCost":tonGasCost,
              });
        }else{
            console.log('eth dailyData failed:',tonTransStr,tonTpsStr,tonGasCost);
        }

    } catch (error) {
        console.log('tonPage launch failed:', error);
        
    }
}

export default tonPlugin;