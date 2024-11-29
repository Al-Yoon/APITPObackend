/* require("dotenv").config();
const jwt = require("jsonwebtoken");

const validateJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1]; // Separar 'Bearer' del token
    const jwtValidate = jwt.verify(token, process.env.PRIVATE_KEY); // Verificar el token

    if (jwtValidate) {
      req.user = jwtValidate; // Almacenar la información del usuario en el request
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = validateJwt; */

require("dotenv").config();
const jwt = require("jsonwebtoken");

const validateJwt = async (req, res, next) => {
  try {
    // Obtener el token del encabezado Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    // Si la verificación es exitosa, continuamos con la siguiente función
    req.user = decoded;  // Puedes agregar los datos del usuario al request
    next();
  } catch (err) {
    // En caso de error de verificación (token inválido, expirado, etc.)
    return res.status(401).json({
      message: "Unauthorized",
      error: err.message,  // Puedes mostrar el mensaje de error si es necesario
    });
  }
};

module.exports = validateJwt;