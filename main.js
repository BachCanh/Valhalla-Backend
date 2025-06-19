require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");

// This line is used to create all tables immediately when we first launch the app — do not remove
const modelInitialization = require("./models/index");

const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./routes/auth.route");
const appointmentRoutes = require("./routes/appointment.route");

const doctorRoutes = require("./routes/doctor.route");
const patientRoutes = require("./routes/patient.route");
const departmentRoutes = require("./routes/department.route");
const symptomRoutes = require("./routes/symptom.route");

// Middleware
app.use(
  cors({
    origin: process.env.FRONT_END_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);

const PORT = process.env.PORT || 5000;

// Database connection
sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .then(() => sequelize.sync({ alter: true }))
  .then(() => console.log("Model synchronized"))
  .catch((err) => console.log("Db connection failed:", err));

// API routes
app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/department", departmentRoutes);
app.use("/symptom", symptomRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
