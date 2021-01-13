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

export default function Itinerary({linkToEdit}) {
  const { query } = useRouter();
  const { t, formatNumber } = useTranslation();
  const {
    trip: { airports, distance, flightClass, passengers },
  } = useTrip();

  const WrappedAirportCard = (airport, key) =>
    <div className={airportWrapper} key={key}>
      <AirportCard airport={airport} />
    </div>;

  const stats =
    <Lines
      className={lines}
      items={{
        [t('distance')]: `${formatNumber(distance, 1)} km`,
        [t('passengers')]: passengers,
        [t('flightClass')]: t(flightClass),
      }}
    />;

  return (
    <>
      <h3 className={headline}>{t('itinerary')}</h3>
      {linkToEdit
      ?
      <>
        {airports.map((airport, index) => (
          <Link href={{ pathname: '/', query }} key={index}>
            <a className={formlink}>
              {WrappedAirportCard(airport, index)}
            </a>
          </Link>
        ))}
        <Link href={{ pathname: '/', query }}>
          <a className={formlink}>
            {stats}
          </a>
        </Link>
        </>
      : <>
        {airports.map(WrappedAirportCard)}
        {stats}
        </>
      }
    </>
  );
}
