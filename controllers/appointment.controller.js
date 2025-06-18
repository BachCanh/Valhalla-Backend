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
    return res.status(500).json({ error: err.message });
  }
};
