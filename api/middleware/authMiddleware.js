import jwt from "jsonwebtoken";
function authMiddleware(req, res, next) {
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

export default authMiddleware;