module.exports = {
  displayName: 'Tests Typescript Application - Job',
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['./tests/setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
