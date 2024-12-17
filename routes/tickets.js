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

router.post('/',
    /* check("descripcion").not().isEmpty(),
    check("fecha").not().isEmpty(),
    check("monto").not().isEmpty(),
    upload.single('file'), */
    validateRequest,
    /*jwtValidator,*/TicketController.createTicket); //http://localhost:8080/api/tickets/ - POST TICKETS

router.get('/:id', TicketController.getTicketById); //http://localhost:8080/api/tickets/:id - GET TICKETS POR ID

router.put('/:id',/*jwtValidator,*/TicketController.updateTicket); //http://localhost:8080/api/tickets/:id - PUT TIKCETS

router.delete('/:id',/*jwtValidator,*/TicketController.deleteTicket); ///http://localhost:8080/api/tickets/:id  - DELETE TICKETS

module.exports = router;