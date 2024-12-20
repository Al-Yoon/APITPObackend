
const { Router } = require('express');
const ProjectController = require('../controllers/projectController');
const jwtValidator = require("../middlewares/jwtValidator");
const multer = require("multer");
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/', ProjectController.getProjects); //http://localhost:8080/api/projects/ - GET PROJECTS

router.get('/:id', ProjectController.getProjectById); //http://localhost:8080/api/projects/:id - GET PROJECT POR ID

router.post('/', [
  check('nombre').not().isEmpty(),
  check('descripcion').not().isEmpty(),
  check('fecha').not().isEmpty(),
  validateRequest
], ProjectController.createProject); //http://localhost:8080/api/projects/ - POST PROJECTS

router.put('/:id', ProjectController.updateProject); //http://localhost:8080/api/projects/:id  - PUT PROYECTOS

router.delete('/:id', ProjectController.deleteProject); //http://localhost:8080/api/projects/:id - DELETE PROYECTOS

router.post('/notify', ProjectController.notify); // http://localhost:8080/api/projects/notify - POST NOTIFY

module.exports = router;
