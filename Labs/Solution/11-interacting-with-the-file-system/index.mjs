import { promises as fs, existsSync, read } from "fs";
import path from "path";

// TODO: Create a command line tool that
// 1. Checks if a file exists
// 2. If it does, adds a new line and prints out the statistics of the file
// 3. If it doesn't, create the file with the new line

// const newLine = `This new line was added on ${new Date()}.\n`;
// const fileName = process.argv[2];
// const newLine =
//   [...process.argv].splice(3).join(" ") + ` (added on ${new Date()})`;

const cliInput = process.argv;
let flags = [];
let args = [];

cliInput.forEach((arg) => {
  if (/^--/.test(arg)) {
    flags.push(arg);
  } else if (!arg.includes("/Users")) {
    args.push(arg);
  }
});

const fileName = args[0];

if (flags.length === 1 && flags.includes("--read")) {
  readFile(fileName);
} else if (flags.length === 1 && flags.includes("--delete")) {
  deleteFile(fileName);
} else if (flags.length === 1 && flags.includes("--rename")) {
  renameFile(fileName, args[1]);
} else if (flags.length) {
  console.log(
    "Sorry, either you've passed in too many flags or we aren't handling that flag yet."
  );
} else {
  writeToFile(fileName);
}

async function deleteFile(fileName) {
  try {
    if (existsSync(fileName)) {
      await fs.unlink(fileName);
      console.log(`Deleted ${fileName}.`);
    } else {
      console.log("Sorry. That file doesn't exist.");
    }
  } catch (error) {
    console.log(error);
  }
}
async function readFile(fileName) {
  try {
    if (existsSync(fileName)) {
      const fileContents = await fs.readFile(fileName);
      console.log(fileContents.toString());
    } else {
      console.log("Sorry. That file doesn't exist.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function writeToFile(fileName) {
  const newLine = [...args].splice(1).join(" ") + ` (added on ${new Date()})`;

  try {
    if (existsSync(fileName)) {
      let fileContents = await fs.readFile(fileName);
      fileContents += newLine;
      await fs.writeFile(fileName, fileContents);
      const fileStats = await fs.stat(fileName);
      console.log(`All done. The file size is now ${fileStats.size} bytes.`);
    } else {
      await fs.writeFile(fileName, newLine);
      console.log("Created new file. All done.");
    }
  } catch (error) {
    console.log(error);
  }
}

async function renameFile(fileName, newName) {
  try {
    if (existsSync(fileName)) {
      await fs.rename(fileName, newName);
      console.log(`All done. Renamed ${fileName} to ${newName}.`);
    } else {
      console.log("Sorry, that file doesn't exist.");
    }
  } catch (error) {
    console.log(error);
  }
}

// Exercise 2:
// Use the remainder of the command line arguments to be the content of the new line.

// Exercise 3:
// Pass through the command line flag --read to print out the contents of the file.

// Exercise 4:
// Pass through the command line flag --delete to remove the file

// Exercise 5:
// Pass through the command line flag --rename to rename the file
