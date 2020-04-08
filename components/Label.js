import { createStyleableComponent } from './createStyleableComponent';

export const Label = createStyleableComponent('label', {
  color: 'text-gray-700',
  font: 'text-sm',
});

export const Error = createStyleableComponent('span', {
  color: 'text-red-700',
  font: 'text-sm',
});
