const DepartmentDAO = require("../DAO/department.DAO");

module.exports.getDepartmentsBySymptoms = async (req, res) => {
  try {
    const { symptomIds } = req.body;

    if (!symptomIds || !Array.isArray(symptomIds) || symptomIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp danh sách triệu chứng" });
    }

    const departments = await DepartmentDAO.getDepartmentsBySymptoms(
      symptomIds
    );

    if (departments.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy khoa phù hợp" });
    }

    if (departments.length > 3) {
      return res.status(200).json({
        message:
          "Bạn đang gặp quá nhiều triệu chứng, hãy đến bệnh viện để khám",
        departmentCount: departments.length,
      });
    }

    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments by symptoms:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
