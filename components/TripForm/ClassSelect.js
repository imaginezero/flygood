import { useTranslation, useTrip } from '../../hooks';

import { Select } from '../Select';

export default function ClassSelect(props) {
  const { t } = useTranslation();
  const { trip, updateTrip, flightClasses } = useTrip();
  return (
    <Select
      {...props}
      options={flightClasses.reduce(
        (result, flightClass) => ({
          ...result,
          [flightClass]: t(flightClass),
        }),
        {}
      )}
      value={trip.flightClass}
      onChange={(value) => {
        updateTrip({ ...trip, flightClass: value });
      }}
      label={t('flightClass')}
      id="flightClass"
    />
  );
}
