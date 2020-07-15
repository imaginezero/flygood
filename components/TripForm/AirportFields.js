import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { useTranslation, useTrip } from '../../hooks';

import { AirportField } from '../AirportField';

import {
  airportFieldsWrapper,
  airportFieldWrapper,
  addStopover,
} from './TripForm.module.css';

export default function AirportFields() {
  const { t } = useTranslation();
  const { trip, updateTrip } = useTrip();
  const [airports, setAirports] = useState(
    (() => {
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
    })()
  );
  useEffect(() => {
    if (airports.some(([, a]) => !!a) || trip.airports.some((a) => !!a)) {
      updateTrip({
        ...trip,
        airports: airports
          .map(([, airport]) => airport)
          .filter((airport) => !!airport),
      });
    }
  }, [airports]);
  const findAirportIndex = (id) => {
    return airports.findIndex(([airportId]) => airportId === id);
  };
  const addAirport = (id) => {
    const nextAirports = [...airports];
    nextAirports.splice(findAirportIndex(id) + 1, 0, [nanoid(), null]);
    setAirports(nextAirports);
  };
  const updateAirport = (id, airport) => {
    const nextAirports = [...airports];
    nextAirports.splice(findAirportIndex(id), 1, [id, airport]);
    setAirports(nextAirports);
  };
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
            >
              {t('addStopover')}
            </a>
          </div>
        );
      })}
    </div>
  );
}
