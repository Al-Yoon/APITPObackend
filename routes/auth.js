const { Router } = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.post('/register', [
  check('nombre').not().isEmpty(),
  check('email').isEmail(),
  check('contrasenia').isLength({ min: 2 }),
  validateRequest,  
], authController.register); // http://localhost:8080/api/login/register - POST PARA EL REGISTER

router.post('/signin', [
  check('email').isEmail(),
  check('contrasenia').not().isEmpty(),
  validateRequest,  
], authController.login); // http://localhost:8080/api/login/signin - POST PARA EL LOGIN

module.exports = router;