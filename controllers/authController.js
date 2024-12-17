const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');
const AuthService = require('../services/authenticationService');

exports.register = async (req, res) => {
  const { nombre, apellido, email, contrasenia } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const user = await UserService.createUser({ nombre, apellido, email, contrasenia: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    let isUserRegistered = await AuthService.hasValidateCredentials(email, contrasenia);
    console.log(isUserRegistered);
    if (isUserRegistered) {
      const user = await UserService.getUserByEmail(email);

      const token = jwt.sign( user.toJSON(), process.env.PRIVATE_KEY, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        status: 200,
        token,
        message: "Token created successfully"
      });
    } else {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "login",
      message: err.message,
    });
  }
};