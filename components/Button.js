import { createStyleableComponent } from './createStyleableComponent';

export const Button = createStyleableComponent('button', {
  border: 'border rounded-sm',
  color: ({ disabled }) =>
    disabled
      ? 'bg-gray-400 text-white border-white'
      : 'bg-blue-800 text-white border-white',
  cursor: ({ disabled }) =>
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  focus: 'focus:shadow-md',
  margin: 'mt-2',
  padding: 'py-2 px-4',
  width: '',
  height: '',
  base: 'focus:outline-none outline-none appearance-none',
});
