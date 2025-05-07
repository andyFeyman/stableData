import express from "express";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { PrismaClient } from "@prisma/client";
import { sendVerificationCode } from "../../lib/email.js";
import emailRateLimiter from "../../middleware/emailRateLimiter.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();
const rpID = process.env.RP_ID || "localhost";
const rpName = "chainmonitor";
const expectedOrigin =
  process.env.NODE_ENV === "prd"
    ? "https://chainmonitor.xyz"
    : "http://localhost:5173";

// 辅助函数：将字符串转换为 Uint8Array
const stringToUint8Array = (str) => {
  return new TextEncoder().encode(str);
};

// 生成 6 位验证码
const generateCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// 生成 JWT
const generateJWT = (userId, isSuperAdmin, isVip) => {

  return jwt.sign({ userId, isSuperAdmin, isVip }, process.env.JWT_SECRET, { expiresIn: "72h" });
};

// 注册：开始（提交邮箱和用户名）
router.post("/register/start",
  emailRateLimiter,
  async (req, res, next) => {
    try {
      const { email, username } = req.body;
      if (!email || !username) {
        return res.status(400).json({ error: "Email and username are required" });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      const existingTempUser = await prisma.tempUser.findUnique({ where: { email } });
      if (existingTempUser) {
        await prisma.tempUser.delete({ where: { email } });
      }

      // 删除旧的临时用户和验证码（如果存在）
      // 注意：这里删除旧的 verificationCode 是为了确保同一个邮箱在成功发送新验证码后，
      // 数据库中只有最新的一个有效验证码记录。
      // 如果你希望保留历史记录，可以只删除过期的，或者不删除。
      // 但为了简化验证流程（只检查最新的），删除旧的是一个常见做法。
      await prisma.tempUser.deleteMany({ where: { email } });
      await prisma.verificationCode.deleteMany({ where: { email } });

      const code = generateCode();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await prisma.tempUser.create({
        data: {
          email,
          username,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      });

      await prisma.verificationCode.create({
        data: {
          email,
          code,
          createdAt: new Date(),
          expiresAt,
        },
      });

    // 发送邮件
    // 只有当通过了 emailRateLimiter 中间件的检查后，才会执行到这里
      await sendVerificationCode(email, code);

      res.json({ message: "Verification code sent" });
    } catch (error) {
      console.error("Error in register/start:", error);
      next(error);
    }
  });

// 注册：验证验证码
router.post("/register/verify-code", async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const verification = await prisma.verificationCode.findFirst({
      where: { email, code, expiresAt: { gt: new Date() } },
    });

    if (!verification) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    const tempUser = await prisma.tempUser.findUnique({ where: { email } });
    if (!tempUser) {
      return res.status(400).json({ error: "Temporary user not found" });
    }

    // Store temp user data in a temporary cookie
    res.cookie("tempUser", JSON.stringify({ email, username: tempUser.username, isEmailVerified: true }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prd",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ message: "Email verified" });
  } catch (error) {
    console.error("Error in register/verify-code:", error);
    next(error);
  }
});

// 注册：生成 Passkey 选项
router.post("/register/options", async (req, res, next) => {
  try {
    const tempUser = req.cookies.tempUser ? JSON.parse(req.cookies.tempUser) : {};
    const { email, username, isEmailVerified } = tempUser;
    if (!email || !username || !isEmailVerified) {
      return res.status(400).json({ error: "Email not verified or invalid session" });
    }

    const tempUserRecord = await prisma.tempUser.findUnique({ where: { email } });
    if (!tempUserRecord) {
      return res.status(400).json({ error: "Temporary user not found" });
    }

    const userID = stringToUint8Array(email);

    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userID,
      userName: username,
      userDisplayName: username,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred",
      },
    });

    res.cookie("challenge", options.challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prd",
      sameSite: "lax",
      maxAge: 5 * 60 * 1000, // 5 minutes
    });

    res.json(options);
  } catch (error) {
    console.error("Error in register/options:", error);
    next(error);
  }
});

// 注册：验证 Passkey
router.post("/register/verify", async (req, res, next) => {
  try {
    const tempUser = req.cookies.tempUser ? JSON.parse(req.cookies.tempUser) : {};
    const { email, username, isEmailVerified } = tempUser;
    const challenge = req.cookies.challenge;
    if (!email || !username || !isEmailVerified || !challenge) {
      return res.status(400).json({ error: "Invalid session or email not verified" });
    }

    const verification = await verifyRegistrationResponse({
      response: req.body,
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID: rpID,
    });

    if (!verification.verified) {
      return res.status(400).json({ error: "Verification failed" });
    }

    const { credential } = verification.registrationInfo;
    if (!credential) {
      return res.status(400).json({ error: "Missing credential in registrationInfo" });
    }

    const credentialID = credential.id;
    const credentialPublicKey = credential.publicKey;
    let counter = credential.counter || 0;

    const user = await prisma.user.create({
      data: {
        email,
        username,
        isVerified: true,
        credentials: {
          create: {
            id: credentialID,
            publicKey: Buffer.from(credentialPublicKey).toString("base64"),
            counter,
            deviceName: req.body.deviceName || "Unknown Device",
          },
        },
      },
    });

    await prisma.tempUser.delete({ where: { email } });
    await prisma.verificationCode.deleteMany({ where: { email } });

    const token = generateJWT(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prd",
      sameSite: "lax",
      maxAge: 72 * 60 * 60 * 1000, // 72 hours
    });

    res.clearCookie("tempUser");
    res.clearCookie("challenge");

    res.json({ verified: true });
  } catch (error) {
    console.error("Error in register/verify:", error);
    next(error);
  }
});

// 登录：生成选项
router.post("/login/options", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { credentials: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: user.credentials.map((cred) => ({
        id: cred.id,
        type: "public-key",
      })),
      userVerification: "preferred",
    });

    res.cookie("challenge", options.challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prd",
      sameSite: "lax",
      maxAge: 5 * 60 * 1000, // 5 minutes
    });

    res.json(options);
  } catch (error) {
    console.error("Error in login/options:", error);
    next(error);
  }
});

// 登录：验证 Passkey
router.post("/login/verify", async (req, res, next) => {
  try {
    const challenge = req.cookies.challenge;
    if (!challenge) {
      return res.status(400).json({ error: "Invalid session" });
    }

    const { id } = req.body;
    const credential = await prisma.credential.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!credential) {
      return res.status(400).json({ error: "Credential not found" });
    }

    const verification = await verifyAuthenticationResponse({
      response: req.body,
      expectedChallenge: challenge,
      expectedOrigin,
      expectedRPID: rpID,
      credential: {
        id: credential.id,
        publicKey: Buffer.from(credential.publicKey, "base64"),
        counter: credential.counter,
      },
    });

    if (!verification.verified) {
      return res.status(400).json({ error: "Authentication failed" });
    }

    await prisma.credential.update({
      where: { id },
      data: { counter: verification.authenticationInfo.newCounter },
    });

    const token = generateJWT(credential.user.id, credential.user.isSuperAdmin, credential.user.isVip);

    const responseData = {
      data: {
        username: credential.user.username,
        email: credential.user.email
      },
      verified: true
    };

    // 打印完整的响应对象
    //console.log("Full response object:", JSON.stringify(responseData));

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prd",
      sameSite: "lax",
      maxAge: 72 * 60 * 60 * 1000, // 24 hours
    });


    res.clearCookie("challenge");
    res.status(200).json(responseData);
    // res.status(200).json({
    //   data: nameAndEmail,
    //   verified: true
    // });
    // console.log("Response size:", JSON.stringify({nameAndEmail, verified: true}).length);
    // res.status(200).json({ test: "ok" });

  } catch (error) {
    console.error("Error in login/verify:", error);
    next(error);
  }
});

// 登录：发送验证码（备用）
router.post("/login/code", 
  emailRateLimiter,
  async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    // 发送新验证码前，删除该邮件的所有验证码
    await prisma.verificationCode.deleteMany({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationCode.create({
      data: {
        email,
        code,
        createdAt: new Date(),
        expiresAt,
      },
    });

    await sendVerificationCode(email, code);
    res.json({ message: "Verification code sent" });
  } catch (error) {
    console.error("Error in login/code:", error);
    next(error);
  }
});

// 登录：验证验证码
router.post("/login/verify-code", async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    // --- 新增: 检查是否被锁定 ---
    const emailAttempt = await prisma.emailAttempt.findUnique({ where: { email } });
    if (emailAttempt && emailAttempt.lockoutUntil && emailAttempt.lockoutUntil > new Date()) {
      // 仍在锁定期间
      // 为了安全，返回与验证失败相同的错误信息，避免泄露锁定状态
      return res.status(400).json({ error: "too many failed attempts,please use passkey instead " });
    }
    // --- 结束新增 ---


    const verification = await prisma.verificationCode.findFirst({
      where: { email, code, expiresAt: { gt: new Date() } },
    });

    if (!verification) {
      // --- 新增: 处理验证失败 ---
      const attemptThreshold = 5; // 阈值
      const lockoutDurationMinutes = 15; // 锁定时间 (分钟)

      const currentAttempts = emailAttempt ? emailAttempt.failedAttempts + 1 : 1;
      const updateData = {
        failedAttempts: currentAttempts,
        lockoutUntil: null // 默认不锁定
      };

      if (currentAttempts >= attemptThreshold) {
        updateData.lockoutUntil = new Date(Date.now() + lockoutDurationMinutes * 60 * 1000);
        console.warn(`Email ${email} locked out due to too many failed attempts.`);
      }

      await prisma.emailAttempt.upsert({
        where: { email },
        update: updateData,
        create: { email, ...updateData }
      });

      return res.status(400).json({ error: "Invalid or expired code" });
      // --- 结束新增 ---
    }

    // 验证成功
    // --- 新增: 重置失败尝试次数 ---
    if (emailAttempt && emailAttempt.failedAttempts > 0) {
      await prisma.emailAttempt.update({
        where: { email },
        data: { failedAttempts: 0, lockoutUntil: null }
      });
    }
    // --- 结束新增 ---


    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // 这通常不应该发生，因为验证码是发给现有用户的
      // 但作为防御性编程，保留此检查
      // 如果发生，也应该算作一次失败尝试？取决于业务逻辑
      return res.status(404).json({ error: "User not found" });
    }

    const responseData = {
      data: {
        username: user.username,
        email: user.email
      },
      verified: true
    };

    const token = generateJWT(user.id, user.isSuperAdmin, user.isVip);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prd",
      sameSite: "lax",
      maxAge: 72 * 60 * 60 * 1000, // 24 hours
    });

    // 成功后删除该邮件的所有验证码
    await prisma.verificationCode.deleteMany({ where: { email } });

    res.status(200).json(responseData);

  } catch (error) {
    console.error("Error in login/verify-code:", error);
    next(error);
  }
});


// 重置：开始
router.post("/reset/start", 
  emailRateLimiter,
  async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationCode.create({
      data: {
        email,
        code,
        createdAt: new Date(),
        expiresAt,
      },
    });

    await sendVerificationCode(email, code);
    res.json({ message: "Reset code sent" });
  } catch (error) {
    console.error("Error in reset/start:", error);
    next(error);
  }
});

// 重置：验证并清理
router.post("/reset/verify", async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    const verification = await prisma.verificationCode.findFirst({
      where: { email, code, expiresAt: { gt: new Date() } },
    });

    if (!verification) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.credential.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { email } });

    await prisma.tempUser.create({
      data: {
        email,
        username: user.username,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    await prisma.verificationCode.deleteMany({ where: { email } });

    res.json({ message: "Account reset, please re-register" });
  } catch (error) {
    console.error("Error in reset/verify:", error);
    next(error);
  }
});

// 登出
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// 检查会话
router.get("/session", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (user) {
      res.json({ user: { username: user.username, email: user.email } });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error("Session check error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;