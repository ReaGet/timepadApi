import fetch from 'node-fetch';
import Model from './model.js';
import Database from './db.js';

const database = new Database();

const headers = {
	'Content-type': 'application/json',
	'Authorization': 'Bearer c0b2ae3e9a442d01a7f2c2a7db10c913d3d8cb07',
}

const pages = 100;
const limit = 10;
let skip = 0;
let page = 0;
let records = [];

async function getRecords() {
  return fetch(`https://api.timepad.ru/v1/events?limit=${limit}&skip=${skip}&sort=date&fields=location,description_short,description_html,poster_image`, {
    method: 'GET',
    headers: headers
  })
  .then((data) => data.json())
  .then((data) => {
    if (data.values) {
      data.values.map(async (item) => {
        const record = new Model(item);
        await record.checkCoordinates();
        // records.push(record);
        database.add(record);
      });
    }

    skip += 10;
  }).catch((error) => {
    console.log('Ошибка получения данных из timepad', error);
  });
}

while (page < pages) {
  await getRecords();
  page++;
}

console.log("Завершено");