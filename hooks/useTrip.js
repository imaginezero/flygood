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

export const withTrip = (Component) => (props) =>
  createElement(
    TripContext.Provider,
    { value: useState(calculateTrip([])) },
    createElement(Component, props)
  );

export const useTrip = (autoload) => {
  const [trip, setTrip] = useContext(TripContext);
  const [tripLoading, setLoading] = useState(false);
  const [tripError, setError] = useState(null);
  const tripQuery = trip.airports.map(({ iata }) => iata).join(',');
  const updateTrip = (airports) => setTrip(calculateTrip(airports));
  const loadTrip = (...codes) => {
    setLoading(true);
    setError(null);
    fetchTrip(...codes).then(
      (airports) => {
        updateTrip(airports);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  };
  const { query } = useRouter();
  useEffect(() => {
    if (autoload && query.t && query.t !== tripQuery) {
      loadTrip(...query.t.split(','));
    }
  });
  return { trip, tripLoading, tripError, tripQuery, updateTrip };
};
