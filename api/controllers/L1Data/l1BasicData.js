import { PrismaClient } from '@prisma/client';
import allL1Data from './allL1Data.js';

const l1DataList = allL1Data.explorerBasicData;
const prisma = new PrismaClient();

export const addL1BasicDataFromFile = async (req, res) => {
    try {

        if (!Array.isArray(l1DataList) || l1DataList.length !== 11) {
            return ("The list object have some error OR the list length is wrong!");
        };
        //createMany 本身不保證原子性（例如，如果中間某條記錄失敗，可能部分數據已經寫入）。
        // 如果需要確保所有數據要麼全成功要麼全失敗，可以包裹在 prisma.$transaction 中：
        await prisma.$transaction([
            prisma.l1BasicData.createMany({
                data: l1DataList.map(item => ({
                    l1Name: item.name,
                    l1Img: item.icon,
                    l1ExplorerLink: item.url
                }))
            })
        ]);

        // 所有數據都成功寫入後返回成功響應
        return res.status(200).json({ message: "all L1 basic data Saved" });

    } catch (error) {
        console.log("L1 Baisc Data saved Fail", error.message);
        return res.status(500).json({message: "L1 Basic data from prisma error"});

    } finally {
        await prisma.$disconnect();
    }
};
//get all L1 basicData;
export const getAllL1Basic = async (req, res) => {

    try {

        const l1BasicData = await prisma.l1BasicData.findMany({});

        if (l1BasicData) {

            res.status(200).json(l1BasicData);
   
        } else {
            res.status(500).json({ message: "fail to get l1 baisc data." });
        }
        
    } catch (error) {
        console.log(error.message);
    } finally {
        await prisma.$disconnect();
    }
};


//remove singal L1 basicData;