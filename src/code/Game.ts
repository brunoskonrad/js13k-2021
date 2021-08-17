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
import { Meteor } from "./entities/Meteor";
import { Entity } from "./entities/Base";
import { Collider } from "./components/Collider";
import { PhysicsWorld } from "./PhysicsWorld";
import { CollisionDetection } from "./systems/CollisionDetection";
import { ProjectileHit } from "./systems/ProjectileHit";
import { CheckHealthSituation } from "./systems/CheckHealthSituation";
import { Pirate } from "./entities/Pirate";

export class Game extends GameLoop {
  systems: System[] = [
    new CollisionDetection(),
    new PlayerMovement(),
    new Shooting(),
    new ProjectileMovement(),
    new ProjectileHit(),
    new CheckHealthSituation(),
  ];
  renderSystems: System[] = [new RenderRect()];

  constructor() {
    super();

    Input.init();
    canvas.init();

    document.addEventListener("entities:push", (event) => {
      const { detail } = event as any;
      const entity = detail as Entity;

      const collider = entity.component<Collider>(Collider.name);
      if (collider) {
        PhysicsWorld.push(entity.id, collider.layer);
      }
    });

    document.addEventListener("entities:pop", (event) => {
      const { detail } = event as any;
      const entity = detail as Entity;

      const collider = entity.component<Collider>(Collider.name);
      if (collider) {
        PhysicsWorld.pop(entity.id, collider.layer);
      }
    });

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
    canvas.context.fillText(`Physics world: ${PhysicsWorld.count}`, 0, 40);
  }
}

(window as any).spawn = () => {
  Entities.push(new Meteor());
};

(window as any).spawn2 = () => {
  Entities.push(new Pirate());
};
