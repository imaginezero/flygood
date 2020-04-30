import { createStyleableComponent } from './createStyleableComponent';
import { PaymentButton } from './PaymentButton';

const PaymentCardWrapper = createStyleableComponent('div', {
  border: '',
  margin: 'mb-3',
  padding: '',
});

export const PaymentCard = (props) => {
  return (
    <PaymentCardWrapper {...props}>
      <h3 className="text-base font-serif text-blue-800 mt-4 mb-1">
        Mitigation
      </h3>
      <PaymentButton />
    </PaymentCardWrapper>
  );
};
