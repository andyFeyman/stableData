import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import moment from "moment";
import { CMAPIRequest } from '../lib/apiRequest.js';


const prisma = new PrismaClient();

const stableATHData = await prisma.stableATH.findFirst({
  select:{
    createdAt:true,
    volume:true,
  }
});

console.log(stableATHData);

const stableATHVolume = stableATHData.volume;


export const runTask =  async function(){
    try {
      console.log('开始执行定时任务...');
      
      // 请求外部API
  
      const response = await CMAPIRequest.get('/v1/global-metrics/quotes/latest');
      
      
      console.log(response);
      
      if(response){
        const stablecoinMarketCap =response.data.data.stablecoin_market_cap;

        console.log("this is stablecoinMarketCap:"+stablecoinMarketCap,typeof(stablecoinMarketCap));
        
        const stablecoinVolume24h = response.data.data.stablecoin_volume_24h;

        console.log("this is stablecoinVolume24h:"+stablecoinVolume24h,typeof(stablecoinVolume24h));
        
        const createdAt = response.data.status.timestamp;

        console.log("this is createdAt:"+createdAt,typeof(createdAt));

        const volMarketCapRatio = ((stablecoinVolume24h/stablecoinMarketCap)*100).toFixed(2) + '%';
        console.log("this is volMarketCapRatio:"+volMarketCapRatio,typeof(volMarketCapRatio));

        const dailyVolumeWithATH = ((stablecoinVolume24h/stableATHVolume)*100).toFixed(2)+"%";

        const daysFromATH = moment(createdAt).diff(moment(stableATHData.createdAt),"days");

        
        // 更新数据库
        await prisma.dailyStable.create({
          data: {
            createdAt: createdAt,
            volume: stablecoinVolume24h,
            marketCap: stablecoinMarketCap,
            volMarketCapRatio,
            dailyVolumeWithATH,
            daysFromATH
          }
        });
    
        console.log('数据更新成功');
      }
  
    } catch (error) {
      console.error('定时任务执行失败:', error);
    }
  };


// cron.schedule('*/1 * * * *', async()=>{
//     await runTask();
// });