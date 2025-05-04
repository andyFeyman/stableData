async function dogePlugin(page,item) {
    try {
        //1. 获取交易数据
        await page.goto(item.url, {waitUntil: 'domcontentloaded',timeout: 30000});
      
        console.log("logding page:",item.url);

        await page.waitForSelector(item.tranSelector,{timeout: 30000});
        await page.waitForSelector(item.tpsSelector,{timeout: 30000});
        await page.waitForSelector(item.gasSelector,{timeout: 30000});
    
        const rawDogeTrans = await page.$eval(item.tranSelector, el => el.innerText);
        const dogeTransStr = rawDogeTrans.replaceAll(',','');

        //console.log(dogeTransStr);
        
        // 3. 获取tps数据
        const rawDogeTps = await page.$eval(item.tpsSelector, el => el.innerText);
        //console.log(rawDogeTps);
        

        // 4. 获取gas数据
        const rawDogeGasStr = await page.$eval(item.gasSelector, el => el.innerText);

        const dogeGasCostStr = rawDogeGasStr.match(/[\d\.]+/)[0];
        //console.log(dogeGasCostStr);
        

        if(dogeTransStr && rawDogeTps && dogeGasCostStr){
            console.log(`this is ${item.name} dailyData:`,dogeTransStr,rawDogeTps,dogeGasCostStr);
            return ({
                "l1Name":item.name,
                "dailyTransaction":dogeTransStr,
                "tpsNum":rawDogeTps,
                "gasCost":dogeGasCostStr,
            });
        }else{
            console.log('doge dailyData failed:',dogeTransStr,rawDogeTps,dogeGasCostStr);

        }


} catch (error) {
    console.log('browser dogePage launch failed::', error);
}
}

export default dogePlugin;