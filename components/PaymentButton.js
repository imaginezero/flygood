import { usePayment, useTrip } from '../hooks';

import { Button } from './Button';

export const PaymentButton = () => {
  const { processing, process } = usePayment();
  const { trip } = useTrip();
  return (
    <Button
      type="button"
      onClick={() => process(trip.cost)}
      disabled={processing}
      tabIndex="0"
    >
      Offset Emissions
    </Button>
  );
};
