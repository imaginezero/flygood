import { useState } from 'react';	
import { useTranslation } from './useTranslation';

function getPaymentURL(amount, recipient) {	
  const params = new URLSearchParams({
    amount: Number(amount),
    recipient: recipient.replace(/[^a-z]+/gi, '')
  });	
  return `/api/payment?${params.toString()}`;	
}	

async function fetchPaymentSession(amount, recipient) {	
  const response = await fetch(getPaymentURL(amount, recipient));	
  return response.ok	
    ? response.json()	
    : Promise.reject(new Error(response.statusText));	
}	

async function processPayment(amount, recipient) {	
  try {	
    const { loadStripe } = await import('@stripe/stripe-js');	
    const [stripe, { sessionId }] = await Promise.all([	
      loadStripe(window.stripeKey),	
      fetchPaymentSession(amount, recipient),	
    ]);	
    stripe.redirectToCheckout({ sessionId });	
  } catch (error) {	
    console.error(error);	
  }	
}


export function usePayment() {	
  const [processing, setProcessing] = useState(false);	
  const process = (amount, recipient) => {	
    if (processing) return;	
    setProcessing(true);	
    processPayment(amount, recipient);	
  };	
  return { processing, process };	
}

export function usePaymentTranslations() {
  const { t } = useTranslation();
  return {
    recipients: {
      atmosfair: t("donationRecipient_atmosfair"),
      greenpeace: t("donationRecipient_greenpeace"),
    }
  };
}