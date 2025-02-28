import { nearApiRequest } from "../../../lib/apiRequest.js";
import axios from "axios";
import axiosRetry from "axios-retry";

//这会在请求失败时自动重试 3 次，每次间隔递增（1秒、2秒、3秒）。
axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => retryCount * 1000 });

async function getLastChartObject(url) {
    try {
      const response = await axios.get(url,{timeout:10000});
  
      // 检查响应状态码
      if (response.status !== 200) {
        console.error("请求失败，状态码:", response.status);
        return null;
      }
  
      // 确保 response.data 是一个对象，并且包含 charts 数组
      if (typeof response.data !== 'object' || response.data === null || !Array.isArray(response.data.charts)) {
        console.error("响应数据格式不正确:", response.data);
        return null;
      }
  
      const charts = response.data.charts;
  
      // 获取最后一个元素
      if (charts.length > 0) {
        //console.log(charts[charts.length - 1],typeof(charts[charts.length - 1]));
        return charts[charts.length - 1];
        
      } else {
        console.log("charts 数组为空。");
        return null;
      }
  
    } catch (error) {
      console.error("请求失败:", error);
      return null;
    }
  }


async function nearPlugin() {
    try {
      // 获取交易数据
      // 定义变量，初始化为 null，避免作用域问题
      let nearTxs = null;
      let nearTpsStr = null;
      let gasAverCost = null;

      const lastObject = await getLastChartObject("https://api.nearblocks.io/v1/charts");
      //console.log(lastObject);
      
      if(lastObject){
          const nearTxs = lastObject.txns;
          console.log("nearTxs: ",nearTxs);

          const nearTps = (Number(nearTxs)/86400).toFixed(2);
          const nearTpsStr = nearTps.toString();
          console.log("nearTps: ",nearTpsStr);

          const gasAverCost = (Number(lastObject.txn_fee_usd)/Number(nearTxs)).toFixed(6);
          console.log("gasCost: ",gasAverCost);

          if(nearTxs && nearTpsStr && gasAverCost){

              console.log(`this is near dailyData:`,nearTxs,nearTpsStr,gasAverCost);

              return ({
                "l1Name":"Near",
                "dailyTransaction":nearTxs,
                "tpsNum":nearTpsStr,
                "gasCost":gasAverCost,
              });

          }else{
              console.log('Near dailyData incompleted:',nearTxs,nearTpsStr,gasAverCost);

          }

      }else{
          console.log("API response Fail:",error);
      };
  
    } catch (error) {
      console.log('near launch failed:', error);
      return null; // 返回 null 表示异常
    }
}

export default nearPlugin;