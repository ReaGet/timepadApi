import fetch from 'node-fetch';

const key = '';
const api = `https://maps.googleapis.com/maps/api/geocode/json?address=[address]&key=${key}&language=ru`;

async function getCoordinatesByAddress(address) {
  const url = api.replace('[address]', address);
  return await fetch(url)
  .then((data) => data.json())
  .then(( {results} ) => {
    const location = results[0]?.geometry?.location;
    
    if (!location)
      return [];

    return {longitude: location.lng, latitude: location.lat};
  }).catch((err) => {
    console.log('Ошибка получения координат', err);
  });
}

export default getCoordinatesByAddress;
