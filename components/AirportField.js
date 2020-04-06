import { Fragment, useState } from 'react';
import { useCombobox } from 'downshift';
import { useSuggestions } from '../hooks/useSuggestions';

import { TextInput } from './TextField';
import { Label, Error } from './Label';
import { AirportCard } from './AirportCard';

export const AirportField = ({
  id = 'airport',
  label,
  error,
  onChange,
  ...inputProps
}) => {
  const [inputItems, setInputItems] = useState([]);
  const fetchSuggestions = useSuggestions(250);
  const {
    isOpen,
    highlightedIndex,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => (item ? item.name : null),
    onSelectedItemChange: ({ selectedItem }) =>
      onChange && onChange(selectedItem),
    onInputValueChange: async ({ inputValue }) => {
      const results = await fetchSuggestions(inputValue);
      setInputItems(results);
    },
    labelId: `${id}-label`,
    inputId: `${id}-input`,
    menuId: `${id}-menu`,
  });
  return (
    <Fragment>
      {label && <Label {...getLabelProps()}>{label}</Label>}
      <TextInput
        {...inputProps}
        {...getInputProps()}
        valid={error ? 'false' : 'true'}
        styles={{ width: 'w-full' }}
      />
      <ul
        {...getMenuProps()}
        className="relative mx-2 z-50 rounded-b-sm shadow-md"
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li key={`${index}`} {...getItemProps({ item, index })}>
              <AirportCard
                airport={item}
                selected={highlightedIndex === index}
              />
            </li>
          ))}
      </ul>
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};
