import { Fragment } from 'react';

import { Headline, Content, TripForm } from '../components';

export default function Index() {
  return (
    <Fragment>
      <Headline>Describe Your Trip</Headline>
      <Content>
        <TripForm />
      </Content>
    </Fragment>
  );
}
