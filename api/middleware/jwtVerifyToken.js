import jwt from "jsonwebtoken";
// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized,please Login and try again!" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.isSuperAdmin = decoded.isSuperAdmin;
      req.isVip = decoded.isVip;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };

export default verifyToken;