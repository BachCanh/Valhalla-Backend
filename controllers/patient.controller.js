const PatientDAO = require("../DAO/patient.DAO");
const UserDAO = require("../DAO/user.DAO");
const User = require("../models/user.model");

module.exports.getPatient = async (req, res) => {
  try {
    const { customerId: patientId } = req.user;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    const patient = await PatientDAO.getPatientById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.updatePatient = async (req, res) => {
  try {
    const { customerId: patientId } = req.user;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    const updateData = req.body;

    // Validate required fields
    if (!updateData.fullName || !updateData.email) {
      return res.status(400).json({
        message: "Full name and email are required.",
      });
    }

    // Check if email already exists in the database for another user
    const existingUser = await User.findOne({
      where: { email: updateData.email },
    });

    if (existingUser && existingUser.id !== patientId) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const updatedPatient = await PatientDAO.updatePatient(
      patientId,
      updateData
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
