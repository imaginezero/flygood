import Head from 'next/head';

import { Frame } from '../components';

import './global.css';

export default function FlygoodApp({ Component, pageProps }) {
  return (
    <Frame>
      <Head>
        <title>FlyGood</title>
      </Head>
      <Component {...pageProps} />
    </Frame>
  );
}
