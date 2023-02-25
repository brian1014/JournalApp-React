module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [],
  // transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
}