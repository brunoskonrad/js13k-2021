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
    super();

    this.add(new Position(380, 100));
    this.add(new Size(20, 20));
    this.add(new Projectile(1));
    this.add(new Direction(vec2(-1, 0)));
    this.add(new Rect("#0ff"));
    this.add(new Velocity(150));

    this.add(new Collider(3));
    this.add(new Health(1));
  }
}
