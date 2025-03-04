import axios from "axios";
import axiosRetry from "axios-retry";

//add axios error retry function;
axiosRetry(axios, {
    retries: 2,
    retryDelay: (retryCount) => { retryCount * 1000 },
    retryCondition: (error) => {
        // if http status code: 401，then retry
        if (error.response && error.response.status === 401) {
            console.log("Received 401, retrying...");
            return true;
        }
        // if status right won't retry request.
        return false;
    },
});



function formatNumber(str) {
    // 1. 将字符串转换为 BigInt 类型，避免超出 JavaScript Number 的精度范围
    const bigIntValue = BigInt(str);

    // 2. 定义 10 的 18 次方
    const divisor = BigInt(10) ** BigInt(18);

    // 3. 进行除法运算
    const result = bigIntValue / divisor;

    // 4. 计算余数，用于后面的四舍五入
    const remainder = bigIntValue % divisor;

    // 5. 将结果转换为 Number 类型，并加上余数部分进行四舍五入
    let numResult = Number(result) + Number(remainder) / Number(divisor);

    // 6. 使用 toFixed(2) 方法保留两位小数
    const formattedResult = numResult.toFixed(2);

    return formattedResult;
}


async function avaxPlugin(item) {
    try {
        const tranRespone = await axios.get(item.tranUrl,{ timeout: 10000 });
        const data = tranRespone.data;
        // 检查数据是否是一个数组，并且至少有2个元素
        if (!Array.isArray(data) || data.length < 2) {
            throw new Error("数据格式错误");
        }
        // 获取第二个元素
        const secondElement = data[1];
        // 检查第二个元素是否是数组，并且至少有2个元素
        // 获取第二个元素的第二个值
        const avaxTranStr = secondElement[1];
        //console.log("avax yesterday trans num:", avaxTranStr);

        //计算tps
        const tpsNum = (Number(avaxTranStr) / 86400).toFixed(2);
        const tpsStr = tpsNum.toString();
        //console.log("avax yesterday tps num:", tpsStr);

        //计算gasCost 
        //const wholeFeeUrl = getDailyFeeUrl();
        const gasResponse = await axios.get(item.gasUrl,{ timeout: 10000 });
        const bigNumGasFeeStr = gasResponse.data[1][1];
        //console.log("bigNumGasFeeStr:", bigNumGasFeeStr);
        const totalGasFee = formatNumber(bigNumGasFeeStr);
        //console.log("Avax totalGasFee:", totalGasFee);
        const averageGasFee = (totalGasFee / Number(avaxTranStr)).toFixed(6);
        //console.log("averageGasFee:", averageGasFee);
        const priceResponse = await axios.get(item.priceUrl);
        //console.log(priceResponse.data['avalanche-2'].usd);
        const avaxPrice = priceResponse.data['avalanche-2'].usd;

        const gasCost = (averageGasFee * avaxPrice).toFixed(6);
        const gasCostStr = gasCost.toString();

        console.log("this is avax data: ", avaxTranStr, tpsStr, gasCostStr);

        return ({
            "l1Name": item.name,
            "dailyTransaction": avaxTranStr,
            "tpsNum": tpsStr,
            "gasCost": gasCostStr,
        });
    }
    catch (error) {
        console.error("获取 avax 交易数据失败", error);
        return ({
            "l1Name": item.name,
            "dailyTransaction": "null",
            "tpsNum": "null",
            "gasCost": "null",
        });
    };
};

export default avaxPlugin;