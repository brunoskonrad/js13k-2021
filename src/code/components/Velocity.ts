import { Component } from "./Base";

export class Velocity extends Component {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
