module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^. \\.vue$': 'vue-jest',
    '. \\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
    'jest-transform-stub',
    '^. \\.(js|jsx)?$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '/internals/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/@core/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost:8080/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
