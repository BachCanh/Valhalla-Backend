const AppointmentDAO = require("../DAO/appointment.DAO");

module.exports.bookingAppointment = async (req, res) => {
  const { doctorId, appoint_taken_date, appointment_time, notes } = req.body;
  // const patientId = req.User.id;
  const { customerId } = req.user;
  const patientId = customerId; // Assuming req.user contains the authenticated user's info
  try {
    // Using AppointmentDAO to create a new appointment
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
module.exports.getAllApointmentsOfDoctor = async (req, res) => {
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
    return res.status(500).json({ error: err.message });
  }
};
module.exports.adjustStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body.sendData;
    const { customerId: doctorId } = req.user;

    // Validate status
    if (!["confirmed", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find appointment
    const appointment = await AppointmentDAO.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Ensure appointment belongs to this doctor
    if (appointment.doctor_id !== doctorId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this appointment" });
    }

    // Only allow updates if status is "scheduled"
    if (
      appointment.status !== "scheduled" &&
      appointment.status !== "confirmed"
    ) {
      return res
        .status(400)
        .json({ message: "Only scheduled appointments can be updated" });
    }

    const newAppointment = await AppointmentDAO.updateStatus(
      appointmentId,
      status
    );

    return res
      .status(200)
      .json({ message: "Cập nhật trạng thái thành công", newAppointment });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
