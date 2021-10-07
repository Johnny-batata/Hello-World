const animesService = require('../services/animesService');

const getAnimesByStatus = async (req, res) => {
  const { offset, status } = req.params;  
  const animes = await animesService.getAnimesByStatus(offset, status);
  console.log(animes.responseLength);
  return res.status(200).json({ data: animes.response, totalLength: animes.responseLength });
};

const getAnimesCategorys = async (req, res) => {
  const { offset } = req.params;
  const categorias = await animesService.getAnimesCategorys(offset);
  return res.status(200).json({ data: categorias });
};

module.exports = { getAnimesByStatus, getAnimesCategorys };