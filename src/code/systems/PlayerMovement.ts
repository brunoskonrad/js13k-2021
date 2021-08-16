import { vec2 } from "../Vector2";

import { Position } from "../components/Position";
import { Entity } from "../entities/Base";
import { System } from "./Base";
import { Input } from "../Input";

const VELOCITY = 100;

export class PlayerMovement extends System {
  constructor() {
    super(["Position", "Controllable"]);
  }

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

    const position = entity.component<Position>("Position");

    position.x += Math.round(VELOCITY * direction.x * dt);
    position.y += Math.round(VELOCITY * direction.y * dt);
  }
}
