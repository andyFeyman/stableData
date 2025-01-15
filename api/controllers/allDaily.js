import {getL2DailyTps} from './dailyL2Tps.js';
import {getL2DailyTrans} from './dailyL2Trasactions.js';
import {getGasCost} from './realTimeGasCost.js';
import {getDailyStable} from './dailyStable.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const gasCostObject = await getGasCost();

const transactionObject = await getL2DailyTrans();

const tpsObject = await getL2DailyTps();


// save to MongoDB
// model L2DailyData {
//     id String @id @default(auto())  @map("_id") @db.ObjectId
//     updateTime DateTime
//     dailyTransaction  Json
//     tpsNum Json
//     gasCost Json
//   }
export async function saveDailyData() {

    if(gasCostObject && transactionObject && tpsObject){
    
        console.log(gasCostObject,transactionObject,tpsObject);

        let newDailyL2Data = null; // Initialize with null

        try {
            const dailyStableData = await getDailyStable();

            newDailyL2Data = await prisma.l2DailyData.create({
                data:{
                    dailyTransaction:transactionObject,
                    tpsNum:tpsObject,
                    gasCost:gasCostObject
                }
            });

            console.log("日常L2数据更新成功:");
            
            console.log({newDailyL2Data,dailyStableData});
            //要返回多个值，应该使用对象:
            return {newDailyL2Data,dailyStableData};

        } catch (error) {
            console.log(error);
        }; 
    }else{
        console.log("daily data didn't prepared!");
        return null;
      
    };
    

};

await saveDailyData();
