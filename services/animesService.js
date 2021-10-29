const animesModel = require('../models/animesModel');

const getAnimesByStatus = async (offset, status) => {
  const animes = await animesModel.getAnimesByStatus(offset, status);

  return animes;
};

const getAnimesCategorys = async (offset) => {
  const animes = await animesModel.getAnimesCategorys(offset);
  return animes;
};

const getAnimesByCategorys = async (offset, categoryId, status) => {
  const animes = await animesModel.getAnimesByCategorys(offset, categoryId, status);
  return animes;
};

const getAllAnimes = async (offset, filter) => {
  const animes = await animesModel.getAllAnimes(offset, `attributes.${filter}`);
  return animes;
};

const getAllMovies = async (offset, filter) => {
  const animes = await animesModel.getAllMovies(offset, `attributes.${filter}`);
  return animes;
};

const getAnimeById = async (id) => {
  const animes = await animesModel.getAnimeById(id);
  return animes;
};

module.exports = { 
  getAnimesByStatus, 
  getAnimesCategorys,
  getAnimesByCategorys,
  getAllAnimes,
  getAllMovies, 
  getAnimeById,
};