import { Section, Payment } from '../components';
import { withLoadedTrip } from '../hooks';

export default withLoadedTrip(function Trip() {
  return (
    <>
      <Section></Section>
      <Section type="action">
        <Payment />
      </Section>
      <Section type="content" />
    </>
  );
});

export { loadTrip as getServerSideProps } from '../hooks';
