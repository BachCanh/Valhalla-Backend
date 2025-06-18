const User = require("../models/user.model");
class UserDAO {
  async findUserByEmail(email) {
    return await User.findOne({
      where: { email: "example@example.com" },
    });
  }
}

module.exports = new UserDAO();
