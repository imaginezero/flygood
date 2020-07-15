import AirportFields from './AirportFields';
import ClassSelect from './ClassSelect';
import PassengerSelect from './PassengerSelect';
import RoundtripSelect from './RoundtripSelect';

import { dropdownWrapper, dropdown } from './TripForm.module.css';

export default function TripForm() {
  return (
    <>
      <AirportFields />
      <div className={dropdownWrapper}>
        <div className={dropdown}>
          <ClassSelect />
        </div>
        <div className={dropdown}>
          <PassengerSelect />
        </div>
        <div className={dropdown}>
          <RoundtripSelect />
        </div>
      </div>
    </>
  );
}
