import express from "express";
import {createStableATH} from '../controllers/stable.js'


const router = express.Router();


router.post("/addStableATH",createStableATH);

export default router;