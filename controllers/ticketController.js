const TicketService = require('../services/ticketService');
const CloudinaryService = require('../services/cloudinaryService');

class TicketController {
  async getTickets(req, res) {
    try {
      const tickets = await TicketService.getTickets();
      res.status(200).json(tickets);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }

  async getTicketById(req, res) {
    try {
      const { id } = req.params;
      let ticket = await TicketService.getTicketById(Number(id));
      if (!ticket) {
        return res.status(404).json({
          method: "getTicketById",
          message: "Ticket not found"
        });
      }
      return res.status(200).json(ticket);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        method: "getTicketById",
        message: err,
      });
    }
  }
  
  async createTicket(req, res){
    /* const fileBuffer = req.file.buffer;
     */try {
        /* const urlImg = await CloudinaryService.uploadImage(fileBuffer);
         */ const ticket = await TicketService.createTicket({...req.body});
        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

  async updateTicket(req,res){
    const{
        id
    } = req.params;
    try{
        const ticket = await TicketService.updateTicket(req.body,Number(id));
        res.status(200).json(ticket);
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

  async deleteTicket(req, res) {
    try {
      let isTicket = await TicketService.getTicketById(req.params.id);
      if (isTicket) {
        await TicketService.deleteTicket(req.params.id);
        return res.status(204).json({
          message: "Ticket deleted"
        });
      }
      return res.status(404).json({
        message: "Ticket not found"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteTicket",
        message: err
      });
    }
  }
}

module.exports = new TicketController();