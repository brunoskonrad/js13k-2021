import { Vector2 } from "../Vector2";
import { Component } from "./Base";

export class Shooter extends Component {
  position: Vector2;
  delay: number;

  layer: number;
  color: string;

  lastShotAt: number;

  constructor(position: Vector2, delay: number = 500, layer, color) {
    super();

    this.position = position;
    this.delay = delay;
    this.layer = layer;
    this.color = color;
  }
}
