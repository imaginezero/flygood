import { Section, TripForm } from '../components';
import { withLoadedTrip } from '../hooks';

import { About } from '../content';

export default withLoadedTrip(function Home() {
  return (
    <>
      <Section>
        <TripForm />
      </Section>
      <Section type="content">
        <About />
      </Section>
    </>
  );
});

export { loadTrip as getServerSideProps } from '../hooks';
