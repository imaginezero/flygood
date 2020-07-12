import {
  createElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useRouter } from 'next/router';

import { calculateTrip, flightClasses, defaultClass } from '../services/trip';

function buildQuery({
  airports = [],
  passengers = 1,
  roundTrip = false,
  flightClass = defaultClass,
}) {
  return {
    a: airports.map(({ iata }) => iata).join(','),
    p: String(passengers),
    r: roundTrip ? '1' : '0',
    c: flightClass,
  };
}

function parseQuery({ a = '', p = '1', r = '0', c = defaultClass }) {
  return {
    airports: a.split(',').filter((i) => !!i),
    passengers: parseInt(p, 10),
    roundTrip: r === '1' ? true : false,
    flightClass: c,
  };
}

const TripContext = createContext(null);

export function withTrip(Component) {
  const WrappedComponent = (props) => {
    const state = {};
    const [trip, setTrip] = useState(state);
    return createElement(
      TripContext.Provider,
      {
        value: {
          trip,
          setTrip,
          initializeTrip(trip) {
            return Object.assign(state, trip);
          },
          get initializing() {
            return Object.keys(state).length === 0;
          },
        },
      },
      createElement(Component, props)
    );
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithTrip(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

export function withLoadedTrip(Component) {
  const WrappedComponent = ({ trip, ...props }) => {
    const { initializing, initializeTrip, setTrip } = useContext(TripContext);
    if (initializing && trip) initializeTrip(trip);
    useEffect(() => {
      if (!initializing && trip) setTrip(trip);
    }, [trip]);
    return createElement(Component, props);
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithLoadedTrip(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

export function useTrip() {
  const { push, pathname } = useRouter();
  const { trip, setTrip } = useContext(TripContext);
  function updateTrip(params) {
    push({ pathname, query: buildQuery(params) }, { shallow: true });
    setTrip(calculateTrip(params));
  }
  return { trip, updateTrip, flightClasses };
}

export async function loadTrip({ query }) {
  if (typeof window === 'undefined') {
    const { find } = await import('../services/search');
    const { airports = [], ...params } = parseQuery(query);
    return {
      props: {
        trip: calculateTrip({
          airports: airports.map((iata) => ({ ...find(iata) })),
          ...params,
        }),
      },
    };
  }
}
