import { Index } from 'lunr';

import airportData from '../../data/airportData.json';
import airportIndex from '../../data/airportIndex.json';

const index = Index.load(airportIndex);
const data = airportData.map(({ iata, name }) => ({ iata, name }));

export default (req, res) => {
  const { q: queryString } = req.query;
  const results = index
    .search(queryString)
    .map(({ ref }) => data.find(({ iata }) => ref === iata));
  res.json(results);
};
