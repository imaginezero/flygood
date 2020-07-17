import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTrip, useTranslation } from '../../hooks';

import { button, disabledButton } from './TripForm.module.css';

export default function Button() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    trip: { distance },
  } = useTrip();
  const [disabled, setDisabled] = useState(distance === 0);
  useEffect(() => setDisabled(distance === 0), [distance]);
  return disabled ? (
    <a className={disabledButton}>{t('calculateEmissions')}</a>
  ) : (
    <Link href={{ pathname: 'trip', query }}>
      <a className={button}>{t('calculateEmissions')}</a>
    </Link>
  );
}
