import { vec2 } from "../Vector2";

import { Entity } from "../entities/Base";
import { System } from "./Base";
import { Input } from "../Input";

import { Position } from "../components/Position";
import { Controllable } from "../components/Controllable";
import { Velocity } from "../components/Velocity";

export class PlayerMovement extends System {
  components = [Position.name, Controllable.name, Velocity.name];

  execute(entity: Entity, dt: number) {
    let direction = vec2(0, 0);

    if (Input.isActionPressed("move-right")) {
      direction = vec2.sum(direction, vec2(1, 0));
    }
    if (Input.isActionPressed("move-down")) {
      direction = vec2.sum(direction, vec2(0, 1));
    }
    if (Input.isActionPressed("move-left")) {
      direction = vec2.sum(direction, vec2(-1, 0));
    }
    if (Input.isActionPressed("move-up")) {
      direction = vec2.sum(direction, vec2(0, -1));
    }

    const position = entity.component<Position>(Position.name);
    const velocity = entity.component<Velocity>(Velocity.name);

    position.x += Math.round(velocity.value * direction.x * dt);
    position.y += Math.round(velocity.value * direction.y * dt);
  }
}
