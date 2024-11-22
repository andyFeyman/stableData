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

const stableATHVolume = Number(stableATHData.volume);


export const runTask =  async function(){
    try {
      console.log('开始执行定时任务...');
      
      // 请求外部API
  
      const response = await CMAPIRequest.get('/v1/global-metrics/quotes/latest');

      console.log(response);
      
      if(response){
        const stablecoinMarketCap =Number(response.data.stablecoin_market_cap);
        const stablecoinVolume24h = Number(response.data.stablecoin_volume_24h);
        const createdAt = response.status.timestamp;
        const volMarketCapRatio = ((stablecoinVolume24h/stablecoinMarketCap)*100).toFixed(2) + '%';
        const dailyVolumeWithATH = ((stablecoinVolume24h/stableATHVolume)*100).toFixed(2)+"%";
        const daysFromATH = moment(createdAt).diff(moment(stableATHData.createdAt),"days");

        // 更新数据库
        await prisma.dailyStable.create({
          data: {
            createdAt: createdAt,
            volume: Number(stablecoinVolume24h),
            marketCap: Number(stablecoinMarketCap),
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