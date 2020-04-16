// All data based on DEFRA conversion factors 2017
// DEFRA: UK Department for Environment, Food & Rural Affairs
// https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2017

// longest UK domestic flight: 469mi
export const SHORT_HAUL_THRESHOLD = 750;
export const LONG_HAUL_THRESHOLD = 3750;

export const DOMESTIC_FLIGHT = 'domestic';
export const SHORT_HAUL_FLIGHT = 'short';
export const LONG_HAUL_FLIGHT = 'long';

export const ECONOMY_CLASS = 'economy';
export const PREMIUM_CLASS = 'premium';
export const BUSINESS_CLASS = 'business';
export const FIRST_CLASS = 'first';

export const FLIGHT_CLASSES = [
  ECONOMY_CLASS,
  PREMIUM_CLASS,
  BUSINESS_CLASS,
  FIRST_CLASS,
];

// co2e (CO2 equivalent) takes into account radiative forcing:
// http://news.mit.edu/2010/explained-radforce-0309

// wtt (well-to-tank) covers emissions required for extraction, refining,
// distribution, storage and retail of fuels

export const EMISSION_DATA = {
  [DOMESTIC_FLIGHT]: {
    // assuming average values
    [ECONOMY_CLASS]: {
      co2e: 0.26744,
      co2: 0.14002,
      ch4: 0.00006,
      n2o: 0.00133,
      wtt: 0.0293,
    },
    // assuming average values
    [PREMIUM_CLASS]: {
      co2e: 0.26744,
      co2: 0.14002,
      ch4: 0.00006,
      n2o: 0.00133,
      wtt: 0.0293,
    },
    // assuming average values
    [BUSINESS_CLASS]: {
      co2e: 0.26744,
      co2: 0.14002,
      ch4: 0.00006,
      n2o: 0.00133,
      wtt: 0.0293,
    },
    // assuming average values
    [FIRST_CLASS]: {
      co2e: 0.26744,
      co2: 0.14002,
      ch4: 0.00006,
      n2o: 0.00133,
      wtt: 0.0293,
    },
  },
  [SHORT_HAUL_FLIGHT]: {
    [ECONOMY_CLASS]: {
      co2e: 0.15845,
      co2: 0.08298,
      ch4: 0.00001,
      n2o: 0.00079,
      wtt: 0.01736,
    },
    // assuming average values
    [PREMIUM_CLASS]: {
      co2e: 0.16103,
      co2: 0.08432,
      ch4: 0.00001,
      n2o: 0.0008,
      wtt: 0.01764,
    },
    [BUSINESS_CLASS]: {
      co2e: 0.23767,
      co2: 0.12446,
      ch4: 0.00001,
      n2o: 0.00118,
      wtt: 0.02604,
    },
    // assuming business class values
    [FIRST_CLASS]: {
      co2e: 0.23767,
      co2: 0.12446,
      ch4: 0.00001,
      n2o: 0.00118,
      wtt: 0.02604,
    },
  },
  // assuming intl. values
  [LONG_HAUL_FLIGHT]: {
    [ECONOMY_CLASS]: {
      co2e: 0.13801,
      co2: 0.07228,
      ch4: 0.000005,
      n2o: 0.00068,
      wtt: 0.01512,
    },
    [PREMIUM_CLASS]: {
      co2e: 0.22084,
      co2: 0.11565,
      ch4: 0.00001,
      n2o: 0.00109,
      wtt: 0.0242,
    },
    [BUSINESS_CLASS]: {
      co2e: 0.40025,
      co2: 0.20961,
      ch4: 0.00001,
      n2o: 0.00198,
      wtt: 0.04386,
    },
    [FIRST_CLASS]: {
      co2e: 0.55209,
      co2: 0.28912,
      ch4: 0.00002,
      n2o: 0.00274,
      wtt: 0.06049,
    },
  },
};
