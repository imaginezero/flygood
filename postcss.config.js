module.exports = {
  plugins: [
    'tailwindcss',
    [
      '@fullhuman/postcss-purgecss',
      process.env.NODE_ENV === 'production'
        ? {
            content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }
        : false,
    ],
    'postcss-preset-env',
  ],
};
