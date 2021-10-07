const animesModel = require('../models/animesModel');

const getAnimesByStatus = async (offset, status) => {
  const animes = await animesModel.getAnimesByStatus(offset, status);

  return animes;
};

const getAnimesCategorys = async (offset) => {
  const animes = await animesModel.getAnimesCategorys(offset);
  return animes;
};

module.exports = { getAnimesByStatus, getAnimesCategorys };