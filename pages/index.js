import { Section, TripForm } from '../components';
import { withLoadedTrip } from '../hooks';

export default withLoadedTrip(function Home() {
  return (
    <>
      <Section>
        <TripForm />
      </Section>
      <Section type="content" />
    </>
  );
});

export { loadTrip as getServerSideProps } from '../hooks';
