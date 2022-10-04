/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  moduleDirectories: ['node_modules'],
  testEnvironment: 'node',
  projects: [
    '<rootDir>/application-templates/*/template-service/jest.config.js',
  ],
  verbose: true,
  // Remove for console.logs
  silent: true,
};
