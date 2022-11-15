import envValidators from '../../src/validators/envValidators';
import { getValidateMessages } from '../../src/validators/helpers';

const env = {
  clientId: '123456789012345678901234',
  clientSecret: '12345678901234567890123456789012',
  projectKey: 'project-key',
  scope: 'scope',
  region: 'europe-west1.gcp',
  port: '8080',
};

describe('Testing create integration', () => {
  it('response statusCode 400 / created', async () => {
    const str21 = '123456789012345678901';
    const str201 = [...new Array(201)].map(() => 'a').join('');
    const str5001 = [...new Array(5001)].map(() => 'a').join('');
    return Promise.all(
      [
        [{ ...env, clientId: '' }, 'InValidClientId'],
        [{ ...env, clientId: str201 }, 'InValidClientId'],
        [{ ...env, clientId: undefined }, 'InValidClientId'],
        [{ ...env, clientSecret: '' }, 'InvalidClientSecret'],
        [{ ...env, clientSecret: str201 }, 'InvalidClientSecret'],
        [{ ...env, clientSecret: undefined }, 'InvalidClientSecret'],
        [{ ...env, projectKey: '' }, 'InvalidProjectKey'],
        [{ ...env, projectKey: undefined }, 'InvalidProjectKey'],
        [{ ...env, projectKey: 'akdn isk' }, 'InvalidProjectKey'],
        [{ ...env, projectKey: 'däf_gh' }, 'InvalidProjectKey'],
        [
          //scope is optional
          { ...env, scope: undefined, projectKey: undefined },
          'InvalidProjectKey',
        ],
        [{ ...env, scope: '' }, 'InvalidScope'],
        [
          //scope has no max length
          { ...env, scope: str5001, projectKey: undefined },
          'InvalidProjectKey',
        ],
        [{ ...env, region: undefined }, 'InvalidRegion'],
        [{ ...env, region: 'west' }, 'InvalidRegion'],
        [{ ...env, port: '1.22' }, 'InvalidPort'],
        [{ ...env, port: '' }, 'InvalidPort'],
        //port is optional
        [{ ...env, port: undefined, projectKey: '' }, 'InvalidProjectKey'],
      ].map(([env, code]) => {
        const messages = getValidateMessages(envValidators, env);
        expect(Array.isArray(messages)).toBe(true);
        expect(messages.length).toBe(1);
        expect(messages[0].code).toBe(code);
      })
    );
  });
});
