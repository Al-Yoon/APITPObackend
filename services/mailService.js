const dotenv = require('dotenv');
const { Resend } = require('resend');
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Easypays <onboarding@resend.dev>',
      to: email,
      subject: 'Aviso de EasyPays.corp',
      html: "<strong>Tienes un nuevo saldo pendiente, en EasyPays.</strong>",
    });

    if (error) {
      console.error({ error });
      throw new Error(error.message);
    }

    console.log({ data });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  sendMail,
};