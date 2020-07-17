import { useCombobox } from 'downshift';

import { useSuggestions } from '../../hooks';

import { AirportCard } from '../AirportCard';

import {
  wrapper,
  label,
  combobox,
  input,
  menubox,
  menu,
} from './AirportField.module.css';

function AirportInput({
  isOpen,
  highlightedIndex,
  getComboboxProps,
  getLabelProps,
  getInputProps,
  getMenuProps,
  getItemProps,
  suggestions,
  label: labelText,
}) {
  return (
    <div className={wrapper}>
      <label {...getLabelProps()} className={label}>
        {labelText}
      </label>
      <div {...getComboboxProps()} className={combobox}>
        <input {...getInputProps()} className={input} />
      </div>
      <div className={menubox}>
        <ul {...getMenuProps()} className={menu}>
          {isOpen &&
            suggestions.map((item, index) => (
              <li key={index} {...getItemProps({ item, index })}>
                <AirportCard
                  airport={item}
                  selected={index === highlightedIndex}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default function AirportField({
  value,
  onChange,
  label = 'Airport',
  id = 'airport',
}) {
  const { suggestions, loadSuggestions } = useSuggestions(250);
  const props = useCombobox({
    selectedItem: value,
    itemToString: (item) => (item ? `${item.city} (${item.iata})` : ''),
    onSelectedItemChange: ({ selectedItem }) => onChange(selectedItem),
    onInputValueChange: ({ inputValue, isOpen }) => {
      if (isOpen) {
        if (inputValue) {
          loadSuggestions(inputValue.replace(/[()]/g, ''));
        } else {
          onChange(null);
        }
      }
    },
    items: suggestions,
    inputId: `${id}-input`,
    labelId: `${id}-label`,
    menuId: `${id}-menu`,
  });
  return <AirportInput {...props} label={label} suggestions={suggestions} />;
}
