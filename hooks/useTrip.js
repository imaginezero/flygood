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

export const useTrip = () => {
  const [trip, setTrip] = useContext(TripContext);
  const [tripPromise, setTripPromise] = useState(null);
  const updateTrip = (airports) => setTrip(calculateTrip(airports));
  const loadTrip = (...codes) => {
    setTripPromise(
      fetchTrip(...codes).then((airports) => {
        updateTrip(airports);
        return airports;
      })
    );
  };
  const { query } = useRouter();
  useEffect(() => {
    if (!tripPromise && query.t && query.t !== trip.query) {
      loadTrip(...query.t.split(','));
    }
  });
  return { trip, tripPromise, updateTrip };
};
