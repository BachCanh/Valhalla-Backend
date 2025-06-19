const AppointmentDAO = require("../DAO/appointment.DAO");

module.exports.bookingAppointment = async (req, res) => {
  const { doctorId, appoint_taken_date, appointment_time, notes } = req.body;
  const { customerId } = req.user;
  const patientId = customerId;

  try {
    const newAppointment = await AppointmentDAO.createAppointment({
      doctorId,
      patientId,
      appoint_taken_date,
      appointment_time,
      notes,
    });

    res.status(200).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getAllAppointmentsBelonged = async (req, res) => {
  try {
    const { customerId: patientId } = req.user;
    const { page, limit, status } = req.query;
    const result = await AppointmentDAO.getAppointmentsByPatient(patientId, {
      page,
      limit,
      status,
    });

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports.cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  console.log("Cancelling appointment with ID:", appointmentId);
  try {
    const result = await AppointmentDAO.cancelAppointment(appointmentId);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports.getAllAppointmentsOfDoctor = async (req, res) => {
  try {
    const { customerId: doctorId } = req.user;
    const { page, limit, status } = req.query;
    const result = await AppointmentDAO.getAllApointmentsOfDoctor(doctorId, {
      page,
      limit,
      status,
    });

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
