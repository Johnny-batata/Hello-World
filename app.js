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

const fetchCategories = async (id) => { 
  try {
    const response = await axios
    .get(`https://kitsu.io/api/edge/anime/${id}/relationships/categories`);
   return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEpisodes = async (id) => {
    try {
      const response = await axios
      .get(`https://kitsu.io/api/edge/anime/${id}/relationships/episodes`);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };
  
  app.get(
    '/animesCategorys/:offset/:categoryId/:status', 
    userMiddlewares.validateToken, animes.getAnimesByCategorys,
);
  app.post('/signup', userMiddlewares.validateIfExists, users.createUser);
  app.post('/login', userMiddlewares.validateLogin, users.loginUser);
  app.get('/animesStatus/:offset/:status', userMiddlewares.validateToken, animes.getAnimesByStatus);
  app.get('/categorys/:offset', userMiddlewares.validateToken, animes.getAnimesCategorys);
  app.post('/profile', userMiddlewares.validateToken, users.getProfileInfo);
  app.post('/animesid/:id', userMiddlewares.validateToken, animes.getAnimeById);
  app.post('/animes/:offset', userMiddlewares.validateToken, animes.getAllAnimes);
  app.post('/movies/:offset', userMiddlewares.validateToken, animes.getAllMovies);
  
const updateAnimes = async (identification) => {
  const db = await mongoConnectionAnimes();

  // const categories = await fetchCategories(identification);

  // const updatedData = await db.collection('animes').updateOne({ id: identification }, {
  //   $set: { categoriasId: categories },    
  // }); /
  const data = await db.collection('animes').find({ $and: [{
    'attributes.subtype': { $eq: 'movie' } }, { 'attributes.averageRating': { $ne: null } }, 
    ] }).limit(1).skip(Number(identification));
    const teste = await data.map((el) => el.id);
     const categories = await fetchCategories(data.id);
  
  // const episodes = await fetchEpisodes(identification);
  // if (!episodes) return;
  // const episodesLength = await episodes.length - 1;
  //   const updatedData = await db.collection('animes').updateOne({ id: identification }, {
  //   $set: { totalEpisodes: episodesLength + 1 },    
  // }); 

  console.log(
     identification,
     data,
     data.id,
     teste,
     categories,
    //  episodesLength + 1,
  );
    return data;

// const updateResponse = await updatedData;
  // return updateResponse;
};

app.get('/testes', async (req, res) => {
try {
  // 17086
(async () => {
  // 17086
  // for (let i = 8800; i <= 17086; i += 1) {
  // for (let i = 1; i <= 42; i += 1) {
  for (let i = 1; i <= 1; i += 1) {
  await updateAnimes(i.toString());
}
})();
} catch (err) {
  console.log(err.message);
}

// const episodes = await fetchEpisodes(1);
// console.log(((episodes.length - 1) + 1));
   res.status(200).json({ message: 'funfou' });
});

const fetchAnimes = async (number) => {
  try {
  const response = await axios
  .get(`https://kitsu.io/api/edge/categories?page[limit]=20&page[offset]=${number}`);
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
