import calculateDistance from '@turf/distance';

import { find } from '../../services/search';

export default (req, res) => {
  const { t = '' } = req.query;
  const trip = t.split(',').map(find);
  const distance = trip.reduce((result, current, index) => {
    const next = trip[index + 1];
    if (next) {
      const nextDistance = calculateDistance(
        [current.longitude, current.latitude, current.altitude],
        [next.longitude, next.latitude, next.altitude],
        { units: 'kilometers' }
      );
      return Math.round(result + nextDistance);
    }
    return result;
  }, 0);
  const results = { trip, distance };
  res.json(results);
};
