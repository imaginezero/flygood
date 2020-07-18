import Head from 'next/head';

import { withTracking } from '../hooks';
import { Frame, CookieConsent } from '../components';

import './global.css';

export default withTracking(function FlygoodApp({ Component, pageProps }) {
  return (
    <Frame>
      <Head>
        <title>FlyGood</title>
      </Head>
      <Component {...pageProps} />
    </Frame>
  );
}, CookieConsent);

export function reportWebVitals(params) {
  withTracking.trackVitals(params);
}
