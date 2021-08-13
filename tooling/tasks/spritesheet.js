const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const Spritesmith = require("spritesmith");

const SPRITES_DIR = "./src/sprites";

function createSingleSpritesheetFile(folderDestination) {
  const spritesDirectory = fs.readdirSync(SPRITES_DIR);
  const pngSpriteFiles = spritesDirectory
    .filter(isPngFile)
    .map(concatenateImageNameWithFolder);

  return new Promise((resolve, reject) => {
    Spritesmith.run({ src: pngSpriteFiles }, async (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      await saveSpritesheet(result, folderDestination);
      resolve(removeFolderPathFromCoordinateMap(result.coordinates));
    });
  });
}

function saveSpritesheet(result, folderDestination) {
  return new Promise((resolve) => {
    if (!result.image) {
      return;
    }

    const spritesheetFileName = path.join(folderDestination, "spritesheet.png");

    fs.writeFileSync(spritesheetFileName, result.image);
    exec(
      `convert -quality 00 ${folderDestination}/spritesheet.png ${folderDestination}/spritesheet.png`,
      resolve
    );
  });
}

function removeFolderPathFromCoordinateMap(coordinates) {
  const coordinateKeys = Object.keys(coordinates);
  return coordinateKeys.reduce((current, key) => {
    current[key.replace("src/sprites/", "")] = coordinates[key];

    return current;
  }, {});
}

function isPngFile(fileName) {
  return path.extname(fileName) === ".png";
}

function concatenateImageNameWithFolder(imageName) {
  return path.join(SPRITES_DIR, imageName);
}

module.exports = { createSingleSpritesheetFile };
