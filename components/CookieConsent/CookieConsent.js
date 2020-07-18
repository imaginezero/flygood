import { useTranslation } from '../../hooks';
import CookieConsentContent from '../../contents/cookies.md';

import { Modal } from '../Modal';
import { Markdown } from '../Markdown';
import { LogoMark } from '../Logo';

import { logo, button } from './CookieConsent.module.css';

function CookieConsentForm({ children, close }) {
  const { t } = useTranslation();
  return (
    <>
      <LogoMark className={logo} />
      {children}
      <a className={button} onClick={close}>
        {t('cookieConsentButton')}
      </a>
    </>
  );
}

export default function CookieConsent({ onConsent }) {
  return (
    <Modal onClose={onConsent}>
      <CookieConsentForm>
        <Markdown>
          <CookieConsentContent />
        </Markdown>
      </CookieConsentForm>
    </Modal>
  );
}
