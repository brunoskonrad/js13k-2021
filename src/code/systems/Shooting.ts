import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Shooter } from "../components/Shooter";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { Bullet } from "../entities/Bullet";
import { Input } from "../Input";
import { vec2 } from "../Vector2";
import { System } from "./Base";

export class Shooting extends System {
  components = [Shooter, Position, Direction];

  execute(entity: Entity) {
    const shooter = entity.component<Shooter>(Shooter);

    if (!shooter) {
      return;
    }

    if (Input.isActionPressed("shoot")) {
      if (
        !shooter.lastShotAt ||
        Date.now() - shooter.lastShotAt >= shooter.delay
      ) {
        this.shoot(entity);
      }
    }
  }

  shoot: (entity: Entity) => void = (entity: Entity) => {
    const playerPosition = entity.component<Position>(Position);
    const shooter = entity.component<Shooter>(Shooter);
    const direction = entity.component<Direction>(Direction);

    shooter.lastShotAt = Date.now();

    const initialPosition = vec2(
      playerPosition.x + shooter.position.x,
      playerPosition.y + shooter.position.y
    );

    const bullet = new Bullet(
      initialPosition,
      direction.value,
      shooter.layer,
      shooter.color
    );

    Entities.push(bullet);
  };
}
