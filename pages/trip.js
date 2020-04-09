import { Fragment } from 'react';

import { Headline, Content, Markdown, TripCard } from '../components';
import { Info } from '../content';

export default function Trip() {
  return (
    <Fragment>
      <Headline>Trip Analysis</Headline>
      <Content>
        <TripCard />
      </Content>
      <Headline>More Info</Headline>
      <Markdown>
        <Info />
      </Markdown>
    </Fragment>
  );
}
