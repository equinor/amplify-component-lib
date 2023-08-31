import ora from 'ora';
import { exec } from 'child_process';
import chalk from 'chalk';

// Project used to be TS, keeping
// types here for object prop reference

// export type CmdTask = {
//   name: string;
//   command: string;
//   cwd?: string;
//   ignoreStdErr?: boolean;
//   customIndent?: number;
// };

// type ExecStatus = {
//   stdout: string;
//   error: ExecException | null;
//   stderr: string | null;
// };

const execShell = async (task) => {
  return new Promise((resolve, reject) => {
    if (task.cwd) {
      exec(task.command, { cwd: task.cwd }, (error, stdout, stderr) => {
        const status = {
          stdout: stdout,
          error: error,
          stderr: stderr,
        };
        resolve(status);
      });
    } else {
      exec(task.command, { cwd: process.cwd() }, (error, stdout, stderr) => {
        const status = {
          stdout: stdout,
          error: error,
          stderr: stderr,
        };
        resolve(status);
      });
    }
  });
};

export function runTask(task) {
  return new Promise(async (resolve, reject) => {
    const spinner = ora(task.name);
    spinner.spinner = 'earth';
    spinner.indent = task?.customIndent ? task.customIndent : 4;
    spinner.start();

    const status = await execShell(task);

    if (status.error) {
      spinner.fail();
      reject(status.error.message);
    }

    if (status.stderr && status.stderr !== '' && !task.ignoreStdErr) {
      spinner.fail();
      reject(status.stderr);
      return;
    }

    spinner.succeed();
    resolve();
  });
}
