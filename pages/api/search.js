import { Index } from 'lunr';

import airportData from '../../data/airportData.json';
import airportIndex from '../../data/airportIndex.json';

const index = Index.load(airportIndex);

const search = (q, n) => {
  const results = index.search(q);
  const addResults = (additions) =>
    results.push(
      ...additions.filter(
        ({ ref }) => !results.find(({ ref: rref }) => ref === rref)
      )
    );
  if (/^\w+$/.test(q)) {
    if (results.length < n) addResults(index.search(`${q}*`));
    if (results.length < 1 && q.length > 3) addResults(index.search(`${q}~1`));
  }
  return results
    .map(({ ref }) => airportData.find(({ id }) => ref === id))
    .slice(0, n);
};

export default (req, res) => {
  const { q = '', n = 10 } = req.query;
  const results = search(q, n);
  res.json(results);
};
