import Info from '../contents/info.md';

import { Section, Itinerary, ThankYou, EmissionData } from '../components';
import { withTrip } from '../hooks';	

export default withTrip(function Success() {	
  return (
    <>
      <Section>
        <Itinerary linkToEdit={false} />
      </Section>
      <Section type="action">
        <ThankYou />
      </Section>
      <Section type="content">
        <EmissionData />
        <Info />
      </Section>
    </>
  );
});	

export { loadTrip as getServerSideProps } from '../hooks';
