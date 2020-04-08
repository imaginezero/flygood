import { useState } from 'react';
import shortid from 'shortid';

import { useTrip } from '../hooks';

import { AirportRow } from './AirportRow';
import { Button } from './Button';

const splice = (array, ...args) => {
  const newArray = [...array];
  newArray.splice(...args);
  return newArray;
};

export const TripForm = () => {
  const { trip, updateTrip } = useTrip();
  const [airports, setAirports] = useState(
    (trip.airports.length ? trip.airports : [null, null]).map((airport) => [
      airport,
      shortid(),
    ])
  );
  const onSubmit = (event) => {
    updateTrip(airports.map(([airport]) => airport));
    event.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      {airports.map(([airport, key], index) => {
        const handleChange = (airport) => {
          setAirports(splice(airports, index, 1, [airport, key]));
        };
        const handleAdd = () => {
          setAirports(splice(airports, index + 1, 0, [null, shortid()]));
        };
        const handleRemove = () => {
          setAirports(splice(airports, index, 1));
        };
        return (
          <AirportRow
            airport={airport}
            key={key}
            index={index}
            isFirst={index === 0}
            isLast={index === airports.length - 1}
            handleChange={handleChange}
            handleAdd={handleAdd}
            handleRemove={airports.length > 2 && handleRemove}
          />
        );
      })}
      <Button disabled={airports.some(([airport]) => !airport)} type="submit">
        Calculate Emissions
      </Button>
    </form>
  );
};
