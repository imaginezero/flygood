import Head from 'next/head';

import { withTrip } from '../hooks';
import { Frame } from '../components';

import './global.css';

export default withTrip(function FlygoodApp({ Component, pageProps }) {
  return (
    <Frame>
      <Head>
        <title>FlyGood</title>
      </Head>
      <Component {...pageProps} />
    </Frame>
  );
});
