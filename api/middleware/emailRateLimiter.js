// middleware/emailRateLimiter.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // 确保路径正确指向你的 prisma 客户端实例

/**
 * Express middleware to limit verification code requests based on email address.
 * Prevents sending multiple codes to the same email within a cooldown period.
 */
const emailRateLimiter = async (req, res, next) => {
  const { email } = req.body;

  // 如果请求体中没有 email，则不应用此限制，让后续的验证处理
  // 或者你也可以在这里返回 400 错误，取决于你的设计
  if (!email) {
    // console.warn("emailRateLimiter: No email in request body, skipping rate limit check.");
    return next();
  }

  try {
    // 定义冷却期，例如 5 分钟
    const cooldownPeriod = 1 * 60 * 1000; // 1 minutes in milliseconds

    // 查找该邮箱最近一次发送验证码的记录
    const lastCode = await prisma.verificationCode.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' }, // 获取最新的一条记录
    });

    // 如果找到了最近的记录，并且距离现在的时间小于冷却期
    if (lastCode && (Date.now() - lastCode.createdAt.getTime() < cooldownPeriod)) {
      // 触发速率限制
      console.warn(`Email rate limit triggered for: ${email}`);
      return res.status(429).json({
        error: "Too many verification code requests for this email. Please wait 1 min trying again."
      });
    }

    // 如果没有触发速率限制，则继续处理请求
    next();

  } catch (error) {
    // 如果查询数据库时发生错误，将错误传递给 Express 的错误处理中间件
    console.error("Error in emailRateLimiter middleware:", error);
    next(error);
  }
};

export default emailRateLimiter;
