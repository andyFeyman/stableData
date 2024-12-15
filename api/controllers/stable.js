import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//create stable ATH
export const createStableATH = async(req,res)=>{

        const ATHData = req.body;

        try {
            const newStableATH = await prisma.stableATH.create({
                data:{
                    createdAt:ATHData.time,
                    volume:ATHData.tvl,
                    marketCap:ATHData.mc,
                    volMarketCapRatio:(ATHData.tvl/ATHData.mc*100).toFixed(2)+"%"
                }
            })
            res.status(200).json("new ATH saved: "+newStableATH);
            console.log(newStableATH);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"can't created new ath of stable"});
        }
        
    }

//get lastest stable ATH
export const getStableATH = async(req,res)=>{

    try {
        const usdATHData = await prisma.stableATH.findFirst({
            orderBy:{
                createdAt:'desc'
            }
        });
        const volStr = usdATHData.volume.toString();
        const mcStr =usdATHData.marketCap.toString();

        const strfyData = {
            createdAt:usdATHData.createdAt,
            volume:volStr,
            marketCap:mcStr,
            volMarketCapRatio:usdATHData.volMarketCapRatio
        }
        
        if(usdATHData){

            res.status(200).json(strfyData);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server can't get the usd ATH data"});
    }

}


// get daily stable
//BigInt参数无法直接返回，所以要toString()
export const getDailyStableData = async(req,res)=>{
    try {
        const dailyData = await prisma.dailyStable.findFirst({
            orderBy:{
                createdAt:"desc",
            }
        });

        if(dailyData){
            const volStr = dailyData.volume.toString();
            const mkcStr = dailyData.marketCap.toString();

            const dailyDataStr = {
                ...dailyData,
                volume:volStr,
                marketCap:mkcStr
            }

            res.status(200).json(dailyDataStr);

        }else{
            res.status(500).json({message:"dail data don't exist"});
            
        };

    } catch (error) {
        console.log(error);
        
    }
};