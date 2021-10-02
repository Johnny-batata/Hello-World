const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ 
  service: 'outlook', 
  auth: { 
     user: 'aniproject64@outlook.com', 
     pass: 'G4wzbd007', 
   }, 
  });

  const emailSend = (email) => {
    const mailOptions = {
      from: 'aniproject64@outlook.com', // sender address
      to: email, // receiver (use array of string for a list)
      subject: 'Email de boas vindas - aniProject', // Subject line
      text: 'Bem vindo ao aniproject =)', // plain text body
    };

   return mailOptions;
};

module.exports = { transporter, emailSend };