const jwt = require("jsonwebtoken");

// Server-side middleware update
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports.isDoctor = (req, res, next) => {
  if (!req.user || req.user.role !== "doctor") {
    return res.status(401).json({ message: "You are not a doctor" });
  }
  next();
};
