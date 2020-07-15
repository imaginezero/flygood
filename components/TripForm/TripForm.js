import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTranslation } from '../../hooks';

import AirportFields from './AirportFields';
import ClassSelect from './ClassSelect';
import PassengerSelect from './PassengerSelect';
import RoundtripSelect from './RoundtripSelect';

import {
  dropdownWrapper,
  dropdown,
  buttonWrapper,
  button,
} from './TripForm.module.css';

export default function TripForm() {
  const { query } = useRouter();
  const { t } = useTranslation();
  return (
    <>
      <AirportFields />
      <div className={dropdownWrapper}>
        <div className={dropdown}>
          <ClassSelect />
        </div>
        <div className={dropdown}>
          <PassengerSelect />
        </div>
        <div className={dropdown}>
          <RoundtripSelect />
        </div>
      </div>
      <div className={buttonWrapper}>
        <Link href={{ pathname: 'trip', query }}>
          <a className={button}>{t('calculateEmissions')}</a>
        </Link>
      </div>
    </>
  );
}
