import {
  optional,
  standardNaturalNumber,
  standardString,
  standardKey,
  region,
} from './helpers';

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
  //@todo: can do better validation for this
  optional(standardString)(
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
  optional(standardNaturalNumber)(['port'], {
    code: 'InvalidPort',
    message: 'Port is optional but should should be a number when provided.',
    referencedBy: 'environmentVariables',
  }),
];
export default envValidators;
