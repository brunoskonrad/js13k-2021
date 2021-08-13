const { exec } = require("child_process");

function getCurrentBranchName() {
  return new Promise((resolve, reject) => {
    exec("git rev-parse --abbrev-ref HEAD", (err, stdout) => {
      if (err) {
        reject(err);
      }

      if (typeof stdout === "string") {
        resolve(stdout.trim());
      }
    });
  });
}

module.exports = { getCurrentBranchName };
