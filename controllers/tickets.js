const TicketService = require('../services/tickets');
const fs = require('fs');
const CloudinaryService = require('../services/cloudinary');

class TicketController{
    async getTickets (req,res){
        try{
            const tickets = await TicketService.getTickets();
            res.status(200).json(tickets);
        } catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    };
    
    async getTicketById (req,res){
        const{
            id
        } = req.params;
        try{
            const ticket = await TicketService.getTicketsById(Number(id));
            if(!ticket) res.status(404).json({
                message: "Ticket Not Found"
            });
            res.status(200).json(ticket);
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    };
    
    async createTickets (req,res){
            const fileBuffer = req.fileBuffer; //file.buffer - Tomamos la data de la request
        try{
            //1 - Cloudinary hace el upload de la img
            const urlImg = await CloudinaryService.uploadImage(fileBuffer); // llamamos al servicio de cloudinary
            //2 - El servicio de ticket crea el ticket
            const ticket = await TicketService.createTicket({
                ...req.body,//todo lo del body
                imageUrl: urlImg});
    
            //3 - se agrega el ticket - se joinea con el ORM
            const aggregatedPost = await TicketService.getTicketById(ticket.id);
    
            res.status(200).json(ticket);
        } catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    };

    //Checkear si aplica
    async updateTicket(req,res){
        try{
            let TicketService = await TicketService.getTicketById(req.params.id);
            if(!project){
                return res.status(404).json(
                    {
                        method: "updateTicket",
                        message: "Ticket not found"
                    }
                )
            }
            const modifiedTicket = await TicketService.updateProject(
                req.params.id,
                req.body,
                project
            );
            return res.status(200).json(modifiedTicket);
        } catch(err){
            console.error(err);
            return res.status(500).json({
                method:"updateTicket",
                message: err
            });
        }
    }

    async deleteTicket(req,res){
        try{
            let isTicket = await TicketService.deleteTicket(req.params.id);
            if(isTicket){
                await TicketService.deleteTicket(req.params.id);
                return res.status(204).json({
                    message: "Ticket deleted"
                });
            }
            return res.status(404).json({
                message: "Error"
            });
            }catch(err){
                console.error(err);
                return res.status(500).json({
                    method: "deleteTicket",
                    message: err
                })
            }
    }
}

module.exports = new TicketController();
