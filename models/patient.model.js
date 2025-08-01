const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user.model");

const Patient = sequelize.define(
  "Patient",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    dob: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING(5),
    },
    address: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "patients",
  }
);

Patient.belongsTo(User, { foreignKey: "user_id" });
User.hasOne(Patient, { foreignKey: "user_id" });

module.exports = Patient;
