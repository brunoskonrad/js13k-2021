import { Vector2 } from "../Vector2";
import { Component } from "./Base";

export class Shooter extends Component {
  position: Vector2;
  delay: number;

  constructor(position: Vector2, delay: number = 500) {
    super();

    this.position = position;
    this.delay = delay;
  }
}
