import { Fragment, createElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import hoistNonReactStatics from 'hoist-non-react-statics';
import snakeCaseKeys from 'snakecase-keys';
import cookie from 'cookie';

function trackPageview(url, params = {}) {
  if (typeof window !== 'undefined') {
    if ('gtag' in window && 'gaId' in window) {
      window.gtag(
        'config',
        window.gaId,
        snakeCaseKeys({
          transportType: 'beacon',
          anonymizeIp: true,
          ...(url ? { pagePath: url } : {}),
          ...params,
        })
      );
    }
  }
}

function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined') {
    if ('gtag' in window && 'gaId' in window) {
      window.gtag(
        'event',
        action,
        snakeCaseKeys({
          sendTo: window.gaId,
          transportType: 'beacon',
          ...params,
        })
      );
    }
  }
}

function trackOutboundLink(url, params = {}) {
  trackEvent('click', {
    eventCategory: 'outbound',
    eventLabel: url,
    ...params,
  });
}

function trackVitals({ id, name, label, value }) {
  trackEvent(name, {
    eventCategory: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metrics',
    eventLabel: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    nonInteraction: true,
  });
}

function getConsent() {
  if (typeof document === 'undefined') return true;
  return !!cookie.parse(document.cookie).__consent;
}

function storeConsent() {
  document.cookie = cookie.serialize('__consent', 1, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
}

function loadGtag() {
  if (window && window.gaId && !window.gaRequested) {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute(
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${window.gaId}`
    );
    document.body.appendChild(script);
    window.gaRequested = true;
  }
}

export function withTracking(Component, CookieConsent) {
  const WrappedComponent = (props) => {
    const [hasConsented, setHasConsented] = useState(getConsent());
    const router = useRouter();
    useEffect(() => {
      if (hasConsented) {
        loadGtag();
        storeConsent();
        trackPageview();
        router.events.on('routeChangeComplete', trackPageview);
        return () => {
          router.events.off('routeChangeComplete', trackPageview);
        };
      }
    }, [hasConsented]);
    if (hasConsented) {
      return createElement(Component, props);
    }
    return createElement(
      Fragment,
      {},
      createElement(CookieConsent, { onConsent: () => setHasConsented(true) }),
      createElement(Component, props)
    );
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithTracking(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

withTracking.trackVitals = trackVitals;

export function useTracking() {
  return { trackPageview, trackEvent, trackOutboundLink };
}
