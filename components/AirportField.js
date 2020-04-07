import { Fragment, forwardRef } from 'react';
import { useCombobox } from 'downshift';

import { useSuggestions } from '../hooks';

import { TextInput } from './TextField';
import { Label, Error } from './Label';
import { AirportCard } from './AirportCard';

import { createStyleableComponent } from './createStyleableComponent';

const SuggestionsList = createStyleableComponent('ul', {
  base: 'relative mx-2 z-50 rounded-b-sm shadow-md',
});

const Suggestions = forwardRef(
  ({ isOpen, options, selected, ...menuProps }, ref) => (
    <SuggestionsList ref={ref} {...menuProps}>
      {isOpen &&
        options.map(({ item, props }, index) => (
          <li key={`${index}`} {...props}>
            <AirportCard airport={item} selected={selected === index} />
          </li>
        ))}
    </SuggestionsList>
  )
);

export const AirportField = ({
  value = '',
  id = 'airport',
  onChange = () => {},
  label,
  error,
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
    items: suggestions,
    itemToString: (item) => (item ? item.name : null),
    onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem),
    onInputValueChange: ({ inputValue, isOpen }) => {
      if (isOpen) loadSuggestions(inputValue);
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
    <Fragment>
      {label && <Label {...getLabelProps()}>{label}</Label>}
      <div {...getComboboxProps()}>
        <TextInput
          {...inputProps}
          {...getInputProps()}
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
    </Fragment>
  );
};
