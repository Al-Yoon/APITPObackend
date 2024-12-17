const dotenv = require('dotenv');
const { Resend } = require('resend');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// Email destino, título, template
const sendMail = async (email, subject, htmlTemplate) => {
  await resend.emails.send({
    from: 'onoarding@resend.dev>',
    to: email('bohersantiago@gmail.com'),
    subject: 'EasyPays: Notificacion de Pago',
    html: htmlTemplate
  });
}

module.exports = {
  sendMail,
};

