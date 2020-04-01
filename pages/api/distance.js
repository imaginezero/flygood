import calculateDistance from '@turf/distance';

import { find } from '../../services/search';

// carbon dioxide emissions in kg, ~250g/km per passenger
// n.b.: atmosfair appear to assume ~320g/km per passenger
// https://www.carbonindependent.org/22.html
const EMISSIONS_PER_KM = 0.25;

// trees needed for carbon sequestration, ~67kg/tree in 30 years
// https://carbonneutral.com.au/faqs/
const TREES_PER_KG_CO2 = 0.015;

// cost of planting trees, 23€ per ton of carbon dioxide
// https://www.atmosfair.de/en/offset/fix
const COST_PER_KG_CO2 = 0.023;

export default (req, res) => {
  const { t = '' } = req.query;
  const trip = t.split(',').map(find).filter(Boolean);

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

  const emissions = Math.ceil(distance * EMISSIONS_PER_KM);
  const trees = Math.ceil(emissions * TREES_PER_KG_CO2);
  const cost = Math.round(emissions * COST_PER_KG_CO2);

  const result = { trip, distance, emissions, trees, cost };
  res.json(result);
};
