require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");
//This line is used for create all table immediately when we first launch the main.js so dont remove it
const modelInitialization = require("./models/index");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const appointmentRoutes = require("./routes/appointment.route");
app.use(
  cors({
    origin: process.env.FRONT_END_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

const doctorRoutes = require("./routes/doctor.route");
app.use("/doctor", doctorRoutes);
app.use("/appointment", appointmentRoutes);

sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .then(() => sequelize.sync({ alter: true }))
  .then(() => console.log("Model synchronized"))
  .catch((err) => console.log(`Db connection failed:`, err));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server runniong on http://localhost:${PORT}`);
});
