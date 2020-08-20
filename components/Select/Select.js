import { bright, dark, hiddenLabel } from './Select.module.css';

export default function Select({
  options = {},
  value,
  onChange,
  label = 'Select',
  id = 'select',
  invert = false,
  hideLabel = false,
  className,
  ...props
}) {
  const handleChange = (event) => onChange(event.target.value);
  const baseClassName = invert ? dark : bright;
  const classNames = className
    ? `${baseClassName} ${className}`
    : baseClassName;
  const labelId = `${id}-label`;
  const selectId = `${id}-select`;
  return (
    <>
      <label htmlFor={selectId} className={hideLabel ? hiddenLabel : undefined}>
        {label}
      </label>
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
