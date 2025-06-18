require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  User,
  Doctor,
  Patient,
  Department,
  Appointment,
  Symptom,
} = require("./models");

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
    await Symptom.destroy({ where: {} });
    await Department.destroy({ where: {} });

    // 1. Create Multiple Departments
    const departments = await Promise.all([
      Department.create({
        name: "Cardiology",
        description: "Heart and cardiovascular system related treatments",
      }),
      Department.create({
        name: "Dermatology",
        description: "Skin, hair, and nail conditions treatment",
      }),
      Department.create({
        name: "Neurology",
        description: "Brain and nervous system disorders",
      }),
      Department.create({
        name: "Orthopedics",
        description: "Bone, joint, and muscle problems",
      }),
      Department.create({
        name: "Pediatrics",
        description: "Medical care for infants, children, and adolescents",
      }),
      Department.create({
        name: "Gastroenterology",
        description: "Digestive system and gastrointestinal tract disorders",
      }),
      Department.create({
        name: "Ophthalmology",
        description: "Eye and vision related treatments",
      }),
      Department.create({
        name: "ENT",
        description: "Ear, Nose, and Throat conditions",
      }),
    ]);

    // 2. Create doctor users for different departments
    const doctorUsers = await Promise.all([
      // Cardiology doctors
      User.create({
        role: "doctor",
        email: "dr.alice.heart@example.com",
        password: await hashPassword("doc1password"),
        fullname: "Dr. Alice Heart",
        phone_number: "0123456789",
      }),
      User.create({
        role: "doctor",
        email: "dr.bob.pulse@example.com",
        password: await hashPassword("doc2password"),
        fullname: "Dr. Bob Pulse",
        phone_number: "0987654321",
      }),
      // Dermatology doctors
      User.create({
        role: "doctor",
        email: "dr.sarah.skin@example.com",
        password: await hashPassword("doc3password"),
        fullname: "Dr. Sarah Skin",
        phone_number: "0123456788",
      }),
      // Neurology doctors
      User.create({
        role: "doctor",
        email: "dr.michael.brain@example.com",
        password: await hashPassword("doc4password"),
        fullname: "Dr. Michael Brain",
        phone_number: "0123456787",
      }),
      // Orthopedics doctors
      User.create({
        role: "doctor",
        email: "dr.john.bone@example.com",
        password: await hashPassword("doc5password"),
        fullname: "Dr. John Bone",
        phone_number: "0123456786",
      }),
      // Pediatrics doctors
      User.create({
        role: "doctor",
        email: "dr.emma.kids@example.com",
        password: await hashPassword("doc6password"),
        fullname: "Dr. Emma Kids",
        phone_number: "0123456785",
      }),
    ]);

    // 3. Create Doctor profiles with different departments
    await Promise.all([
      // Cardiology
      Doctor.create({
        user_id: doctorUsers[0].id,
        department_id: departments[0].id, // Cardiology
        bio: "Specialist in arrhythmia and heart rhythm issues.",
      }),
      Doctor.create({
        user_id: doctorUsers[1].id,
        department_id: departments[0].id, // Cardiology
        bio: "Expert in interventional cardiology.",
      }),
      // Dermatology
      Doctor.create({
        user_id: doctorUsers[2].id,
        department_id: departments[1].id, // Dermatology
        bio: "Specializes in skin cancer treatment and cosmetic dermatology.",
      }),
      // Neurology
      Doctor.create({
        user_id: doctorUsers[3].id,
        department_id: departments[2].id, // Neurology
        bio: "Expert in treating epilepsy and brain disorders.",
      }),
      // Orthopedics
      Doctor.create({
        user_id: doctorUsers[4].id,
        department_id: departments[3].id, // Orthopedics
        bio: "Specializes in sports injuries and joint replacement.",
      }),
      // Pediatrics
      Doctor.create({
        user_id: doctorUsers[5].id,
        department_id: departments[4].id, // Pediatrics
        bio: "Experienced in child healthcare and development.",
      }),
    ]);

    // 4. Create symptoms for each department (if you have Symptom model)
    if (Symptom) {
      await Promise.all([
        // Cardiology symptoms
        Symptom.create({
          name: "Chest pain",
          department_id: departments[0].id,
        }),
        Symptom.create({
          name: "Shortness of breath",
          department_id: departments[0].id,
        }),
        Symptom.create({
          name: "Heart palpitations",
          department_id: departments[0].id,
        }),

        // Dermatology symptoms
        Symptom.create({ name: "Skin rash", department_id: departments[1].id }),
        Symptom.create({ name: "Acne", department_id: departments[1].id }),
        Symptom.create({ name: "Dry skin", department_id: departments[1].id }),

        // Neurology symptoms
        Symptom.create({ name: "Headache", department_id: departments[2].id }),
        Symptom.create({ name: "Dizziness", department_id: departments[2].id }),
        Symptom.create({
          name: "Memory loss",
          department_id: departments[2].id,
        }),

        // Orthopedics symptoms
        Symptom.create({
          name: "Joint pain",
          department_id: departments[3].id,
        }),
        Symptom.create({ name: "Back pain", department_id: departments[3].id }),
        Symptom.create({
          name: "Muscle strain",
          department_id: departments[3].id,
        }),

        // Pediatrics symptoms
        Symptom.create({
          name: "Fever in children",
          department_id: departments[4].id,
        }),
        Symptom.create({
          name: "Growth concerns",
          department_id: departments[4].id,
        }),

        // Gastroenterology symptoms
        Symptom.create({
          name: "Stomach pain",
          department_id: departments[5].id,
        }),
        Symptom.create({ name: "Nausea", department_id: departments[5].id }),
        Symptom.create({ name: "Heartburn", department_id: departments[5].id }),

        // Ophthalmology symptoms
        Symptom.create({
          name: "Blurred vision",
          department_id: departments[6].id,
        }),
        Symptom.create({ name: "Eye pain", department_id: departments[6].id }),

        // ENT symptoms
        Symptom.create({
          name: "Sore throat",
          department_id: departments[7].id,
        }),
        Symptom.create({
          name: "Hearing loss",
          department_id: departments[7].id,
        }),
        Symptom.create({
          name: "Runny nose",
          department_id: departments[7].id,
        }),
      ]);
    }

    // 5. Create patient users (same as before)
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

    // 6. Create Patient profiles (same as before)
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

    // 7. Create appointments with different doctors
    await Promise.all([
      Appointment.create({
        doctor_id: doctorUsers[0].id, // Cardiology
        patient_id: patientUsers[0].id,
        appoint_taken_date: new Date(),
        appointment_time: "08:30",
        note: "Heart checkup.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[2].id, // Dermatology
        patient_id: patientUsers[1].id,
        appoint_taken_date: new Date(),
        appointment_time: "09:30",
        status: "completed",
        note: "Skin treatment completed.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[3].id, // Neurology
        patient_id: patientUsers[2].id,
        appoint_taken_date: new Date(),
        appointment_time: "10:30",
        note: "Neurological examination.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[4].id, // Orthopedics
        patient_id: patientUsers[3].id,
        appoint_taken_date: new Date(),
        appointment_time: "11:00",
        note: "Joint pain consultation.",
      }),
      Appointment.create({
        doctor_id: doctorUsers[5].id, // Pediatrics
        patient_id: patientUsers[4].id,
        appoint_taken_date: new Date(),
        appointment_time: "13:00",
        status: "scheduled",
        note: "Child wellness check.",
      }),
    ]);

    console.log("✅ Dummy data with multiple departments seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
})();
