const TicketService = require('../services/tickets');
const fs = require('fs');
const MailService = require('../services/mail');
const ProjectService = require('../services/projects');
const handlebars = require('handlebars');
const CloudinaryService = require('../services/cloudinary');

const getTickets = async(req,res) =>{
    try{
        const tickets = await TicketService.getTickets();
        res.status(200).json(tickets);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const getTicketById = async(req,res) =>{
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

    const createTickets = async(req,res) =>{
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
            
        //Pasarlo al proyecto
        //template del html -Handlebars
        const templatePath = path.resolve(__dirname, '../templates/email.template.hbs');
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateSource);

        const htmlContent = template({
            project: aggregatedPost.title,
            authorName: aggregatedPost.author.username,
            productName: aggregatedPost.product.description,
            content: aggregatedPost.content,
            imageUrl: aggregatedPost.imageUrl
        });

        //4 El mail
        await MailService.sendMail(
            aggregatedPost.author.email,//el mail del q creo el proyecto
            `Tu invitación ${aggregatedPost.title} se ha enviado correctamente!`,
            htmlContent)

        res.status(200).json(ticket);
    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports ={
    getTickets,
    getTicketById,
    createTickets
}
