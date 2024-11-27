require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../db/models/User");

class AuthService {
  async hasValidateCredentials(email, contrasenia) {
    try {
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return false;
      }

      const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia);
      return isPasswordValid;
    } catch (err) {
      console.log(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthService();