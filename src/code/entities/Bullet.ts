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
  constructor(initialPosition: Vector2, direction: Vector2) {
    super();

    this.addComponent(new Position(initialPosition.x, initialPosition.y));
    this.addComponent(new Size(8, 3));
    this.addComponent(new Rect("#f00"));
    this.addComponent(new Projectile(1));
    this.addComponent(new Direction(direction));
    this.addComponent(new Velocity(200));

    this.addComponent(new Collider(2));
  }
}
