import dotenv from 'dotenv';
import axios from "axios";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);  // 获取当前文件的绝对路径
const __dirname = dirname(__filename);              // 获取当前文件所在目录

//这样做的目的是确保无论从哪个目录运行代码，都能正确找到 .env 文件。
dotenv.config({ path: join(__dirname, '../.env') });


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

export const suiApiRequest = axios.create({
    baseURL:"https://api.blockberry.one",
    withCredentials:true,
    timeout: 30000,
    headers:{
        'Accept': '*/*',
        'x-api-key': process.env.BLOCKBERRY_API_KEY,
        },
});

export const nearApiRequest = axios.create({
    baseURL:"https://api.nearblocks.io",
    withCredentials:true,
    timeout: 30000,
    headers:{
        'Accept': '*/*',
        'Authorization': `Bearer ${process.env.NEAR_KEY}`,
        },
});


//console.log("env blockberry api key:",process.env.BLOCKBERRY_API_KEY);

