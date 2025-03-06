import newL2List from "../../lib/newL2Data.js";
import { baseApiRequest } from "../../lib/apiRequest.js";
import axios from "axios";
import axiosRetry from "axios-retry";


// get ETH price
async function getEthPrice(){
    try {
        const response = await baseApiRequest(`/api?module=stats&action=ethprice&apikey=${process.env.BASE_API_KEY}`);
        const ethRealTimePrice = parseFloat(parseFloat(response.data.result.ethusd).toFixed(4));
        return (ethRealTimePrice);
    } catch (error) {
        console.log(error);
    }
};

//add https retry setting
axiosRetry(axios, { retries: 2, retryDelay: (retryCount) => retryCount * 1000 });


const now = new Date();
const nowTime = now.toISOString();

const inkData = newL2List[0];
//get ink Data
async function inkPlugin(params) {
    try {
        const ethPrice = await getEthPrice();
        const respone = await axios.get(inkData.api,{timeout:10000});
        //console.log(ethPrice,respone.data);
        const averFeeStr = respone.data.average_transactions_fee_24h.value;
        const averFeeNum = parseFloat(averFeeStr).toFixed(8);
        const txsStr = respone.data.transactions_24h.value;
        const txsNum = Number(txsStr);
        const tpsStr = (txsNum/86400).toFixed(2);
        const tpsNum =Number(tpsStr);
        const feeCostStr = (ethPrice*averFeeNum).toFixed(6);
        
        //console.log(txsStr,tpsStr,feeCostStr);
        if(feeCostStr && tpsNum && txsNum){
            return ({
                "id":inkData.id,
                "l2IconImg":inkData.icon,
                "l2Name":inkData.name,
                "l2ExplorerLink":[inkData.url],
                "updateTime":nowTime,
                "gasCost":feeCostStr,
                "tpsNum":tpsNum,
                "dailyTransaction":txsNum
            });
        }else{
            console.log("ink chain data had error!");
            
            return ({
                "id":inkData.id,
                "l2IconImg":inkData.icon,
                "l2Name":inkData.name,
                "l2ExplorerLink":[inkData.url],
                "updateTime":nowTime,
                "gasCost":"null",
                "tpsNum":"null",
                "dailyTransaction":"null"
            });
        }
        
    } catch (error) {
        console.log("ink plugin error:",error);
        
    }
};


//inkPlugin();


export default inkPlugin;

