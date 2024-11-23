const {Router} = require('express');
const UserController = require('../controllers/users');
const{check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/', UserController.getUsers);//http://localhost:8080/api/users/ - GET USUARIOS

 //lo que necesito cargar para el user
router.post('/',
    [
        check("nombre").not().isEmpty(),
        check("email").not().isEmpty(),
        validateRequest,//validamos desde el middleware
    ],
    UserController.createUser); //http://localhost:8080/api/users/ - POST USUARIOS

    //lo que necesito cargar para el login
router.post('/login',
    [
        check("email").not().isEmpty(),
        check("contrasenia").not().isEmpty(),
        validateRequest,//validamos desde el middleware
        ],
        UserController.login); //http://localhost:8080/api/users/login - POST PARA EL LOGIN

router.get('/:id', UserController.getUserById); //http://localhost:8080/api/users/:id - GET USUARIOS POR ID

router.put('/:id',jwtValidator,UserController.updateUser); //http://localhost:8080/api/users/:id - PUT USERS

router.delete('/:id',jwtValidator,UserController.deleteUser); //http://localhost:8080/api/users/:id - DELETE USERS

module.exports = router;