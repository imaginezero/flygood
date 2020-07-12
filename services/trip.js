// helper using haversine formula to determine great circle distance
// https://en.wikipedia.org/wiki/Haversine_formula
import calculateDistance from '@turf/distance';

// conversion factors and additional data required for emission calculation
// https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2017
import {
  SHORT_HAUL_THRESHOLD,
  LONG_HAUL_THRESHOLD,
  DOMESTIC_FLIGHT,
  SHORT_HAUL_FLIGHT,
  LONG_HAUL_FLIGHT,
  ECONOMY_CLASS,
  FLIGHT_CLASSES,
  EMISSION_DATA,
} from '../data/defraData';

// cost of planting trees, 23€ per ton of carbon dioxide
// https://www.atmosfair.de/en/offset/fix
const COST_PER_KG_CO2E = 0.023;

// trees needed for carbon sequestration, ~67kg/tree in 30 years
// https://carbonneutral.com.au/faqs/
const TREES_PER_KG_CO2E = 0.015;

function round(number, digits = 2) {
  const factor = Math.pow(10, digits);
  return Math.round((number + Number.EPSILON) * factor) / factor;
}

function determineType(distance) {
  if (distance >= LONG_HAUL_THRESHOLD) return LONG_HAUL_FLIGHT;
  if (distance >= SHORT_HAUL_THRESHOLD) return SHORT_HAUL_FLIGHT;
  return DOMESTIC_FLIGHT;
}

function analyzeTrip(airports, flightClass) {
  return airports.reduce(
    (results, current, index) => {
      const next = airports[index + 1];
      if (next) {
        const distance = calculateDistance(
          [current.longitude, current.latitude, current.altitude],
          [next.longitude, next.latitude, next.altitude],
          { units: 'kilometers' }
        );
        const flightType = determineType(distance);
        Object.entries(EMISSION_DATA[flightType][flightClass]).forEach(
          ([key, ratio]) => (results[key] += distance * ratio)
        );
        results.distance += distance;
      }
      return results;
    },
    { airports, distance: 0, co2e: 0, co2: 0, ch4: 0, n2o: 0, wtt: 0 }
  );
}

function evaluateTrip(
  { airports, distance, co2e, co2, ch4, n2o, wtt },
  factor
) {
  const emissions = (co2e + wtt) * factor;
  return {
    airports,
    distance: round(distance, 1),
    emissions: round(emissions, 1),
    details: {
      co2: round(co2 * factor, 2),
      ch4: round(ch4 * factor, 2),
      n2o: round(n2o * factor, 2),
    },
    cost: round(emissions * COST_PER_KG_CO2E, 2),
    trees: Math.ceil(emissions * TREES_PER_KG_CO2E),
  };
}

export const flightClasses = FLIGHT_CLASSES;
export const defaultClass = ECONOMY_CLASS;

export function calculateTrip({
  airports = [],
  passengers = 1,
  roundTrip = false,
  flightClass = defaultClass,
}) {
  return {
    passengers,
    roundTrip,
    flightClass,
    ...evaluateTrip(
      analyzeTrip(airports, flightClass),
      passengers * (roundTrip ? 2 : 1)
    ),
  };
}
