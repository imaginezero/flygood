import { useTranslation, useTrip } from '../../hooks';

import { Lines } from '../Lines';

import { headline, lines } from './EmissionData.module.css';

export default function EmissionData() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: {
      emissions,
      details: { co2, ch4, n2o },
      trees,
    },
  } = useTrip();
  return (
    <>
      <h3 className={headline}>{t('analysis')}</h3>
      <Lines
        items={{
          [t('emissions')]: `${formatNumber(emissions, 1)} kg`,
          [t('trees')]: `${trees}`,
          [t('co2')]: `${formatNumber(co2, 2)} kg`,
          [t('ch4')]: `${formatNumber(ch4)} kg`,
          [t('n2o')]: `${formatNumber(n2o)} kg`,
        }}
        className={lines}
      />
    </>
  );
}
