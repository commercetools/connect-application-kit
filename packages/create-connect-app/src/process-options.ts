import path from 'path';
import readline from 'readline';
import {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
} from './validations';
import { isSemVer } from './utils';
import type { TCliCommandOptions, TCliTaskOptions } from './types';

// const question = (rl: Interface, value: string) =>
//   new Promise<string>((resolve) => rl.question(value, resolve));

async function processOptions(
  projectDirectoryName: string,
  options: TCliCommandOptions
): Promise<TCliTaskOptions> {
  if (!projectDirectoryName) {
    throw new Error('Missing required argument "[project-directory]"');
  }
  const projectDirectoryPath = path.resolve(projectDirectoryName);

  // Parse options
  let tagOrBranchVersion = options.templateVersion || 'main';
  tagOrBranchVersion =
    isSemVer(tagOrBranchVersion) && !tagOrBranchVersion.startsWith('v')
      ? `v${tagOrBranchVersion}`
      : tagOrBranchVersion;

  const templateName = options.template;

  // Validate options
  throwIfProjectDirectoryExists(projectDirectoryName, projectDirectoryPath);
  throwIfTemplateIsNotSupported(templateName);

  // Read prompts
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.close();

  return {
    projectDirectoryName,
    projectDirectoryPath,
    templateName,
    tagOrBranchVersion,
  };
}

export default processOptions;
