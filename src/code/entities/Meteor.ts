import { Collider } from "../components/Collider";
import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Projectile } from "../components/Projectile";
import { Rect } from "../components/Rect";
import { Size } from "../components/Size";
import { Velocity } from "../components/Velocity";
import { Health } from "../components/Health";
import { vec2 } from "../Vector2";
import { Entity } from "./Base";

export class Meteor extends Entity {
  constructor() {
    super([
      new Position(380, 100),
      new Size(20, 20),
      new Projectile(1),
      new Direction(vec2(-1, 0)),
      new Rect("#0ff"),
      new Velocity(150),

      new Collider(3),
      new Health(1),
    ]);
  }
}
