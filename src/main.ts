import { Game } from "./code/Game";

const game = new Game();

game.start();

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    game.stop();
  } else {
    game.start();
  }
});
