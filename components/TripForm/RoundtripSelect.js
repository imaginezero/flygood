import { useTranslation, useTrip } from '../../hooks';

import { Select } from '../Select';

export default function RoundtripSelect(props) {
  const { t } = useTranslation();
  const { trip, updateTrip } = useTrip();
  return (
    <Select
      {...props}
      options={{ yes: t('yes'), no: t('no') }}
      value={trip.roundTrip ? 'yes' : 'no'}
      onChange={(value) => {
        updateTrip({ ...trip, roundTrip: value === 'yes' });
      }}
      label={t('roundTrip')}
      id="roundTrip"
    />
  );
}
