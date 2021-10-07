const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorJoiMiddleware = require('./middlewares/joi');  
const userMiddlewares = require('./middlewares/userMiddlewares');

const users = require('./controllers/usersController');
const animes = require('./controllers/animesController');

const PORT = 10000;
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/teste', async (req, res) => {
res.status(200).send({ message: 'funfou' });
});

app.post('/signup', userMiddlewares.validateIfExists, users.createUser);
app.post('/login', userMiddlewares.validateLogin, users.loginUser);
app.get('/animesStatus/:offset/:status', userMiddlewares.validateToken, animes.getAnimesByStatus);
app.get('/categorys/:offset', userMiddlewares.validateToken, animes.getAnimesCategorys);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
app.use(errorJoiMiddleware);