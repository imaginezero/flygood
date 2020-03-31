const { dirname, join } = require('path');
const { writeFile } = require('fs');
const { get } = require('https');

const csv = require('csv-parser');
const lunr = require('lunr');

const DATA_DIR = join(dirname(__dirname), 'data');
const DATA_FILE = join(DATA_DIR, 'airportData.json');
const INDEX_FILE = join(DATA_DIR, 'airportIndex.json');

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
const KEYS = [
  'id',
  'name',
  'city',
  'country',
  'iata',
  'icao',
  'latitude',
  'longitude',
];

const cleanData = (results) =>
  results.map((result) =>
    Object.fromEntries(
      Object.entries(result)
        .filter(([key]) => KEYS.includes(key))
        .map(([key, value]) => [key, value !== '\\N' ? value : null])
    )
  );

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
        .on('end', () => resolve(cleanData(results)))
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

const createIndex = (documents) =>
  lunr(function () {
    this.ref('id');
    this.field('name');
    this.field('city');
    this.field('country');
    this.field('iata');
    this.field('icao');
    documents.forEach((doc) => this.add(doc));
  });

const fetchAndWrite = async () => {
  try {
    const results = await fetchCSV();
    await writeJSON(results, DATA_FILE);
    await writeJSON(createIndex(results), INDEX_FILE);
    console.log(`SUCCESS: fetched and wrote airport data to ${DATA_DIR}\n`);
  } catch (error) {
    console.error(`ERROR: ${error.stack || error}\n`);
    process.exit(1);
  }
};

fetchAndWrite();
