import { Fragment } from 'react';

import { Headline, Content, AirportField } from '../components';

export default function Index() {
  return (
    <Fragment>
      <Headline>Describe Your Trip</Headline>
      <Content>
        <AirportField />
      </Content>
    </Fragment>
  );
}
