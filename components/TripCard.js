import { Fragment } from 'react';

import { useTrip } from '../hooks';

import { AirportCard } from './AirportCard';

const pluralize = (count, label) => `${count} ${label}${count > 1 ? 's' : ''}`;

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
      <h3 className="text-base font-serif text-blue-800 mb-1 mt-5">Analysis</h3>
      <table className="w-full text-sm text-gray-800">
        <tbody>
          <tr>
            <td>Total distance</td>
            <td>
              <b>{`${trip.distance} km`}</b>
            </td>
          </tr>
          <tr>
            <td>Total emissions</td>
            <td>
              <b>{`${trip.emissions} kg`}</b>
            </td>
          </tr>
          <tr>
            <td>
              Carbon dioxide (CO<sub>2</sub>) emissions
            </td>
            <td>
              <b>{`${trip.details.co2} kg`}</b>
            </td>
          </tr>
          <tr>
            <td>
              Methane (CH<sub>4</sub>) emissions
            </td>
            <td>
              <b>{`${trip.details.ch4} kg`}</b>
            </td>
          </tr>
          <tr>
            <td>
              Nitrous oxide (N<sub>2</sub>O) emissions
            </td>
            <td>
              <b>{`${trip.details.n2o} kg`}</b>
            </td>
          </tr>
          <tr>
            <td>Trees to offset emissions</td>
            <td>
              <b>{pluralize(trip.trees, 'tree')}</b>
            </td>
          </tr>
          <tr>
            <td>Cost to offset emissions</td>
            <td>
              <b>{`${trip.cost} €`}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};
