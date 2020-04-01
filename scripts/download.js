const { dirname, join } = require('path');
const { writeFile } = require('fs');
const { get } = require('https');

const csv = require('csv-parser');
const lunr = require('lunr');
const { getName } = require('country-list');

const DATA_DIR = join(dirname(__dirname), 'data');
const DATA_FILE = join(DATA_DIR, 'airportData.json');
const INDEX_FILE = join(DATA_DIR, 'airportIndex.json');
const URL = 'https://ourairports.com/data/airports.csv';

const mappers = {
  name: ({ name }) => name,
  city: ({ municipality }) => municipality,
  country: ({ iso_country }) => getName(iso_country),
  iata: ({ iata_code }) => iata_code,
  icao: ({ ident }) => ident,
  longitude: ({ longitude_deg }) => longitude_deg,
  latitude: ({ latitude_deg }) => latitude_deg,
  altitude: ({ elevation_ft }) => Math.round(elevation_ft * 3.28084),
};

const processData = (results) =>
  results
    .filter(
      ({ type, iata_code }) =>
        /airport/.test(type) && /^[A-Z0-9]{3}$/.test(iata_code)
    )
    .map((result) =>
      Object.entries(mappers).reduce(
        (object, [key, map]) => ({ ...object, [key]: map(result) }),
        {}
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
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(processData(results)))
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
    this.ref('iata');
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
