import { useTrip } from '../../hooks';

import { AirportField } from '../AirportField';

export default function TripForm() {
  const { trip } = useTrip();
  console.log(trip);
  return <AirportField />;
}
