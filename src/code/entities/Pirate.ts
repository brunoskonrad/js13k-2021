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

    this.add(new Position(320, 100));
    this.add(new Size(16, 16));
    this.add(new Rect("#2423ff"));
    this.add(new Shooter(vec2(-1, 7), 500, 5, "#ff0"));
    this.add(new Velocity(100));
    this.add(new Direction(vec2(-1, 0)));

    this.add(new Collider(4));
    this.add(new Health(2));
  }
}
