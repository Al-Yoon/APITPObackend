const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db/models/User');

exports.register = async (req, res) => {
  const { nombre, apellido, email, contrasenia } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasenia, 10);
    const user = await User.create({ nombre, apellido, email, contrasenia: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, contrasenia } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};