import jwt from "jsonwebtoken";
import User from "../models/User.js";
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Ni tokena" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("Preverjam token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: 7 }
    next();
  } catch (err) {
  console.log("JWT napaka:", err.message); // JsonWebTokenError, TokenExpiredError...
  return res.status(401).json({ error: "Neveljaven token", detail: err.message });
}
}

async function requireModerator(req, res, next) {
  try{
    const decoded = req.user
    const user = await User.findById(decoded.id);
    if (user && (user.role === "moderator" || user.role === "admin")) {
      next();
    } else {
      res.status(403).json({ error: "Dostop je dovoljen le moderatorjem in adminom." });
    }
  } catch (err) {
    console.error("Napaka pri preverjanju moderatorja:", err);
    res.status(500).json({ error: "Napaka strežnika" });
  }
}

async function requireAdmin(req, res, next) {
  try{
    const decoded = req.user
    const user = await User.findById(decoded.id);
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "Dostop je dovoljen le adminom." });
    }
  } catch (err) {
    console.error("Napaka pri preverjanju administratorja:", err);
    res.status(500).json({ error: "Napaka strežnika" });
  }
}
export { authenticate, requireModerator, requireAdmin };