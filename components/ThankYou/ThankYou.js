import { useTranslation } from '../../hooks';

export default function ThankYou() {
  const { t } = useTranslation();

  return (
    <div>
      <h3>{t('thankYouHeadline')}</h3>
      <p>{t('thankYouDescription')}</p>
    </div>
  );
}
