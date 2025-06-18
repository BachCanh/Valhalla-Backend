const { generateAccessToken } = require("../utils/util");
const bcrypt = require("bcrypt");
const UserDAO = require("../DAO/user.DAO");

module.exports.isEmailAvailable = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email không được để trống" });

    const user = await UserDAO.findUserByEmail(email);
    if (user)
      return res.status(409).json({ message: "Email đã có người đăng kí" });

    return res.status(200).json({ message: "Email chưa có người đăng kí" });
  } catch {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserDAO.findUserByEmail(email);
    if (!user) throw new Error("Không tìm thấy thông tin đăng nhập");
    const isMatch = bcrypt.compare(password, user?.password);
    if (!isMatch) throw new Error("Thông tin đăng nhập không chính xác");
    const accessToken = generateAccessToken(user);
    res.cookie("accessToken", accessToken, COOKIE_OPTIONS.normal);
    return res.status(200).json({ message: "Đăng nhập thành công" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
