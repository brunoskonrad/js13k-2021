const express = require("express");
const fs = require("fs");
const esbuild = require("esbuild");
const ejs = require("ejs");
const path = require("path");
const chokidar = require("chokidar");

const { createSingleSpritesheetFile } = require("./tasks/spritesheet");
const { calculateMyChangesImpact } = require("./tasks/calculateImpact");
const { buildCurrentBranch } = require("./tasks/build");

const app = express();

const DEV_FOLDER = "./dev";

async function setupDevEnvironment() {
  createFolderIfItDoesntExist();
  await buildEverything();
}

async function buildEverything() {
  buildJavascript();
  await buildSpritesheet();
  await buildHTMLTemplate();
}

function createFolderIfItDoesntExist() {
  if (!hasDevFolder()) {
    fs.mkdirSync(DEV_FOLDER);
  }
}

function hasDevFolder() {
  return fs.existsSync(DEV_FOLDER);
}

async function buildHTMLTemplate() {
  buildClientLibraries();

  const mapCoordinates = fs.readFileSync(
    path.join(DEV_FOLDER, "coordinates.json")
  );

  const { jsFiles, cssFiles } = getClientLibs();

  const html = await ejs.renderFile("./src/index.ejs", {
    mapCoordinates,
    externalJavascript: jsFiles,
    externalCss: cssFiles,
  });

  fs.writeFileSync(`${DEV_FOLDER}/index.html`, html);
}

function buildJavascript() {
  esbuild.buildSync({
    entryPoints: ["./src/main.ts"],
    bundle: true,
    outfile: `${DEV_FOLDER}/main.js`,
    sourcemap: "inline",
  });
}

async function buildSpritesheet() {
  const coordinatesMap = await createSingleSpritesheetFile(DEV_FOLDER);
  const coordinatesJsonFile = path.join(DEV_FOLDER, "coordinates.json");

  fs.writeFileSync(coordinatesJsonFile, JSON.stringify(coordinatesMap));
}

function buildClientLibraries() {
  const { jsFiles, cssFiles } = getClientLibs();
  const filesToCopy = [...jsFiles, ...cssFiles];

  filesToCopy.forEach((file) => {
    fs.copyFileSync(
      path.join("./tooling/clientLibs/", file),
      path.join(DEV_FOLDER, file)
    );
  });
}

function getClientLibs() {
  const clientLibs = fs.readdirSync("./tooling/clientLibs");

  const onlyJsFiles = (fileName) => path.extname(fileName) === ".js";
  const jsFiles = clientLibs.filter(onlyJsFiles);

  const onlyCssFiles = (fileName) => path.extname(fileName) === ".css";
  const cssFiles = clientLibs.filter(onlyCssFiles);

  return { jsFiles, cssFiles }
}

function watchSourceCodeChanges() {
  const watcher = chokidar.watch("./src", { ignoreInitial: true });

  async function buildFile(fileName) {
    if (!hasDevFolder()) {
      console.log("🙈 No dev folder here, let me create it very quickly...")
      setupDevEnvironment();
      console.log("🎉 Done!");
      return;
    }

    console.log(`🧰 We are working on ${fileName}...`);

    if (path.extname(fileName) === ".ts") {
      buildJavascript();
    }

    if (path.extname(fileName) === ".ejs") {
      await buildHTMLTemplate();
    }

    if (path.extname(fileName) === ".png") {
      await buildSpritesheet();
      await buildHTMLTemplate();
    }

    console.log("🎉 Done!");
  }

  watcher.on("add", buildFile);
  watcher.on("change", buildFile);
  watcher.on("unlink", buildFile);
}

setupDevEnvironment();
app.use(express.static(DEV_FOLDER));

app.get("/api/impact-changes", async (_req, res) => {
  await buildCurrentBranch();
  const data = await calculateMyChangesImpact();
  res.send(data);
});

app.listen(3000, () => {
  console.log("✨ Happy hacking!");

  watchSourceCodeChanges();
});
