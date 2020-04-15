import { Fragment } from 'react';
import Head from 'next/head';

import { withTrip } from '../hooks';
import { Page } from '../components';

import './global.css';

const App = withTrip(({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>FlyGood</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Stint+Ultra+Expanded&display=fallback"
        rel="stylesheet"
      />
      <link
        href="data:image/x-icon;,"
        type="image/x-icon"
        rel="shortcut icon"
      />
    </Head>
    <Page>
      <Component {...pageProps} />
    </Page>
  </Fragment>
));

export default App;
