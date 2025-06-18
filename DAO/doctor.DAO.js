const { Doctor, User } = require("../models/index");

class DoctorDAO {
  static async getDoctorsWithDepartmentID(departmentId) {
    return await Doctor.findAll({
      where: { department_id: departmentId },
      include: [
        {
          model: User,
          attributes: ["id", "fullname", "email", "phone_number"],
        },
      ],
    });
  }
}

module.exports = DoctorDAO;
