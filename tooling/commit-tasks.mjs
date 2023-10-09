import { runTask } from './taskrunner.mjs';
import chalk from 'chalk';

const runColor = '#CCE0E8';

async function runTasks() {
  console.log(chalk.hex('#E0FEFF')('Running Pre-Commit Tasks'));
  let failed = false;

  await runTask({
    command: 'npm run setup',
    name: chalk.hex(runColor)('Client setup'),
    ignoreStdErr: true,
  });

  try {
    await runTask({
      command: 'npm run pretty',
      name: chalk.hex(runColor)('Running prettier'),
    });
  } catch (err) {
    failed = true;
    console.log(chalk.red(`${err}`));
    await runTask({
      command: 'npm run pretty:fix',
      name: chalk.green('Fixing prettier errors'),
      customIndent: 6,
      ignoreStdErr: true,
    });
  }

  try {
    await runTask({
      command: 'npm run lint',
      name: chalk.hex(runColor)('Running ESLint'),
    });
  } catch (err) {
    failed = true;
    console.log(chalk.red(`ESLint error: ${err}`));
    try {
      await runTask({
        command: 'npm run lint:fix',
        name: chalk.green('Fixing lint errors'),
        customIndent: 6,
        ignoreStdErr: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (failed) {
    await runTask({
      command: 'git add $(git diff --name-only --cached --diff-filter=d)',
      name: chalk.hex(runColor)(
        'Re-adding staged files that were fixed by eslint/prettier'
      ),
    });
  }

  console.log(chalk.greenBright('Pre-Commit done!'));
}

runTasks();
