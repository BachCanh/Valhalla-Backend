const User = require("../models/user.model");
class UserDAO {
  async findUserByEmail(email) {
    return await User.findOne({
      where: { email: email },
    });
  }
}

module.exports = new UserDAO();
