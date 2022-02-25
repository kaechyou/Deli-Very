const nodemailer = require('nodemailer');
require('dotenv').config();

async function mailClient(address, text) {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_USER_PASSWORD,
    },
  });

  await smtpTransport.sendMail({
    from: '"DELIVERY KEBAB"',
    to: address,
    subject: 'subject',
    text,
    html: `<b>${text}</b>`,
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Сообщение отправлено на почту');
    }
  });
}

// mailClient('alymkulov.almambet@gmail.com', 'rabotaet je').catch(console.error);

module.exports = mailClient;
