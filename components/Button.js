import { createStyleableComponent } from './createStyleableComponent';

export const Button = createStyleableComponent('button', {
  border: 'border rounded-sm',
  color: ({ disabled }) =>
    disabled
      ? 'bg-gray-400 text-white border-white'
      : 'bg-blue-800 text-white border-white focus:border-yellow-600',
  focus: 'focus:shadow-md',
  margin: 'mt-2',
  padding: 'py-1 px-2',
  width: '',
  height: '',
  base: 'focus:outline-none outline-none appearance-none cursor-pointer',
});
