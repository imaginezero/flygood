import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const getSuccessUrl = (referer) => {
  const url = new URL(referer);
  url.pathname = 'success';
  return url.toString();
};

const getItinerary = (referer) => {
  const url = new URL(referer);
  const trip = url.searchParams.get('t') || '';
  return trip.split(',').join(', ');
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
        description: `Itinerary: ${getItinerary(referer)}`,
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
