import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation, useTrip } from '../../hooks';

import { AirportCard } from '../AirportCard';
import { Lines } from '../Lines';

import {
  headline,
  formlink,
  airportWrapper,
  lines,
} from './Itinerary.module.css';

export default function Itinerary() {
  const { query } = useRouter();
  const { t, formatNumber } = useTranslation();
  const {
    trip: { airports, distance, flightClass, passengers },
  } = useTrip();
  return (
    <>
      <h3 className={headline}>{t('itinerary')}</h3>
      {airports.map((airport, index) => (
        <Link href={{ pathname: '/', query }} key={index}>
          <a className={formlink}>
            <div className={airportWrapper}>
              <AirportCard airport={airport} />
            </div>
          </a>
        </Link>
      ))}
      <Link href={{ pathname: '/', query }}>
        <a className={formlink}>
          <Lines
            items={{
              [t('distance')]: `${formatNumber(distance, 1)} km`,
              [t('passengers')]: passengers,
              [t('flightClass')]: t(flightClass),
            }}
            className={lines}
          />
        </a>
      </Link>
    </>
  );
}
