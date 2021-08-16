import { Direction } from "../components/Direction";
import { Position } from "../components/Position";
import { Projectile } from "../components/Projectile";
import { Rect } from "../components/Rect";
import { Size } from "../components/Size";
import { Velocity } from "../components/Velocity";
import { vec2 } from "../Vector2";
import { Entity } from "./Base";

export class Meteor extends Entity {
  constructor() {
    super();

    this.addComponent(new Position(380, 100));
    this.addComponent(new Size(20, 20));
    this.addComponent(new Projectile());
    this.addComponent(new Direction(vec2(-1, 0)));
    this.addComponent(new Rect("#0ff"));
    this.addComponent(new Velocity(150));
  }
}
