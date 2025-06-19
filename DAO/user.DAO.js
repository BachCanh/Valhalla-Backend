const User = require("../models/user.model");
class UserDAO {
  async findUserByEmail(email) {
    return await User.findOne({
      where: { email: email },
    });
  }
  async updateUserPassword(email, newPassword) {
    return await User.update(
      { password: newPassword },
      {
        where: { email: email },
      }
    );
  }
}

module.exports = new UserDAO();
