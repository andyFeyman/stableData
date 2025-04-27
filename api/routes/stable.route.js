import express from "express";
import verifyToken from '../middleware/jwtVerifyToken.js';
import {createStableATH,getStableATH,getDailyStableData} from '../controllers/stable.js'


const router = express.Router();


router.post("/addStableATH",verifyToken,createStableATH);
router.get("/getStableATH",getStableATH);
router.get("/getDailyStable",getDailyStableData);

export default router;


