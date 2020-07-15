import Link from 'next/link';

import { Markdown } from '../Markdown';
import { AssociationMark, TypeMark, LogoMark } from '../Logo';

import {
  headerWrapper,
  headerContainer,
  mainWrapper,
  mainContainer,
  footerWrapper,
  footerContainer,
  logo,
  typemark,
  logomark,
  associationmark,
} from './Frame.module.css';

function Header() {
  const href = '/';
  return (
    <header className={headerWrapper}>
      <div className={headerContainer}>
        <Link href={href}>
          <a className={logo}>
            <TypeMark className={typemark} />
          </a>
        </Link>
        <Link href={href}>
          <a className={logo}>
            <LogoMark className={logomark} />
          </a>
        </Link>
      </div>
    </header>
  );
}

function Main({ children }) {
  return <main className={mainWrapper}>{children}</main>;
}

function Footer() {
  return (
    <footer className={footerWrapper}>
      <div className={footerContainer}>
        <a href="https://imagine-zero.org/" className={logo}>
          <AssociationMark className={associationmark} />
        </a>
      </div>
    </footer>
  );
}

export default function Frame({ children }) {
  return (
    <Markdown>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Markdown>
  );
}
