import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { useTranslation, useTrip } from '../../hooks';

import { AirportField } from '../AirportField';

import {
  airportFieldsWrapper,
  airportFieldWrapper,
  addStopover,
  removeStopover,
  disabledRemoveStopover,
} from './TripForm.module.css';

function useAirports() {
  const { trip, updateTrip } = useTrip();
  const getAirportState = () => {
    if (trip.airports.length > 1) {
      return trip.airports.map((airport) => [nanoid(), airport]);
    }
    if (trip.airports.length === 1) {
      return [
        [nanoid(), trip.airports[0]],
        [nanoid(), null],
      ];
    }
    return [
      [nanoid(), null],
      [nanoid(), null],
    ];
  };
  const [airports, setAirports] = useState(getAirportState());
  const getAirports = () => airports.map(([, a]) => a).filter((a) => !!a);
  const findAirportIndex = (id) => {
    return airports.findIndex(([airportId]) => airportId === id);
  };
  useEffect(() => {
    if (getAirports().some((a) => !!a) || trip.airports.some((a) => !!a)) {
      updateTrip({ ...trip, airports: getAirports() });
    }
  }, [airports]);
  useEffect(() => {
    if (!trip.airports.length && !!getAirports().length) {
      setAirports(getAirportState());
    }
  }, [trip.airports]);
  return {
    airports,
    addAirport(id) {
      const nextAirports = [...airports];
      nextAirports.splice(findAirportIndex(id) + 1, 0, [nanoid(), null]);
      setAirports(nextAirports);
    },
    removeAirport(id) {
      const nextAirports = [...airports];
      nextAirports.splice(findAirportIndex(id), 1);
      setAirports(nextAirports);
    },
    updateAirport(id, airport) {
      const nextAirports = [...airports];
      nextAirports.splice(findAirportIndex(id), 1, [id, airport]);
      setAirports(nextAirports);
    },
  };
}

export default function AirportFields() {
  const { t } = useTranslation();
  const { airports, addAirport, removeAirport, updateAirport } = useAirports();
  const isShrinkable = airports.length > 2;
  return (
    <div className={airportFieldsWrapper}>
      {airports.map(([id, airport], index) => {
        const isOrigin = index === 0;
        const isDestination = index === airports.length - 1;
        const label = t(
          isOrigin ? 'origin' : isDestination ? 'destination' : 'stopover'
        );
        return (
          <div key={id} className={airportFieldWrapper}>
            <AirportField
              value={airport}
              onChange={(nextAirport) => updateAirport(id, nextAirport)}
              label={label}
              id={`airport-${index}`}
            />
            <a
              className={addStopover}
              onClick={(event) => {
                event.preventDefault();
                addAirport(id);
              }}
              title={t('addStopover')}
            >
              {t('addStopover')}
            </a>
            <a
              className={isShrinkable ? removeStopover : disabledRemoveStopover}
              onClick={(event) => {
                event.preventDefault();
                isShrinkable && removeAirport(id);
              }}
              title={t('removeStopover')}
            >
              {t('removeStopover')}
            </a>
          </div>
        );
      })}
    </div>
  );
}
