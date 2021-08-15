import { canvas } from "./Canvas";
import { Entity } from "./entities/Base";
import { Player } from "./entities/Player";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { System } from "./systems/Base";
import { PlayerMovement } from "./systems/PlayerMovement";
import { RenderRect } from "./systems/RenderRect";

export class Game extends GameLoop {
  systems: System[] = [new PlayerMovement()];
  renderSystems: System[] = [new RenderRect()];
  entities: Entity[] = [new Player()];

  constructor() {
    super();

    Input.init();
    canvas.init();
  }

  update(dt: number) {
    // canvas.clear();

    this.systems.forEach((system) => {
      this.entities.forEach((entity) => {
        system.process(entity, dt);
      });
    });
  }

  render() {
    canvas.clear();

    this.renderSystems.forEach((system) => {
      this.entities.forEach((entity) => {
        system.process(entity, 0);
      });
    });
  }
}
