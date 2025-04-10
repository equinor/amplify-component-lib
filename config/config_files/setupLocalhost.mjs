/* eslint-disable no-console */
import { exec } from 'child_process';
import { promises as fsPromises } from 'fs';
import ora from 'ora';
import path from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const { readFile, writeFile } = fsPromises;
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function execShell(command) {
  return new Promise((resolve) => {
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
  // eslint-disable-next-line no-async-promise-executor
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

async function startLocalHost() {
  const readLocal = await runTask(
    {
      command: readFile(path.resolve(__dirname, 'api/swagger.json')),
      name: chalk.hex('#CCE0E8')('Reading local swagger.json'),
    },

    true
  );
  const localSwaggerContent = JSON.parse(readLocal);

  const remoteSwagger = await runTask({
    command: execShell(`curl -s ${process.env.VITE_SWAGGER_URL}`),
    name: chalk.hex('#CCE0E8')('Downloading remote swagger json file'),
  });
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
    process.exit();
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
    process.exit();
  }

  await runTask({
    command: writeFile(
      path.resolve(__dirname, 'api/swagger.json'),
      JSON.stringify(remoteSwaggerContent)
    ),
    name: chalk.hex('#CCE0E8')('Replacing local swagger.json with remote'),
  });

  // Add 1 second wait for the writeFile to swagger.json
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));

  await runTask({
    command: execShell('bun run generate'),
    name: chalk.hex('#CCE0E8')('Running bun run generate'),
    ignoreStdErr: true
  });

  console.log(
    '\n' +
      chalk.green(
        'Downloaded, generated, formatted and replaced with remote swagger.json'
      ) +
      '\n' +
      chalk.green('Starting localhost...')
  );

  process.exit();
}

startLocalHost();
