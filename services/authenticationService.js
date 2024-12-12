require("dotenv").config();
const bcrypt = require("bcrypt");
const {User} = require("../db/db");

class AuthService {
  async hasValidateCredentials(email, password) {
    try {
      const user = await User.findOne({ where: {email:email  }});
      if (!user) {
        return false;
      }
      const isPasswordValid = await bcrypt.compare(password, user.contrasenia);
      //const isPasswordValid = await bcrypt.compare(password, user.contrasenia);
      return true;
    } catch (err) {
      console.log(err);
      throw new Error("Error in credentials validation");
    }
  }
}

module.exports = new AuthService();