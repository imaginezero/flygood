import { useTrip, useTranslation } from '../../hooks';

import { wrapper, headline, amount, button } from './Payment.module.css';

export default function Payment() {
  const { t } = useTranslation();
  const {
    trip: { cost },
  } = useTrip();
  console.log(cost);
  return (
    <div className={wrapper}>
      <h3 className={headline}>{t('paymentHeadline')}</h3>
      <p className={amount}>{cost} €</p>
      <a
        href={`https://www.greenpeace.de/spenden?betrag=${cost}`}
        className={button}
      >
        {t('makeDonation')}
      </a>
    </div>
  );
}
