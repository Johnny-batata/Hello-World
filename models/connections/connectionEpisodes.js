const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const MONGO_DB_URL = 'mongodb+srv://johnmasterbr:020616@cluster0.o0r6v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let db = null;

const connection = () => {
  return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db('animesProjectsDB');
      return db;
    })
};

module.exports = connection;