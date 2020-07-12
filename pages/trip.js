import {} from '../components';
import { withLoadedTrip } from '../hooks';

export default withLoadedTrip(function Trip() {
  return <></>;
});

export { loadTrip as getServerSideProps } from '../hooks';
