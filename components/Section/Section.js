import _styles from './Section.module.css';
const { container, ...styles } = _styles;

export default function Section({ type = 'default', className, children }) {
  const classNames = className ? `${styles[type]} ${className}` : styles[type];
  return (
    <section className={classNames}>
      <div className={container}>{children}</div>
    </section>
  );
}
