import { Entity } from "./Base";

import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Rect } from "../components/Rect";
import { Shooter } from "../components/Shooter";
import { Controllable } from "../components/Controllable";
import { vec2 } from "../Vector2";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";
import { Collider } from "../components/Collider";
import { Health } from "../components/Health";

export class Player extends Entity {
  constructor() {
    super([
      new Position(20, 100),
      new Size(16, 16),
      new Rect(),
      new Shooter(vec2(17, 7), 500, 2, "#f00"),
      new Controllable(),
      new Velocity(100),
      new Direction(vec2(1, 0)),

      new Collider(1),
      new Health(3),
    ]);
  }
}
