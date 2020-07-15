import { useTrip, useTranslation } from '../../hooks';

import { wrapper, headline, amount, button } from './Payment.module.css';

export default function Payment() {
  const { t, formatNumber } = useTranslation();
  const {
    trip: { cost },
  } = useTrip();
  return (
    <div className={wrapper}>
      <h3 className={headline}>{t('paymentHeadline')}</h3>
      <p className={amount}>{formatNumber(cost, 2)} €</p>
      <a
        href={`https://www.greenpeace.de/spenden?betrag=${formatNumber(
          cost,
          2
        )}`}
        className={button}
      >
        {t('makeDonation')}
      </a>
    </div>
  );
}
