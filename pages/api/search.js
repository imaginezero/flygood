import { search } from '../../services/search';

export default (req, res) => {
  const { q = '', n = 10 } = req.query;
  const results = search(q, n);
  res.json(results);
};
