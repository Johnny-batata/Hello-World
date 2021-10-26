const animesService = require('../services/animesService');

const getAnimesByStatus = async (req, res) => {
  const { offset, status } = req.params;  
  const animes = await animesService.getAnimesByStatus(offset, status);
  // console.log(animes.responseLength);
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
  console.log(filter, 'filter');
  const animes = await animesService.getAllAnimes(offset, filter);
  return res.status(200).json({ data: animes.response, totalLength: animes.responseLength });
};

module.exports = { getAnimesByStatus, getAnimesCategorys, getAnimesByCategorys, getAllAnimes };