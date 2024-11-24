import express from "express";
import {createStableATH,getStableATH} from '../controllers/stable.js'


const router = express.Router();


router.post("/addStableATH",createStableATH);
router.get("/getStableATH",getStableATH)

export default router;