const { Op } = require("sequelize");
const Appointment = require("../models/appointment.model");

class AppointmentDao {
  static async getAppointmentsByPatient(
    patientId,
    { page = 1, limit = 10, status = "all" }
  ) {
    const offset = (page - 1) * limit;
    const now = new Date();

    let where = { patient_id: patientId };

    if (status === "upcoming") {
      where.appoint_taken_date = { [Op.gte]: now };
    } else if (status === "past") {
      where.appoint_taken_date = { [Op.lt]: now };
    }

    const { count, rows } = await Appointment.findAndCountAll({
      where,
      order: [["appoint_taken_date", "ASC"]],
      offset: Number(offset),
      limit: Number(limit),
    });

    const totalPages = Math.ceil(count / limit);

    if (page > totalPages && totalPages !== 0) {
      throw new Error("Requested page exceeds total number of pages.");
    }

    return {
      appointments: rows,
      total: count,
      page: Number(page),
      totalPages,
    };
  }
}

module.exports = AppointmentDao;
