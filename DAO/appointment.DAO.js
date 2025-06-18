const Appointment = require("../models/appointment.model");
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
}
module.exports = new AppointmentDAO();