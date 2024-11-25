const { Router } = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.post('/register', [
  check('nombre').not().isEmpty(),
  check('apellido').not().isEmpty(),
  check('email').isEmail(),
  check('contrasenia').isLength({ min: 6 }),
  validateRequest,
], authController.register);

router.post('/login', [
  check('email').isEmail(),
  check('contrasenia').not().isEmpty(),
  validateRequest,
], authController.login);

module.exports = router;