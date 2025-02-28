import express from 'express';
import {addL1BasicDataFromFile,getAllL1Basic} from '../controllers/L1Data/l1BasicData.js';
import {getL1DailyData} from '../controllers/L1Data/l1DailyData.js';

const router = express.Router();

router.get("/addL1BasicDataFromFile",addL1BasicDataFromFile);
router.get("/getAllL1Basic",getAllL1Basic);
router.get("/getL1DailyData",getL1DailyData);


//router.delete()
export default router;