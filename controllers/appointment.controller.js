const AppointmentDao = require("../DAO/appointment.DAO");

module.exports.getAllAppointmentsBelonged = async (req, res) => {
  try {
    console.log(req.user);
    const { customerId: patientId } = req.user;
    const { page, limit, status } = req.query;
    const result = await AppointmentDao.getAppointmentsByPatient(patientId, {
      page,
      limit,
      status,
    });
    console.log("Fetched appointments:", result);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// ...existing code...
