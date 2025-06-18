const { Symptom } = require("../models");

class SymptomDAO {
  static async getAllSymptoms() {
    try {
      return await Symptom.findAll();
    } catch (error) {
      console.error("Error fetching symptoms:", error);
      throw new Error("Database query failed");
    }
  }
}

module.exports = SymptomDAO;
