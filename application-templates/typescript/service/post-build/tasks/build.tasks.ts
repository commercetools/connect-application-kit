import { Listr } from 'listr2';

/**
 * Use this function to create an array of tasks to execute during
 * the postbuild workflow. The examples don't have any implementation,
 * use your own.
 *
 * We are using https://listr2.kilic.dev/
 *
 * @returns {Listr} List of tasks to execute
 */
export const postbuildTasks = (): Listr => {
  return new Listr(
    [
      {
        title: 'Starting the postbuild script',
        task: async (): Promise<void> => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 5000);
          });
        },
      },
      {
        title: 'Creating all the third party artifacts',
        task: async () => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 2000);
          });
        },
      },
      {
        title: 'Running the final tests',
        task: async () => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 3000);
          });
        },
      },
    ],
    {
      concurrent: false,
      exitOnError: true,
    }
  );
};
