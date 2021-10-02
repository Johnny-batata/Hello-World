const mongoConnection = require('./connections/connectionUsers');

const createUser = async (body) => {
  const { name, nickname, birthdate, email, password } = body; 

  const db = await mongoConnection();
  return db
  .collection('users').insertOne({ name, nickname, birthdate, email, password, role: 'user' });
};

const findUserByNickName = async (nickname) => mongoConnection()
.then((db) => db.collection('users').findOne({ nickname }))
.then((result) => result);

const findUserbyEmail = async (email) => mongoConnection()
.then((db) => db.collection('users').findOne({ email }))
.then((result) => result);

module.exports = { createUser, findUserByNickName, findUserbyEmail };