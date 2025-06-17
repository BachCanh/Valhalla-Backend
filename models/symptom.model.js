const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Symptom = sequelize.define(
  "Symptom",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "symptoms",
  }
);

module.exports = Symptom;
