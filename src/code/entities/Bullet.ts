import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Projectile } from "../components/Projectile";
import { Rect } from "../components/Rect";
import { Size } from "../components/Size";
import { Collider } from "../components/Collider";
import { Velocity } from "../components/Velocity";
import { Vector2 } from "../Vector2";
import { Entity } from "./Base";

export class Bullet extends Entity {
  constructor(
    initialPosition: Vector2,
    direction: Vector2,
    layer: number,
    color = "#f00"
  ) {
    super([
      new Position(initialPosition.x, initialPosition.y),
      new Size(8, 3),
      new Rect(color),
      new Projectile(1),
      new Direction(direction),
      new Velocity(200),

      new Collider(layer),
    ]);
  }
}
