import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

import { wrapper, h1, h2, h3, paragraph } from './Markdown.module.css';

const components = {
  wrapper: function Wrapper(props) {
    return <div className={wrapper} {...props} />;
  },
  h1: function MarkdownH1({ children, props }) {
    return (
      <h1 className={h1} {...props}>
        {children}
      </h1>
    );
  },
  h2: function MarkdownH2({ children, props }) {
    return (
      <h2 className={h2} {...props}>
        {children}
      </h2>
    );
  },
  h3: function MarkdownH3({ children, props }) {
    return (
      <h3 className={h3} {...props}>
        {children}
      </h3>
    );
  },
  p: function MarkdownParagraph({ children, ...props }) {
    return (
      <p className={paragraph} {...props}>
        {children}
      </p>
    );
  },
  a: function MarkdownAnchor({ href, children, ...props }) {
    return /^[a-z]*:/.test(href) ? (
      <a href={href} {...props}>
        {children}
      </a>
    ) : (
      <Link href={href}>
        <a {...props}>{children}</a>
      </Link>
    );
  },
};

export default function Markdown({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
