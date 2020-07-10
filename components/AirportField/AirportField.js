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
  title,
}) {
  return (
    <div className={wrapper}>
      {title ? (
        <label {...getLabelProps()} className={label}>
          {title}
        </label>
      ) : null}
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
  airport,
  onChange,
  label = 'Airport',
  id = 'airport',
}) {
  const { suggestions, loadSuggestions } = useSuggestions(250);
  const props = useCombobox({
    defaultSelectedItem: airport,
    itemToString: (item) => (item ? `${item.city} (${item.iata})` : ''),
    onSelectedItemChange: ({ selectedItem }) => {
      setTimeout(() => onChange(selectedItem));
    },
    onInputValueChange: ({ inputValue, isOpen }) => {
      if (isOpen) loadSuggestions(inputValue.replace(/[()]/g, ''));
    },
    items: suggestions,
    inputId: `${id}-input`,
    labelId: `${id}-label`,
    menuId: `${id}-menu`,
  });
  return <AirportInput {...props} title={label} suggestions={suggestions} />;
}
