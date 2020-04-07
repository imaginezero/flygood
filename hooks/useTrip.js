import {
  createElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';

import { calculateTrip } from '../services/trip';

const TripContext = createContext(null);

const getSearchURL = (q) => `/api/search?q=${encodeURIComponent(q)}`;

const fetchTrip = (...codes) =>
  fetch(
    getSearchURL(codes.map((code) => `iata:${code}`).join(' '))
  ).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(response.statusText))
  );

export const withTrip = (Component) => (props) => {
  const [trip, setTrip] = useState(calculateTrip([]));
  return createElement(
    TripContext.Provider,
    {
      value: [trip, setTrip],
    },
    createElement(Component, props)
  );
};

export const useTrip = () => {
  const [trip, setTrip] = useContext(TripContext);
  const { query } = useRouter();
  const tripQuery = trip.airports.map(({ iata }) => iata).join(',');
  const updateTrip = (airports) => setTrip(calculateTrip(airports));
  const loadTrip = (...codes) => fetchTrip(...codes).then(updateTrip);
  useEffect(() => {
    if (query.t && query.t !== tripQuery) {
      loadTrip(...query.t.split(',')).catch(() => {});
    }
  });
  return { trip, loadTrip, updateTrip, tripQuery };
};
