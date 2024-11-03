const {Router} = require('express');
const UserController = require('../controllers/users');
const{body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/', UserController.getUsers);//http://localhost:8080/api/users/ - GET USUARIOS

router.post('/',
    [
        check("username").not().isEmpty(),
        check("email").not().isEmpty(),
        validateRequest,
    ],
    UserController.createUser); //http://localhost:8080/api/users/ - POST USUARIOS

router.get('/:id', UserController.getUserById); //http://localhost:8080/api/users/:id - GET USUARIOS POR ID

module.exports = router;