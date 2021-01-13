import Info from '../contents/info.md';

import { Section, Itinerary, Payment, EmissionData } from '../components';
import { withTrip } from '../hooks';

export default withTrip(function Trip() {
  return (
    <>
      <Section>
        <Itinerary clickToEdit={true} />
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
