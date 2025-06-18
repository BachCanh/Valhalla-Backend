const SymptomDAO = require("../DAO/symptom.DAO");

module.exports.getAllSymptoms = async (req, res) => {
  try {
    // Using SymptomDAO to fetch all symptoms
    const symptoms = await SymptomDAO.getAllSymptoms();

    if (symptoms.length === 0) {
      return res.status(404).json({ message: "No symptoms found." });
    }

    res.status(200).json(symptoms);
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
