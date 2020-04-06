import { createElement, forwardRef } from 'react';
import isFunction from 'lodash.isfunction';

export const createStyleableComponent = (tag, baseStyles) => {
  const Component = forwardRef(({ className, styles, ...props }, ref) =>
    createElement(tag, {
      ...props,
      ref,
      className: [className]
        .concat(
          Object.entries(baseStyles).map(([key, base]) => {
            const override = styles && styles[key];
            const defaults = isFunction(base) ? base(props) : base || '';
            return isFunction(override)
              ? override(props, defaults)
              : override || defaults;
          })
        )
        .filter(Boolean)
        .join(' '),
    })
  );
  Component.displayName = `styleable-${tag}`;
  return Component;
};
