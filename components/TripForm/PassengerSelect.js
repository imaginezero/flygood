import { useTranslation, useTrip } from '../../hooks';

import { Select } from '../Select';

export default function PassengerSelect(props) {
  const { t } = useTranslation();
  const { trip, updateTrip } = useTrip();
  return (
    <Select
      {...props}
      options={Array(10)
        .fill()
        .reduce(
          (result, _, index) => ({ ...result, [index + 1]: `${index + 1}` }),
          {}
        )}
      value={trip.passengers}
      onChange={(value) => {
        updateTrip({ ...trip, passengers: Number(value) });
      }}
      label={t('passengers')}
      id="passengers"
    />
  );
}
