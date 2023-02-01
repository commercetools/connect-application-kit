import { postbuildTasks } from './tasks/build.tasks';

const run = async () => {
  await postbuildTasks().run();

  // eslint-disable-next-line no-console
  process.on('exit', (code) => console.log('Exited with code ', code));
};

run();
