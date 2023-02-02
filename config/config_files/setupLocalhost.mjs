import ora from 'ora';
import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const { readFile, writeFile } = fsPromises;
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function execShell(command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
      const status = {
        stdout: stdout,
        error: error,
        stderr: stderr,
      };
      resolve(status);
    });
  });
}

function runTask(task, readingFile) {
  return new Promise(async (resolve, reject) => {
    const spinner = ora(task.name);
    spinner.spinner = 'aesthetic';
    spinner.indent = 4;
    spinner.start();

    let status = await task.command;

    if (readingFile) {
      status = {
        stdout: status.toString(),
      };
    }

    if (status?.error) {
      spinner.fail();
      reject(status.error.message);
    }

    if (status?.stderr && status?.stderr !== '' && !task.ignoreStdErr) {
      spinner.fail();
      reject(status.stderr);
    }

    spinner.succeed();
    resolve(status?.stdout);
  });
}

const readLocalTask = {
  command: readFile(path.resolve(__dirname, 'api/swagger.json')),
  name: chalk.hex('#CCE0E8')('Reading local swagger.json'),
};

const downloadRemoteTask = {
  command: execShell(
    `curl -s ${process.env.VITE_API_URL}/swagger/v1.0/swagger.json`
  ),
  name: chalk.hex('#CCE0E8')('Downloading remote swagger json file'),
};

const generateTask = {
  command: execShell('yarn generate'),
  name: chalk.hex('#CCE0E8')('Running yarn generate'),
};

async function startLocalHost() {
  const readLocal = await runTask(readLocalTask, true);
  const localSwaggerContent = JSON.parse(readLocal);

  const remoteSwagger = await runTask(downloadRemoteTask);
  const remoteSwaggerContent = JSON.parse(remoteSwagger);

  const checkSpinner = ora(
    chalk.hex('#CCE0E8')('Checking  if local and remote swagger matches')
  );
  checkSpinner.spinner = 'aesthetic';
  checkSpinner.indent = 4;
  checkSpinner.start();

  if (
    JSON.stringify(localSwaggerContent) === JSON.stringify(remoteSwaggerContent)
  ) {
    console.log(
      '\n' +
        chalk.green(
          'Local and remote swagger.json matches, starting localhost...'
        )
    );
    checkSpinner.stop();
    return;
  }
  checkSpinner.stop();
  console.log(
    '\n' + chalk.red('Local and remote swagger.json does not match!')
  );

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const prompt = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  const answer = await prompt(
    'Do you want to use the remote swagger and generate new API files? (y/n) '
  );

  if (answer.toString().toLowerCase() !== 'y') {
    console.log('\n' + chalk.green('Starting localhost...'));
    return;
  }

  await runTask({
    command: writeFile(
      path.resolve(__dirname, 'api/swagger.json'),
      JSON.stringify(remoteSwaggerContent)
    ),
    name: chalk.hex('#CCE0E8')('Replacing local swagger.json with remote'),
  });

  await runTask(generateTask);

  console.log(
    '\n' +
      chalk.green(
        'Downloaded, generated, formatted and replaced with remote swagger.json'
      ) +
      '\n' +
      chalk.green('Starting localhost...')
  );
}

startLocalHost();
