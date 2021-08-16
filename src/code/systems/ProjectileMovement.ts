import { canvas } from "../Canvas";
import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Velocity } from "../components/Velocity";
import { Entities } from "../Entities";
import { Entity } from "../entities/Base";
import { vec2 } from "../Vector2";
import { System } from "./Base";

export class ProjectileMovement extends System {
  constructor() {
    super(["Projectile", "Direction", "Position", "Size", "Velocity"]);
  }

  execute(entity: Entity, dt: number) {
    const position = entity.component<Position>("Position");
    const direction = entity.component<Direction>("Direction");
    const velocity = entity.component<Velocity>("Velocity");
    const size = entity.component<Size>("Size");

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
