const Patient = require("../models/patient.model");
const PatientDAO = require("../DAO/patient.DAO");

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
