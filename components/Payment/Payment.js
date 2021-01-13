import { useState } from 'react';

import { usePayment, useTrip, useTranslation } from '../../hooks';

import { Select } from '../Select';

import {
  wrapper,
  headline,
  amount,
  button,
} from './Payment.module.css';


export default function Payment() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: { cost },
  } = useTrip();
  const { process } = usePayment();

  return (
    <div className={wrapper}>
      <h3 className={headline}>{t('paymentHeadline')}</h3>
      <p className={amount}>{formatNumber(cost, 2)} €</p>
      <button className={button} onClick={()=> process(cost, 1)}>
        {t('makeDonation')}
      </button>
    </div>
  );
}
