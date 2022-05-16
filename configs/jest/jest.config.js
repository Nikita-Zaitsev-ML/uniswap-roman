const path = require('path');
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: path.resolve(__dirname, '../../'),
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  rootDir: '../../',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
