/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  moduleDirectories: ['node_modules'],
  testEnvironment: 'node',
  projects: [
    '<rootDir>/application-templates/*/service/jest.config.cjs',
    '<rootDir>/application-templates/*/event/jest.config.cjs',
    '<rootDir>/application-templates/*/job/jest.config.cjs',
  ],
  verbose: true,
  // Remove for console.logs
  silent: true,
};
