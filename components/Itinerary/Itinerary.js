import { useTranslation, useTrip } from '../../hooks';

import { AirportCard } from '../AirportCard';
import { Lines } from '../Lines';

import { headline, airportWrapper, lines } from './Itinerary.module.css';

export default function Itinerary() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: { airports, distance, flightClass, passengers },
  } = useTrip();
  return (
    <>
      <h3 className={headline}>{t('itinerary')}</h3>
      {airports.map((airport, index) => (
        <div className={airportWrapper} key={index}>
          <AirportCard airport={airport} />
        </div>
      ))}
      <Lines
        items={{
          [t('distance')]: `${formatNumber(distance, 1)} km`,
          [t('passengers')]: passengers,
          [t('flightClass')]: t(flightClass),
        }}
        className={lines}
      />
    </>
  );
}
