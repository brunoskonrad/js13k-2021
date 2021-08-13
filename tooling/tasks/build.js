const fs = require("fs");
const path = require("path");

const esbuild = require("esbuild");
const ejs = require("ejs");

const { createSingleSpritesheetFile } = require("./spritesheet");
const { getCurrentBranchName } = require("../lib/git");

const DISTRIBUTION_FOLDER = "./dist";

async function buildCurrentBranch() {
  const currentBranch = await getCurrentBranchName();
  const releaseFolder = path.join(DISTRIBUTION_FOLDER, `./${currentBranch}`);

  if (!fs.existsSync(DISTRIBUTION_FOLDER)) {
    fs.mkdirSync(DISTRIBUTION_FOLDER);
  }

  if (!fs.existsSync(releaseFolder)) {
    fs.mkdirSync(releaseFolder);
  }

  buildJavascript(releaseFolder);
  const coordinatesMap = await buildSpritesheet(releaseFolder);
  await buildHTMLTemplate(releaseFolder, coordinatesMap);
}

async function buildHTMLTemplate(destinationFolder, coordinatesMap) {
  const html = await ejs.renderFile("./src/index.ejs", {
    mapCoordinates: JSON.stringify(coordinatesMap),
    externalJavascript: [],
    externalCss: [],
  });

  fs.writeFileSync(`${destinationFolder}/index.html`, html);
}

function buildJavascript(destinationFolder) {
  esbuild.buildSync({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    outfile: `${destinationFolder}/main.js`,
    minify: true,
  });
}

function buildSpritesheet(destinationFolder) {
  return createSingleSpritesheetFile(destinationFolder);
}

module.exports = { buildCurrentBranch };
