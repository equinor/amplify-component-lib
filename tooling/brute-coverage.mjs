import { runTask } from "./taskrunner.mjs"
import { readFile } from "node:fs/promises"
import chalk from "chalk";

async function runTasks() {
    console.clear();
    console.log(chalk.bold.yellow("Running brute force coverage script...\n"))

    while (true) {
        try {
            await runTask({
                command: "npm run test:coverage",
                name: `${chalk.white("npm")} ${chalk.bold.magenta("test:coverage")}`,
                ignoreStdErr: true
            })
        } catch {
            console.log(chalk.bold.red("Coverage failed!"))
            return;
        }
        const report = await readFile("./coverage/coverage.json", "utf-8")
        try {
            const parsed = JSON.parse(report);
            const { total: { lines, statements, functions, branches }} = parsed;

            if (lines.pct !== 100 || statements.pct !== 100 || functions.pct !== 100 || branches.pct !== 100) {
                console.log(`\t${chalk.bold.red("100% coverage wasn't met!")}, ${chalk.white("stopping run...")}`)
                return;
            }

            console.log(`\t${chalk.bold.green("100% coverage met!")}, ${chalk.white("starting new run")}`)
        }
        catch {
           console.log(chalk.bold.red("Failed to parse report!"))
           return;
        }
    }
}

runTasks()