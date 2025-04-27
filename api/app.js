import dotenv from 'dotenv';
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import stableRoute from "./routes/stable.route.js";
import l2DataRoute from './routes/l2data.route.js';
import l1DataRoute from './routes/l1data.route.js'
import btcRoute from './routes/btc.route.js'
import authRoutes from './controllers/Auth/auth.js'
import errorHandler from './middleware/errorHandler.js'

const app = express();
app.use(express.json());
app.use(cookieParser());

const nodeEnv = process.env.NODE_ENV || 'dev';
dotenv.config({ path: `.env.${nodeEnv}` });
// Now you can access env variables like this:
console.log(`Running in ${nodeEnv} environment`);
console.log(`Client URL: ${process.env.CLIENT_URL}`);

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173' // 本地测试地址,需要将请求头改为localhost:4173，而不是https
];

// app.use(cors({
//   origin: 'http://localhost:5173', // 替换成你前端运行的实际地址和端口
//   credentials: true, // 允许发送和接收 cookies
// }));


app.use(cors({
  origin: (origin, callback) => {
    //console.log('Request Origin:', origin);
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, origin); // 返回实际的 origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use("/api/stable",stableRoute);
app.use("/api/l2", l2DataRoute);
app.use("/api/l1", l1DataRoute);
app.use("/api/btc",btcRoute);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

//NODE_ENV=dev node app.js
app.listen(8800, () => {
  console.log("server is running!");
})