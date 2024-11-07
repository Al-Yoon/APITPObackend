const {Router} = require('express');
const ProjectController = require('../controllers/projects');
const multer = require("multer");

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', ProjectController.getProjects);//http://localhost:8080/api/projects/ - GET PROJECTS

router.post('/', ProjectController.createProject); //http://localhost:8080/api/projects/ - POST PROJECTS

router.get('/:id', ProjectController.getProjectById); //http://localhost:8080/api/projects/:id - GET PROJECT POR ID

module.exports = router;