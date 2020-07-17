import { Info } from '../content';

import { Section, Itinerary, Payment, EmissionData } from '../components';
import { withTrip } from '../hooks';

export default withTrip(function Trip() {
  return (
    <>
      <Section>
        <Itinerary />
      </Section>
      <Section type="action">
        <Payment />
      </Section>
      <Section type="content">
        <EmissionData />
        <Info />
      </Section>
    </>
  );
});

export { loadTrip as getServerSideProps } from '../hooks';
