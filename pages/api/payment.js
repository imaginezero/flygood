import Stripe from 'stripe';	

import { useTranslation } from '../../hooks';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);	

const getSuccessUrl = (referer) => {	
  const url = new URL(referer);	
  url.pathname = 'success';	
  return url.toString();	
};	

const getDescription = (referer) => {	
  const { t } = useTranslation();
  const url = new URL(referer);	
  const trip = url.searchParams.get('a') || '';	
  return t('paymentDescription').replace('{{ airports }}', trip.split(',').join(', '));	
};	

export default async (req, res) => {
  const { t } = useTranslation();
  const { e = 1, n = 1 } = req.query;	
  const { referer } = req.headers;	
  const { id: sessionId } = await stripe.checkout.sessions.create({	
    submit_type: 'donate',	
    payment_method_types: ['card'],	
    line_items: [	
      {	
        name: t('paymentName'),	
        description: getDescription(referer),	
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