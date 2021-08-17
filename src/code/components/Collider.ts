import { Component } from "./Base";

export class Collider extends Component {
  layer: number;
  collisions: Object;

  constructor(layer: number) {
    super();

    this.layer = layer;
    this.collisions = {};
  }
}
