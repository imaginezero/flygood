import { createElement } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import flatten from 'flat';
import escape from 'escape-html';

import translations from '../data/de.json';

const t = (key, data) => {
  if (!(key in translations)) {
    throw new Error(`translation key not found: ${key}`);
  }
  const translation = translations[key];
  if (data) {
    const flattenedData = flatten(data);
    return translation.replace(
      /{{(- )?\s*(.+?)\s*}}/g,
      (_, shouldEscape, dataPath) => {
        const value = flattenedData[dataPath];
        if (!value) {
          throw new Error(`data path not found: ${dataPath} (${key})`);
        }
        return shouldEscape ? escape(value) : value;
      }
    );
  } else {
    return translation;
  }
};

const formatNumber = (number, decimalPlaces = 2) => {
  const separator = translations['numberSeparator'];
  const padding = Array(decimalPlaces).fill('0').join('');
  return String(number).replace(
    /^(\d+)(\.)?(\d*)?$/,
    (match, wholeNumber, dot, decimalPart = '0') =>
      `${wholeNumber}${separator}${`${decimalPart}${padding}`.substr(
        0,
        decimalPlaces
      )}`
  );
};

export function withTranslation(Component) {
  const WrappedComponent = (props) => {
    return createElement(Component, { ...props, t, formatNumber });
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithTranslation(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

export function useTranslation() {
  return { t, formatNumber };
}
