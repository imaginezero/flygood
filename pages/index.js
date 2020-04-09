import { Fragment } from 'react';

import { Headline, Content, TripForm, Markdown } from '../components';
import { About, Contact } from '../content';

export default function Index() {
  return (
    <Fragment>
      <Headline>Calculate Trip Emissions</Headline>
      <Content styles={{ margin: 'mb-5' }}>
        <TripForm />
      </Content>
      <Headline>About This Site</Headline>
      <Markdown>
        <About />
      </Markdown>
      <Headline>Contact Us</Headline>
      <Markdown>
        <Contact />
      </Markdown>
    </Fragment>
  );
}
