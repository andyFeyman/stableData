import axios from "axios";

export const CMAPIRequest = axios.create({
    baseURL:"https://pro-api.coinmarketcap.com",
    withCredentials:true,
    timeout: 1000,
    headers:{'Accept': 'application/json','CMC_PRO_API_KEY':process.env.CMC_PRO_API_KEY},
});

