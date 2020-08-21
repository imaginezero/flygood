import Head from 'next/head';

import { withTracking } from '../hooks';
import { Frame, CookieConsent } from '../components';

import '../components/global.css';

export default withTracking(function FlygoodApp({ Component, pageProps }) {
  return (
    <Frame>
      <Head>
        <title>FlyGood</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </Frame>
  );
}, CookieConsent);

// export function reportWebVitals(params) {
//   withTracking.trackVitals(params);
// }
