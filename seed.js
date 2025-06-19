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

    // 1. Create Vietnamese Departments
    const departments = await Promise.all([
      Department.create({
        name: "Tim mạch",
        description: "Điều trị các bệnh liên quan đến tim và hệ mạch máu",
      }),
      Department.create({
        name: "Da liễu",
        description: "Điều trị các vấn đề về da, tóc và móng",
      }),
      Department.create({
        name: "Thần kinh",
        description: "Điều trị các rối loạn não và hệ thần kinh",
      }),
      Department.create({
        name: "Chỉnh hình",
        description: "Điều trị các vấn đề về xương, khớp và cơ",
      }),
      Department.create({
        name: "Nhi khoa",
        description:
          "Chăm sóc y tế cho trẻ sơ sinh, trẻ em và thanh thiếu niên",
      }),
      Department.create({
        name: "Tiêu hóa",
        description: "Điều trị rối loạn hệ tiêu hóa và đường ruột",
      }),
      Department.create({
        name: "Nhãn khoa",
        description: "Điều trị các vấn đề về mắt và thị lực",
      }),
      Department.create({
        name: "Tai Mũi Họng",
        description: "Điều trị các bệnh về tai, mũi và họng",
      }),
      Department.create({
        name: "Sản phụ khoa",
        description: "Chăm sóc sức khỏe phụ nữ và thai sản",
      }),
      Department.create({
        name: "Hô hấp",
        description: "Điều trị các bệnh về phổi và đường hô hấp",
      }),
    ]);

    // 2. Create Vietnamese doctor users for different departments
    const doctorUsers = await Promise.all([
      // Tim mạch
      User.create({
        role: "doctor",
        email: "bs.nguyen.vantam@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Nguyễn Văn Tâm",
        phone_number: "0912345678",
      }),
      User.create({
        role: "doctor",
        email: "bs.tran.thuyhang@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Trần Thúy Hằng",
        phone_number: "0923456781",
      }),
      // Da liễu
      User.create({
        role: "doctor",
        email: "bs.le.minhphuc@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Lê Minh Phúc",
        phone_number: "0934567812",
      }),
      User.create({
        role: "doctor",
        email: "bs.pham.thanhhoa@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Phạm Thanh Hoa",
        phone_number: "0945678123",
      }),
      // Thần kinh
      User.create({
        role: "doctor",
        email: "bs.vo.duytan@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Võ Duy Tân",
        phone_number: "0956781234",
      }),
      // Chỉnh hình
      User.create({
        role: "doctor",
        email: "bs.hoang.quocthanh@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Hoàng Quốc Thành",
        phone_number: "0967812345",
      }),
      // Nhi khoa
      User.create({
        role: "doctor",
        email: "bs.doan.thimaithi@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Đoàn Thị Mai Thi",
        phone_number: "0978123456",
      }),
      // Tiêu hóa
      User.create({
        role: "doctor",
        email: "bs.truong.quocbao@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Trương Quốc Bảo",
        phone_number: "0981234567",
      }),
      // Nhãn khoa
      User.create({
        role: "doctor",
        email: "bs.mai.thianhthu@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Mai Thị Anh Thư",
        phone_number: "0989123456",
      }),
      // Tai Mũi Họng
      User.create({
        role: "doctor",
        email: "bs.dinh.congdanh@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Đinh Công Danh",
        phone_number: "0990123456",
      }),
      // Sản phụ khoa
      User.create({
        role: "doctor",
        email: "bs.ly.thuyhien@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Lý Thúy Hiền",
        phone_number: "0901234568",
      }),
      // Hô hấp
      User.create({
        role: "doctor",
        email: "bs.bui.viethoang@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Bùi Việt Hoàng",
        phone_number: "0912345679",
      }),
      // Thêm nhiều bác sĩ khác
      User.create({
        role: "doctor",
        email: "bs.tran.anhtu@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Trần Anh Tú",
        phone_number: "0923456782",
      }),
      User.create({
        role: "doctor",
        email: "bs.nguyen.thikimchi@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Nguyễn Thị Kim Chi",
        phone_number: "0934567813",
      }),
      User.create({
        role: "doctor",
        email: "bs.le.quoctien@example.com",
        password: await hashPassword("doctor123"),
        fullname: "BS. Lê Quốc Tiến",
        phone_number: "0945678124",
      }),
    ]);

    // 3. Create Doctor profiles with different departments
    await Promise.all([
      // Tim mạch
      Doctor.create({
        user_id: doctorUsers[0].id,
        department_id: departments[0].id,
        bio: "Chuyên gia về rối loạn nhịp tim và các vấn đề tim mạch. Tốt nghiệp Đại học Y Dược TP.HCM và có hơn 15 năm kinh nghiệm.",
      }),
      Doctor.create({
        user_id: doctorUsers[1].id,
        department_id: departments[0].id,
        bio: "Chuyên về can thiệp tim mạch và điều trị các bệnh mạch vành. Tốt nghiệp Đại học Y Hà Nội, từng tu nghiệp tại Pháp.",
      }),
      // Da liễu
      Doctor.create({
        user_id: doctorUsers[2].id,
        department_id: departments[1].id,
        bio: "Chuyên gia về điều trị mụn, nám và các bệnh da liễu thẩm mỹ. Tu nghiệp tại Hàn Quốc về da liễu laser.",
      }),
      Doctor.create({
        user_id: doctorUsers[3].id,
        department_id: departments[1].id,
        bio: "Chuyên điều trị các bệnh da lý do dị ứng và miễn dịch, kinh nghiệm hơn 10 năm tại các bệnh viện lớn.",
      }),
      // Thần kinh
      Doctor.create({
        user_id: doctorUsers[4].id,
        department_id: departments[2].id,
        bio: "Chuyên điều trị động kinh và các rối loạn thần kinh trung ương. Tốt nghiệp chuyên khoa II tại Đại học Y Dược TPHCM.",
      }),
      // Chỉnh hình
      Doctor.create({
        user_id: doctorUsers[5].id,
        department_id: departments[3].id,
        bio: "Chuyên về chấn thương thể thao và phẫu thuật thay khớp. Có nhiều năm kinh nghiệm phẫu thuật vi phẫu xương khớp.",
      }),
      // Nhi khoa
      Doctor.create({
        user_id: doctorUsers[6].id,
        department_id: departments[4].id,
        bio: "Chuyên khoa nhi với hơn 12 năm kinh nghiệm, đặc biệt về bệnh lý hô hấp ở trẻ em.",
      }),
      // Tiêu hóa
      Doctor.create({
        user_id: doctorUsers[7].id,
        department_id: departments[5].id,
        bio: "Chuyên gia về bệnh lý đại tràng và nội soi tiêu hóa, có chứng chỉ nội soi tiêu hóa quốc tế.",
      }),
      // Nhãn khoa
      Doctor.create({
        user_id: doctorUsers[8].id,
        department_id: departments[6].id,
        bio: "Chuyên điều trị các bệnh về võng mạc và glaucoma, được đào tạo chuyên sâu tại Singapore.",
      }),
      // Tai Mũi Họng
      Doctor.create({
        user_id: doctorUsers[9].id,
        department_id: departments[7].id,
        bio: "Chuyên gia về phẫu thuật tai mũi họng với kinh nghiệm hơn 15 năm, đặc biệt về điều trị viêm xoang.",
      }),
      // Sản phụ khoa
      Doctor.create({
        user_id: doctorUsers[10].id,
        department_id: departments[8].id,
        bio: "Chuyên về sản khoa và điều trị vô sinh hiếm muộn, tốt nghiệp chuyên khoa sản tại Pháp.",
      }),
      // Hô hấp
      Doctor.create({
        user_id: doctorUsers[11].id,
        department_id: departments[9].id,
        bio: "Chuyên gia về bệnh phổi tắc nghẽn mạn tính và hen suyễn, có kinh nghiệm điều trị COVID-19.",
      }),
      // Thêm bác sĩ cho các khoa
      Doctor.create({
        user_id: doctorUsers[12].id,
        department_id: departments[2].id, // Thần kinh
        bio: "Chuyên gia về đau đầu và chứng đau thần kinh, tốt nghiệp tại Đức và có kinh nghiệm điều trị đau mạn tính.",
      }),
      Doctor.create({
        user_id: doctorUsers[13].id,
        department_id: departments[4].id, // Nhi khoa
        bio: "Chuyên về dinh dưỡng trẻ em và các bệnh lý về tăng trưởng phát triển. Từng công tác tại Bệnh viện Nhi Đồng 1.",
      }),
      Doctor.create({
        user_id: doctorUsers[14].id,
        department_id: departments[7].id, // Tai Mũi Họng
        bio: "Chuyên về phẫu thuật thanh quản và điều trị các bệnh lý về giọng nói. Tốt nghiệp tại Hàn Quốc.",
      }),
    ]);

    // 4. Create Vietnamese symptoms for each department
    await Promise.all([
      // Tim mạch
      Symptom.create({
        name: "Đau thắt ngực",
        department_id: departments[0].id,
      }),
      Symptom.create({
        name: "Khó thở",
        department_id: departments[0].id,
      }),
      Symptom.create({
        name: "Đánh trống ngực",
        department_id: departments[0].id,
      }),
      Symptom.create({
        name: "Nhịp tim không đều",
        department_id: departments[0].id,
      }),
      Symptom.create({
        name: "Chóng mặt khi thay đổi tư thế",
        department_id: departments[0].id,
      }),

      // Da liễu
      Symptom.create({ name: "Phát ban da", department_id: departments[1].id }),
      Symptom.create({
        name: "Mụn trứng cá",
        department_id: departments[1].id,
      }),
      Symptom.create({ name: "Da khô", department_id: departments[1].id }),
      Symptom.create({ name: "Nổi mề đay", department_id: departments[1].id }),
      Symptom.create({ name: "Dị ứng da", department_id: departments[1].id }),
      Symptom.create({
        name: "Nám, tàn nhang",
        department_id: departments[1].id,
      }),

      // Thần kinh
      Symptom.create({ name: "Đau đầu", department_id: departments[2].id }),
      Symptom.create({ name: "Chóng mặt", department_id: departments[2].id }),
      Symptom.create({ name: "Mất trí nhớ", department_id: departments[2].id }),
      Symptom.create({ name: "Co giật", department_id: departments[2].id }),
      Symptom.create({
        name: "Tê bì tay chân",
        department_id: departments[2].id,
      }),

      // Chỉnh hình
      Symptom.create({ name: "Đau khớp", department_id: departments[3].id }),
      Symptom.create({ name: "Đau lưng", department_id: departments[3].id }),
      Symptom.create({ name: "Căng cơ", department_id: departments[3].id }),
      Symptom.create({
        name: "Thoái hóa khớp",
        department_id: departments[3].id,
      }),
      Symptom.create({ name: "Đau vai gáy", department_id: departments[3].id }),

      // Nhi khoa
      Symptom.create({
        name: "Sốt ở trẻ em",
        department_id: departments[4].id,
      }),
      Symptom.create({
        name: "Lo ngại về tăng trưởng",
        department_id: departments[4].id,
      }),
      Symptom.create({
        name: "Ho ở trẻ em",
        department_id: departments[4].id,
      }),
      Symptom.create({
        name: "Đau bụng ở trẻ",
        department_id: departments[4].id,
      }),

      // Tiêu hóa
      Symptom.create({
        name: "Đau dạ dày",
        department_id: departments[5].id,
      }),
      Symptom.create({ name: "Buồn nôn", department_id: departments[5].id }),
      Symptom.create({ name: "Ợ nóng", department_id: departments[5].id }),
      Symptom.create({ name: "Táo bón", department_id: departments[5].id }),
      Symptom.create({ name: "Tiêu chảy", department_id: departments[5].id }),

      // Nhãn khoa
      Symptom.create({
        name: "Mờ mắt",
        department_id: departments[6].id,
      }),
      Symptom.create({ name: "Đau mắt", department_id: departments[6].id }),
      Symptom.create({ name: "Đỏ mắt", department_id: departments[6].id }),
      Symptom.create({ name: "Khô mắt", department_id: departments[6].id }),

      // Tai Mũi Họng
      Symptom.create({
        name: "Đau họng",
        department_id: departments[7].id,
      }),
      Symptom.create({
        name: "Mất thính lực",
        department_id: departments[7].id,
      }),
      Symptom.create({
        name: "Chảy nước mũi",
        department_id: departments[7].id,
      }),
      Symptom.create({
        name: "Nghẹt mũi",
        department_id: departments[7].id,
      }),
      Symptom.create({
        name: "Ù tai",
        department_id: departments[7].id,
      }),

      // Sản phụ khoa
      Symptom.create({
        name: "Kinh nguyệt không đều",
        department_id: departments[8].id,
      }),
      Symptom.create({
        name: "Đau bụng kinh",
        department_id: departments[8].id,
      }),
      Symptom.create({
        name: "Khí hư bất thường",
        department_id: departments[8].id,
      }),

      // Hô hấp
      Symptom.create({
        name: "Ho kéo dài",
        department_id: departments[9].id,
      }),
      Symptom.create({
        name: "Khó thở khi gắng sức",
        department_id: departments[9].id,
      }),
      Symptom.create({
        name: "Thở khò khè",
        department_id: departments[9].id,
      }),
    ]);

    // 5. Create Vietnamese patient users
    const vietnameseNames = [
      "Nguyễn Văn An",
      "Trần Thị Bích",
      "Lê Hoàng Cường",
      "Phạm Thị Diễm",
      "Hoàng Văn Em",
      "Võ Thị Phương",
      "Phan Văn Giàu",
      "Đặng Thị Hương",
      "Bùi Văn Ích",
      "Đỗ Thị Kim",
      "Lý Văn Lâm",
      "Mai Thị Ngọc",
      "Dương Văn Oanh",
      "Trương Thị Phương",
      "Hồ Văn Quang",
      "Đinh Thị Rạng",
      "Lương Văn Sơn",
      "Huỳnh Thị Thanh",
      "Trương Văn Uy",
      "Ngô Thị Vân",
    ];

    const patientUsers = await Promise.all(
      Array.from({ length: 20 }, async (_, i) => {
        return await User.create({
          role: "patient",
          email: `benhnhan${i + 1}@example.com`,
          password: await hashPassword(`matkhau${i + 1}`),
          fullname: vietnameseNames[i],
          phone_number: `09${String(i + 10000000).slice(1)}`,
        });
      })
    );

    // 6. Create Patient profiles with Vietnamese addresses
    const vietnameseAddresses = [
      "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
      "45 Lê Lợi, Quận 1, TP.HCM",
      "67 Trần Hưng Đạo, Quận 5, TP.HCM",
      "89 Võ Văn Tần, Quận 3, TP.HCM",
      "12 Nguyễn Huệ, Quận 1, TP.HCM",
      "34 Đinh Công Tráng, Quận Bình Thạnh, TP.HCM",
      "56 Lý Thường Kiệt, Quận 10, TP.HCM",
      "78 Cách Mạng Tháng 8, Quận 3, TP.HCM",
      "91 Nguyễn Du, Quận 1, TP.HCM",
      "23 Lê Duẩn, Quận 1, TP.HCM",
      "45 Điện Biên Phủ, Quận 3, TP.HCM",
      "67 Trần Quốc Thảo, Quận 3, TP.HCM",
      "89 Nam Kỳ Khởi Nghĩa, Quận 1, TP.HCM",
      "101 Nguyễn Trãi, Quận 5, TP.HCM",
      "234 Lý Chính Thắng, Quận 3, TP.HCM",
      "345 Phan Xích Long, Quận Phú Nhuận, TP.HCM",
      "456 Trường Sa, Quận Phú Nhuận, TP.HCM",
      "567 Hoàng Văn Thụ, Quận Tân Bình, TP.HCM",
      "678 Cộng Hòa, Quận Tân Bình, TP.HCM",
      "789 Nguyễn Kiệm, Quận Gò Vấp, TP.HCM",
    ];

    await Promise.all(
      patientUsers.map((user, i) =>
        Patient.create({
          user_id: user.id,
          dob: new Date(1980 + (i % 30), i % 12, (i % 28) + 1),
          gender: i % 2 === 0 ? "Nam" : "Nữ",
          address: vietnameseAddresses[i],
        })
      )
    );

    // 7. Create many appointments with Vietnamese notes
    const appointmentNotes = [
      "Khám định kỳ tim mạch.",
      "Điều trị mụn trứng cá.",
      "Khám đau đầu thường xuyên.",
      "Tư vấn về đau khớp gối.",
      "Khám sức khỏe định kỳ cho trẻ.",
      "Kiểm tra dạ dày và tiêu hóa.",
      "Khám mắt và đo thị lực.",
      "Điều trị viêm họng mãn tính.",
      "Khám thai định kỳ.",
      "Kiểm tra phổi sau đợt viêm phổi.",
      "Tái khám sau phẫu thuật tim.",
      "Điều trị nấm da chân.",
      "Khám co giật nhẹ.",
      "Đau vai gáy kéo dài.",
      "Khám trẻ biếng ăn.",
      "Tư vấn về chứng trào ngược dạ dày.",
      "Kiểm tra thị lực và kính mắt.",
      "Khám nghẹt mũi mãn tính.",
      "Tư vấn kế hoạch hóa gia đình.",
      "Khám ho kéo dài sau COVID-19.",
      "Đau ngực khi gắng sức.",
      "Phát ban da sau khi dùng thuốc mới.",
      "Khám đau đầu và hoa mắt chóng mặt.",
      "Đau lưng sau tai nạn giao thông.",
      "Khám trẻ hay bị sốt về đêm.",
    ];

    // Generate appointment times
    const appointmentTimes = [
      "08:00:00",
      "08:30:00",
      "09:00:00",
      "09:30:00",
      "10:00:00",
      "10:30:00",
      "11:00:00",
      "13:30:00",
      "14:00:00",
      "14:30:00",
      "15:00:00",
      "15:30:00",
      "16:00:00",
      "16:30:00",
    ];

    // Create future dates for appointments
    const generateFutureDates = (count) => {
      const dates = [];
      const today = new Date();
      for (let i = 0; i < count; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        // Skip weekends
        if (futureDate.getDay() === 0 || futureDate.getDay() === 6) {
          continue;
        }
        dates.push(futureDate);
      }
      return dates.slice(0, count);
    };

    const futureDates = generateFutureDates(40);

    // Create many appointments
    const appointments = [];
    for (let i = 0; i < 60; i++) {
      const randomDoctorIndex = Math.floor(Math.random() * doctorUsers.length);
      const randomPatientIndex = Math.floor(
        Math.random() * patientUsers.length
      );
      const randomDateIndex = Math.floor(Math.random() * futureDates.length);
      const randomTimeIndex = Math.floor(
        Math.random() * appointmentTimes.length
      );
      const randomNoteIndex = Math.floor(
        Math.random() * appointmentNotes.length
      );

      // Random status based on date
      let status = "scheduled";
      const appointmentDate = new Date(futureDates[randomDateIndex]);
      const today = new Date();
      if (appointmentDate < today) {
        status = Math.random() > 0.3 ? "completed" : "cancelled";
      } else if (appointmentDate.getDate() === today.getDate()) {
        status = Math.random() > 0.5 ? "confirmed" : "scheduled";
      }

      appointments.push(
        Appointment.create({
          doctor_id: doctorUsers[randomDoctorIndex].id,
          patient_id: patientUsers[randomPatientIndex].id,
          appoint_taken_date: futureDates[randomDateIndex],
          appointment_time: appointmentTimes[randomTimeIndex],
          status: status,
          note: appointmentNotes[randomNoteIndex],
        })
      );
    }

    await Promise.all(appointments);

    console.log("✅ Dữ liệu mẫu tiếng Việt đã được tạo thành công.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi khi tạo dữ liệu mẫu:", error);
    process.exit(1);
  }
})();
