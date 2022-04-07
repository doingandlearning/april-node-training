const { exec } = require("child_process");

// find /

exec("ls -lh", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});
