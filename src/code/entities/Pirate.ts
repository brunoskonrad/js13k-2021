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
    super([
      new Position(320, 100),
      new Size(16, 16),
      new Rect("#2423ff"),
      new Shooter(vec2(-1, 7), 500, 5, "#ff0"),
      new Velocity(100),
      new Direction(vec2(-1, 0)),

      new Collider(4),
      new Health(2),
    ]);
  }
}
