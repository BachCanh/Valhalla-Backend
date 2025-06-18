const DoctorDAO = require("../DAO/doctor.DAO");

module.exports.getDoctorsByDepartment = async (req, res) => {
  const { departmentId } = req.params;

  try {
    // Using doctor DAO to fetch doctors in the specified department
    const doctors = await DoctorDAO.getDoctorsWithDepartmentID(departmentId);

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "No doctors found for this department." });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getDoctorBusyDates = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID is required." });
    }

    const busyDates = await DoctorDAO.getDoctorBusyDates(doctorId);
    return res.status(200).json({ busyDates });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
