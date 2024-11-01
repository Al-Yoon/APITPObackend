const {Ticket} = require('../db/db')

const getTickets = async ()=> await Ticket.findAll(); //select * from tickets
const getTicketById = async ()=> await Ticket.findByPk(id); // select * from tickets where id = id
const createTicket = async ()=> await Ticket.create(ticket); // insert into tickets values ...

module.exports ={
    getTickets,
    getTicketById,
    createTicket,
}