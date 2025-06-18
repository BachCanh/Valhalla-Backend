const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const User = require("../models/user.model");
const Department = require("../models/department.model");

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
  async getAppointmentsByPatient(
    patientId,
    { page = 1, limit = 10, status = "all" }
  ) {
    const offset = (page - 1) * limit;
    let where = { patient_id: patientId };

    // 👉 Filter theo status (ENUM)
    if (status !== "all") {
      where.status = status;
    }

    const { count, rows } = await Appointment.findAndCountAll({
      where,
      order: [["appoint_taken_date", "DESC"]],
      offset: Number(offset),
      limit: Number(limit),
      include: [
        {
          model: Doctor,
          include: [
            {
              model: User, // This gives you the doctor's full name
              attributes: ["fullname"],
            },
            {
              model: Department,
              attributes: ["name"], // or "dept_name", depending on your column
            },
          ],
        },
      ],
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
