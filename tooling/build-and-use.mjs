import { runTask } from './taskrunner.mjs';
import chalk from 'chalk';
import { readdir} from 'fs/promises';
import { existsSync } from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

async function runTasks() {
  console.clear();
  const presetApp = process.argv.at(2)?.match(/(\w+-?)+/)?.[0];
  if (presetApp) {
    console.log(
      chalk.bold.yellow('Running build and use tasks with ') +
        chalk.bold.magentaBright(presetApp) +
        chalk.bold.yellow(' as preset app...\n')
    );
  } else if (process.argv.at(2)) {
    // Provided arg but didn't match regex
    console.log(
      chalk.bold.red('App name didnt match /(w+-?)+/ regex') +
        chalk.bold.yellow('Running the normal build and use tasks...\n')
    );
  } else {
    console.log(chalk.bold.yellow('Running build and use tasks...\n'));
  }

  try {
    await runTask({
      command: 'npm run build',
      name: `${chalk.white('Building')} ${chalk.bold.magenta(
        'amplify-component-lib'
      )}`,
      ignoreStdErr: true,
    });
  } catch (err) {
    console.error(err);
    return;
  }

  const dirents = await readdir('..', { withFileTypes: true });
  const dirs = dirents
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const rl = readline.createInterface({ input, output });

  let selectedDir = undefined;
  let failed = false;

  console.clear();

  if (dirs.find((dir) => presetApp?.toLowerCase() === dir.toLowerCase())) {
    selectedDir = presetApp;
  } else if (presetApp) {
    console.log(
      chalk.red('Unable to find directory with the preset name: ') +
        chalk.greenBright.bold(presetApp)
    );
  }

  while (selectedDir === undefined) {
    console.log(chalk.bold('Found these directories in parent folder:'));
    console.log(chalk.bold.blue(dirs.join('\n')));
    if (failed) {
      console.log(
        chalk.red(
          'Unable to find a directory with that name! Please try again...'
        )
      );
    }
    const answer = await rl.question(
      chalk.greenBright(
        'Write name of project you want to copy local amplify-component-lib into:'
      ) + `\n> `
    );
    selectedDir = dirs.find(
      (dir) => dir.toLowerCase() === answer.toLowerCase()
    );
    if (selectedDir === undefined) {
      failed = true;
    }
  }

  console.clear();
  console.log(
    chalk.greenBright(
      `${chalk.bold.magentaBright(selectedDir)} has been selected.`
    )
  );

  let nodeModulesDir = `../${selectedDir}/node_modules`
  if (existsSync(`../${selectedDir}/client`)) {
    nodeModulesDir = `../${selectedDir}/client/node_modules`
  }

  await runTask({
    command: `rm -rf ${nodeModulesDir}/.vite`,
    name: `Removing ${chalk.bold.greenBright(
      '.vite'
    )} folder from ${chalk.bold.greenBright(
      `${nodeModulesDir}`
    )}`,
  });

  await runTask({
    command: `rm -rf ${nodeModulesDir}/.cache`,
    name: `Removing ${chalk.bold.greenBright(
      '.cache'
    )} folder from ${chalk.bold.greenBright(
      `${nodeModulesDir}`
    )}`,
  });

  await runTask({
    command: `rm -rf ${nodeModulesDir}/@equinor/amplify-component-lib/dist`,
    name: `Removing old ${chalk.bold.greenBright(
      'amplify-component-lib/dist'
    )} folder from ${chalk.bold.greenBright(
      `${nodeModulesDir}`
    )}`,
  });

  await runTask({
    command: `cp -r ./dist ${nodeModulesDir}/@equinor/amplify-component-lib/dist`,
    name: `Copying newly built ${chalk.bold.greenBright(
      'dist'
    )} folder into ${chalk.bold.greenBright(
      `${nodeModulesDir}`
    )}`,
  });

  console.log(
    chalk.green.bold(
      `Built new version and copied it to ${chalk.bold.magentaBright(
        selectedDir
      )}! 🎉`
    )
  );
}

runTasks();
