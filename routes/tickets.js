const {Router} = require('express');
const TicketController = require('../controllers/projects');
const multer = require('multer');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', TicketController.getTickets);//http://localhost:8080/api/tickets/ - GET TICKETS

router.post('/',
    upload.single('file'),
    TicketController.createTicket); //http://localhost:8080/api/users/ - POST TICKETS

router.get('/:id', TicketController.getTicketById); //http://localhost:8080/api/users/:id - GET TICKETS POR ID

module.exports = router;