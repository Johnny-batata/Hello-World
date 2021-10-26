const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
require('dotenv').config();

const createUser = async (req, res) => {
  const { body } = req;
// console.log(body);

const user = await usersService
.createUser(body);
if (user.err) return res.status(422).json(user);

res.status(200).send(body);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await usersService.loginUser(email, password);
  // console.log(user);
  if (user.err) return res.status(422).json(user);
  const { _id, role } = user; 
  const segredo = process.env.SECRETPASSWORD;

   const jwtConfig = { 
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ 
    payload: { email, password, userId: _id, role } }, segredo, jwtConfig);

    res.status(200).json({ token });
};

const getProfileInfo = async (req, res) => {
  const { email } = req.body;
  // console.log(email);

  const user = await usersService.getProfileInfo(email);

  res.status(200).json({ user });
};

module.exports = { createUser, loginUser, getProfileInfo };