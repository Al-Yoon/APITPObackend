const {Ticket, Project, User} = require('../db/db');
const tickets = require('../db/models/tickets');

const ticketsAtributes = ['id','descpricion','fecha','monto','imageUrl'];

const ticketsInclude = [{
    model: Project,
    as: 'project',
    attributes: ['id','nombre','fecha','usuarioId']
}];

const getTickets = async ()=> await Ticket.findAll(); //select * from tickets

const getTicketById = async ()=> await Ticket.findByPk(id,{
    atrtributes: ticketsAtributes,
    include: ticketsInclude
}); // select * from tickets where id = id

const createTicket = async ()=> await Ticket.create(ticket); // insert into tickets values ...

module.exports ={
    getTickets,
    getTicketById,
    createTicket,
}