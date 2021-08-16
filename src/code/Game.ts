import { canvas } from "./Canvas";
import { Entities } from "./Entities";
import { Player } from "./entities/Player";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { System } from "./systems/Base";
import { PlayerMovement } from "./systems/PlayerMovement";
import { PlayerShooting } from "./systems/PlayerShooting";
import { RenderRect } from "./systems/RenderRect";

export class Game extends GameLoop {
  systems: System[] = [new PlayerMovement(), new PlayerShooting()];
  renderSystems: System[] = [new RenderRect()];

  constructor() {
    super();

    Input.init();
    canvas.init();
    Entities.push(new Player());
  }

  update(dt: number) {
    this.systems.forEach((system) => {
      Entities.forEach((entity) => {
        system.process(entity, dt);
      });
    });
  }

  render() {
    canvas.clear();

    this.renderSystems.forEach((system) => {
      Entities.forEach((entity) => {
        system.process(entity, 0);
      });
    });
  }
}
