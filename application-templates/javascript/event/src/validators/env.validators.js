import {
  optional,
  standardString,
  standardKey,
  region,
} from './helpers.validators.js';

/**
 * Create here your own validators
 */
const envValidators = [
  standardString(
    ['clientId'],
    {
      code: 'InValidClientId',
      message: 'Client id should be 24 characters.',
      referencedBy: 'environmentVariables',
    },
    { min: 24, max: 24 }
  ),

  standardString(
    ['clientSecret'],
    {
      code: 'InvalidClientSecret',
      message: 'Client secret should be 32 characters.',
      referencedBy: 'environmentVariables',
    },
    { min: 32, max: 32 }
  ),

  standardKey(['projectKey'], {
    code: 'InvalidProjectKey',
    message: 'Project key should be a valid string.',
    referencedBy: 'environmentVariables',
  }),

  standardString(
    ['scope'],
    {
      code: 'InvalidScope',
      message: 'Scope should be at least 2 characters long.',
      referencedBy: 'environmentVariables',
    },
    { min: 2, max: undefined }
  ),

  region(['region'], {
    code: 'InvalidRegion',
    message: 'Not a valid region.',
    referencedBy: 'environmentVariables',
  }),

  standardString(
    ['port'],
    {
      code: 'InvalidPort',
      message: 'Port should be a valid string.',
      referencedBy: 'environmentVariables',
    },
    { min: 1, max: undefined }
  ),

  standardString(
    ['connectSubscriptionDestination'],
    {
      code: 'InvalidSubscriptionDestination',
      message: 'Subscription destination should be a valid string.',
      referencedBy: 'environmentVariables',
    },
    { min: 2, max: undefined }
  ),

  optional(standardString)(
    ['connectGcpTopicName'],
    {
      code: 'InvalidGcpTopicName',
      message: 'GCP Topic Name should be a valid string.',
      referencedBy: 'environmentVariables',
    },
    { min: 2, max: undefined }
  ),

  optional(standardString)(
    ['connectGcpProjectId'],
    {
      code: 'InvalidGcpProjectId',
      message: 'GCP Project ID should be a valid string.',
      referencedBy: 'environmentVariables',
    },
    { min: 2, max: undefined }
  ),

  optional(standardString)(
    ['connectAwsTopicArn'],
    {
      code: 'InvalidAwsTopicArn',
      message: 'AWS Topic ARN should be a valid string.',
      referencedBy: 'environmentVariables',
    },
    { min: 2, max: undefined }
  ),
];

export default envValidators;
