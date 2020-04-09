import Link from 'next/link';

import { Logo } from './Logo';

import { createStyleableComponent } from './createStyleableComponent';

import { markdown } from './Layout.module.css';

export const Headline = createStyleableComponent('h2', {
  border: 'border-b',
  color: 'bg-white text-yellow-600 border-gray-400',
  padding: 'px-3 py-2',
  font: 'text-l font-serif',
});

export const Content = createStyleableComponent('div', {
  margin: 'mb-2',
  padding: 'p-3',
});

export const Markdown = createStyleableComponent('div', {
  font: 'text-sm',
  color: 'text-gray-700',
  margin: 'mb-2',
  padding: 'p-3',
  base: markdown,
});

export const Page = ({ children }) => (
  <div className="flex flex-col h-full">
    <div className="flex flex-row justify-center w-full bg-blue-800 border-t-2 border-yellow-600">
      <Link href="/">
        <div className="flex flex-row flex-grow-0 w-full h-12 py-1 px-3 sm:w-128 sm:px-0 text-white">
          <Logo
            style={{ marginLeft: '-0.4rem' }}
            className="h-full w-12 fill-current cursor-pointer"
          />
          <h1 className="self-center font-serif text-xl cursor-pointer">
            FlyGood
          </h1>
        </div>
      </Link>
    </div>
    <div className="flex-grow self-center w-full sm:w-128 sm:border-l sm:border-r sm:border-gray-400 bg-gray-300">
      {children}
    </div>
  </div>
);
