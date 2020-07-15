import { useTrip } from '../../hooks';

import { AirportField } from '../AirportField';
import { Select } from '../Select';

export default function TripForm() {
  const { trip } = useTrip();
  return (
    <>
      <Select value={'foo'} options={{ foo: 'Foo', bar: 'Bar' }} />
      <AirportField />
    </>
  );
}
