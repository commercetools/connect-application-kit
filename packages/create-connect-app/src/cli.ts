/* eslint-disable no-console */
import { cac } from 'cac';
import { Listr, type ListrTask } from 'listr2';
import * as tasks from './tasks';
import { throwIfNodeVersionIsNotSupported } from './validations';
import { shouldUseYarn } from './utils';
import processOptions from './process-options';
import type { TCliCommandOptions } from './types';
import pkgJson from '../package.json';

throwIfNodeVersionIsNotSupported(process.versions.node, pkgJson.engines.node);

const cli = cac('create-connect-app');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const run = () => {
  // Default command
  cli
    .command('[project-directory]')
    .usage(
      '[project-directory]\n\n  Bootstraps a new Connect Application project using one of the predefined templates.'
    )
    .option(
      '--template <name>',
      '(optional) The name of the template to install.',
      { default: 'starter-typescript' }
    )
    .option(
      '--yes',
      '(optional) If set, the prompt options with default values will be skipped.',
      { default: false }
    )
    .action(async (projectDirectory, options: TCliCommandOptions) => {
      if (!projectDirectory) {
        cli.outputHelp();
        return;
      }

      console.log('');
      console.log(`Documentation available at https://docs.commercetools.com/`);
      console.log('');

      const taskOptions = await processOptions(projectDirectory, options);

      // Only task is to download the templates
      const taskList = new Listr(
        [tasks.downloadTemplate(taskOptions)].filter(Boolean) as ListrTask[]
      );

      await taskList.run();
      const useYarn = shouldUseYarn();

      console.log('');
      console.log(
        `🎉 🎉 🎉 The Connect Application has been created in the "${taskOptions.projectDirectoryName}" folder.`
      );
      console.log('');
      console.log(`To get started:`);
      console.log(`$ cd ${taskOptions.projectDirectoryName}`);
      console.log('');
      console.log(`In this directory you'll find all three templates`);
      console.log(`cd ['event', 'job', 'service']`);
      console.log('');
      console.log(
        `$ ${useYarn ? 'yarn' : 'npm'} install && ${
          useYarn ? 'yarn' : 'npm'
        } start:dev`
      );

      console.log('');
      console.log(
        `Visit https://docs.commercetools.com/connect for more info about developing Connect Applications. Enjoy 🚀`
      );
    });

  cli.help();
  cli.version(pkgJson.version);

  cli.parse();
};

export default run;
