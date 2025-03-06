import {getL2DailyTps} from './dailyL2Tps.js';
import {getL2DailyTrans} from './dailyL2Trasactions.js';
import {getGasCost} from './realTimeGasCost.js';
import {getDailyStable} from './dailyStable.js';
import { PrismaClient } from '@prisma/client';
import { getCombinedL2Data } from './l2DailyData.js';
import inkPlugin from './NewL2Data/ink.js';

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

// Save json data to  db
export async function saveDailyL2DataToJson() {

    try {
       const firstResult = await saveDailyData();
        const l2List  = await getCombinedL2Data();
        const inkData = await inkPlugin();
        l2List.push(inkData);
        //console.log(l2List);
        // Sort the L2 dataList
        l2List.sort((a,b) => b.dailyTransaction - a.dailyTransaction);

        const saveDB = await prisma.l2CombinedData.create({
            data:{
                l2DailyData:l2List,
            }
        });

        if(saveDB){
            console.log("日常L2数据更新成功:",saveDB);
        }else{
            console.log(error);
        }

    } catch (error) {

        console.log("daily data didn't prepared!");
        return null;
    }
};

await saveDailyL2DataToJson();