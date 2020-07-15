import { Section, Payment, EmissionData } from '../components';
import { withLoadedTrip } from '../hooks';

export default withLoadedTrip(function Trip() {
  return (
    <>
      <Section></Section>
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
