import { Fragment } from 'react';

import { useTrip } from '../hooks';

import { AirportCard } from './AirportCard';

export const TripCard = () => {
  const { trip } = useTrip();
  return (
    <Fragment>
      <h3 className="text-base font-serif text-blue-800 mb-1">Itinerary</h3>
      <ul>
        {trip.airports.map((airport, index) => (
          <li key={index}>
            <AirportCard airport={airport} styles={{ margin: 'mb-1' }} />
          </li>
        ))}
      </ul>
      <h3 className="text-base font-serif text-blue-800 mb-1 mt-5">
        Emissions
      </h3>
      <table className="w-full text-sm text-gray-800">
        <tr>
          <td>Distance</td>
          <td>{`${trip.distance} kilometers`}</td>
        </tr>
        <tr>
          <td>
            CO<sub>2</sub> Emission
          </td>
          <td>{`${trip.emissions} kilograms`}</td>
        </tr>
        <tr>
          <td>Trees to offset emissions</td>
          <td>{`${trip.trees} trees`}</td>
        </tr>
        <tr>
          <td>Cost to offset emissions</td>
          <td>{`${trip.cost}€`}</td>
        </tr>
      </table>
    </Fragment>
  );
};
