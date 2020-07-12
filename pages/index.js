import { TripForm } from '../components';
import { withLoadedTrip } from '../hooks';

export default withLoadedTrip(function Home() {
  return <TripForm />;
});

export { loadTrip as getServerSideProps } from '../hooks';
