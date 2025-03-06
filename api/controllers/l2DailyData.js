import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//getL2DailyData
export const getL2DailyData = async(req,res)=>{

    try {
        const l2LastestData = await prisma.l2DailyData.findFirst({
            orderBy:{
                updateTime:"desc"
            }
        });
        if(l2LastestData){

            res.status(200).json(l2LastestData);

        }else{
            console.log("l2LastestData don't exist");
            
        }
    } catch (error) {
        console.log(error);
        
    }
};


//addL2BasicData
// l2IconImg String
// l2Name L2Name
// l2ExplorerLink String []
export const addL2BasicData = async(req,res)=>{
    try {
        const bodyData = req.body
        console.log(bodyData);
        
        // 定义合法的L2Name枚举值
        const validL2Names = ['Arbitrum', 'Base', 'Optimistic', 'Blast', 'Zksync', 'Linea'];
        
        // 检查提交的name是否在合法枚举值中
        if (!validL2Names.includes(bodyData.name)) {
            return res.status(400).json({
                message: "Invalid L2Name. Must be one of: " + validL2Names.join(', ')
            });
        }

        const saveData = await prisma.l2BasicData.create({
            data:{
                l2IconImg: bodyData.img,
                l2Name: bodyData.name,
                l2ExplorerLink: [bodyData.link]
            }
        })
    
        if(saveData){
            res.status(200).json({message:"new basic data Saved"});
        }else{
            res.status(500).json({message:"error"});
        }
        
    } catch (error) {
        console.log(error);
        
        // 如果是Prisma的验证错误，返回400状态码
        if (error.code === 'P2009') {
            return res.status(400).json({
                message: "Invalid L2Name value"
            });
        }
        
        // 其他错误返回500状态码
        return res.status(500).json({
            message: "Server error"
        });
    }
};

//get ALL L2 basic Data 

export const getAllL2Basic = async(req,res)=>{

    try {

        const getAllBasic = await prisma.l2BasicData.findMany({});

        if(getAllBasic){

            res.status(200).json(getAllBasic);
        }else{
            res.status(500).json({message:"fail to get l2 baisc data."});
        }
        
    } catch (error) {
        console.log(error.message);
    }
};


//get combined data(daily And Basic)


export const getCombinedL2Data  =  async(req,res)=>{

    const nameMapping = {
        'linea': 'Linea',
        'zks': 'Zksync', 
        'blast': 'Blast',
        'op': 'Optimistic',
        'arb': 'Arbitrum',
        'base': 'Base'
      };
    
    try {

        const [dailyData,basicData] = await Promise.all([
            prisma.l2DailyData.findFirst({orderBy:{updateTime:"desc"}}),
            prisma.l2BasicData.findMany({}),
        ]);
      
    
        const result = basicData.map(item => {
            // 找到对应的key
            //Object.entries(nameMapping) - 将映射对象转换为 [key, value] 形式的数组.例如: [['linea', 'Linea'], ['zks', 'Zksync'], ...]
            //
            const key = Object.entries(nameMapping).find(([_, value]) => value === item.l2Name)?.[0];
            
            if(key) {
              return {
                ...item,
                updateTime:dailyData.updateTime,
                gasCost: dailyData.gasCost[key],
                tpsNum: dailyData.tpsNum[key],
                dailyTransaction: dailyData.dailyTransaction[key]
              };
            }
            return item;
        });

        //wait for logger
        if(result){
            //res.status(200).json(result);
            return(result);
       
        }else{
            res.status(400).json({message:"don't get combined data."});
        };
        
    } catch (error) {
        console.log(error);
        
    }
};


// get L2 Daily Json
export const getL2DailyJson = async(req,res)=>{

    try {
        const DBResult = await prisma.l2CombinedData.findFirst(
            {orderBy:{
                updateTime:"desc"
            }}
        );
        if(DBResult){
            res.status(200).json(DBResult);
        }else{
            res.status(404).json({message:"notthing fund!"});
        }
    } catch (error) {
        console.log(error);
        
    }
};