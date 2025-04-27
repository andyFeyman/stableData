import {getL2DailyTps} from './dailyL2Tps.js';
import {getL2DailyTrans} from './dailyL2Trasactions.js';
import {getGasCost} from './realTimeGasCost.js';
import {getDailyStable} from './dailyStable.js';
import { PrismaClient } from '@prisma/client';
import { getCombinedL2Data } from './l2DailyData.js';
import inkPlugin from './NewL2Data/ink.js';

const prisma = new PrismaClient();

export async function saveDailyData() {

    let gasCostObject = null;
    let transactionObject = null;
    let tpsObject = null;
    let dailyStableData = null; // Also fetch this inside

    // 尝试获取 gasCostObject
    try {
        gasCostObject = await getGasCost();
        console.log("Fetched gasCostObject:", !!gasCostObject); // Log if data was fetched
    } catch (error) {
        console.error("Error fetching gasCostObject:", error);
        gasCostObject = null; // Ensure it's null on error
    }

    // 尝试获取 transactionObject
    try {
        transactionObject = await getL2DailyTrans();
        console.log("Fetched transactionObject:", !!transactionObject);
    } catch (error) {
        console.error("Error fetching transactionObject:", error);
        transactionObject = null; // Ensure it's null on error
    }

    // 尝试获取 tpsObject
    try {
        tpsObject = await getL2DailyTps();
        console.log("Fetched tpsObject:", !!tpsObject);
    } catch (error) {
        console.error("Error fetching tpsObject:", error);
        tpsObject = null; // Ensure it's null on error
    }

    // 尝试获取 dailyStableData (这个数据在返回时需要，所以也在这里获取)
    try {
         dailyStableData = await getDailyStable();
         console.log("Fetched dailyStableData:", !!dailyStableData);
    } catch (error) {
         console.error("Error fetching dailyStableData:", error);
         dailyStableData = null; // Ensure it's null on error
    }


    // 构建要保存到数据库的数据对象，只包含成功获取的字段
    const dataToSave = {};
    if (transactionObject) {
        dataToSave.dailyTransaction = transactionObject;
    } else {
        console.warn("dailyTransaction data is missing or failed to fetch.");
    }
    if (tpsObject) {
        dataToSave.tpsNum = tpsObject;
    } else {
        console.warn("tpsNum data is missing or failed to fetch.");
    }
    if (gasCostObject) {
        dataToSave.gasCost = gasCostObject;
    } else {
        console.warn("gasCost data is missing or failed to fetch.");
    }

    // 检查是否有任何数据成功获取，如果没有，则不执行创建操作
    if (Object.keys(dataToSave).length === 0) {
        console.warn("No daily L2 data was successfully fetched. Skipping database save for L2DailyData.");
        // 即使没有L2DailyData，dailyStableData可能获取成功，所以仍然返回它
        return { newDailyL2Data: null, dailyStableData: dailyStableData };
    }

    let newDailyL2Data = null;
    try {
        // 尝试保存数据到 l2DailyData 模型
        newDailyL2Data = await prisma.l2DailyData.create({
            data: dataToSave // dataToSave 只包含成功获取的字段
        });
        console.log("日常L2数据更新成功 (部分或全部):", newDailyL2Data);

    } catch (error) {
        console.error("Error saving L2DailyData to database:", error);
        // 如果保存失败，newDailyL2Data 保持为 null
    }

    // 返回结果，即使 newDailyL2Data 或 dailyStableData 为 null
    return { newDailyL2Data: newDailyL2Data, dailyStableData: dailyStableData };
};

// Save json data to  db
export async function saveDailyL2DataToJson() {

    try {
       // saveDailyData 现在会尝试保存数据并返回结果，即使部分获取失败
       // 它返回一个包含 newDailyL2Data 和 dailyStableData 的对象
       const { newDailyL2Data, dailyStableData } = await saveDailyData(); // 解构获取返回的值

        // getCombinedL2Data 和 inkPlugin 是获取 L2 列表数据的，
        // 这部分逻辑似乎独立于上面单个数据的保存是否完全成功。
        // 假设这部分逻辑应该继续执行。
        const l2List  = await getCombinedL2Data();
        const inkData = await inkPlugin();
        l2List.push(inkData);

        //console.log(l2List);
        // Sort the L2 dataList
        // 注意：这里假设 l2List 中的每个对象都有 dailyTransaction 属性且是数字
        l2List.sort((a,b) => b.dailyTransaction - a.dailyTransaction);

        // 保存到 l2CombinedData 模型
        const saveDB = await prisma.l2CombinedData.create({
            data:{
                l2DailyData:l2List, // 这里保存的是 L2 列表数据
            }
        });

        if(saveDB){
            console.log("日常L2 Combined数据更新成功:",saveDB);
        } else {
             // 如果 create 方法没有抛出错误但返回 falsy 值（不太可能），会进入这里
             console.error("Failed to save L2 Combined Data (create returned falsy?)");
        }

    } catch (error) {
        // 捕获 saveDailyData 或后续操作（getCombinedL2Data, inkPlugin, prisma.l2CombinedData.create）中的错误
        console.error("An error occurred during saveDailyL2DataToJson:", error);
        // return null; // 根据原代码行为，可以在出错时返回 null
        throw error; // 或者选择重新抛出错误，让调用者处理
    }
};

// 执行主函数
await saveDailyL2DataToJson();
