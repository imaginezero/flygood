import Head from 'next/head';

import { withTrip } from '../hooks';

import './global.css';

const App = withTrip(({ Component, pageProps }) => (
  <>
    <Head>
      <title>FlyGood</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
    </Head>
    <Component {...pageProps} />
  </>
));

export default App;
