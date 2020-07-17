import Document, { Html, Head, Main, NextScript } from 'next/document';

import { withTranslation } from '../hooks';

export default withTranslation(
  class FlygoodDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      const trackingId = process.env.GA_MEASUREMENT_ID;
      const mapboxToken = process.env.MAPBOX_TOKEN;
      return { ...initialProps, trackingId, mapboxToken };
    }
    render() {
      const { trackingId, mapboxToken, t } = this.props;
      return (
        <Html>
          <Head lang={t('lang')}>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, viewport-fit=cover"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#7da7a5"
            />
            <link rel="manifest" href="/site.webmanifest" />
            {/* <link
              href="https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
              rel="stylesheet"
            /> */}
            <meta name="msapplication-TileColor" content="#e5f6f5" />
            <meta name="theme-color" content="#e5f6f5" />
            <meta name="robots" content="index, follow" />
          </Head>
          <body>
            <Main />
            <NextScript />
            {trackingId ? (
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.gaId = "${trackingId}";window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());`,
                }}
              />
            ) : null}
            {mapboxToken ? (
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.mapboxToken="${mapboxToken}";`,
                }}
              />
            ) : null}
          </body>
        </Html>
      );
    }
  }
);
