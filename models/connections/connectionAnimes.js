const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = 'mongodb+srv://johnmasterbr:020616@cluster0.zdeau.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-jzwc25-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true';
// const MONGO_DB_URL = 'mongodb://localhost:27017/?readPreference=primary&ssl=false';

let db = null;

const connection = () => (db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((conn) => {
      db = conn.db('animesProjectsDB');
      // db = conn.db('ANIPROJECT');
      return db;
    }));

module.exports = connection;