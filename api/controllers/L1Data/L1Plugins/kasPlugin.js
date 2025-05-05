async function kasPlugin(page,item) {
    try {
        // 获取交易数据
        await page.goto(item.url,{waitUntil: 'domcontentloaded',timeout: 30000});
        console.log("logding page:",item.url);
        
        await page.waitForSelector(item.tranSelector);
        await page.waitForSelector(item.tpsSelector);

        const rawTrans = await page.$eval(item.tranSelector, el => el.innerText);
        const kasTransStr = rawTrans.replaceAll(',','');
        console.log("kasTransStr: ",kasTransStr);

        // 获取tps数据
        const rawTps = await page.$eval(item.tpsSelector, el => el.innerText);
        //console.log(rawEthTps);
        const kasTpsStr = rawTps.match(/[\d\.]+/)[0];
        console.log("kasTpsStr: ",kasTpsStr);

        // 获取gas数据  

        await page.goto(item.gasUrl,{waitUntil: 'domcontentloaded',timeout: 30000});

        //添加延迟，以便数据完全响应再进行下一步。当然用waitUntil: 'networkidle0'也行。
        //await new Promise(resolve => setTimeout(resolve, 2500)); 

        page.waitForSelector(item.gasSelector);
        page.waitForSelector(item.priceSelector);

        const rawGasStr = await page.$eval(item.gasSelector, el => el.innerText);
        //console.log("rawGasStr: ",rawGasStr,typeof(rawGasStr));

        const gasStr = rawGasStr.match(/[\d\.]+/)[0];
        
        const gasNum = Number(gasStr);
        //console.log("gasNum: ",gasNum);

        const rawPriceStr = await page.$eval(item.priceSelector,el => el.innerText);
        const priceStr = rawPriceStr.match(/[\d\.]+/)[0];

        const priceNum = Number(priceStr);
        //console.log("priceNum: ",priceNum);

        const kasGasCost = (gasNum*priceNum).toFixed(6);
        const kasGasCostStr = kasGasCost.toString();
    
        console.log("kasGasCostStr: ",kasGasCostStr);
        
        if(kasTransStr && kasTpsStr && kasGasCostStr){
            console.log(`this is ${item.name} dailyData:`,kasTransStr,kasTpsStr,kasGasCostStr);
            return ({
                "l1Name":item.name,
                "dailyTransaction":kasTransStr,
                "tpsNum":kasTpsStr,
                "gasCost":kasGasCostStr,
            });
        }else{
            console.log('eth dailyData failed:',kasTransStr,kasTpsStr,kasGasCostStr);
        }

    } catch (error) {
        console.log('kasPage launch failed:', error);
        
    }
}

export default kasPlugin;