import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";

export const l1AndL2Loader = async()=>{
    try {
        return defer({                         
            l2DataRespone : apiRequest('/l2/combinedL2Data'), // 未解析的 Promise
            l1DailyRespone : apiRequest('/l1/getL1DailyData'), // 未解析的 Promise
        })
    } catch (error) {
        console.dir(error);
    };
};


export const stableLoader = async()=>{
    try {
        // const stablePromise = await apiRequest("/stable/getDailyStable");
        // const stableATHPromise = await apiRequest("/stable/getStableATH");
        return defer({
            stableResponse: await apiRequest("/stable/getDailyStable"),
            stableATH: await apiRequest("/stable/getStableATH"),
        })
    } catch (error) {
        console.dir(error);
    }
};

