import { Fragment, useState } from 'react';
import { useCombobox } from 'downshift';
import { useSuggestions } from '../hooks/useSuggestions';

import { TextInput } from './TextField';
import { Label, Error } from './Label';

const menuStyles = {
  overflowY: 'auto',
  position: 'relative',
  zIndex: 1000,
  listStyle: 'none',
};

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
    itemToString: (item) => item.name,
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
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
              }
              selected
              key={`${index}`}
              {...getItemProps({ item, index })}
            >
              {item.name}
            </li>
          ))}
      </ul>
      {error && <Error>{error}</Error>}
    </Fragment>
  );
};
