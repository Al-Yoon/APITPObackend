const {Router} = require('express');
const TicketController = require('../controllers/projects');

const router = Router();

router.get('/', TicketController.getTickets);//http://localhost:8080/api/tickets/ - GET TICKETS
router.post('/',TicketController.createTicket); //http://localhost:8080/api/users/ - POST TICKETS
router.get('/:id', TicketController.getTicketById); //http://localhost:8080/api/users/:id - GET TICKETS POR ID

module.exports = router;