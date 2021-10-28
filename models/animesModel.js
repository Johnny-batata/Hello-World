const mongoConnectionAnimes = require('./connections/connectionAnimes');

const getAnimesByStatus = async (offset, status) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, 
    { 'attributes.averageRating': { $ne: null } }] })
    .sort({ 'attributes.averageRating': -1 }).skip(Number(offset))
.limit(40)
.toArray();

  const responseLength = await db
  .collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, 
    { 'attributes.averageRating': { $ne: null } }] }).count();
  return { response, responseLength };
};

const getAnimesCategorys = async (offset) => {
  const db = await mongoConnectionAnimes();
  const response = await db
  .collection('categorys').find({}).sort({ 'attributes.totalMediaCount': -1 }).skip(Number(offset))
.limit(20)
.toArray();

return response; 
}; 

const getAnimesByCategorysWithStatus = async (offset, categoryId, status) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }, 
    { 'categoriasId.id': categoryId }] })
    .sort({ 'attributes.totalMediaCount': -1 }).skip(Number(offset))
  .limit(40)
  .toArray(); 
  const responseLength = await db
  .collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }, 
    { 'categoriasId.id': categoryId }] })
    .sort({ 'attributes.totalMediaCount': -1 }).count();
  return { response, responseLength };
};

const getAnimesByCategorys = async (offset, categoryId, status) => {
  if (status !== 'All') return getAnimesByCategorysWithStatus(offset, categoryId, status);
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }, 
    { 'categoriasId.id': categoryId }] })
    .sort({ 'attributes.averageRating': -1 }).skip(Number(offset))
  .limit(40)
  .toArray(); 
  const responseLength = await db
  .collection('animes').find({ $and: [{
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }, 
    { 'categoriasId.id': categoryId }] })
    .sort({ 'attributes.averageRating': -1 }).count();
  return { response, responseLength };
};

const getAllAnimes = async (offset, filter = 'attributes.totalMediaCount') => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{
    'attributes.subtype': { $nin: ['music', 'movie'] } }, 
    { 'attributes.averageRating': { $ne: null } }, 
    ] }).sort({ [filter]: -1 }).skip(Number(offset))
.limit(40)
    .toArray(); 
    const responseLength = await db.collection('animes').find({ $and: [{
      'attributes.subtype': { $nin: ['music', 'movie'] } }, { 
        'attributes.averageRating': { $ne: null } }, 
      ] }).sort({ [filter]: -1 }).count();

      return { response, responseLength };
};

const getAllMovies = async (offset, filter = 'attributes.totalMediaCount') => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{
    'attributes.subtype': { $eq: 'movie' } }, { 'attributes.averageRating': { $ne: null } }, 
    ] }).sort({ [filter]: -1 }).skip(Number(offset))
.limit(40)
    .toArray(); 
    const responseLength = await db.collection('animes').find({ $and: [{
      'attributes.subtype': { $eq: 'movie' } }, { 
        'attributes.averageRating': { $ne: null } }, 
      ] }).sort({ [filter]: -1 }).count();

      return { response, responseLength };
};

module.exports = { 
  getAnimesByStatus, getAnimesCategorys, getAnimesByCategorys, getAllAnimes, getAllMovies };