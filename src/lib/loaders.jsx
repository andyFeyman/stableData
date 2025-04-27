import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";

export const l1AndL2Loader = async()=>{
    try {
        return defer({                         
            l2DataRespone : apiRequest('/l2/l2DailyJson'), // 未解析的 Promise
            l1DailyRespone : apiRequest('/l1/getL1DailyData'), // 未解析的 Promise
        })
    } catch (error) {
        console.dir(error);
    };
};


export const stableLoader = async()=>{
    try {
        // const stablePromise = await apiRequest("/stable/getDailyStable");
        // 请求内容不能加 await, 不然返回结果不是Promise
        return defer({
            stableResponse: apiRequest("/stable/getDailyStable"),
            stableATH:  apiRequest("/stable/getStableATH"),
        })
    } catch (error) {
        console.dir(error);
    }
};


export const latestKeyDataLoader = async()=>{
    try {
        // 请求接口不能加 await, 不然返回结果不是Promise
        //const btcPromise = await apiRequest("/btc/latestKeyData")
        return defer({
            latestKeyDataResponse: apiRequest("/btc/latestKeyData"),
        })
    } catch (error) {
        console.dir(error);
    }
};

