import { canvas } from "../Canvas";
import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Projectile } from "../components/Projectile";
import { Size } from "../components/Size";
import { Velocity } from "../components/Velocity";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { vec2 } from "../Vector2";
import { System } from "./Base";

export class ProjectileMovement extends System {
  components = [
    Projectile.name,
    Direction.name,
    Position.name,
    Size.name,
    Velocity.name,
  ];

  execute(entity: Entity, dt: number) {
    const position = entity.component<Position>(Position.name);
    const direction = entity.component<Direction>(Direction.name);
    const velocity = entity.component<Velocity>(Velocity.name);
    const size = entity.component<Size>(Size.name);

    const change = vec2(
      dt * direction.value.x * velocity.value,
      dt * direction.value.y * velocity.value
    );

    position.x += change.x;
    position.y += change.y;

    const outsideX =
      position.x + size.width < 0 || position.x > canvas.element.width;
    const outsideY =
      position.y + size.height < 0 || position.y > canvas.element.height;
    const isOutsideScreen = outsideX || outsideY;

    if (isOutsideScreen) {
      Entities.pop(entity);
    }
  }
}
