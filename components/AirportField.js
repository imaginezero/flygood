import { forwardRef } from 'react';
import { useCombobox } from 'downshift';

import { useSuggestions } from '../hooks';

import { TextInput, TextInputWrapper } from './TextField';
import { Label, Error } from './Label';
import { AirportCard } from './AirportCard';

const Suggestions = forwardRef(
  ({ isOpen, options, selected, ...menuProps }, ref) => (
    <div className="absolute z-50 w-full">
      <ul className="mx-2 rounded-b-sm shadow-md" ref={ref} {...menuProps}>
        {isOpen &&
          options.map(({ item, props }, index) => (
            <li key={`${index}`} {...props}>
              <AirportCard airport={item} selected={selected === index} />
            </li>
          ))}
      </ul>
    </div>
  )
);

export const AirportField = ({
  value = '',
  airport = null,
  id = 'airport',
  onChange = () => {},
  label,
  error,
  inputStyles,
  wrapperStyles,
  ...inputProps
}) => {
  const { suggestions, loadSuggestions } = useSuggestions(250);

  const {
    isOpen,
    highlightedIndex,
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    initialInputValue: value,
    initialHighlightedIndex: 0,
    defaultSelectedItem: airport,
    items: suggestions,
    itemToString: (item) => (item ? `${item.city} (${item.iata})` : ''),
    onSelectedItemChange: ({ selectedItem }) => {
      setTimeout(() => onChange(selectedItem));
    },
    onInputValueChange: ({ inputValue, isOpen }) => {
      if (isOpen) loadSuggestions(inputValue.replace(/[()]/g, ''));
    },
    labelId: `${id}-label`,
    inputId: `${id}-input`,
    menuId: `${id}-menu`,
  });

  const options = suggestions.map((item, index) => ({
    item,
    props: getItemProps({ item, index }),
  }));

  return (
    <TextInputWrapper className="relative" styles={wrapperStyles}>
      {label && <Label {...getLabelProps()}>{label}</Label>}
      <div {...getComboboxProps()}>
        <TextInput
          {...inputProps}
          {...getInputProps()}
          styles={inputStyles}
          valid={error ? 'false' : 'true'}
        />
      </div>
      <Suggestions
        {...getMenuProps()}
        isOpen={isOpen}
        selected={highlightedIndex}
        options={options}
      />
      {error && <Error>{error}</Error>}
    </TextInputWrapper>
  );
};
