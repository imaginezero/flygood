import {
  createContext,
  useContext,
} from 'react';
import { usePayment, useTrip, useTranslation, usePaymentTranslations } from '../../hooks';

import { Select } from '../Select';

import {
  wrapper,
  headline,
  amount,
  button,
} from './Payment.module.css';

const PaymentContext = createContext({});

export default function Payment() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: { cost },
  } = useTrip();
  const { process } = usePayment();
  const { recipients } = usePaymentTranslations();
  
  // Destination is view-only and we'll individually reach out to donors
  let { recipient } = useContext(PaymentContext);
  recipient = Object.keys(recipients)[0];

  return (
    <div className={wrapper}>
      <h3 className={headline}>{t('paymentHeadline')}</h3>
      <p className={amount}>{formatNumber(cost, 2)} €</p>
      <Select
        value={recipient}
        options={recipients}
        onChange={newValue => recipient = newValue}
        invert={true}
        hideLabel={true}
        // className={select}
        label={t('chooseOrganization')}
      />
      <button className={button} onClick={()=> process(cost, recipient)}>
        {t('makeDonation')}
      </button>
    </div>
  );
}
