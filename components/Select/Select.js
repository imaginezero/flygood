import { select } from './Select.module.css';

export default function Select({
  options,
  value,
  onChange,
  label = 'Select',
  id = 'select',
  className,
  ...props
}) {
  const handleChange = (event) => onChange(event.target.value);
  const classNames = className ? `${select} ${className}` : select;
  const labelId = `${id}-label`;
  const selectId = `${id}-select`;
  return (
    <>
      <label htmlFor={selectId}>{label}</label>
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        className={classNames}
        aria-labelledby={labelId}
        {...props}
      >
        {Object.entries(options).map(([value, label], index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
