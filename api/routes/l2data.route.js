import express from 'express';
import verifyToken from '../middleware/jwtVerifyToken.js';
import {getL2DailyData,addL2BasicData,getAllL2Basic,getCombinedL2Data,getL2DailyJson} from '../controllers/l2DailyData.js';

const router = express.Router();

router.get("/allDailyData",getL2DailyData);
router.post("/addBasicL2Data",verifyToken,addL2BasicData);
router.get("/getBaiscL2Data",getAllL2Basic);
//router.get("/combinedL2Data",getCombinedL2Data);
router.get("/l2DailyJson",getL2DailyJson)

//router.delete()
export default router;