import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const getPaymentURL = (e = 1, n) => {
  const params = new URLSearchParams({ e: Number(e) });
  if (n) params.set('n', Number(n));
  return `/api/payment?${params.toString()}`;
};

const fetchPaymentSession = (e, n) =>
  fetch(getPaymentURL(e, n)).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(new Error(response.statusText))
  );

const processPayment = async (e, n) => {
  const { sessionId } = await fetchPaymentSession(e, n);
  const stripe = await stripePromise;
  stripe.redirectToCheckout({ sessionId });
};

export const usePayment = () => {
  const [processing, setProcessing] = useState(false);
  const process = (e, n) => {
    if (processing) return;
    setProcessing(true);
    processPayment(e, n);
  };
  return { processing, process };
};
