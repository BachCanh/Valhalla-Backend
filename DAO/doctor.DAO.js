const { Doctor, User, Department } = require("../models/index");

class DoctorDAO {
  static async getDoctorsWithDepartmentID(departmentId) {
    return await Doctor.findAll({
      where: { department_id: departmentId },
      include: [
        {
          model: User,
          attributes: ["id", "fullname", "email", "phone_number"],
        },
        {
          model: Department,
          attributes: ["id", "name", "description"],
        },
      ],
    });
  }
}

module.exports = DoctorDAO;
