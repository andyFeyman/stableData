import { PrismaClient } from '@prisma/client';
import combineL1Data from '../../lib/combinedL1Data.js';

const prisma = new PrismaClient();

//get latest L1 Daily Data;

export const getL1DailyData = async (req, res) => {

    // 獲取當天的開始時間 (00:00:00 UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    console.log(today);

    try {
        //use Promise.all 並行執行數據庫查詢
        const [basicDataList, l1LastestData] = await Promise.all([
            prisma.l1BasicData.findMany({}),
            prisma.l1DailyData.findMany({
                where: { updateTime: { gte: today } },
                orderBy: { updateTime: "desc" },
                take: 11,
            }),
        ]);

        const finalyResult = combineL1Data(l1LastestData, basicDataList).reverse();

        if (l1LastestData.length > 10) {
            res.status(200).json(finalyResult);
        } else {
            console.log("the latest data doesn't update yet, here is the older data:");
            const [basicDataList, l1LastestData] = await Promise.all([
                prisma.l1BasicData.findMany({}),
                prisma.l1DailyData.findMany({
                    orderBy: { updateTime: "desc" },
                    take: 11,
                }),
            ]);
            const OlderResult = combineL1Data(l1LastestData, basicDataList).reverse();
            res.status(206).json(OlderResult);
        }
    } catch (error) {
        console.log(error);
    }
};
