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

  async createTicket(req, res) {
    const fileBuffer = req.file.buffer; // file.buffer - Tomamos la data de la request
    try {
      // 1 - Cloudinary hace el upload de la img
      const urlImg = await CloudinaryService.uploadImage(fileBuffer); // llamamos al servicio de cloudinary
      // 2 - El servicio de ticket crea el ticket
      const ticket = await TicketService.createTicket({
        ...req.body, // todo lo del body
        imageUrl: urlImg
      });

      // 3 - se agrega el ticket - se joinea con el ORM
      const aggregatedTicket = await TicketService.getTicketById(ticket.id);

      res.status(200).json(ticket);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }

  async updateTicket(req, res) {
    try {
      let ticket = await TicketService.getTicketById(req.params.id);
      if (!ticket) {
        return res.status(404).json({
          method: "updateTicket",
          message: "Ticket not found"
        });
      }
      const modifiedTicket = await TicketService.updateTicket(
        req.params.id,
        req.body,
        ticket
      );
      return res.status(200).json(modifiedTicket);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "updateTicket",
        message: err
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