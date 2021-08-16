import { Entity } from "./Base";

import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Rect } from "../components/Rect";
import { Shooter } from "../components/Shooter";
import { Controllable } from "../components/Controllable";
import { vec2 } from "../Vector2";
import { Velocity } from "../components/Velocity";
import { Direction } from "../components/Direction";

export class Player extends Entity {
  constructor() {
    super();

    this.addComponent(new Position(20, 100));
    this.addComponent(new Size(16, 16));
    this.addComponent(new Rect());
    this.addComponent(new Shooter(vec2(17, 7)));
    this.addComponent(new Controllable());
    this.addComponent(new Velocity(100));
    this.addComponent(new Direction(vec2(1, 0)));
  }
}
