const {Router} = require('express');
const ProjectController = require('../controllers/projects');

const router = Router();

router.get('/', ProjectController.getProjects);//http://localhost:8080/api/projects/ - GET PROJECTS

router.post('/', ProjectController.createProject); //http://localhost:8080/api/projects/ - POST PROJECTS

router.get('/:id', ProjectController.getTProjecttById); //http://localhost:8080/api/projects/:id - GET PROJECT POR ID

module.exports = router;