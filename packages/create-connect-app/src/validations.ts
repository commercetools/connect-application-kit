import fs from 'fs';
import semver from 'semver';
import type { TCliCommandOptions } from './types';

const availableTemplates = {
  javascript: 'javascript',
  typescript: 'typescript',
} as const;

const throwIfTemplateIsNotSupported = (
  templateName: TCliCommandOptions['template']
) => {
  switch (templateName) {
    case availableTemplates.javascript:
    case availableTemplates.typescript:
      break;
    default: {
      const templateNamesList = Object.keys(availableTemplates).toString();
      throw new Error(
        `The provided template name "${templateName}" does not exist. Available templates are "${templateNamesList}". Make sure you are also using the latest version of "@commercetools-frontend/create-mc-app".`
      );
    }
  }
};

const throwIfProjectDirectoryExists = (dirName: string, dirPath: string) => {
  if (fs.existsSync(dirPath)) {
    throw new Error(
      `A directory named "${dirName}" already exists at this location "${dirPath}". Please choose a different project name or remove the directory, then try running the command again.`
    );
  }
};

const throwIfNodeVersionIsNotSupported = (
  currentNodeVersion: string,
  expectedVersionRange: string
) => {
  const hasValidNodeVersion = semver.satisfies(
    currentNodeVersion,
    expectedVersionRange
  );

  if (!hasValidNodeVersion) {
    throw new Error(
      `You are running Node ${currentNodeVersion} but create-mc-app requires Node ${expectedVersionRange}. Please update your version of Node.`
    );
  }
};

export {
  throwIfTemplateIsNotSupported,
  throwIfProjectDirectoryExists,
  throwIfNodeVersionIsNotSupported,
};
