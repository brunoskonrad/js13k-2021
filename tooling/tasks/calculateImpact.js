const fs = require("fs");
const path = require("path");

const { getCurrentBranchName } = require("../lib/git");

const DIST_FOLDER = "./dist";
const BASE_BRANCH = "main";

const MAXIMUM_GAME_SIZE = 13 * 1024; // 13kb

async function calculateMyChangesImpact() {
  const branch = await getCurrentBranchName();

  const mainBranchSize = await calculateBranch(BASE_BRANCH);
  const currentBranchSize = await calculateBranch(branch);

  const currentBranchDifference = {
    bytes: currentBranchSize.total - mainBranchSize.total,
    percentageFormatted: new Number(
      currentBranchSize.percentageUsage - mainBranchSize.percentageUsage
    ).toFixed(2),
  };

  return {
    maximumGameSize: MAXIMUM_GAME_SIZE,
    currentBranchDifference,
    mainBranchSize,
    currentBranchSize,
  };
}

async function calculateBranch(branchName) {
  const calculateFileSize = calculateFileSizeFor(branchName);

  const javascriptSize = await calculateFileSize("main.js");
  const spritesheetSize = await calculateFileSize("spritesheet.png");
  const htmlSize = await calculateFileSize("index.html");
  const total = javascriptSize + spritesheetSize + htmlSize;
  const percentageUsage = (total * 100) / MAXIMUM_GAME_SIZE;

  return {
    total,
    percentageUsage,
    percentageFormatted: percentageUsage.toFixed(2),
    javascriptSize,
    spritesheetSize,
    htmlSize,
    branchName,
  };
}

const calculateFileSizeFor = (branchName) => async (fileName) => {
  const basePath = path.join(DIST_FOLDER, `./${branchName}`);
  const filePath = path.join(basePath, fileName);

  try {
    return getFileSize(filePath);
  } catch (error) {
    console.warn(`${fileName} for ${branchName} failed due to: `, error);
    return 0;
  }
};

async function getFileSize(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, fileStats) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(fileStats.size);
    });
  });
}

module.exports = { calculateMyChangesImpact };
