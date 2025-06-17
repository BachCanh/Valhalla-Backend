const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "doctors",
        key: "user_id",
      },
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "patients",
        key: "user_id",
      },
    },
    duration: {
      type: DataTypes.TEXT,
    },
    appoint_taken_date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: "scheduled",
    },
    note: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "appointments",
  }
);

module.exports = Appointment;
