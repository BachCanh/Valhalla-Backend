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

  async getPatientById(userId) {
    const patient = await Patient.findOne({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] }, // Loại bỏ password vì lý do bảo mật
        },
      ],
    });

    if (!patient) {
      return null;
    }

    return patient;
  }

  async updatePatient(userId, updateData) {
    const transaction = await User.sequelize.transaction();
    try {
      // Tìm patient hiện tại
      const patient = await Patient.findOne({
        where: { user_id: userId },
        include: [{ model: User }],
        transaction,
      });

      if (!patient) {
        await transaction.rollback();
        return null;
      }

      // Chuẩn bị dữ liệu để update User
      const userUpdateData = {};
      if (updateData.fullName) userUpdateData.fullname = updateData.fullName;
      if (updateData.email) userUpdateData.email = updateData.email;
      if (updateData.phoneNumber)
        userUpdateData.phone_number = updateData.phoneNumber;

      // Chuẩn bị dữ liệu để update Patient
      const patientUpdateData = {};
      if (updateData.dateOfBirth) {
        // Convert ISO string to Date object
        patientUpdateData.dob = new Date(updateData.dateOfBirth);
      }
      if (updateData.gender) patientUpdateData.gender = updateData.gender;
      if (updateData.address) patientUpdateData.address = updateData.address;

      // Update User table
      if (Object.keys(userUpdateData).length > 0) {
        await User.update(userUpdateData, {
          where: { id: userId },
          transaction,
        });
      }

      // Update Patient table
      if (Object.keys(patientUpdateData).length > 0) {
        await Patient.update(patientUpdateData, {
          where: { user_id: userId },
          transaction,
        });
      }

      await transaction.commit();

      // Lấy dữ liệu đã update để trả về
      const updatedPatient = await this.getPatientById(userId);
      return updatedPatient;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = new PatientDAO();
