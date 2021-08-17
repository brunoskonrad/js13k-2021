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
    super();

    this.add(new Position(20, 100));
    this.add(new Size(16, 16));
    this.add(new Rect());
    this.add(new Shooter(vec2(17, 7), 500, 2, "#f00"));
    this.add(new Controllable());
    this.add(new Velocity(100));
    this.add(new Direction(vec2(1, 0)));

    this.add(new Collider(1));
    this.add(new Health(3));
  }
}
