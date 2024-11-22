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

//get stable ATH
// export const getStableATH = async(req,res)=>{

// }

//update stable ATH
