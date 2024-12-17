const {Router} = require('express');
const ProjectController = require('../controllers/projectController');
const jwtValidator = require("../middlewares/jwtValidator");
const multer = require("multer");
const {check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/', ProjectController.getProjects);//http://localhost:8080/api/projects/ - GET PROJECTS

router.get('/:id', ProjectController.getProjectById); //http://localhost:8080/api/projects/:id - GET PROJECT POR ID

//lo que necesito crear para el proyecto
router.post('/',[
    /*check('project.nombre').not().isEmpty(),
    check('project.descripcion').not().isEmpty(),
    check('project.fecha').not().isEmpty(),*/
    validateRequest
    //no va la img pq no se crea con la img, se agrega dsp
    ],/*jwtValidator,*/ ProjectController.createProject); //http://localhost:8080/api/projects/ - POST PROJECTS

router.put('/:id',/*jwtValidator,*/ ProjectController.updateProject); //http://localhost:8080/api/projects/:id  - PUT PROYECTOS

router.delete('/:id',/* jwtValidator,*/ ProjectController.deleteProject); //http://localhost:8080/api/projects/:id - DELETE PROYECTOS

router.post('/notify', [
    check('projectId').not().isEmpty(),
    check('userId').not().isEmpty(),
    validateRequest
  ], /* jwtValidator,*/ ProjectController.notify); // http://localhost:8080/api/projects/notify - POST NOTIFY

module.exports = router;