import calculateDistance from '@turf/distance';

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

export const calculateTrip = (airports) => {
  const distance = airports.reduce((result, current, index) => {
    const next = airports[index + 1];
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
  const cost = Math.ceil(emissions * COST_PER_KG_CO2);

  const query = airports.map(({ iata }) => iata).join(',');

  return { airports, distance, emissions, trees, cost, query };
};
