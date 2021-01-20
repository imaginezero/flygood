import Stripe from 'stripe';	

import { usePaymentTranslations, useTranslation } from '../../hooks';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);	

const getSuccessUrl = (referer) => {	
  const url = new URL(referer);	
  url.pathname = 'success';	
  return url.toString();	
};	

const getDescription = (referer, recipient) => {	
  const { t } = useTranslation();
  const url = new URL(referer);	
  const trip = url.searchParams.get('a') || '';	
  
  return t('paymentDescription')
    .replace('{{ airports }}', trip.split(',').join(', '))
    .replace('{{ recipient }}', recipient);	
};	

export default async (req, res) => {
  const { t } = useTranslation();
  const { recipients } = usePaymentTranslations();
  const { amount, recipient } = req.query;
  const { referer } = req.headers;	
  const { id: sessionId } = await stripe.checkout.sessions.create({	
    submit_type: 'donate',	
    payment_method_types: ['card'],	
    line_items: [	
      {	
        name: t('paymentName'),	
        description: getDescription(referer, recipients[recipient.replace(/[^a-z]+/gi, '')]),	
        amount: amount * 100,
        currency: 'eur',
        quantity: 1,
      },	
    ],	
    success_url: getSuccessUrl(referer),	
    cancel_url: referer,	
  });	
  res.json({ sessionId });	
};
