require("dotenv").config();
const bcrypt = require("bcrypt");
const { User, Doctor, Patient, Department, Appointment } = require("./models");

const hashPassword = async (plainPassword) => {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

(async () => {
  try {
    // Optional: Clean up old data
    await Appointment.destroy({ where: {} });
    await Doctor.destroy({ where: {} });
    await Patient.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Department.destroy({ where: {} });

    // 1. Create a Department
    const cardiology = await Department.create({
      name: "Cardiology",
      description: "Heart related department",
    });

    // 2. Create 2 doctor users
    const doctorUsers = await Promise.all([
      User.create({
        role: "doctor",
        email: "doc1@example.com",
        password: await hashPassword("doc1password"),
        fullname: "Dr. Alice Heart",
        phone_number: "0123456789",
      }),
      User.create({
        role: "doctor",
        email: "doc2@example.com",
        password: await hashPassword("doc2password"),
        fullname: "Dr. Bob Pulse",
        phone_number: "0987654321",
      }),
    ]);

    // 3. Create Doctor profiles
    await Promise.all([
      Doctor.create({
        user_id: doctorUsers[0].id,
        department_id: cardiology.id,
        bio: "Specialist in arrhythmia and heart rhythm issues.",
      }),
      Doctor.create({
        user_id: doctorUsers[1].id,
        department_id: cardiology.id,
        bio: "Expert in interventional cardiology.",
      }),
    ]);

    // 4. Create 5 patient users
    const patientUsers = await Promise.all(
      Array.from({ length: 5 }, async (_, i) => {
        return await User.create({
          role: "patient",
          email: `patient${i + 1}@example.com`,
          password: await hashPassword(`patientpass${i + 1}`),
          fullname: `Patient ${i + 1}`,
          phone_number: `09000000${i + 1}`,
        });
      })
    );

    // 5. Create Patient profiles
    await Promise.all(
      patientUsers.map((user, i) =>
        Patient.create({
          user_id: user.id,
          dob: new Date(2000, i, 10),
          gender: i % 2 === 0 ? "M" : "F",
          address: `123 Street ${i + 1}`,
        })
      )
    );

    // 6. Create 5 Appointments (all at different times, 1 hour implied by frontend logic)
    await Promise.all([
      Appointment.create({
        doctor_id: doctorUsers[0].id,
        patient_id: patientUsers[0].id,
        appoint_taken_date: new Date(),
        appointment_time: "08:30",
        note: "Follow-up needed.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[0].id,
        patient_id: patientUsers[1].id,
        appoint_taken_date: new Date(),
        appointment_time: "09:30",
        status: "completed",
        note: "Prescribed medication.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[1].id,
        patient_id: patientUsers[2].id,
        appoint_taken_date: new Date(),
        appointment_time: "10:30",
      }),
      Appointment.create({
        doctor_id: doctorUsers[1].id,
        patient_id: patientUsers[3].id,
        appoint_taken_date: new Date(),
        appointment_time: "11:00",
        note: "Check blood pressure.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[0].id,
        patient_id: patientUsers[4].id,
        appoint_taken_date: new Date(),
        appointment_time: "13:00",
        status: "cancelled",
        note: "Patient no-show.",
      }),
    ]);

    console.log("✅ Dummy data seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
})();
