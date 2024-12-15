import express from 'express';
import {getL2DailyData,addL2BasicData,getAllL2Basic,getCombinedL2Data} from '../controllers/l2DailyData.js';

const router = express.Router();

router.get("/allDailyData",getL2DailyData);
router.post("/addBasicL2Data",addL2BasicData);
router.get("/getBaiscL2Data",getAllL2Basic);
router.get("/combinedL2Data",getCombinedL2Data);

//router.delete()
export default router;