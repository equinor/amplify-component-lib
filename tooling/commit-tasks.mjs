import { processCmdTasks } from './taskrunner.mjs';
import chalk from 'chalk';

const tasks = [
  {
    command: 'npm run setup',
    name: chalk.hex('#CCE0E8')('Client Setup'),
    ignoreStdErr: true, // Yarn has a tendency to print a lot of errors and warning that are not process-killing
  },
  {
    command: 'npm run pretty',
    name: chalk.hex('#CCE0E8')('Running Prettier'),
  },
  {
    command: 'npm run lint',
    name: chalk.hex('#CCE0E8')('Running Lint'),
  },
];

async function runTasks() {
  console.log(chalk.hex('#E0FEFF')('Running Pre-Commit Tasks'));

  await processCmdTasks(tasks);
  console.log(chalk.greenBright('Pre-Commit finished successfully!'));
}

runTasks();
