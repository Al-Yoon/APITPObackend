const { Router } = require('express');
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const jwtValidator = require('../middlewares/jwtValidator');

const router = Router();

router.get('/users', userController.getUsers); // http://localhost:8080/api/users/ - GET USUARIOS

// Lo que necesito cargar para el user
router.post('/post/user', [
  check('nombre').not().isEmpty(),
  check('apellido').not().isEmpty(),
  check('email').isEmail(),
  check('contrasenia').isLength({ min: 6 }),
  validateRequest, // validamos desde el middleware
], userController.createUser); // http://localhost:8080/api/users/ - POST USUARIOS

router.get('/:id', userController.getUserById); // http://localhost:8080/api/users/:id - GET USUARIOS POR ID

router.put('/:id', jwtValidator, userController.updateUser); // http://localhost:8080/api/users/:id - PUT USERS

router.delete('/:id', jwtValidator, userController.deleteUser); // http://localhost:8080/api/users/:id - DELETE USERS

module.exports = router;