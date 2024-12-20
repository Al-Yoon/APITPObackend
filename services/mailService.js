const dotenv = require('dotenv');
const { Resend } = require('resend');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email, subject, htmlTemplate) => {
  await resend.emails.send({
    from: 'onoarding@resend.dev>',
    to: email,
    subject: subject,
    html: htmlTemplate
  })
}

module.exports = {
  sendMail,
};