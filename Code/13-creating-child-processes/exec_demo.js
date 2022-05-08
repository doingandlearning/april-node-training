const { exec } = require("child_process");

const ac = new AbortController();

const { signal } = ac;

// // find /
// // process.execPath
exec(`ls -lh`, { signal }, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});

ac.abort();
