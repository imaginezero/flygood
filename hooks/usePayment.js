import { useState } from 'react';	

function getPaymentURL(amount) {	
  const params = new URLSearchParams({ amount: Number(amount) });	
  return `/api/payment?${params.toString()}`;	
}	

async function fetchPaymentSession(amount) {	
  const response = await fetch(getPaymentURL(amount));	
  return response.ok	
    ? response.json()	
    : Promise.reject(new Error(response.statusText));	
}	

async function processPayment(amount) {	
  try {	
    const { loadStripe } = await import('@stripe/stripe-js');	
    const [stripe, { sessionId }] = await Promise.all([	
      loadStripe(window.stripeKey),	
      fetchPaymentSession(amount),	
    ]);	
    stripe.redirectToCheckout({ sessionId });	
  } catch (error) {	
    console.error(error);	
  }	
}	

export function usePayment() {	
  const [processing, setProcessing] = useState(false);	
  const process = (amount) => {	
    if (processing) return;	
    setProcessing(true);	
    processPayment(amount);	
  };	
  return { processing, process };	
}