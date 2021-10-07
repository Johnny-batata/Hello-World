const mongoConnectionAnimes = require('./connections/connectionAnimes');

const getAnimesByStatus = async (offset, status) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('animes').find({ $and: [{ 'attributes.status': status }, {
    'attributes.subtype': { $ne: 'music' } }] }).sort({ 'attributes.averageRating': -1 }).skip(Number(offset))
.limit(40)
.toArray();

  const responseLength = await db.collection('animes').find({ $and: [{ 'attributes.status': 'current' }, {
    'attributes.subtype': { $ne: 'music' } }] }).count();
  console.log(response, responseLength); 
  return { response, responseLength };
};

const getAnimesCategorys = async (offset) => {
  const db = await mongoConnectionAnimes();
  const response = await db.collection('categorys').find({}).sort({ 'attributes.totalMediaCount': -1 }).skip(Number(offset))
.limit(20)
.toArray();
return response;
}; 

module.exports = { getAnimesByStatus, getAnimesCategorys };