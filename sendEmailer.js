const nodemailer = require('nodemailer');
require('dotenv').config();

async function main(address, text) {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alymkulov.almambet@gmail.com',
      pass: 'hesoyamrimma10',
    },
  });

  await smtpTransport.sendMail({
    from: '"DELIVERY KEBAB" <process.env.GMAIL_USER>',
    to: address,
    subject: 'subject',
    text,
    html: '<b>{text}</b>',
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Сообщение отправлено на почту');
    }
  });
}

const text = 'hello my friend';
main('jinaguyfersahcoli@gmail.com', text).catch(console.error);

module.exports = main;
