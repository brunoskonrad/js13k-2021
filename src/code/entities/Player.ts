import { Entity } from "./Base";

import { Position } from "../components/Position";
import { Size } from "../components/Size";
import { Rect } from "../components/Rect";
import { Shooter } from "../components/Shooter";

export class Player extends Entity {
  constructor() {
    super();

    this.addComponent(new Position(0, 0));
    this.addComponent(new Size(16, 16));
    this.addComponent(new Rect());
    this.addComponent(new Shooter());
  }
}
