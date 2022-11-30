/**
 * CAUTION
 *         ,--.!,
 *      __/   -*-
 *    ,d08b.  '|`
 *    0088MM
 *    `9MMP'
 *
 * The environment variables used below are dummy values and used only in tests
 * These values are part of the repository so do not put actual secretes in this
 * file
 *
 * To run test with other environment variables you can create a .env.local since
 * .env.local is in gitignore and will not be part of the repository. Start any script
 * with the .env.local environment values with the following command: npm run local [command]
 * so you can run test with your environment variables with command npm run local test
 *
 */
process.env.REGION = process.env.REGION || 'europe-west1.gcp';
process.env.PROJECT_KEY = process.env.PROJECT_KEY || 'mc-project-key';
process.env.CLIENT_ID = process.env.CLIENT_ID || '123456789012345678901234';
process.env.CLIENT_SECRET =
  process.env.CLIENT_SECRET || '12345678901234567890123456789012';
process.env.USE_MSW = process.env.USE_MSW || '1';
