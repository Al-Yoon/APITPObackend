const {Router} = require('express');
const TicketController = require('../controllers/ticketController');
const multer = require('multer');
//const jwtValidator = require("../middlewares/jwtValidator");
const { check } = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', TicketController.getTickets);//http://localhost:8080/api/tickets/ - GET TICKETS

router.get('/projects/:id', TicketController.getTicketsByProject);//http://localhost:8080/api/tickets/projects/:id - GET TICKETS POR PROYECTO

router.get('/user/:id',TicketController.getTicketsByUserId);//http://localhost:8080/api/tickets/user/:id - - GET TICKETS POR USUARIO

router.post('/',
    upload.single('file'),[
        check("descripcion").not().isEmpty(),
        check("fecha").not().isEmpty(),
        check("monto").not().isEmpty(),
        validateRequest,
    ],
    /*jwtValidator,*/ TicketController.createTicket); //http://localhost:8080/api/tickets/ - POST TICKETS

router.get('/:id', TicketController.getTicketById); //http://localhost:8080/api/tickets/:id - GET TICKETS POR ID

module.exports = router;