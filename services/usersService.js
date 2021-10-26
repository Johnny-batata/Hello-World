const usersModel = require('../models/usersModel');
const { transporter, emailSend } = require('../nodemailerTransporter');

const err = { err: {
  message: 'E-mail/nickname inválido ou já cadastrado, por favor, verifique e tente novamente',
}, 
};

const createUser = async (body) => {
  const { nickname, email } = body; 
  const userNick = await usersModel.findUserByNickName(nickname);
  const userMail = await usersModel.findUserbyEmail(email);
  transporter.sendMail(emailSend(body.email), (error, info) => {
    if (error) {
      return err;
  } 
      console.log(`Email enviado: ${info.response}`);
  });
  if (userNick || userMail) {
 return err;
} 
  return usersModel.createUser(body);
};

const loginUser = async (email, password) => {
  const userMail = await usersModel.findUserbyEmail(email);
  if (userMail.password !== password) {
    return {
      err: {
      message: 'email ou senha inválidos, por favor, verifique e tente novamente',
    }, 
    };
  }
return userMail;
};

const getProfileInfo = async (email) => {
  const userMail = await usersModel.findUserbyEmail(email);
  // console.log(userMail, email, 'getprofile');
  const { _id, name, nickname } = userMail;
  const userWithoutPassword = {
   _id,
   name, 
   nickname,
   email,
   
  };
return userWithoutPassword;
};

module.exports = { createUser, loginUser, getProfileInfo };