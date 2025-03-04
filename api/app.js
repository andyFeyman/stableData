import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import stableRoute from "./routes/stable.route.js";
import l2DataRoute from './routes/l2data.route.js';
import l1DataRoute from './routes/l1data.route.js'


const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}));
app.use(cors({origin:process.env.CLIENT2_UR, credentials:true}));

app.use("/api/stable",stableRoute);
app.use("/api/l2",l2DataRoute);
app.use("/api/l1",l1DataRoute);


app.listen(8800,()=>{

    console.log("server is running!");  
    
})