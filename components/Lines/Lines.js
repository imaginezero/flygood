import { line, label, amount, divider } from './Lines.module.css';

export default function Lines({ items, className }) {
  return (
    <div className={className}>
      {Object.entries(items).map(([key, value], index) => (
        <div className={line} key={index}>
          <p className={label}>{key}</p>
          <div className={divider}>{Array(1000).fill('.').join('')}</div>
          <p className={amount}>{value}</p>
        </div>
      ))}
    </div>
  );
}
