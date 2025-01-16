import axios from "axios";
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config({ path: '../.env' });

export const CMAPIRequest = axios.create({
    baseURL:"https://pro-api.coinmarketcap.com",
    withCredentials:true,
    timeout: 3000,
    headers:{'Accept': 'application/json','X-CMC_PRO_API_KEY':process.env.CMC_PRO_API_KEY},
});


export const baseApiRequest = axios.create({
    baseURL:"https://api.basescan.org",
    withCredentials:true,
    timeout: 3000,
    headers:{'Accept': 'application/json'},
});


