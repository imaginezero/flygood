import { Fragment } from 'react';

import { Headline, Content, Markdown, TripCard } from '../components';
import { Thanks } from '../content';

export default function Success() {
  return (
    <Fragment>
      <Headline>Payment Success</Headline>
      <Markdown>
        <Thanks />
      </Markdown>
      <Headline>Trip Summary</Headline>
      <Content>
        <TripCard />
      </Content>
    </Fragment>
  );
}
