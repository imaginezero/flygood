import {} from '../components';	
import { withLoadedTrip } from '../hooks';	

export default withLoadedTrip(function Success() {	
  return <></>;	
});	

export { loadTrip as getServerSideProps } from '../hooks';