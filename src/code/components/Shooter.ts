import { Vector2 } from "../Vector2";
import { Component } from "./Base";

export class Shooter extends Component {
  position: Vector2;

  constructor(position: Vector2) {
    super();

    this.position = position;
  }
}
