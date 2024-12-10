import axios from "axios";

export const CMAPIRequest = axios.create({
    baseURL:"https://pro-api.coinmarketcap.com",
    withCredentials:true,
    timeout: 1000,
    headers:{'Accept': 'application/json','X-CMC_PRO_API_KEY':process.env.CMC_PRO_API_KEY},
});


export const baseApiRequest = axios.create({
    baseURL:"https://api.basescan.org",
    withCredentials:true,
    timeout: 2000,
    headers:{'Accept': 'application/json'},
});
