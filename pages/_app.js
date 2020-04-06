import { Fragment } from 'react';
import Head from 'next/head';

import { Page } from '../components';

import 'normalize.css';
import './global.css';

const App = ({ Component, pageProps }) => {
  return (
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
      </Head>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Fragment>
  );
};

export default App;
