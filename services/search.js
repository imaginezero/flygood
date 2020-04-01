import { Index } from 'lunr';

import airportData from '../data/airportData.json';
import airportIndex from '../data/airportIndex.json';

const index = Index.load(airportIndex);

export const find = (ref) => airportData.find(({ icao }) => ref === icao);

export const search = (q, n) => {
  const results = [];
  const addResults = (additions) =>
    results.push(
      ...additions.filter(
        ({ ref }) => !results.find(({ ref: rref }) => ref === rref)
      )
    );
  if (q.length) addResults(index.search(q));
  if (/^[\w ]+$/.test(q)) {
    if (results.length < n) addResults(index.search(`${q}*`));
    if (results.length < 1 && q.length > 3) addResults(index.search(`${q}~1`));
  }
  return results.map(({ ref }) => find(ref)).slice(0, n);
};
