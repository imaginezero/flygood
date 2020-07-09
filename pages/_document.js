import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class FlygoodDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const stripeApiKey = process.env.STRIPE_PUBLIC_KEY;
    const trackingId = process.env.GA_MEASUREMENT_ID;
    return { ...initialProps, stripeApiKey, trackingId };
  }
  render() {
    const { stripeApiKey, trackingId } = this.props;
    return (
      <Html>
        <Head>
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
