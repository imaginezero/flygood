import { createStyleableComponent } from './createStyleableComponent';

const AirportCardWrapper = createStyleableComponent('div', {
  border: '',
  color: ({ selected }) => (selected ? 'bg-gray-200' : 'bg-white'),
  margin: '',
  padding: 'py-1 px-2',
});

export const AirportCard = ({ airport, ...props }) => {
  const { name, city, country, iata, icao } = airport;
  return (
    <AirportCardWrapper {...props}>
      <h3 className="text-s leading-tight text-gray-700">
        {city} ({iata})
      </h3>
      <p className="text-xs text-gray-600">
        {name} ({country}), {icao}
      </p>
    </AirportCardWrapper>
  );
};
