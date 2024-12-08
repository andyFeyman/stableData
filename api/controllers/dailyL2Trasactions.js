import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteerExtra from 'puppeteer-extra';

const tpsLinks = [
    "https://arbiscan.io/",
    "https://basescan.org/",
    "https://optimistic.etherscan.io/",
    "https://blastscan.io/",
    "https://era.zksync.network/",
    "https://lineascan.build/"
];

function getYesterdayTimestamp() {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(8, 0, 0);
    // 使用 Math.floor() 将毫秒时间戳向下取整为秒级整数
    const timestamp = Math.floor(today.getTime() / 1000); 
  
    return timestamp;
}

