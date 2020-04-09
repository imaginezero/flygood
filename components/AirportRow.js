import { AirportField } from './AirportField';
import { Add, Remove } from './icons';

export const AirportRow = ({
  airport,
  index,
  isFirst,
  isLast,
  handleChange,
  handleAdd,
  handleRemove,
}) => {
  const prefix = isFirst ? 'Origin' : isLast ? 'Destination' : 'Transit';
  return (
    <div className="flex flex-row justify-center">
      <div className="flex-grow">
        <AirportField
          value={airport ? airport.name : ''}
          airport={airport}
          id={`airport-${index}`}
          tabIndex={index + 1}
          onChange={handleChange}
          valid={!!airport}
          placeholder={`${prefix} Airport`}
          inputStyles={{ width: 'w-full' }}
          wrapperStyles={{ margin: 'mb-3' }}
        />
      </div>
      <div className="flex-grow-0 w-6 h-6 p-1">
        <a
          onClick={handleAdd}
          title="Add Airport"
          className="block text-gray-600 cursor-pointer"
          style={{ marginTop: '.09em' }}
        >
          <Add className="w-6 h-6 fill-current" />
        </a>
      </div>
      <div className="flex-grow-0 w-6 h-6 p-1">
        <a
          onClick={handleRemove || (() => {})}
          title="Remove Airport"
          className={
            handleRemove
              ? 'block text-gray-600 cursor-pointer'
              : 'block text-gray-400 cursor-not-allowed'
          }
          style={{ marginTop: '.09em' }}
        >
          <Remove className="w-6 h-6 fill-current" />
        </a>
      </div>
    </div>
  );
};
