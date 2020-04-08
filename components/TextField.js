import { forwardRef } from 'react';

import { createStyleableComponent } from './createStyleableComponent';

import { Label, Error } from './Label';

export const TextInputWrapper = createStyleableComponent('div', {
  margin: '',
  padding: '',
  width: '',
  height: '',
  base: '',
});

export const TextInput = createStyleableComponent('input', {
  border: 'border rounded-sm',
  color: ({ valid }) =>
    valid
      ? 'bg-white text-gray-700 border-gray-400 placeholder-gray-500'
      : 'bg-red-100 text-red-700 border-red-500 placeholder-red-500',
  focus: 'focus:shadow-md focus:border-yellow-600',
  margin: '',
  padding: 'py-1 px-2',
  width: '',
  height: '',
  font: '',
  base: 'outline-none appearance-none',
});

export const TextField = forwardRef(
  (
    {
      id = 'text',
      label,
      error,
      onChange,
      inputStyles,
      wrapperStyles,
      ...inputProps
    },
    ref
  ) => {
    const labelId = `${id}-label`;
    const inputId = `${id}-input`;
    const handleChange = (event) => onChange(event.target.value);
    return (
      <TextInputWrapper styles={wrapperStyles}>
        {label && (
          <Label id={labelId} htmlFor={inputId}>
            {label}
          </Label>
        )}
        <TextInput
          {...inputProps}
          ref={ref}
          valid={error ? 'false' : 'true'}
          onChange={handleChange}
          styles={inputStyles}
        />
        {error && <Error>{error}</Error>}
      </TextInputWrapper>
    );
  }
);
