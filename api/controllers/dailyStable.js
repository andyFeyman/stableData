import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import moment from "moment";
import { CMAPIRequest } from '../lib/apiRequest.js';


const prisma = new PrismaClient();

//获取历史ATH

const stableATHData = await prisma.stableATH.findFirst({
  orderBy:{
    createdAt:'desc'
  }
});

const stableATHVolumeStr = stableATHData.volume.toString();
const stableATHVolume = BigInt(stableATHVolumeStr.split('.')[0]);
console.log("stableATHVolume :",stableATHVolume);


export const runTask =  async function(){
    try {
      console.log('开始执行任务...');
      // 请求外部API
      const response = await CMAPIRequest.get('/v1/global-metrics/quotes/latest');
      
      //console.log(response);
      //需要response.data才能取到响应体的数据
      //用toString()+BigInt()+number()的原因:
      // BigInt 不能直接与小数进行运算
      // BigInt 除法运算会自动向下取整，丢失小数部分
      // BigInt/BigInt  不支持 .toFixed() 方法
      
      if(response){
        // 将小数转换为整数，比如乘以 100 保留 2 位小数
        const marketCapStr = response.data.data.stablecoin_market_cap.toString();
        const volumeStr = response.data.data.stablecoin_volume_24h.toString();
        
        // 移除小数点，转换为整数
        const stablecoinMarketCap = BigInt(marketCapStr.split('.')[0]);
        const stablecoinVolume24h = BigInt(volumeStr.split('.')[0]);

        // console.log("this is stablecoinMarketCap: "+stablecoinMarketCap,typeof(stablecoinMarketCap));
        // console.log("this is stablecoinVolume24h: "+stablecoinVolume24h,typeof(stablecoinVolume24h));
        
        const createdAt = response.data.status.timestamp;

        //console.log("this is createdAt: "+createdAt,typeof(createdAt));

        const volMarketCapRatio = ((Number(stablecoinVolume24h)/Number(stablecoinMarketCap))*100).toFixed(2) + '%';
        //console.log("this is volMarketCapRatio: "+volMarketCapRatio,typeof(volMarketCapRatio));

        const dailyVolumeWithATH = ((Number(stablecoinVolume24h)/Number(stableATHVolume))*100).toFixed(2)+"%";
        //console.log("this is dailyVolumeWithATH: "+dailyVolumeWithATH,typeof(dailyVolumeWithATH));


        const daysFromATH = moment(createdAt).diff(moment(stableATHData.createdAt),"days");
        //console.log("this is daysFromATH: "+daysFromATH,typeof(daysFromATH));

        const dailyData = {
          createdAt: createdAt,
          volume: stablecoinVolume24h,
          marketCap: stablecoinMarketCap,
          volMarketCapRatio,
          dailyVolumeWithATH,
          daysFromATH
        }

        // 更新数据库
        await prisma.dailyStable.create({
          data: dailyData
        });

      
        console.log('日常Stable数据更新成功:',dailyData);

        // 更新ATH记录
        if(stablecoinVolume24h > stableATHVolume){
          console.log("new ATH created!!!!!!! new ATH created!!!!!!! new ATH created!!!!!!!");
          try {
            await prisma.stableATH.create({
              data:{
                createdAt:createdAt,
                volume:stablecoinVolume24h,
                marketCap:stablecoinMarketCap,
                volMarketCapRatio:volMarketCapRatio
              }
            })
          } catch (error) {
            console.log("new ATH created fail: "+error);
            
          }
        }

        return (dailyData);
      }

    } catch (error) {
      console.error('任务执行失败:', error);
    }
  };

export async function getDailyStable(){
  await runTask();
}

//getDailyStable();

// cron.schedule('*/1 * * * *', async()=>{
//     await runTask();
// });
