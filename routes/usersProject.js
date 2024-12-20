const {Router} = require('express');
const UsersProjectController = require('../controllers/usersProjectController');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/projects/:id',
    UsersProjectController.getProjectsByUser);  //http://localhost:8080/api/userProject/projects/:id - GET PROYECTO POR USER

router.post('/',[
    validateRequest,
],
UsersProjectController.addUser); //http://localhost:8080/api/userProject/  - POST MIEMBROS DEL PROYECTO

module.exports = router;