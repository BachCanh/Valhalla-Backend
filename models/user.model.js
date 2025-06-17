const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING(10) },
    email: { type: DataTypes.STRING(100), unique: true },
    password: { type: DataTypes.STRING(255) },
    first_name: { type: DataTypes.STRING(255) },
    last_name: { type: DataTypes.STRING(50) },
    phone_number: { type: DataTypes.STRING(15) },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

module.exports = User;
