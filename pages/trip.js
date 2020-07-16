import { Section, Itinerary, Payment, EmissionData } from '../components';
import { withLoadedTrip } from '../hooks';

export default withLoadedTrip(function Trip() {
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
      </Section>
    </>
  );
});

export { loadTrip as getServerSideProps } from '../hooks';
