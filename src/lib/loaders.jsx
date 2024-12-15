import { defer } from "react-router-dom";
import apiRequest from "./apiRequest.js";


export const l2DataLoader = async()=>{
    try {
        const l2DataPromise = await apiRequest("/l2/combinedL2Data");
       
        return defer({                         
            l2DataRespone : l2DataPromise,
        })
    } catch (error) {
        console.dir(error);
    }
};


export const stableLoader = async()=>{
    try {
        const stablePromise = await apiRequest("/stable/getDailyStable");
        const stableATHPromise = await apiRequest("/stable/getStableATH");
        return defer({
            stableResponse: stablePromise,
            stableATH: stableATHPromise,
        })

    } catch (error) {
        console.dir(error);
    }
}


