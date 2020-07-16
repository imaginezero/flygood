import Link from 'next/link';
import { MDXProvider } from '@mdx-js/react';

import { wrapper, paragraph } from './Markdown.module.css';

const components = {
  wrapper: function Wrapper(props) {
    return <div className={wrapper} {...props} />;
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
