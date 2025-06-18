const { generateAccessToken } = require("../utils/util");
const bcrypt = require("bcrypt");
const UserDAO = require("../DAO/user.DAO");
const Patient = require("../models/patient.model");
const PatientDAO = require("../DAO/patient.DAO");
const COOKIE_OPTIONS = require("../config/cookieOptions");
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
    const userFound = await UserDAO.findUserByEmail(email);
    if (!userFound) throw new Error("Không tìm thấy thông tin đăng nhập");

    const user = userFound.get({ plain: true });
    const isMatch = bcrypt.compare(password, user?.password);
    if (!isMatch) throw new Error("Thông tin đăng nhập không chính xác");

    const accessToken = generateAccessToken(user);
    res.cookie("accessToken", accessToken, COOKIE_OPTIONS.normal);
    return res.status(200).json({ message: "Đăng nhập thành công" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.register = async (req, res) => {
  try {
    console.log("Registering patient...: ", req.body.patient);
    const {
      email,
      password,
      fullName: fullname,
      phoneNumber: phone_number,
      dateOfBirth: dob,
      gender,
      address,
    } = req.body.patient;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    await PatientDAO.registerPatient(
      { email, password, fullname, phone_number },
      { dob, gender, address }
    );

    return res.status(201).json({ message: "Register successfully." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", COOKIE_OPTIONS.normal);
    return res.status(200).json({ message: "Đăng xuất thành công" });
  } catch {
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

module.exports.validateJWT = async (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.clearCookie("accessToken", COOKIE_OPTIONS.normal);
    return res
      .status(401)
      .json({ message: "Không được phép - Không có token" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        return res.status(403).json({
          message: "Không được phép - Token không hợp lệ hoặc đã hết hạn",
        });
      return res.status(200).json({ message: "Xác thực thành công" });
    });
  } catch {
    return res.status(403).json({
      message: "Không được phép - Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
