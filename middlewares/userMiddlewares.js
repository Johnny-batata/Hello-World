const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_ERROR_MSG = 'jwt malformed';

const renderError = (error) => {
  const err = {
    err: { 
      code: 'invalid_data',
      message: error.message },
  };
  return err;
};

const validateIfExists = (req, res, next) => {
// const { name, nickname, birthdate, email, password } = req.body;

const { error } = Joi.object({
  name: Joi.string().not().empty()
  .min(5),
  nickname: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
  birthdate: Joi.not().empty().required(),
  email: Joi.string()
  .email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
})
  .validate(req.body);
if (error) {
return res.status(422).json(renderError(error)); 
}

next();
};

const validateLogin = (req, res, next) => {
const { error } = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
})
.validate(req.body);
if (error) {
return res.status(422).json(renderError(error)); 
}

next();
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  const segredo = process.env.SECRETPASSWORD;

  if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }
    try {
      const decoded = jwt.verify(token, segredo);
      const userWithoutPassword = {
          username: decoded.payload.email,
          role: decoded.payload.role,
          userId: decoded.payload.userId,
      };
        req.user = userWithoutPassword;
        console.log(req.user, 'decoded', decoded);

        next();
} catch (err) {
  return res.status(401).json({ err: TOKEN_ERROR_MSG });
}
};

module.exports = { validateIfExists, validateLogin, validateToken };