import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);  // 获取当前文件的绝对路径
const __dirname = dirname(__filename);              // 获取当前文件所在目录

//这样做的目的是确保无论从哪个目录运行代码，都能正确找到 .env 文件。
dotenv.config({ path: join(__dirname, '../.env.dev') });
dotenv.config({ path: join(__dirname, '../.env.prd') });


const transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const sendVerificationCode = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verification Code for Chainmonitor",
        text: `Your verification code is: ${code}. It expires in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};