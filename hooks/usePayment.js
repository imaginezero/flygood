import { useState } from 'react';	

function getPaymentURL(e = 1, n) {	
  const params = new URLSearchParams({ e: Number(e) });	
  if (n) params.set('n', Number(n));	
  return `/api/payment?${params.toString()}`;	
}	

async function fetchPaymentSession(e, n) {	
  const response = await fetch(getPaymentURL(e, n));	
  return response.ok	
    ? response.json()	
    : Promise.reject(new Error(response.statusText));	
}	

async function processPayment(e, n) {	
  try {	
    const { loadStripe } = await import('@stripe/stripe-js');	
    const [stripe, { sessionId }] = await Promise.all([	
      loadStripe(window.stripeKey),	
      fetchPaymentSession(e, n),	
    ]);	
    stripe.redirectToCheckout({ sessionId });	
  } catch (error) {	
    console.error(error);	
  }	
}	

export function usePayment() {	
  const [processing, setProcessing] = useState(false);	
  const process = (e, n) => {	
    if (processing) return;	
    setProcessing(true);	
    processPayment(e, n);	
  };	
  return { processing, process };	
}