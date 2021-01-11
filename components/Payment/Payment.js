import { useState } from 'react';

import { usePayment, useTrip, useTranslation } from '../../hooks';

import { Select } from '../Select';

import {
  wrapper,
  headline,
  amount,
  select,
  button,
} from './Payment.module.css';

// function usePayment() {
//   const { t, formatNumber } = useTranslation();
//   const {
//     trip: { cost },
//   } = useTrip();
//   const [recipient, setRecipient] = useState('trees');
//   const getUrl = () => {
//     const amount = formatNumber(cost, 2);
//     const language = t('lang');
//     switch (recipient) {
//       case 'trees':
//         return `https://donorbox.org/trees-for-lure?amount=${amount}&language=${language}`;
//       case 'greenpeace':
//         return `https://www.greenpeace.de/spenden?betrag=${amount}`;
//       default:
//         throw new Error('unknown recipient');
//     }
//   };
//   return {
//     options: {
//       trees: t('donateTrees'),
//       greenpeace: t('donateToGreenpeace'),
//     },
//     value: recipient,
//     onChange: setRecipient,
//     href: getUrl(),
//   };
// }

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
