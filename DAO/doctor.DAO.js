const { Doctor, User, Appointment, Department } = require("../models/index");
const { Op } = require("sequelize");

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

  static async getDoctorBusyDates(doctorId) {
    try {
      const now = new Date();

      const busyDates = await Appointment.findAll({
        where: {
          doctor_id: doctorId,
          status: ["scheduled", "confirmed"], // Only active appointments
          [Op.or]: [
            // Future dates
            {
              appoint_taken_date: {
                [Op.gt]: now.toISOString().split("T")[0],
              },
            },
            // Today but future times
            {
              [Op.and]: [
                {
                  appoint_taken_date: now.toISOString().split("T")[0],
                },
                {
                  appointment_time: {
                    [Op.gt]: now.toTimeString().split(" ")[0],
                  },
                },
              ],
            },
          ],
        },
        attributes: ["appoint_taken_date", "appointment_time"],
        order: [
          ["appoint_taken_date", "ASC"],
          ["appointment_time", "ASC"],
        ],
      });

      // Group by date and include times
      const groupedDates = {};
      busyDates.forEach((appointment) => {
        const date = appointment.appoint_taken_date.toISOString().split("T")[0];
        if (!groupedDates[date]) {
          groupedDates[date] = [];
        }
        groupedDates[date].push(appointment.appointment_time);
      });

      return groupedDates;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = DoctorDAO;
