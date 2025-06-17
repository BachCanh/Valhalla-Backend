const User = require("./user.model");
const Doctor = require("./doctor.model");
const Patient = require("./patient.model");
const Department = require("./department.model");
const Symptom = require("./symptom.model");
const Appointment = require("./appointment.model");

// User Relations
User.hasOne(Doctor, { foreignKey: "user_id" });
Doctor.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Patient, { foreignKey: "user_id" });
Patient.belongsTo(User, { foreignKey: "user_id" });

// Doctor ↔ Department
Department.hasMany(Doctor, { foreignKey: "department_id" });
Doctor.belongsTo(Department, { foreignKey: "department_id" });

// Department ↔ Symptom
Department.hasMany(Symptom, { foreignKey: "department_id" });
Symptom.belongsTo(Department, { foreignKey: "department_id" });

// Doctor ↔ Appointment
Doctor.hasMany(Appointment, { foreignKey: "doctor_id" });
Appointment.belongsTo(Doctor, { foreignKey: "doctor_id" });

// Patient ↔ Appointment
Patient.hasMany(Appointment, { foreignKey: "patient_id" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id" });

module.exports = {
  User,
  Doctor,
  Patient,
  Department,
  Symptom,
  Appointment,
};
