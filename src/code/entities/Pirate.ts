import { Entity } from "./Base";

import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Rect } from "../components/Rect";
import { Shooter } from "../components/Shooter";
import { vec2 } from "../Vector2";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";
import { Collider } from "../components/Collider";
import { Health } from "../components/Health";

export class Pirate extends Entity {
  constructor() {
    super();

    this.addComponent(new Position(320, 100));
    this.addComponent(new Size(16, 16));
    this.addComponent(new Rect("#2423ff"));
    this.addComponent(new Shooter(vec2(-1, 7), 500, 5, "#ff0"));
    this.addComponent(new Velocity(100));
    this.addComponent(new Direction(vec2(-1, 0)));

    this.addComponent(new Collider(4));
    this.addComponent(new Health(2));
  }
}
