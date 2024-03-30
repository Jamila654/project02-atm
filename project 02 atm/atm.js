#! /usr/bin/env node
import inquirer from "inquirer";
const answers = await inquirer.prompt([
    {
        type: "input",
        name: "userId",
        message: "Please enter Your userId",
    },
    {
        type: "number",
        name: "userPin",
        message: "Please enter your 4 digit pin",
    },
    {
        type: "list",
        name: "accountType",
        message: "Please choose your account type.",
        choices: ["Current", "Savings"],
    },
    {
        type: "list",
        name: "transactionType",
        message: "Please choose your transaction type.",
        choices: ["Check Deposit", "Withdraw"],
    },
    {
        type: "number",
        name: "Check_Deposit_number",
        message: "Please enter the 12 digit check deposit number",
        when(answers) {
            return answers.transactionType == "Check Deposit";
        },
    },
    {
        type: "list",
        name: "withdrawAmount",
        message: "Please choose a withdrawal amount.",
        choices: [500, 1000, 3000, 5000, 10000],
        when(answers) {
            return answers.transactionType == "Withdraw";
        },
    }
]);
if (answers.transactionType == "Check Deposit") {
    console.log("Your amount has been credited");
}
else if (answers.transactionType == "Withdraw") {
    const accountBalance = Math.floor(Math.random() * 50000);
    if (accountBalance >= answers.withdrawAmount) {
        console.log("Please collect your money");
        const balance = accountBalance - answers.withdrawAmount;
        console.log(`Your remaining balance: ${balance}.`);
    }
    else {
        console.log("Insufficient balance");
    }
}
