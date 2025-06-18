const Appointment = require("../models/appointment.model");
const { Op } = require("sequelize");
class AppointmentDAO {
  async createAppointment(appointmentData) {
    try {
      const newAppointment = await Appointment.create({
        doctor_id: appointmentData.doctorId,
        patient_id: appointmentData.patientId,
        appoint_taken_date: appointmentData.appoint_taken_date,
        appointment_time: appointmentData.appointment_time,
        note: appointmentData.notes,
      });
      return newAppointment;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error; // Re-throw the error for handling in the controller
    }
  }
  static async getAppointmentsByPatient(
    patientId,
    { page = 1, limit = 10, status = "all" }
  ) {
    const offset = (page - 1) * limit;

    // Get start of today (00:00:00.000)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    let where = { patient_id: patientId };

    if (status === "upcoming") {
      // Include today and future
      where.appoint_taken_date = { [Op.gte]: startOfToday };
    } else if (status === "past") {
      // Strictly before today
      where.appoint_taken_date = { [Op.lt]: startOfToday };
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

    const plainAppointments = rows.map((appointment) =>
      appointment.get({ plain: true })
    );

    return {
      appointments: plainAppointments,
      total: count,
      page: Number(page),
      totalPages,
    };
  }
}
module.exports = new AppointmentDAO();
