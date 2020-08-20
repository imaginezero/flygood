import { useState } from 'react';

import { useTrip, useTranslation } from '../../hooks';

import { Select } from '../Select';

import {
  wrapper,
  headline,
  amount,
  select,
  button,
} from './Payment.module.css';

function usePayment() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: { cost },
  } = useTrip();
  const [recipient, setRecipient] = useState('trees');
  const getUrl = () => {
    const amount = formatNumber(cost, 2);
    const language = t('lang');
    switch (recipient) {
      case 'trees':
        return `https://donorbox.org/camp-contour-lines-tree-crowdfunder?amount=${amount}&language=${language}`;
      case 'greenpeace':
        return `https://www.greenpeace.de/spenden?betrag=${amount}`;
      default:
        throw new Error('unknown recipient');
    }
  };
  return {
    options: {
      trees: t('donateTrees'),
      greenpeace: t('donateToGreenpeace'),
    },
    value: recipient,
    onChange: setRecipient,
    href: getUrl(),
  };
}

export default function Payment() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: { cost },
  } = useTrip();
  const { options, value, onChange, href } = usePayment();
  return (
    <div className={wrapper}>
      <h3 className={headline}>{t('paymentHeadline')}</h3>
      <p className={amount}>{formatNumber(cost, 2)} €</p>
      <Select
        value={value}
        options={options}
        onChange={onChange}
        invert={true}
        hideLabel={true}
        className={select}
        label={t('chooseOrganization')}
      />
      <a href={href} className={button}>
        {t('makeDonation')}
      </a>
    </div>
  );
}
