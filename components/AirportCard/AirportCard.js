import {
  wrapper,
  selectedWrapper,
  headline,
  details,
} from './AirportCard.module.css';

export default function AirportCard({ airport, selected, ...props }) {
  const { name, city, country, iata, icao } = airport;
  return (
    <div {...props} className={selected ? selectedWrapper : wrapper}>
      <h3 className={headline}>
        {city} ({iata})
      </h3>
      <p className={details}>
        {name} ({country}), {icao}
      </p>
    </div>
  );
}
