const { validationResult } = require('express-validator');

// Middleware de validación de solicitudes
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array()
    });
  } else {
    next();
  }
};

module.exports = validateRequest;