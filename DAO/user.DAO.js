const User = require("../models/user.model");
class UserDAO {
  async findUserByEmail(email) {
    return await User.findOne({
      where: { email: email },
    });
  }

  async updateUser(userId, updateData, transaction = null) {
    const options = { where: { id: userId } };
    if (transaction) {
      options.transaction = transaction;
    }

    const [affectedRows] = await User.update(updateData, options);
    return affectedRows > 0;
  }
}

module.exports = new UserDAO();
