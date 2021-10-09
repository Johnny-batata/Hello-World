const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const errorJoiMiddleware = require('./middlewares/joi');  
const userMiddlewares = require('./middlewares/userMiddlewares');
const mongoConnectionAnimes = require('./models/connections/connectionAnimes');

const users = require('./controllers/usersController');
const animes = require('./controllers/animesController');

const PORT = 10000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

// app.get('/teste', async (req, res) => {
// res.status(200).send({ message: 'funfou' });
// });
const fetchCategories = async (id) => { 
  try {
    const response = await axios.get(`https://kitsu.io/api/edge/anime/${id}/relationships/categories`);
   return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  
app.get('/animesCategorys/:offset/:categoryId/:status', userMiddlewares.validateToken, animes.getAnimesByCategorys);
app.post('/signup', userMiddlewares.validateIfExists, users.createUser);
app.post('/login', userMiddlewares.validateLogin, users.loginUser);
app.get('/animesStatus/:offset/:status', userMiddlewares.validateToken, animes.getAnimesByStatus);
app.get('/categorys/:offset', userMiddlewares.validateToken, animes.getAnimesCategorys);

const updateAnimes = async (identification) => {
  const db = await mongoConnectionAnimes();

  const categories = await fetchCategories(identification);

  const updatedData = await db.collection('animes').updateOne({ id: identification }, {
    $set: { categoriasId: categories },    
  }); 

  console.log(
     identification,
);

const updateResponse = await updatedData;
  return updateResponse;
};

app.get('/testes', async (req, res) => {
// 17039;
try {
(async () => {
  for (let i = 14601; i <= 17039; i += 1) {
  await updateAnimes(i.toString());
      // console.log(i);
}
})();
} catch (err) {
  console.log(err);
}
// const message db.collection('animes').sort({ id: 1 }).limit(5)

  return res.status(200).json({ message: 'funfou' });
});

const fetchAnimes = async (number) => {
  try {
  const response = await axios.get(`https://kitsu.io/api/edge/categories?page[limit]=20&page[offset]=${number}`);
 const data = await response.data.data;
 console.log(number);
 const db = await mongoConnectionAnimes();
 return db.collection('categorys').insertMany(data);
  } catch (err) {
    console.log(err);
  }
};

app.get('/teste', async (req, res) => {
  try {
    (async () => {
// 17039;

      for (let i = 13941; i <= 13960; i += 19) {
        // await new Promise((next) => {
        //   fetchAnimes(i); next();
        //   });
      await fetchAnimes(i);
          // console.log(i);
    }
    })();
    } catch (err) {
      console.log(err);
    }
    // const message db.collection('animes').sort({ id: 1 }).limit(5)
    
      return res.status(200).json({ message: 'funfou' });
});

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
app.use(errorJoiMiddleware);
