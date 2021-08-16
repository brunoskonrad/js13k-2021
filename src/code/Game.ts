import { canvas } from "./Canvas";
import { Entities } from "./Entities";
import { Player } from "./entities/Player";
import { GameLoop } from "./GameLoop";
import { Input } from "./Input";
import { System } from "./systems/Base";
import { PlayerMovement } from "./systems/PlayerMovement";
import { Shooting } from "./systems/Shooting";
import { RenderRect } from "./systems/RenderRect";
import { ProjectileMovement } from "./systems/ProjectileMovement";

export class Game extends GameLoop {
  systems: System[] = [
    new PlayerMovement(),
    new Shooting(),
    new ProjectileMovement(),
  ];
  renderSystems: System[] = [new RenderRect()];

  constructor() {
    super();

    Input.init();
    canvas.init();

    const player = new Player();
    Entities.push(player);

    (window as any).player = player;
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

    canvas.context.fillText(`Entities: ${Entities.count}`, 0, 20);
  }
}
