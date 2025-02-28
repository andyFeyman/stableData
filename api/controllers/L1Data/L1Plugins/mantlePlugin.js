
async function getAverGas(page,item){
    const gasFeeList = [];
    try {
        await page.goto(item.gasUrl,{
            waitUntil: 'networkidle2',
        });
        page.waitForSelector(item.gasSelector);
    } catch (error) {
        console.log("Gas Url Or gasSelector open fail:",error);
    }

    for(let i =1; i<20; i++){
        const selector = `#ContentPlaceHolder1_divTransactions > div.table-responsive > table > tbody > tr:nth-child(${i}) > td.small.text-muted.showTxnFee`;
        try {           
            //await page.waitForSelector(selector);
            const gasFeeStr = await page.$eval(selector, element => element.textContent.replace(/[^0-9.]/g, ''));
            const fixFloatStr = parseFloat(gasFeeStr).toFixed(8);
            gasFeeList.push(parseFloat(fixFloatStr));
        } catch (error) {
            console.error("mantle Gas selector fail:", error);
        }
    };
    try {
        //console.log(gasFeeList);
        const gasSum = gasFeeList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const gasAverageNum =parseFloat((gasSum/20).toFixed(6));
        console.log("gasAverageNum is: ",gasAverageNum);
        return gasAverageNum;
    } catch (error) {
        console.log("aver gas caculate fail: ",error);
    }
};

async function mantlePlugin(page,item) {
    
    try {
        // 获取交易数据
        await page.goto(item.tranUrl,{waitUntil: 'networkidle0',timeout: 30000});
        console.log("logding page:",item.tranUrl);
        
        await page.waitForSelector(item.tranSelector);
        await page.waitForSelector(item.priceSelector);
        
        const rawTrans = await page.$eval(item.tranSelector, el => el.innerText);

        const mantleTransStr = rawTrans.replaceAll(',','');
        console.log("mantleTransStr: ",mantleTransStr);
        

        //get price num
        const priceText = await page.$eval(item.priceSelector,el => el.innerText)
        const priceStr = priceText.match(/[\d\.]+/)[0];
        const priceNum = Number(priceStr);
        //console.log("priceNum: ",priceNum);

        //get gasCost
        const averGas = await getAverGas(page,item);
        const mantleGasCost = (priceNum * averGas).toFixed(6);
        console.log("mantleGasCost: ",mantleGasCost);
               
        // 获取tps数据
        await page.goto(item.tpsUrl,{waitUntil: 'networkidle0',timeout: 30000});
    
        await page.waitForSelector(item.tpsSelector);
        
        const rawTpsStr = await page.$eval(item.tpsSelector, el => el.innerText);

        const mantleTpsStr = rawTpsStr.match(/[\d\.]+/)[0];
    
        console.log("mantleTpsStr:",mantleTpsStr);
      
        if(mantleTransStr && mantleTpsStr && mantleGasCost){
            console.log(`this is ${item.name} dailyData:`,mantleTransStr,mantleTpsStr,mantleGasCost);
            return ({
                "l1Name":item.name,
                "dailyTransaction":mantleTransStr,
                "tpsNum":mantleTpsStr,
                "gasCost":mantleGasCost,
            });
        }else{
            console.log('eth dailyData failed:',mantleTransStr,mantleTpsStr,mantleGasCost);
        }

    } catch (error) {
        console.log('mantlePage launch failed:', error);
        
    }
};

export default mantlePlugin;