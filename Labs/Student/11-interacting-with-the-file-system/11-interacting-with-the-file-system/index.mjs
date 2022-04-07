import { promises as fs, existsSync, read } from "fs";
import path from "path";

// TODO:
// Exercise 1 Create a command line tool that
// 1. Checks if a file exists
// 2. If it does, adds a new line and prints out the statistics of the file
// 3. If it doesn't, create the file with the new line

// Scaffolding for exercise 1 and 2
const newLine = `This new line was added on ${new Date()}.\n`;
const fileName = process.argv[2];
const otherArgs = [...process.argv].splice(3);
// End of scaffolding

// // [Start of Scaffolding for exercises 3-end]
// const cliInput = process.argv;
// let flags = [];
// let args = [];

// cliInput.forEach((arg) => {
//   if (/^--/.test(arg)) {
//     flags.push(arg);
//   } else if (!arg.includes("/Users")) {
//     args.push(arg);
//   }
// });

// const fileName = args[0];
// // [End of Scaffolding for exercises 3-end]

// Exercise 2:
// Use the remainder of the command line arguments to be the content of the new line.

// Note: to make this refactor more straightforward you can comment out the first scaffolding and uncomment the second.

// Exercise 3:
// Pass through the command line flag --read to print out the contents of the file.

// Exercise 4:
// Pass through the command line flag --delete to remove the file

// Exercise 5:
// Pass through the command line flag --rename to rename the file
