
async function solPlugin(page,item) {
    try {
        
        await page.goto(item.url,{waitUntil:'networkidle0',timeout: 30000});
        console.log("logding page:",item.url);
        
        await page.waitForSelector(item.tpsSelector);

        const rawTps = await page.$eval(item.tpsSelector, el => el.innerText);

        const tpsNum = parseFloat(rawTps.replaceAll(',',''));

        const transStr =  (tpsNum*60*60*24).toString();

        const tpsStr = tpsNum.toString();

        //console.log(transStr,tpsStr);
        
       //通过正则提取价格
        const priceString = await page.$eval(item.priceSelector, el => {return el.innerText.match(/\$(\d+\.?\d*)/)?.[1] || '';});

        const gasFeeString = await page.$eval(item.gasSelector, el => el.innerText);
        
        // console.log("this is price:",priceString);
        // console.log("this is gasFee:",gasFeeString);

        const gasCostStr = (Number(gasFeeString)*Number(priceString)).toFixed(4);

        if(transStr && tpsStr && gasCostStr){
            console.log(`this is ${item.name} dailyData:`,transStr,tpsStr,gasCostStr);
            return ({
                "l1Name":item.name,
                "dailyTransaction":transStr,
                "tpsNum":tpsStr,
                "gasCost":gasCostStr,
            });
        }else{
            console.log('sol dailyData failed:',transStr,tpsStr,gasCostStr);
        }

    } catch (error) {
        console.log('failed:', error);
        
    }
}

export default solPlugin;