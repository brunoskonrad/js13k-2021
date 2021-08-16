import { Vector2 } from "../Vector2";
import { Component } from "./Base";

export class Direction extends Component {
  value: Vector2;

  constructor(value: Vector2) {
    super();
    this.value = value;
  }
}
