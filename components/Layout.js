import { Logo } from './Logo';

import { createStyleableComponent } from './createStyleableComponent';

export const Headline = createStyleableComponent('h2', {
  border: 'border-b',
  color: 'bg-white text-yellow-600 border-gray-400',
  padding: 'px-3 py-2',
  font: 'text-l font-serif',
});

export const Content = createStyleableComponent('div', {
  padding: 'p-3',
});

export const Page = ({ children }) => (
  <div className="flex flex-col h-full">
    <div className="flex flex-row justify-center w-full bg-blue-800 border-t-2 border-yellow-600">
      <div className="flex flex-row flex-grow-0 w-full h-12 py-1 px-3 sm:w-128 sm:px-0 text-white">
        <Logo
          style={{ marginLeft: '-0.4rem' }}
          className="h-full w-12 fill-current"
        />
        <h1 className="self-center font-serif text-xl">FlyGood</h1>
      </div>
    </div>
    <div className="flex-grow self-center w-full sm:w-128 sm:border-l sm:border-r sm:border-gray-400 bg-gray-300">
      {children}
    </div>
  </div>
);
