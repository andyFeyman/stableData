import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import stableRoute from "./routes/stable.route.js";
import l2DataRoute from './routes/l2data.route.js';
import cron from 'node-cron';
// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);
// require('dotenv').config({ path: '../.env' });

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));

app.use("/api/stable",stableRoute);
app.use("/api/l2",l2DataRoute);


app.listen(8800,()=>{
    // cron.schedule('* 1 * * *', async()=>{
    //     await runTask();
    // });
    console.log("server is running!");
    
})