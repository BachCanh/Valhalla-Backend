const { Department } = require("../models");
const { Symptom } = require("../models");

class DepartmentDAO {
  static async getDepartmentsBySymptoms(symptomIds) {
    try {
      const departments = await Department.findAll({
        include: [
          {
            model: Symptom,
            where: {
              id: symptomIds,
            },
            required: true,
          },
        ],
        distinct: true,
      });

      return departments;
    } catch (error) {
      console.error("Error fetching departments by symptoms:", error);
      throw new Error("Database query failed");
    }
  }
}

module.exports = DepartmentDAO;
