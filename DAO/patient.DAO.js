require("dotenv").config();
const Patient = require("../models/patient.model");
const User = require("../models/user.model"); // Add this import
const bcrypt = require("bcrypt");

class PatientDAO {
  async registerPatient(userData, patientData) {
    const transaction = await User.sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(
        userData.password,
        process.env.BCRYPT_SALT_ROUNDS || 10
      );

      const newUser = await User.create(
        {
          email: userData.email,
          password: hashedPassword,
          role: "patient",
          fullname: userData.fullname,
          phone_number: userData.phone_number,
        },
        { transaction }
      );

      await Patient.create(
        {
          user_id: newUser.id,
          dob: patientData.dob,
          gender: patientData.gender,
          address: patientData.address,
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new PatientDAO();
