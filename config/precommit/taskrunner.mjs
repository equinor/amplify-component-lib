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
// };

// type ExecStatus = {
//   stdout: string;
//   error: ExecException | null;
//   stderr: string | null;
// };

class Queue {
  _store = [];
  push(val) {
    this._store.push(val);
  }
  pop() {
    return this._store.shift();
  }
}

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

function taskFactory(task) {
  return function () {
    return new Promise(async (resolve, reject) => {
      const spinner = ora(task.name);
      spinner.spinner = 'earth';
      spinner.indent = 4;
      spinner.start();

      const status = await execShell(task);

      if (status.error) {
        spinner.fail();
        reject(status.error.message);
      }

      if (status.stderr && status.stderr !== '' && !task.ignoreStdErr) {
        spinner.fail();
        reject(status.stderr);
      }

      spinner.succeed();
      resolve();
    });
  };
}

export async function processCmdTasks(tasks) {
  const queue = new Queue();

  tasks.forEach((task) => queue.push(taskFactory(task)));

  while (queue._store.length > 0) {
    const test = queue.pop();
    await test().catch((err) => console.log('\n' + chalk.red(err)));
  }
}
