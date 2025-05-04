import { suiApiRequest } from "../../../lib/apiRequest.js";

async function fetchWithDelay(url, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await suiApiRequest.get(url);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}

async function suiPlugin() {
  try {
    // 控制请求间隔时间，避免频繁请求
    const delay = 1000; // 每个请求之间延迟2秒（2000毫秒）

    // 1. 获取交易数据
    const tranResponse = await fetchWithDelay('/mainnet/api/statistic?type=txNum&days=14&isAccumulate=true', 0);

    const transNum = tranResponse.data.result[13].count;
    const transStr = transNum.toString();
    console.log("suiTransStr:", transStr);


    // 2. 获取TPS数据
   
    const tpsNum = (transNum/86400).toFixed(2);
    const tpsStr = tpsNum.toString();
    console.log("suiTpsStr:", tpsStr);

    // 3. 获取Gas数据
    // const suiPriceRespone = await fetchWithDelay('/mainnet/api/coin/sui',delay);

    // const suiPriceNum = suiPriceRespone.data.price;
    
  

    // const suiAverGasStr = suiAverGasRespone.data.result.avgGas;


    // const suiGasCost = (suiPriceNum * suiAverGas).toFixed(6);
    const suiGasCostStr = "null";
    console.log("suiGasCost:", suiGasCostStr);

    if (transStr && tpsStr && suiGasCostStr) {
      console.log(`this is SUI Chain dailyData:`, transStr, tpsStr, suiGasCostStr);
      return ({
        "l1Name": "Sui",
        "dailyTransaction": transStr,
        "tpsNum": tpsStr,
        "gasCost": suiGasCostStr,
      });
    } else {
      console.log(' SUI Chain dailyData failed:', transStr, tpsStr, suiGasCostStr);
      return ({
        "l1Name": "Sui",
        "dailyTransaction": "null",
        "tpsNum": "null",
        "gasCost": "null",
      });
    }

  } catch (error) {
    console.log('sui dailyData launch failed::', error);
    return ({
      "l1Name": "Sui",
      "dailyTransaction": "null",
      "tpsNum": "null",
      "gasCost": "null",
    });
  }
}

export default suiPlugin;
