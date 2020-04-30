import 'dotenv/config';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const getSuccessUrl = (referer) => {
  const url = new URL(referer);
  url.pathname = '/success';
  // url.search = `${url.search ? `${url.search}&` : ''}s={CHECKOUT_SESSION_ID}`;
  return url.toString();
};

export default async (req, res) => {
  const { e = 1, n = 1 } = req.query;
  const { referer } = req.headers;
  const { id: sessionId } = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Decarbonization Fee',
        amount: e * 100,
        currency: 'eur',
        quantity: n,
      },
    ],
    success_url: getSuccessUrl(referer),
    cancel_url: referer,
  });
  res.json({ sessionId });
};
