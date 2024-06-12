#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
async function main() {
    console.log(chalk.bold.italic.blueBright('\t\t\t\t\t\t\t\t\t\t💰💸 Welcome To InstantCash ATM 💰💸\n\n'));
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: chalk.yellowBright.bold("\t\t\t\t\t\t\t\t\tPlease enter your userId 🆔 : \n\n")
        },
        {
            type: "password",
            name: "userPin",
            message: chalk.yellowBright.bold("\t\t\t\t\t\t\t\tPlease enter your 4-digit pin 📌 : \n\n"),
            mask: "*",
            validate(value) {
                const isValid = /^\d{4}$/.test(value);
                return isValid || chalk.redBright.bold("\t\t\t\t\t\t\t\tPlease enter a 4-digit pin❗❗\n\n");
            }
        },
        {
            type: "list",
            name: "accountType",
            message: chalk.cyanBright.bold("\t\t\t\t\t\t\t\tPlease choose your account type: 👇\n\n"),
            choices: [chalk.yellowBright.bold("\t\t\t\t\t\t\t\tCurrent\n"), chalk.yellowBright.bold("\t\t\t\t\t\t\t\tSavings")],
        },
        {
            type: "list",
            name: "transactionType",
            message: chalk.cyanBright.bold("\t\t\t\t\t\t\t\tPlease choose your transaction type: 👇\n"),
            choices: [chalk.yellowBright.bold("\t\t\t\t\t\t\t\tCheck Deposit\n"), chalk.yellowBright.bold("\t\t\t\t\t\t\t\tWithdraw\n")],
        },
        {
            type: "number",
            name: "checkDepositNumber",
            message: chalk.cyanBright.bold("\t\t\t\t\t\t\t\tPlease enter the 12-digit check deposit number: \n\n"),
            validate(value) {
                const isValid = /^\d{12}$/.test(value);
                return isValid || chalk.redBright.bold("\t\t\t\t\t\t\t\tPlease enter 12-digit check deposit number. \n\n");
            },
            when(answers) {
                return answers.transactionType === chalk.yellowBright.bold("\t\t\t\t\t\t\t\tCheck Deposit\n");
            },
        },
        {
            type: "list",
            name: "withdrawAmount",
            message: chalk.cyanBright.bold("\t\t\t\t\t\t\t\tPlease choose a withdrawal amount: 👇\n\n"),
            choices: [500, 1000, 3000, 5000, 10000],
            when(answers) {
                return answers.transactionType === chalk.yellowBright.bold("\t\t\t\t\t\t\t\tWithdraw\n");
            },
        }
    ]);
    if (answers.transactionType === chalk.yellowBright.bold("\t\t\t\t\t\t\t\tCheck Deposit\n")) {
        console.log(chalk.green.bold("\t\t\t\t\t\t\t\tYour amount has been credited ✅\n\t\t\t\t\t\t\t\tThank you for using InstantCash ATM. Your financial security is our priority. Have a wonderful day ahead❗❗"));
    }
    else if (answers.transactionType === chalk.yellowBright.bold("\t\t\t\t\t\t\t\tWithdraw\n")) {
        const accountBalance = Math.floor(Math.random() * 50000);
        if (accountBalance >= answers.withdrawAmount) {
            console.log(chalk.magentaBright.bold(("\t\t\t\t\t\t\t\tPlease collect your money 💸\n")));
            const balance = accountBalance - answers.withdrawAmount;
            console.log(chalk.magentaBright(`\t\t\t\t\t\t\t\tYour remaining balance: `), `${balance} ❗❗\n`);
            console.log(chalk.green.bold("\t\t\t\t\t\t\t\tYour amount has been credited ✅\n\t\t\t\t\t\t\t\tThank you for using InstantCash ATM. Your financial security is our priority. Have a wonderful day ahead❗❗"));
        }
        else {
            console.log("\t\t\t\t\t\t\t\tInsufficient balance ❌❌\n");
            console.log(("\t\t\t\t\t\t\t\tThank you for using InstantCash ATM. Your financial security is our priority. Have a wonderful day ahead❗❗"));
            ;
        }
    }
}
main();
