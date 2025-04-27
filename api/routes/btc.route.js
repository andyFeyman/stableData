import express from 'express';
import verifyToken from '../middleware/jwtVerifyToken.js';
import { addLatestKeyData,getLatestKeyData } from '../controllers/BtcKeyData/btcCompare.js';


const router = express.Router();

router.post("/addLatestKeyData",verifyToken,addLatestKeyData);
router.get("/latestKeyData",verifyToken,getLatestKeyData);


//router.delete()
export default router;