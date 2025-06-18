const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (foundUser) => {
  const accessToken = jwt.sign(
    {
      customerId: foundUser.id,
      email: foundUser.email,
      fullName: foundUser.fullName,
      role: foundUser.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "3d", // 👈 3 days
    }
  );
  return accessToken;
};
