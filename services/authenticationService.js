require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../db/models/User");

class AuthService {
  async hasValidateCredentials(email, password) {
    try {
      const user = await UserModel.findOne({ where: {email:email  }});
      if (!user) {
        return false;
      }
      const isPasswordValid = await bcrypt.compare(password, user.contrasenia);
      //const isPasswordValid = await bcrypt.compare(password, user.contrasenia);
      return isPasswordValid;
    } catch (err) {
      console.log(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthService();