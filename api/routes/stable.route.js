import express from "express";
import {createStableATH,getStableATH,getDailyStableData} from '../controllers/stable.js'


const router = express.Router();


router.post("/addStableATH",createStableATH);
router.get("/getStableATH",getStableATH);
router.get("/getDailyStable",getDailyStableData);

export default router;