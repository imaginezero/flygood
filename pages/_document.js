import Document, { Html, Head, Main, NextScript } from 'next/document';

import { withTranslation } from '../hooks';

export default withTranslation(
  class FlygoodDocument extends Document {
    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      const stripeApiKey = process.env.STRIPE_PUBLIC_KEY;
      const trackingId = process.env.GA_MEASUREMENT_ID;
      return { ...initialProps, stripeApiKey, trackingId };
    }
    render() {
      const { stripeApiKey, trackingId, t } = this.props;
      return (
        <Html>
          <Head lang={t('lang')}>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, viewport-fit=cover"
            />
            <meta name="robots" content="index, follow" />
          </Head>
          <body>
            <Main />
            <NextScript />
            {stripeApiKey ? (
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.stripeKey = "${stripeApiKey}";`,
                }}
              />
            ) : null}
            {trackingId ? (
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.gaId = "${trackingId}";window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());`,
                }}
              />
            ) : null}
          </body>
        </Html>
      );
    }
  }
);
