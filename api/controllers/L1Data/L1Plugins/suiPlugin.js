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
    const delay = 2000; // 每个请求之间延迟2秒（2000毫秒）

    // 1. 获取交易数据
    const tranResponse = await fetchWithDelay('/sui/v1/widgets/total-transactions?period=DAY&size=SMALL', 0);

    const transNum = tranResponse.data.value;
    const transStr = transNum.toString();
    console.log("suiTransStr:", transStr);


    // 2. 获取TPS数据
    const tpsRespone = await fetchWithDelay('/sui/v1/widgets/tps?period=DAY&size=SMALL', delay);
    const tpsNum = tpsRespone.data.value;
    const tpsStr = tpsNum.toString();
    console.log("suiTpsStr:", tpsStr);

    // 3. 获取Gas数据
    const suiPriceRespone = await fetchWithDelay('/sui/v1/widgets/get-price', delay);
    const suiAverGasRespone = await fetchWithDelay('/sui/v1/widgets/avg-fee?period=DAY&size=SMALL', delay);

    const suiPriceNum = suiPriceRespone.data.price;
    const suiAverGas = suiAverGasRespone.data.value.toFixed(6);
    const suiGasCost = (suiPriceNum * suiAverGas).toFixed(6);
    const suiGasCostStr = suiGasCost.toString();
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
