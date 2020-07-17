import { Section, TripForm } from '../components';
import { withTrip } from '../hooks';

import { About } from '../content';

export default withTrip(function Home() {
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
