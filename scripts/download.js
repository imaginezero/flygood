const { dirname, join } = require('path');
const { writeFile } = require('fs');
const { get } = require('https');

const csv = require('csv-parser');

const DATA_DIR = join(dirname(__dirname), 'data');
const DATA_FILE = join(DATA_DIR, 'airportData.json');

const URL =
  'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat';
const HEADERS = [
  'id',
  'name',
  'city',
  'country',
  'iata',
  'icao',
  'latitude',
  'longitude',
  'altitude',
  'utcOffset',
  'dst',
  'timezone',
  'type',
  'source',
];

const fetchCSV = async () =>
  new Promise((resolve, reject) => {
    const request = get(URL, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error(`received status ${response.statusCode}`));
      }
      const results = [];
      response
        .pipe(csv(HEADERS))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
    request.on('error', (error) => reject(error));
  });

const writeJSON = async (results, file) =>
  new Promise((resolve, reject) => {
    const json = JSON.stringify(results);
    writeFile(file, json, (err) => {
      if (err) return reject(err);
      resolve(file);
    });
  });

const fetchAndWrite = async () => {
  try {
    const results = await fetchCSV();
    await writeJSON(results, DATA_FILE);
    console.log(`SUCCESS: fetched and wrote airport data to ${DATA_DIR}\n`);
  } catch (error) {
    console.error(`ERROR: ${error.stack || error}\n`);
    process.exit(1);
  }
};

fetchAndWrite();
