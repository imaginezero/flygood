import { Fragment } from 'react';

import {
  Headline,
  Content,
  Markdown,
  TripCard,
  PaymentCard,
} from '../components';
import { Info } from '../content';

export default function Trip() {
  return (
    <Fragment>
      <Headline>Trip Analysis</Headline>
      <Content>
        <TripCard />
        <PaymentCard />
      </Content>
      <Headline>More Info</Headline>
      <Markdown>
        <Info />
      </Markdown>
    </Fragment>
  );
}
