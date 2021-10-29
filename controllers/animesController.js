const animesService = require('../services/animesService');

const getAnimesByStatus = async (req, res) => {
  const { offset, status } = req.params;  
  const animes = await animesService.getAnimesByStatus(offset, status);
  return res.status(200).json({ data: animes.response, totalLength: animes.responseLength });
};

const getAnimesCategorys = async (req, res) => {
  const { offset } = req.params;
  const categorias = await animesService.getAnimesCategorys(offset);
  return res.status(200).json({ data: categorias });
};

const getAnimesByCategorys = async (req, res) => {
  const { offset, categoryId, status } = req.params;
  const animes = await animesService.getAnimesByCategorys(offset, categoryId, status);
  return res.status(200).json({ data: animes.response, totalLength: animes.responseLength });
};

const getAllAnimes = async (req, res) => {
  const { filter } = req.body;
  const { offset } = req.params;
  const animes = await animesService.getAllAnimes(offset, filter);
  return res.status(200).json({ data: animes.response, totalLength: animes.responseLength });
};

const getAllMovies = async (req, res) => {
  const { filter } = req.body;
  const { offset } = req.params;
  console.log(filter, 'filter');
  const animes = await animesService.getAllMovies(offset, filter);
  return res.status(200).json({ data: animes.response, totalLength: animes.responseLength });
};

const getAnimeById = async (req, res) => {
  const { id } = req.params;

  const animes = await animesService.getAnimeById(id);
  return res.status(200).json({ data: animes });
};

module.exports = { 
  getAnimesByStatus, 
  getAnimesCategorys,
  getAnimesByCategorys,
  getAllAnimes, 
  getAllMovies,
  getAnimeById,
};