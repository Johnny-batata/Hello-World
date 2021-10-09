const mongoConnectionAnimes = require('./connections/connectionAnimes');

const getAnimesByStatus = async (offset, status) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }] }).sort({ 'attributes.averageRating': -1 }).skip(Number(offset))
.limit(40)
.toArray();

  const responseLength = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }] }).count();
  console.log(response, responseLength); 
  return { response, responseLength };
};

const getAnimesCategorys = async (offset) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('categorys').find({}).sort({ 'attributes.totalMediaCount': -1 }).skip(Number(offset))
.limit(20)
.toArray();

console.log(response);
return response; 
}; 

const getAnimesByCategorys = async (offset, categoryId, status) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }, { 'categoriasId.id': categoryId }] })
    .sort({ 'attributes.totalMediaCount': -1 }).skip(Number(offset))
  .limit(40)
  .toArray(); 
  console.log(response, 'resposta');
  const responseLength = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }, { 'attributes.averageRating': { $ne: null } }, { 'categoriasId.id': categoryId }] })
    .sort({ 'attributes.totalMediaCount': -1 }).count();
  console.log(response, responseLength); 
  return { response, responseLength };
};

module.exports = { getAnimesByStatus, getAnimesCategorys, getAnimesByCategorys };